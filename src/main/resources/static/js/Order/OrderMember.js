const app = Vue.createApp({
    // components: {
    //     paginate: VuejsPaginateNext,
    // },
    data() {
        return {
            OrdersWhereMemberData: [],
            order_id: "",
            tt_number: 8,
            total_amount: "",
            order_status: "",
            order_notes: "",
            name: "",
            quantity: "",
            members_id: "",
            placed: "",
            isShowTable: true,
            isShowCard: false,
            selectedStatus: '所有訂單',
            backupOrdersData: [],
            searchInput: "",
            searchResult: [],
            searchByNotes: false,
            noSearchShowAll: true,
            payment_method: "",
            shipping_address: "",
            receipt_method: "",
            getInnerJoinData: [],
            order_detail_id: "",
            products_id: "",
            selling_price: "",
            new_selling_price: "",
            count: localStorage.getItem('count'),
            disableButton: false,
            cancel: false,
            selectedTimeRange: 'all',
            searchTime: false,
            filteredOrders: [],
            data404: false,
            contextPath: contextPath,
            orderId: "",
            membersId: "",
            MemberId: localStorage.getItem('MembersId'),
            RoleId: localStorage.getItem('RoleId'),
            roleId: "",


            // // 分頁功能所需參數
            // start: 0, //起始資料index (from 0)
            // rows: 5, //每頁顯示資料數量
            // pages: 0, //總分頁數量
            // current: 1, //目前頁面 (from 1)
            // lastPageRows: 0, //最後一頁資料數量
        }
    },
    watch: {
        searchInput(newSearchValue) {
            let vm = this
            if (newSearchValue === "") {
                vm.findAllOrdersWhereMember();
            }
        }
    },
    mounted() {
        this.findAllOrdersWhereMember()
    },
    methods: {
        findAllOrdersWhereMember() {
            let vm = this
            vm.isShowTable = true
            vm.isShowCard = false
            vm.searchByNotes = false
            vm.noSearchShowAll = true
            vm.data404 = false

            // // 在點選分頁(page from 1)時，呼叫出顯示的資料
            // if (page) {
            //     // 當點選指定分頁時的動作
            //     vm.start = (page - 1) * vm.rows;
            //     vm.current = page;
            // } else {
            //     // 未點選指定分頁時的動作(預設為第一頁)
            //     vm.start = 0;
            //     vm.current = 1;
            // }

            if(vm.MemberId != null && vm.RoleId === '3'){
                // console.log("12=",vm.MemberId)
                // axios.post(contextPath + '/api/page/orders/members/' + vm.tt_number)
                axios.post(contextPath + '/api/page/orders/members/' + vm.MemberId)
                    .then((response) => {
                        // console.log(response.data)
                        vm.OrdersWhereMemberData = response.data
                        vm.backupOrdersData = response.data
                        // vm.order_id = response.data.order_id
                        // vm.members_id = response.data.members_id
                        // vm.total_amount = response.data.total_amount
                        // vm.order_notes = response.data.order_notes
                        // vm.order_status = response.data.order_status
                        // console.log(response.data)
                        // const dateTimeString = response.data.placed
                        // vm.placed = vm.formatDate(dateTimeString);
                        vm.OrdersWhereMemberData.forEach(order => {
                            order.placed = vm.formatDate(order.placed);
                        });
                        // vm.placed = order.placed
                        // console.log(vm.placed)
                        // console.log("heh",order.placed)
                    })
                    .catch((error) => {
                        console.error(error.message)
                    })
            }else if(vm.RoleId === '1'){
                axios.get(contextPath + '/api/page/orders/find').then((response)=>{
                    // console.log(response.data)
                    vm.OrdersWhereMemberData = response.data
                    vm.backupOrdersData = response.data
                    vm.OrdersWhereMemberData.forEach(order => {
                        order.placed = vm.formatDate(order.placed);
                    });
                })
                .catch((error)=>{
                    console.error("error:",error.message)
                })
            }
        },
        formatDate(dateTimeString) {
            // if (!dateTimeString) {
            //     return '';
            // }
            if (!dateTimeString || typeof dateTimeString !== 'string') {
                return '';
            }

            const formattedDate = dateTimeString.substring(0, 10); // 截取前10個字符，即日期部分
            return formattedDate;
        },
        updateByOrderStatus() {
            let vm = this
            vm.isShowTable = true
            vm.isShowCard = false
            vm.roleId = localStorage.getItem('RoleId')

            if(vm.roleId === '3'){
                if (vm.selectedStatus !== '所有訂單') {
                    vm.OrdersWhereMemberData = vm.backupOrdersData.filter(item => item.order_status === vm.selectedStatus);
                    if (vm.OrdersWhereMemberData.length === 0) {
                        vm.isShowTable = false
                    }
                } else {
                    vm.OrdersWhereMemberData = vm.backupOrdersData
                }
            }else if(vm.roleId === '1'){
                if (vm.selectedStatus !== '所有訂單') {
                    vm.OrdersWhereMemberData = vm.backupOrdersData.filter(item => item.orderStatus === vm.selectedStatus);
                    if (vm.OrdersWhereMemberData.length === 0) {
                        vm.isShowTable = false
                    }
                } else {
                    vm.OrdersWhereMemberData = vm.backupOrdersData
                }
            }
        },
        selectOrderId(orderId) {
            let vm = this
            vm.isShowTable = false
            vm.isShowCard = true

            axios.post(contextPath + '/api/page/orders/' + orderId)
                .then((response) => {
                    // console.log(response.data)
                    vm.members_id = response.data.membersId
                    vm.order_id = response.data.orderId
                    // console.log(vm.members_id)
                    vm.getInnerJoinProductAndOrderByMemberIdAndOrderId()
                })
                .catch((error) => {
                    console.error(error.message)
                })
        },
        searchOrderNotes() {
            let searchInputValue = this.searchInput.trim();
            // console.log(searchInputValue)
            let vm = this
            vm.isShowTable = true
            vm.isShowCard = false
            vm.searchByNotes = true
            vm.noSearchShowAll = false
            vm.disableButton = false
            vm.cancel = false
            vm.data404 = true
            vm.membersId = localStorage.getItem('MembersId')
            vm.roleId = localStorage.getItem('RoleId')

            // 判斷輸入是否包含標點符號
            const punctuations = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
            if (punctuations.test(searchInputValue)) {
                vm.isShowTable = false
                vm.data404 = true
                return; // 停止執行
            }

            // console.log(vm.roleId)

            if(vm.roleId === '3'){
                axios.post(contextPath + '/api/page/orders/searchByNotes2/' + searchInputValue + '/' +vm.membersId)
                    .then((response) => {
                        // console.log(response.data)
                        vm.searchResult = response.data
                        vm.searchResult.forEach(order => {
                            order.placed = vm.formatDate(order.placed);
                        });
                        if (vm.searchResult.length === 0) {
                            vm.isShowTable = false
    
                        }
    
                    })
                    .catch((error) => {
                        console.error("資料請求失敗：", error);
                    })
            }else if(vm.roleId === '1'){
                axios.post(contextPath + '/api/page/orders/searchByNotesAll/' + searchInputValue)
                    .then((response) => {
                        // console.log(response.data)
                        vm.searchResult = response.data
                        vm.searchResult.forEach(order => {
                            order.placed = vm.formatDate(order.placed);
                        });
                        if (vm.searchResult.length === 0) {
                            vm.isShowTable = false
    
                        }
    
                    })
                    .catch((error) => {
                        console.error("資料請求失敗：", error);
                    })
            }
        },
        modifyOrderStatusReturn() {
            let vm = this
            bootbox.confirm({
                message: `<div class="text-center">確定要退貨嗎？</div>`,
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
                        axios.put(contextPath + '/api/page/orders/modifyByStatusReturn/' + vm.order_id)
                            .then((response) => {
                                const notyf = new Notyf({
                                    ripple : false,
                                    position: {
                                        x: 'right',
                                        y: 'top',
                                      },
                                });
                                notyf.success('退貨成功');
                                
                                vm.disableButton = true
                                vm.getInnerJoinProductAndOrderByMemberIdAndOrderId()
                            })
                            .catch((error) => {
                                const notyf = new Notyf({
                                    ripple : false,
                                    position: {
                                        x: 'right',
                                        y: 'top',
                                      },
                                });
                                notyf.error('訂單退貨失敗');
                                // console.error('訂單退貨失敗:', error)
                                vm.disableButton = false
                            })
                    }
                }
            })
        },
        modifyOrderStatusCancel() {
            let vm = this
            bootbox.confirm({
                message: `<div class="text-center">確定要取消訂單嗎？</div>`,
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
                        vm.cancel = true
                        axios.put(contextPath + '/api/page/orders/modifyByStatusCancel/' + vm.order_id)
                            .then((response) => {
                                const notyf = new Notyf({
                                    ripple : false,
                                    position: {
                                        x: 'right',
                                        y: 'top',
                                      },
                                });
                                notyf.success('取消訂單成功');
                                
                                vm.cancel = true
                                vm.getInnerJoinProductAndOrderByMemberIdAndOrderId()
                            })
                            .catch((error) => {
                                const notyf = new Notyf({
                                    ripple : false,
                                    position: {
                                        x: 'right',
                                        y: 'top',
                                      },
                                });
                                notyf.error('取消訂單失敗');
                                // console.error('取消訂單失敗:', error)
                                vm.cancel = false
                            })
                    }
                }
            })
        },
        getInnerJoinProductAndOrderByMemberIdAndOrderId() {
            let vm = this
            vm.isShowTable = false
            vm.isShowCard = true
            vm.disableButton = false
            vm.cancel = false

            axios.post(contextPath + '/api/page/orders/detail/findInnerJoin/' + vm.members_id + '/' + vm.order_id)
                .then((response) => {
                    // console.log(response.data)
                    // console.log(this.getInnerJoinData)
                    vm.getInnerJoinData = response.data.list

                    vm.getInnerJoinData.forEach(order => {
                        order.placed = vm.formatDate(order.placed);
                    });

                    for (const item of vm.getInnerJoinData) {
                        const order_status = item.order_status;

                        if (order_status === '取消' || order_status === '退貨完成' || order_status === '申請退貨中') {
                            vm.disableButton = true
                            vm.cancel = true
                        }
                    }

                })
                .catch((error) => {
                    console.error("錯誤", error.message)
                })
        },
        redirectToOrderDetail(orderId) {
            const url = contextPath + '/OrderDetailMember?order_id=' + orderId;
            // console.log(url)
            window.location.href = url;
        },
        updateTimeRange() {
            let vm = this
            vm.noSearchShowAll = false
            vm.searchTime = true

            const startDate = new Date()
            const endDate = new Date()

            if (vm.selectedTimeRange === 'all') {
                vm.findAllOrdersWhereMember()
                vm.searchTime = false
            } else if (vm.selectedTimeRange === '30') {
                startDate.setDate(startDate.getDate() - 30)
            } else if (vm.selectedTimeRange === '180') {
                startDate.setMonth(startDate.getMonth() - 6)
            } else if (vm.selectedTimeRange === '365') {
                startDate.setFullYear(2023, 0, 1)
                endDate.setFullYear(2023, 11, 31)
            } else if (vm.selectedTimeRange === '2022') {
                startDate.setFullYear(1987, 0, 1)
                endDate.setFullYear(2022, 0, 1)
            }


            const dateObject = new Date(startDate)
            const dateObject2 = new Date(endDate)
            // 提取年份、月份和日期
            const year = dateObject.getFullYear()
            const month = dateObject.getMonth() + 1; // 注意要加 1，因為月份是從 0 開始的
            const day = dateObject.getDate()

            const year2 = dateObject2.getFullYear()
            const month2 = dateObject2.getMonth() + 1; // 注意要加 1，因為月份是從 0 開始的
            const day2 = dateObject2.getDate()

            const formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day
            const formattedDate2 = year2 + '-' + (month2 < 10 ? '0' : '') + month2 + '-' + (day2 < 10 ? '0' : '') + day2

            const formattedStartDate = formattedDate
            const formattedEndDate = formattedDate2

            // console.log('day:', day)
            // console.log('month:', month)
            // console.log('year:', year)
            // console.log('Start Date:', formattedDate)
            // console.log('End Date:', formattedDate2)

            vm.filteredOrders = vm.backupOrdersData.filter(item => {
                const orderDate = vm.formatDate(item.placed);
                // console.log('123:', orderDate)
                return orderDate >= formattedStartDate && orderDate <= formattedEndDate;
            })
            // console.log("filter:", vm.filteredOrders)
        },

        // addToShoppingCart(item) {
        //     const originalData = {
        //         members_id: item.members_id,
        //         products_id: item.products_id,
        //         quantity: item.quantity,
        //     };
        //     axios.post(contextPath + "/api/page/shoppingcarts/checkin", originalData)
        //         .then((response) => {
        //             if (!response.data.success) {
        //                 bootbox.alert({
        //                     message: `<div class="text-center">購物車已有此商品</div>`,
        //                     buttons: {
        //                         ok: {
        //                             label: '關閉',
        //                             className: 'btn btn-success'
        //                         }
        //                     }
        //                 });
        //             } else {
        //                 bootbox.alert({
        //                     message: `<div class="text-center">已加入購物車</div>`,
        //                     buttons: {
        //                         ok: {
        //                             label: '關閉',
        //                             className: 'btn btn-success'
        //                         }
        //                     }
        //                 });
        //                 this.count++
        //                 const newCount = this.count
        //                 var jsonData = JSON.stringify(newCount);
        //                 localStorage.setItem('count', jsonData);
        //                 this.ifCount()
        //             }
        //         })
        //         .catch((error) => {
        //             bootbox.alert({
        //                 message: `<div class="text-center">加入購物車失敗${error.message}</div>`,
        //                 buttons: {
        //                     ok: {
        //                         label: '關閉',
        //                         className: 'btn btn-danger'
        //                     }
        //                 }
        //             });
        //         });
        // },
        // ifCount(){
        //     let checkCount =  localStorage.getItem('count')
        //     const cartBadge = document.getElementById('cart');
        //     if(cartBadge != checkCount){
        //         cartBadge.textContent = checkCount;
        //     }
        // },

    }
})
app.mount("#app")


