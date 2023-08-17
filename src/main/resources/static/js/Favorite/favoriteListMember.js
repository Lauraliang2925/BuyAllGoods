const app = Vue.createApp({
    data() {
        return {
            favorite: [],
            searchKeyword: "",
            selectAll: false,
            shoppingCart: "",
            isShowFavorite: false,
            Product: [],
            count: localStorage.getItem('count'),
            tt_number: 8
        };
    },
    mounted() {
        this.getFavoritesByMemberID();
    },
    computed: {
        
    },
    created(){
       
    },
    methods: {
        getFavoritesByMemberID(){
            axios.post(contextPath + "/api/page/favorites/" + this.tt_number)
            .then((response)=>{
                // this.favorite = response.data
                console.log(response.data)
                this.favorite = response.data.map(item => {
                    if (item.new_selling_price !== null) {
                        item.discounted = true;
                        item.selling_price = item.new_selling_price;
                    } else {
                        item.discounted = false;
                    }
                    return item;
                });
                this.isShowFavorite = this.favorite.length > 0
            })
            .catch((error)=>{
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
                        const newCount = this.count
                        var jsonData = JSON.stringify(newCount);
                        localStorage.setItem('count', jsonData);
                        this.ifCount()
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
                    axios.delete(contextPath + '/api/page/favorites/delete/' + this.tt_number)
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
                            vm.getFavoritesByMemberID()
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
                            vm.getFavoritesByMemberID()
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
        ifCount(){
            let checkCount =  localStorage.getItem('count')
            const cartBadge = document.getElementById('cart');
            if(cartBadge != checkCount){
                cartBadge.textContent = checkCount;
            }
        }
    }
});

app.mount("#app")
