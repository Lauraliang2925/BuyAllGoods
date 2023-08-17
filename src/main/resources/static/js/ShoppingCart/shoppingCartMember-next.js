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
            name: "",
            totalPriceToOrders: sessionStorage.getItem('totalPrice'),
            new_selling_price: "",
            products_id: "",
            suppliers_id: "",
            memebers_id: "",
            order_id: "",
            backupShoppingCartData: [],
            count: 0,
            order_notes: "",
        }
    },
    computed: {
        isOrderNotesEmpty() {
            return !this.order_notes.trim();
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
            axios.post(contextPath + "/api/page/shoppingcarts/" + vm.tt_number)
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
            axios.get(contextPath + "/api/page/members/" + vm.tt_number)
                .then((response) => {
                    vm.Members = response.data
                    vm.first_name = response.data.first_name
                    vm.last_name = response.data.last_name
                    vm.address = response.data.address
                    vm.name = vm.first_name + vm.last_name
                })
        },
        createOrders() {
            let vm = this
            const originalData = {
                members_id: vm.tt_number,
                total_amount: vm.totalPriceToOrders,
                payment_method: '信用卡',
                shipping_address: vm.address,
                order_status: '訂單開立',
                // order_notes: '測試用',
                // order_notes: vm.order_notes || vm.getProductItemName(),
                order_notes: vm.order_notes,
                receipt_method: '電子發票',
                delivered: ''
            }
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
                callback(result) {
                    if (result) {
                        // let vm = this
                        axios.post(contextPath + '/api/page/orders', originalData)
                            .then((response) => {
                                //console.log(response.data)
                                vm.order_id = response.data.order_id
                                // 輸入到訂單細節 開始
                                // const originalDataByOrderDetail = {
                                //     order_id: vm.order_id,
                                //     products_id: vm.backupShoppingCartData.products_id,
                                //     quantity: vm.backupShoppingCartData.quantity,
                                //     new_selling_price: vm.backupShoppingCartData.new_selling_price,
                                //     subtotal: vm.backupShoppingCartData.quantity * vm.backupShoppingCartData.new_selling_price,
                                //     suppliers_id: vm.backupShoppingCartData.suppliers_id
                                // }
                                const originalDataByOrderDetail = vm.backupShoppingCartData.map(item => {
                                    return {
                                        order_id: vm.order_id,
                                        products_id: item.products_id,
                                        quantity: item.quantity,
                                        // new_selling_price: item.new_selling_price,
                                        unit_price: item.new_selling_price,
                                        subtotal: item.quantity * item.new_selling_price,
                                        suppliers_id: item.suppliers_id
                                    };
                                });
                                // console.log(originalDataByOrderDetail)
                                axios.post(contextPath + '/api/page/orders/detail/multi', originalDataByOrderDetail)
                                    .then((response) => {
                                        // console.log(response.data)
                                        vm.removeAllShoppingCart()
                                    })
                                // 輸入到訂單細節 結束
                                bootbox.alert({
                                    message: `<div class="text-center">送出訂單成功</div>`,
                                    button: {
                                        closeButton: false,
                                        ok: {
                                            label: '關閉',
                                            className: 'btn btn-success'
                                        }
                                    }
                                })
                                // bootbox.alert({
                                //     message: '<div class="text-center">送出訂單成功</div>',
                                //     // closeButton: false,
                                //     buttons: {
                                //         ok: {
                                //             label: '關閉',
                                //             className: 'btn btn-success',
                                //             callback: function () {
                                //                 setTimeout(function () {
                                //                     window.location.href = contextPath;
                                //                 }, 2000);
                                //             }
                                //         }
                                //     }
                                // });
                                bootbox.dialog({
                                    message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> 送出訂單...</div>',
                                    closeButton: false
                                });
                                setTimeout(() => {
                                    // 或者直接使用 JavaScript 來執行跳轉
                                    window.location.href = contextPath;
                                }, 2000);
                            })
                            .catch((error) => {
                                bootbox.alert({
                                    message: `<div class="text-center">送出訂單失敗</div>`,
                                    button: {
                                        ok: {
                                            label: '關閉',
                                            className: 'btn btn-warning'
                                        }
                                    }
                                })
                                console.error(error.message)
                            })
                            .catch((error) => {
                                console.error(error.message);
                            })
                    }
                }
            });
        },
        removeAllShoppingCart() {
            let vm = this;
            axios.delete(contextPath + '/api/page/shoppingcarts/delete/' + this.tt_number)
                .then((response) => {
                    this.count = 0
                    const newCount = this.conut
                    var jsonData = JSON.stringify(newCount);
                    localStorage.setItem('count', jsonData)
                    localStorage.clear()
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
