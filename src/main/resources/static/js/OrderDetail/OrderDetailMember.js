const app = Vue.createApp({
  data() {
    return {
      OrderDetailData: [],
      backupData: [],
      order_id: "",
      total_amount: "",
      order_status: "",
      placed: "",
      delivered_arrival: "",
      contextPath: contextPath,
      order_detail_ids:[],
      hasData: true,
    };
  },
  mounted() {
    this.getOderDetail();
    // this.findAllReview();
  },
  methods: {
    getOderDetail() {
        let vm = this;
      
        const urlParams = new URLSearchParams(window.location.search);
        const order_id = urlParams.get("order_id");
        // console.log(order_id);
      
        axios
          .post(
            contextPath + "/api/page/orders/detail/innerJoinDetail/" + order_id
          )
          .then(function(response) {
            console.log(response.data.list);
            vm.OrderDetailData = response.data.list;
            vm.backupData = response.data.list;       
            vm.total_amount = response.data.list[0].total_amount;
            vm.order_status = response.data.list[0].order_status;
            vm.placed = vm.formatDate(response.data.list[0].placed);
            vm.delivered_arrival = vm.formatDate(
              response.data.list[0].delivered_arrival
            );
           
          })
          .catch(function(error) {
            console.error("錯誤", error.message);
          });
      },
    formatDate(dateTimeString) {
      if (!dateTimeString) {
        return "";
      }

      const formattedDate = dateTimeString.substring(0, 10); // 截取前10個字符，即日期部分
      return formattedDate;
    },
    // 查看個別商品的按鈕，丟productsId
    reviewProductById: function (productsId,orderDetailId) {
      // 帶著選定的productsId跳轉至個別商品評價頁面
      // 從PageController 轉移
      window.location.href =
        contextPath + "/review-product?productsId=" + productsId+"&orderDetailId="+orderDetailId;
    },
    findAllReview: function(){

    },
  },
});
app.mount("#app");
