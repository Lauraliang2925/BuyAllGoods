const app = Vue.createApp({
    data() {
        return {
            favorite: [],
            searchKeyword: "",
            selectAll: false,
            shoppingCart: "",
            isShowFavorite: false,
            Product: [],
            count: 0,
            tt_number: 8
        };
    },
    mounted() {
        this.fetchFavorites();
    },
    computed: {
        
    },
    created(){
       
    },
    methods: {
        fetchFavorites() {
            axios.get(contextPath + "/api/page/favorites/with")
           .then((response) => {
                this.favorite = response.data;
                this.isShowFavorite = this.favorite.length > 0
            })
            .catch((error) => {
                this.isShowFavorite = false
            })
        },
        addToShoppingCart(item) {
            const originalData = {
                members_id: item.members_id,
                products_id: item.products_id,
                quantity: 1,
            };
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
                        this.count++
                        // const newCount = this.count
                        // localStorage.setItem('count', newCount.toString());
                    }
                })
                .catch((error) => {
                    bootbox.alert({
                        message: `<div class="text-center">加入購物車失敗${error.message}</div>`,
                        buttons: {
                            ok: {
                                label: '關閉',
                                className: 'btn btn-danger'
                            }
                        }
                    });
                });
        },
        removeFromFavorites(favorite_list_id) {
            bootbox.confirm({
                message: `<div class="text-center">確定將此商品從收藏清單移除嗎？</div>`,
                buttons: {
                    confirm: {
                        label: "確定",
                        className: "btn btn-primary"
                    },
                    cancel: {
                        label: "取消",
                        className: "btn btn-secondary"
                    }
                },
                callback: (result) => {
                    if (result) {
                        axios.delete(contextPath + "/api/page/favorites/" + favorite_list_id)
                            .then((response) => {
                                this.favorite = this.favorite.filter((item) => item.favorite_list_id !== favorite_list_id);
                                bootbox.alert({
                                    message: `<div class="text-center">已成功從收藏清單中移除</div>`,
                                    buttons: {
                                        ok: {
                                            label: '關閉',
                                            className: 'btn btn-primary'
                                        }
                                    }
                                });
                            })
                            .catch((error) => {
                                bootbox.alert({
                                    message: `<div class="text-center">移除收藏商品失敗${error.message}</div>`,
                                    buttons: {
                                        ok: {
                                            label: '關閉',
                                            className: 'btn btn-danger'
                                        }
                                    }
                                });
                            });
                    } else {

                    }
                }
            });
        },

        deleteAll() {
            let vm = this
            bootbox.confirm(`<div class="text-center">確定要將所有收藏清單移除嗎？</div>`, (result) => {
                if (result) {
                    axios.delete(contextPath + '/api/page/favorites')
                        .then((response) => {
                            bootbox.alert({
                                message: `<div class="text-center">已成功將所有收藏清單移除</div>`,
                                buttons: {
                                    ok: {
                                        label: '關閉',
                                        className: 'btn btn-primary'
                                    }
                                }
                            });
                            vm.fetchFavorites()
                        })
                        .catch((error) => {
                            bootbox.alert({
                                message: `<div class="text-center">移除收藏清單錯誤</div>` + error.message,
                                buttons: {
                                    ok: {
                                        label: '關閉',
                                        className: 'btn btn-primary'
                                    }
                                }
                            });
                            vm.fetchFavorites()
                        });
                }
            });
        },
        addToFavoriteList(item) {
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
        
    }
});

app.mount("#app")
