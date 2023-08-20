const app = Vue.createApp({
    data(){
        return{
            orderDetailBySuppliers: [],
            backupData: [],
            suppliers_id: 1,
            order_status: "",
            track_shipment: "",
            estimated_arrival: "",
            delivered_arrival: "",
            delivered: this.delivered_arrival,
            order_detail_id: "",
            order_id: "",
            members_id: "",
            order_notes: "",
            receipt_method: "",
            payment_method: "",
            shipping_address:"",
            order_detail_id: "",
            products_id: "",
            quantity: "",
            unit_price: "",
            subtotal: "",
         
        }
    },
    mounted(){
        this.findAllOrderDetailBySuppliers()
    },
    methods:{
        findAllOrderDetailBySuppliers(){
            let vm = this
            axios.post(contextPath + '/api/page/orders/detail/dataBySuppliersId/' + vm.suppliers_id)
            .then((response)=>{
                console.log(response.data.list)
                vm.orderDetailBySuppliers = response.data.list
                vm.backupData = response.data.list

                vm.orderDetailBySuppliers.forEach(order => {
                    order.placed = vm.formatDate(order.placed)
                });
                
            })
            .catch((error)=>{
                console.error('error',error.message)
            })
        },
        formatDate(dateTimeString) {
            if (!dateTimeString) {
                return '';
            }
            const formattedDate = dateTimeString.substring(0, 10); // 截取前10個字符，即日期部分
            return formattedDate;
        },
        updateOrderDetailBySuppliers(item){
            let vm = this
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Loding...</div>',
                closeButton: false
            });
            axios.put(contextPath + '/api/page/orders/detail/' + item.order_detail_id, item)
            .then((response) => {
                // console.log(response.data)
                vm.findAllOrderDetailBySuppliers()
            }).catch((error) => {
                console.log(error.message)
            }).finally(function () {
                vm.findAllOrderDetailBySuppliers()
                setTimeout(function () {
                    bootbox.hideAll();
                }, 500)
            })
        },
        updateOrderStatus(item){
            let vm = this
            vm.shipping_address = item.shipping_address
            vm.members_id = item.members_id
            vm.order_notes = item.order_notes
            vm.payment_method = item.payment_method
            vm.receipt_method = item.receipt_method
            const newOrderStatus = item.order_status;
            // console.log("New order status:", newOrderStatus);
            // console.log(item.order_id)
            let data={
                orderStatus : newOrderStatus,
                membersId : vm.members_id,
                orderNotes : vm.order_notes,
                paymentMethod : vm.payment_method,
                receiptMethod : vm.receipt_method,
                shippingAddress : vm.shipping_address,
                totalAmount : item.total_amount,
                orderId: item.order_id
            }
            console.log(data)
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Loding...</div>',
                closeButton: false
            });
            axios.put(contextPath + '/api/page/orders/modify2/' + item.order_id, data)
            .then((response) => {
                // console.log(response.data)
                vm.findAllOrderDetailBySuppliers()
            }).catch((error) => {
                console.log(error.message)
            }).finally(function () {
                vm.findAllOrderDetailBySuppliers()
                setTimeout(function () {
                    bootbox.hideAll();
                }, 500)
            })
        },
        updateOrderDetailBySuppliers(item){
            let vm = this
            bootbox.dialog({
                message: '<div class="text-center"><i class="fa-solid fa-spinner fa-spin"></i> Loding...</div>',
                closeButton: false
            });
            console.log(item)
            let data = {
                orderDetailId : item.order_detail_id,
                orderId: item.order_id,
                productsId: item.products_id,
                quantity: item.quantity,
                unitPrice: item.unit_price,
                subtotal: item.subtotal,
                suppliersId:  item.suppliers_id,
                trackShipment: item.track_shipment,
                estimatedArrival: item.estimated_arrival,
                deliveredArrival: item.delivered_arrival,
            }
            console.log("12",data)
            axios.put(contextPath + '/api/page/orders/detail/' + item.order_detail_id ,data)
            .then((response)=>{
                console.log(response.data)
                vm.findAllOrderDetailBySuppliers()
            })
            .catch((error)=>{
                console.error("da",error.message)
            })
            .finally(function () {
                vm.findAllOrderDetailBySuppliers()
                setTimeout(function () {
                    bootbox.hideAll();
                }, 500)
            })
        },
    }
})
app.mount("#app")

// // 獲取今天的日期
// var today = new Date();

// // 將日期增加7天
// var estimatedArrival = new Date(today);
// estimatedArrival.setDate(estimatedArrival.getDate() + 7);

// // 格式化日期以符合<input type="date">元素的要求（YYYY-MM-DD）
// var year = estimatedArrival.getFullYear();
// var month = (estimatedArrival.getMonth() + 1).toString().padStart(2, '0');
// var day = estimatedArrival.getDate().toString().padStart(2, '0');
// var formattedDate = year + '-' + month + '-' + day;

// // 將日期設置為<input type="date">元素的值
// document.getElementById('estimatedArrivalDate').value = formattedDate;