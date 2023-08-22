const app = Vue.createApp({
    components: {
        // "paginate": VuejsPaginateNext
    },
    data() {
        return {
            ShoppingCart: [],
            totalQuantity: 0,
            //Product: [],
            count: localStorage.getItem('count'),
            tt_number: 8,
            totalItemMemberCount: 0,
            isShowByMemberId: false,
            suppliers_id:"",
            contextPath: contextPath,
            membersId: localStorage.getItem('MembersId'),
        }
    },
    computed: {
        totalPrice() {
            return this.ShoppingCart.reduce(
                (total, item) => total + item.selling_price * item.quantity,
                0
            );
        },
    },
    mounted() {
        this.getTotalItemCountByMemberId()
        this.getShoppingCartByMemberId()
    },
    watch: {
        ShoppingCart: {
            deep: true,
            handler() {
                this.calculateTotalQuantity();
            },
        },
    },
    methods: {
        updateShoppingCart(item) {
            console.log("Updating quantity for item:", item);
            let data = {
                shoppingCartId : item.shopping_cart_id,
                membersId : item.members_id,
                productsId : item.products_id,
                quantity : item.quantity,
            }
            let vm = this
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Loding...</div>',
                closeButton: false
            })
            axios.put(contextPath + '/api/page/shoppingcarts/' + item.shopping_cart_id,data).then((response) => {
                vm.getShoppingCartByMemberId()
            }).catch((error) => {
                console.log(error.message)
            }).finally(function () {
                vm.getShoppingCartByMemberId()
                setTimeout(function () {
                    bootbox.hideAll();
                }, 500)
            })
        },
        getShoppingCartByMemberId() {
            let vm = this
            // axios.post(contextPath + "/api/page/shoppingcarts/" + vm.tt_number)
            axios.post(contextPath + "/api/page/shoppingcarts/" + vm.membersId)
                .then((response) => {
                    console.log(response.data)
                    vm.ShoppingCart = response.data.map(item => {
                        if (item.new_selling_price !== null) {
                            item.discounted = true;
                            item.selling_price = item.new_selling_price;
                        } else {
                            item.discounted = false;
                        }
                        return item;
                    });
                    vm.calculateTotalQuantity()
                    vm.isShowByMemberId = vm.ShoppingCart.length > 0
                })
                .catch((error) => {

                })
        },
        calculateTotalQuantity() {
            this.totalQuantity = this.ShoppingCart.reduce((total, item) => total + item.quantity, 0);
        },
        addFavoriteList(item) {
            const originalData = {
                membersId: item.members_id,
                productsId: item.products_id
            };
            axios.post(contextPath + '/api/page/favorites/checkin', originalData).then((response) => {
                if (!response.data.success) {
                    const notyf = new Notyf({
                        ripple : false,
                        position: {
                            x: 'right',
                            y: 'top',
                          },
                    });
                    notyf.error('收藏清單已有此商品');
                } else {
                    const notyf = new Notyf({
                        ripple : false,
                        position: {
                            x: 'right',
                            y: 'top',
                          },
                    });
                    notyf.success('已加入收藏清單');
                }
            }).catch((error) => {
                console.log(error.message)
                const notyf = new Notyf({
                    ripple : false,
                    position: {
                        x: 'right',
                        y: 'top',
                      },
                });
                notyf.error('加入收藏清單失敗');
            })
        },
        removeShoppingCart(shopping_cart_id) {
            bootbox.confirm({
                message: `<div class="text-center">確定將此商品從購物車移除嗎？</div>`,
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
                callback: (result) => {
                    if (result) {
                        axios.delete(contextPath + '/api/page/shoppingcarts/' + shopping_cart_id).then((response) => {
                            this.ShoppingCart = this.ShoppingCart.filter(item => item.shopping_cart_id !== shopping_cart_id);
                            const notyf = new Notyf({
                                ripple : false,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                  },
                            });
                            notyf.success('已成功將商品移除購物車');
                           
                            this.getShoppingCartByMemberId()
                            this.getTotalItemCountByMemberId()
                            this.count--
                            if(this.count <= 0){
                                this.count = 0
                            }
                            const newCount = this.count
                            const jsonData = JSON.stringify(newCount);
                            localStorage.setItem('count',jsonData)
                            this.ifCount()
                            
                        }).catch((error) => {
                            const notyf = new Notyf({
                                ripple : false,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                  },
                            });
                            notyf.error('將商品移除購物車失敗');
                            // console.log(error.message)
                        })
                    }
                },
            });
        },
        removeAll() {
            //let vm = this;
            bootbox.confirm('<div class="text-center">確定要將所有商品移除嗎？</div>', (result) => {
                if (result) {
                    axios.delete(contextPath + '/api/page/shoppingcarts/delete/' + this.membersId).then((response) => {
                        const notyf = new Notyf({
                            ripple : false,
                            position: {
                                x: 'right',
                                y: 'top',
                              },
                        });
                        notyf.success('已成功將所有商品移除購物車');
                        
                        this.getShoppingCartByMemberId()
                        this.getTotalItemCountByMemberId()
                        this.count = 0
                        const newCount = this.conut
                        var jsonData = JSON.stringify(newCount);
                        localStorage.setItem('count',jsonData)
                        localStorage.removeItem('count')
                        this.ifCount()
                        
                    })
                        .catch((error) => {
                            const notyf = new Notyf({
                                ripple : false,
                                position: {
                                    x: 'right',
                                    y: 'top',
                                  },
                            });
                            notyf.error('將所有商品移除購物車失敗');

                            this.getShoppingCartByMemberId()
                            this.getTotalItemCountByMemberId()
                        })
                }
            })
        },
        getTotalItemCountByMemberId() {
            let vm = this
            // axios.get(contextPath + "/api/page/shoppingcarts/count/" + vm.tt_number)
            axios.get(contextPath + "/api/page/shoppingcarts/count/" + vm.membersId)
                .then((response) => {
                    this.totalItemMemberCount = response.data
                })
                .catch((error) => {

                })
        },
        addToShoppingCart(item) {
            const originalData = {
                members_id: item.members_id,
                products_id: item.products_id,
                quantity: item.order_quantity
            }
            axios.post(contextPath + "/api/page/shoppingcarts/checkin", originalData)
                .then((response) => {
                    if (!response.data.success) {
                        const notyf = new Notyf({
                            ripple : false,
                            position: {
                                x: 'right',
                                y: 'top',
                              },
                        });
                        notyf.error('購物車已有此商品');
                    } else {
                        const notyf = new Notyf({
                            ripple : false,
                            position: {
                                x: 'right',
                                y: 'top',
                              },
                        });
                        notyf.success('已加入購物車');
                    }
                })
                .catch((error) => {
                    const notyf = new Notyf({
                        ripple : false,
                        position: {
                            x: 'right',
                            y: 'top',
                          },
                    });
                    notyf.error('加入購物車失敗');
                });
        },
        ifCount(){
            let checkCount =  localStorage.getItem('count')
            const cartBadge = document.getElementById('cart');
            if(cartBadge != checkCount){
                cartBadge.textContent = checkCount;
            }
        },
        storageShoppingCart(){
            sessionStorage.setItem('totalItemMemberCount', this.totalItemMemberCount);
            sessionStorage.setItem('totalQuantity', this.totalQuantity);
            sessionStorage.setItem('totalPrice', this.totalPrice);
        }
    }

});

app.mount("#app")