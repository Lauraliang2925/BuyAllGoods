const app = Vue.createApp({
  components: {
    'star-rating': VueStarRating.default,
  },
  data: function () {
    return {
      contextPath: contextPath,
   
      products: [],
      productsId: "",
      name: "",
      reviewId:"",
      orderDetailId: "",
      membersId: "",
      rating:0,
      comment: "",
      likesCount: 0,
      createdDate: "",
    };
  },
  computed: {},
  methods: {
    getUserID: function () {
      this.membersId = localStorage.getItem("MembersId");
      const urlParams = new URLSearchParams(window.location.search);      
      this.orderDetailId = urlParams.get("orderDetailId");
    },
    findById: function (productsId) {
      let vm = this;
      axios
        .get(contextPath + "/product/" + productsId)
        .then(function (response) {
          vm.productsId = response.data.productsId;
          vm.name = response.data.name;
          vm.imagePath = response.data.imagePath;

          // 當畫面一載入時，自動顯示當前圖片
          vm.previewUrl = contextPath + "/pic/product/" + vm.name + ".jpg"; // 設定 this.previewUrl
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    createReview(){
      bootbox.dialog({
        message:
          '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
        closeButton: false,
      });
      // 收集資料 start
      if (this.rating === "") {
        this.rating = null;
      }
      if (this.comment === "") {
        this.comment = null;
      }
    
      // 收集資料 end

      let request = {
        membersId: this.membersId,
        orderDetailId: this.orderDetailId,
        productsId: this.productsId,
        rating: this.rating,
        comment: this.comment,
        likesCount: this.likesCount,
      };
      // console.log("membersId"+this.membersId)
      // console.log("orderDetailId"+this.orderDetailId)
      // console.log("productsId"+this.productsId)
      // console.log("rating"+this.rating)
      // console.log("comment"+this.comment)
      // console.log("likesCount"+this.likesCount)
      let vm = this;
      axios
        .post(contextPath + "/review/insert", request)
        .then(function (response) {
          if (response.data.success) {
            bootbox.alert({
              message: "新增成功",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-success",
                },
              },
              callback: function () {
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
                vm.goBack()
              },
            });
          } else {
            bootbox.alert({
              message: "新增失敗",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-danger",
                },
              },
              callback: function () {
                vm. membersId = "";
                vm.orderDetailId = "";
                vm.productsId = "";
                vm.rating = "";
                vm.comment = "";
                vm.likesCount = "";
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
              },
            });
          }
        })
        .catch(function (error) {
          bootbox.alert({
            message: "新增失敗(請重新輸入資料)",
            buttons: {
              ok: {
                label: "關閉",
                className: "btn btn-danger",
              },
            },
            callback: function () {
              vm. membersId = "";
              vm.orderDetailId = "";
              vm.productsId = "";
              vm.rating = "";
              vm.comment = "";
              vm.likesCount = "";
              setTimeout(function () {
                bootbox.hideAll();
              }, 500);
            },
          });
        })
        .finally(function () {});
    },
    getOderDetail() {
      let vm = this;
      this.orderDetailId=orderDetailId;
      axios
        .post(
          contextPath + "/api/page/orders/detail/innerJoinDetail/" + order_id
        )
        .then((response) => {
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
        .catch((error) => {
          console.error("錯誤", error.message);
        });
    },

    goBack() {
      window.history.back(); // 使用浏览器的 history.back() 方法来回到上一页
    },
 
    // 及時返回評價的分數
    setRating(rating){
      this.rating= rating;
      // console.log(this.rating)
    },
    
  },
  mounted: function () {
    // Get the productsId from the URL
    const urlParams = new URLSearchParams(window.location.search);   
    const productsId = urlParams.get("productsId");
    this.findById(productsId);
    this.getUserID();
  },
});
app.mount("#app");
