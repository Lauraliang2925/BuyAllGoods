const app = Vue.createApp({
    data() {
        return {
            ShoppingCart: [],
            tt_number: 8,
            shopping_cart_id: "",
            name: "",
            quantity: "",
            selling_price: "",
            Members: [],
            first_name: "",
            last_name: "",
            address: "",
            MemberName: "",
            totalPriceToOrders: sessionStorage.getItem('totalPrice'),
            new_selling_price: "",
            products_id: "",
            suppliers_id: "",
            memebers_id: "",
            order_id: "",
            backupShoppingCartData: [],
            count: 0,
            order_notes: "",
            contextPath: contextPath,
            membersId: localStorage.getItem('MembersId'),
        }
    },
    computed: {
        isOrderNotesEmpty() {
            return this.order_notes === "";
        },
    },
    mounted() {
        this.getShoppingCartByMemberId()
        this.getMembersData()
        //this.getTotalItemCountByMemberId()
    },
    methods: {
        getShoppingCartByMemberId() {
            let vm = this
            // axios.post(contextPath + "/api/page/shoppingcarts/" + vm.tt_number)
            axios.post(contextPath + "/api/page/shoppingcarts/" + vm.membersId)
                .then((response) => {
                    // vm.ShoppingCart = response.data
                    vm.backupShoppingCartData = response.data
                    //console.log(vm.backupShoppingCartData)
                    // vm.shopping_cart_id = response.data.shopping_cart_id
                    // vm.members_id = response.data.memebers_id
                    // vm.products_id = response.data.products_id
                    // vm.suppliers_id = response.data.suppliers_id
                    // vm.quantity = response.data.quantity
                    // vm.selling_price = response.data.new_selling_price
                    // vm.name = response.data.name
                    vm.ShoppingCart = response.data.map(item => {
                        if (item.new_selling_price !== null) {
                            item.discounted = true;
                            item.selling_price = item.new_selling_price;
                        } else {
                            item.discounted = false;
                        }
                        return item;
                    });
                    //console.log(response.data)
                })
                .catch((error) => {
                    console.error(error.message)
                })
        },
        getMembersData() {
            let vm = this
            // axios.get(contextPath + "/api/page/members/" + vm.tt_number)
            axios.get(contextPath + "/api/page/members/" + vm.membersId)
                .then((response) => {
                    // console.log(response.data)
                    vm.Members = response.data
                    vm.first_name = response.data.firstName
                    vm.last_name = response.data.lastName
                    vm.address = response.data.address
                    vm.MemberName = vm.first_name + vm.last_name
                    if (vm.MemberName.length === 0) {
                        vm.MemberName = localStorage.getItem('MemberName')
                    }
                    // console.log(vm.MemberName)
                })
        },

        createOrders() {
            let vm = this;
            const originalData = {
                membersId: vm.membersId,
                totalAmount: vm.totalPriceToOrders,
                paymentMethod: '信用卡',
                shippingAddress: vm.address,
                orderStatus: '訂單開立',
                orderNotes: vm.order_notes,
                receiptMethod: '電子發票',
                delivered: ''
            };

            bootbox.confirm({
                message: '<div class="text-center">確定要送出訂單嗎？</div>',
                button: {
                    confirm: {
                        label: '確定',
                        className: 'btn btn-success'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn btn-danger'
                    }
                },
                async callback(result) {
                    if (result) {
                        if (vm.order_notes !== "") {
                            try {
                                const response1 = await axios.post(contextPath + '/api/page/orders', originalData)
                                vm.order_id = response1.data.orderId

                                const originalDataByOrderDetail = vm.backupShoppingCartData.map(item => {
                                    return {
                                        orderId: vm.order_id,
                                        productsId: item.products_id,
                                        quantity: item.quantity,
                                        // new_selling_price: item.new_selling_price,
                                        unitPrice: item.new_selling_price,
                                        subtotal: item.quantity * item.new_selling_price,
                                        suppliersId: item.suppliers_id
                                    }
                                });

                                const response2 = await axios.post(contextPath + '/api/page/orders/detail/multi', originalDataByOrderDetail);

                                if (response1.status === 200 && response2.status === 200) {

                                    vm.removeAllShoppingCart()
                                    // 兩個都成功才跳轉
                                    bootbox.dialog({
                                        message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> 送出訂單...</div>',
                                        closeButton: false
                                    });

                                    setTimeout(() => {
                                        // 或者直接使用 JavaScript 來執行跳轉
                                        window.location.href = contextPath;
                                    }, 1500);
                                    const notyf = new Notyf({
                                        ripple : false,
                                        position: {
                                            x: 'right',
                                            y: 'top',
                                          },
                                    });
                                    notyf.success('已成功送出訂單');
                                } else {
                                    // 如果其中一個失敗顯示失敗
                                    const notyf = new Notyf({
                                        ripple : false,
                                        position: {
                                            x: 'right',
                                            y: 'top',
                                          },
                                    });
                                    notyf.error('送出訂單失敗');
                                }
                            } catch (error) {
                                console.error('false:', error.message)
                                const notyf = new Notyf({
                                    ripple : false,
                                    position: {
                                        x: 'right',
                                        y: 'top',
                                      },
                                });
                                notyf.error('送出訂單失敗');
                            }
                        }
                    }
                }
            });
        },

        removeAllShoppingCart() {
            let vm = this;
            // axios.delete(contextPath + '/api/page/shoppingcarts/delete/' + vm.tt_number)
            axios.delete(contextPath + '/api/page/shoppingcarts/delete/' + vm.membersId)
                .then((response) => {
                    this.count = 0
                    const newCount = this.conut
                    var jsonData = JSON.stringify(newCount);
                    localStorage.setItem('count', jsonData)
                    // localStorage.clear()
                    localStorage.removeItem('count');
                    vm.ifCount()
                })
                .catch((error) => { })
        },
        ifCount() {
            let checkCount = localStorage.getItem('count')
            const cartBadge = document.getElementById('cart');
            if (cartBadge != checkCount) {
                cartBadge.textContent = checkCount;
            }
        },
        getProductItemName() {
            let vm = this
            return vm.backupShoppingCartData.map(item => item.name).join(' ');
        },
        submitForm() {
            // Check if the order_notes field is not empty
            if (!this.order_notes.trim()) {
                return;
            }
        },
    }
}).mount("#app")

const totalItemMemberCount = sessionStorage.getItem('totalItemMemberCount');
const count = document.getElementById('count');
if (count) {
    count.textContent = totalItemMemberCount ? totalItemMemberCount : 0;
    sessionStorage.removeItem('totalItemMemberCount');
}

const totalQuantity = sessionStorage.getItem('totalQuantity');
const quantity = document.getElementById('quantity');
if (quantity) {
    quantity.textContent = totalQuantity ? totalQuantity : 0;
    sessionStorage.removeItem('totalQuantity');
}

const totalPrice = sessionStorage.getItem('totalPrice');
const price = document.getElementById('price');
if (price) {
    price.textContent = totalPrice ? totalPrice : 0;
    sessionStorage.removeItem('totalPrice');
}
