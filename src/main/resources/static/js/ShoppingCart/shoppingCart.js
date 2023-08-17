const app = Vue.createApp({
    components: {
        // "paginate": VuejsPaginateNext
    },
    data() {
        return {
            ShoppingCart: [],
            totalQuantity: 0,
            hasShoppingCartData: false,
            totalItemCount: 0,
            Product: [],
            count: 0,
            tt_number: 8,
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
        this.getShoppingCartData();
        this.getTotalItemCount();
    },
    methods: {
        updateShoppingCart(item) {
            let vm = this
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Loding...</div>',
                closeButton: false
            });
            axios.put(contextPath + '/api/page/shoppingcarts/' + item.shopping_cart_id, item).then((response) => {

                vm.getShoppingCartData();
            }).catch((error) => {
                console.log(error.message)
            }).finally(function () {
                vm.getShoppingCartData();
                setTimeout(function () {
                    bootbox.hideAll();
                }, 500)
            })
        },
        getShoppingCartData() {
            axios.get(contextPath + "/api/page/shoppingcarts/with").then((response) => {
                this.ShoppingCart = response.data
                this.calculateTotalQuantity();
                this.hasShoppingCartData = this.ShoppingCart.length > 0;
            })
                .catch((error) => {
                    this.hasShoppingCartData = false;
                })
        },
        calculateTotalQuantity() {
            this.totalQuantity = this.ShoppingCart.reduce((total, item) => total + item.quantity, 0);
            // this.getShoppingCartData();
        },
        watch: {
            ShoppingCart: {
                deep: true,
                handler() {
                    this.calculateTotalQuantity();
                },
            },
        },
        addFavoriteList(item) {
            const originalData = {
                members_id: item.members_id,
                products_id: item.products_id
            };
            axios.post(contextPath + '/api/page/favorites/checkin', originalData).then((response) => {
                if(!response.data.success){
                    bootbox.alert({
                        message: `<div class="text-center">收藏清單已有此商品</div>`,
                        button: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-success'
                            }
                        }
                    }) 
                }else {
                    bootbox.alert({
                        message: `<div class="text-center">已加入收藏清單</div>`,
                        button: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-success'
                            }
                        }
                    })
                }
            }).catch((error) => {
                console.log(error.message)
                bootbox.alert({
                    message: `<div class="text-center">加入收藏清單失敗</div>`,
                    button: {
                        ok: {
                            label: '關閉',
                            className: 'btn btn-dark'
                        }
                    }
                })
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
                            bootbox.alert({
                                message: `<div class="text-center">已成功將商品移除購物車</div>`,
                                button: {
                                    ok: {
                                        label: '關閉',
                                        className: 'btn btn-success'
                                    }
                                }
                            })
                            this.getShoppingCartData();
                            this.getTotalItemCount()
                        }).catch((error) => {
                            console.log(error.message)
                        })
                    }
                },
            });
        },
        removeAll() {
            let vm = this;
            bootbox.confirm({
                message: '<div class="text-center">確定要將所有商品移除嗎？</div>',
                button: {
                    confirm: {
                        label: '確定',
                        className: 'btn btn-primary'
                    },
                    cancel: {
                        label: '取消',
                        className: 'btn btn-secondary'
                    }
                },
                callback(result) {
                    if (result) {
                        axios.delete(contextPath + '/api/page/shoppingcarts').then((response) => {
                            bootbox.alert({
                                message: `<div class="text-center">已成功將所有商品移除購物車</div>`,
                                button: {
                                    ok: {
                                        label: '關閉',
                                        className: 'btn btn-success'
                                    }
                                }
                            })
                            vm.getShoppingCartData()
                            vm.getTotalItemCount()
                        })
                    }
                }
            });
        },
        getTotalItemCount() {
            axios.get(contextPath + "/api/page/shoppingcarts/count")
                .then((response) => {
                    this.totalItemCount = response.data;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        addToShoppingCart(item){
            const originalData = {
                members_id : item.members_id,
                products_id : item.products_id,
                quantity : item.order_quantity
            }
            axios.post(contextPath + "/api/page/shoppingcarts/checkin", originalData)
                .then((response) => {
                    if (!response.data.success) {
                        bootbox.alert({
                            message: `<div class="text-center">購物車已有此商品</div>`,
                            buttons: {
                                ok: {
                                    label: '關閉',
                                    className: 'btn btn-success'
                                }
                            }
                        });
                    } else {
                        bootbox.alert({
                            message: `<div class="text-center">已加入購物車</div>`,
                            buttons: {
                                ok: {
                                    label: '關閉',
                                    className: 'btn btn-success'
                                }
                            }
                        });
                    }
                })
                .catch((error) => {
                    bootbox.alert({
                        message: `<div class="text-center">加入購物車失敗</div>`,
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-danger'
                            }
                        }
                    });
                });
        }
    }

});

app.mount("#app")