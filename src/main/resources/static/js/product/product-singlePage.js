const app = Vue.createApp({
  components: {
    "star-rating": VueStarRating.default,
    paginate: VuejsPaginateNext,
  },
  data: function () {
    return {
      contextPath: contextPath,
      categories: [],

      products: [],
      productsId: "",
      categoriesId: "",
      contractsId: "",
      name: "",
      productsSpecification: "",
      productsDescription: "",
      imagePath: "",
      sellingPrice: "",
      cost: "",
      lowestPrice: "",
      total: "",
      orderQuantity: "",
      soldQuantity: "",
      suppliersId: "",
      expiryDate: "",
      sellingStartDate: "",
      sellingStopDate: "",
      discountStartDate: "",
      discountEndDate: "",
      discount: "",
      staffId: "",

      categoriesName: "",

      categoriesLink: "",

      membersId: "",
      quantity: "",

      isShowDiscountDate: true,

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 2, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量

      reviewId: "",
      orderDetailId: "",
      rating: 0,
      comment: "",
      likesCount: 0,
      createdDate: "",

      members: "",
      memberNames: [],
      photoPath: "",
      memberPhotoPath: "",
      memberName: "",

      calculateRating: 0,

      memberLoggedIn: false,
      likeCounts: 0,
      liked: false,
    };
  },
  computed: {},
  methods: {
    getUserID: function () {
      let membersId = localStorage.getItem("MembersId");
      let roleId = localStorage.getItem("RoleId");
      // console.log("membersId:"+membersId)
      // console.log("roleId:"+roleId)
      if (roleId === "3") {
        this.memberLoggedIn = true;

        // 若登入的是一般會員，去找按讚的紀錄
        this.fetchUserLikedStatus();
      } else {
        this.memberLoggedIn = false;
      }
      return membersId;
    },

    fetchUserLikedStatus: function () {
      const urlParams = new URLSearchParams(window.location.search);
      productsId = urlParams.get("productsId");
      membersId = localStorage.getItem("MembersId");
      console.log("Test membersId:" + membersId);
      console.log("Test productsId:" + productsId);

      let request = {
        productsId: productsId,
        membersId: membersId,
      };

      axios
        .get(contextPath + "/liked/status", {
          params: request, // 将请求参数作为 params 对象
        })
        .then(
          function (response) {
            this.userLikedStatus = response.data; // 假设返回的数据格式为 { reviewId1: true, reviewId2: false, ... }
            this.applyLikedStatusToComments(); // 将点赞状态应用到评论上
          }.bind(this)
        )
        .catch(function (error) {
          console.error("Error fetching liked status", error);
        });
    },

    findByReviewId: function (reviewId) {
      let vm = this;
      // 在一般會員登入狀態下才能點擊按讚/收回按鈕
      if (vm.memberLoggedIn) {
        if (!vm.liked) {
          // findById
          // 一般會員已點讚，執行收回(delete data)
          axios
            .get(contextPath + "/review/findByReviewId/" + reviewId)
            .then(function (response) {
              vm.reviewId = response.data.review.reviewId;
              vm.membersId = response.data.review.membersId;
              vm.orderDetailId = response.data.review.orderDetailId;
              vm.productsId = response.data.review.productsId;
              vm.rating = response.data.review.rating;
              vm.comment = response.data.review.comment;
              // like 數量-1
              vm.likesCount = response.data.review.likesCount - 1;
              vm.createdDate = response.data.review.createdDate;
              // console.log(response.data.review.reviewId)
              // console.log(response.data.review.membersId)
              // console.log(vm.likesCount)

              // 將找到的data加入新增的like數後，執行update
              let request = {
                reviewId: vm.reviewId,
                membersId: vm.membersId,
                orderDetailId: vm.orderDetailId,
                productsId: vm.productsId,
                rating: vm.rating,
                comment: vm.comment,
                likesCount: vm.likesCount,
                createdDate: vm.createdDate,
              };

              // let vm = this;
              axios
                .put(contextPath + "/review/update/" + reviewId, request)
                .then(function (response) {
                  if (response.data.success) {
                    vm.likeCounts = response.data.findByReviewId.likesCount;
                    console.log(response.data.message);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                })
                .finally(function () {});
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(function () {});
        } else {
          // findById
          axios
            .get(contextPath + "/review/findByReviewId/" + reviewId)
            .then(function (response) {
              vm.reviewId = response.data.review.reviewId;
              vm.membersId = response.data.review.membersId;
              vm.orderDetailId = response.data.review.orderDetailId;
              vm.productsId = response.data.review.productsId;
              vm.rating = response.data.review.rating;
              vm.comment = response.data.review.comment;
              // like 數量+1
              vm.likesCount = response.data.review.likesCount + 1;
              vm.createdDate = response.data.review.createdDate;
              // console.log(response.data.review.reviewId)
              // console.log(response.data.review.membersId)
              // console.log(vm.likesCount)

              // 將找到的data加入新增的like數後，執行update
              let request = {
                reviewId: vm.reviewId,
                membersId: vm.membersId,
                orderDetailId: vm.orderDetailId,
                productsId: vm.productsId,
                rating: vm.rating,
                comment: vm.comment,
                likesCount: vm.likesCount,
                createdDate: vm.createdDate,
              };

              // let vm = this;
              axios
                .put(contextPath + "/review/update/" + reviewId, request)
                .then(function (response) {
                  if (response.data.success) {
                    vm.likeCounts = response.data.findByReviewId.likesCount;

                    console.log(response.data.message);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                })
                .finally(function () {});
            })
            .catch(function (error) {
              console.log(error);
            })
            .finally(function () {});
        }
      }
    },
    toggleLike: function (reviewId) {
      let vm = this;
      // console.log("reviewId:"+reviewId)
      // console.log("membersId:"+this.getUserID())
      // 在一般會員登入狀態下才能點擊按讚/收回按鈕
      if (vm.memberLoggedIn) {
        let request = {
          reviewId: reviewId,
          membersId: vm.getUserID(),
        };

        if (vm.liked) {
          // 一般會員已點讚，執行收回(delete data)
          axios
            .delete(contextPath + "/liked/delete", {
              params: request, // 将请求参数作为 params 对象
            })
            .then(function (response) {
              vm.liked = false;
              // console.log(response.data.message)
              // console.log(response.data.count)

              // 找到相對應的評價
              vm.findByReviewId(reviewId);
            })
            .catch(function (error) {
              console.error("Error unliking", error);
            });
        } else {
          // 一般會員未點讚，執行點讚(insert data)
          axios
            .post(contextPath + "/liked/insert", request)
            .then(function (response) {
              vm.liked = true;
              // console.log(response.data.message)
              // console.log(response.data.count)

              // 找到相對應的評價
              vm.findByReviewId(reviewId);
            })
            .catch(function (error) {
              console.error("Error liking", error);
            });
        }
      }
    },
    addFavorites: function (productsId) {
      let request = {
        productsId: productsId,
        membersId: this.getUserID(),
      };
      let vm = this;
      axios
        .post(contextPath + "/api/page/favorites/checkin", request)
        .then(function (response) {
          if (response.data.success) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert("請先登入");
          console.error("資料請求失敗：", error);
        });
    },
    addShoppingcarts: function (productsId) {
      let quantity = this.quantity;
      membersId = this.getUserID();
      if (membersId == null) {
        alert("請先登入");
        return;
      }
      if (quantity === undefined || quantity <= 0) {
        alert("請選擇有效的商品數量!");
        return;
      }
      let request = {
        productsId: productsId,
        membersId: this.getUserID(),
        quantity: this.quantity,
      };
      let vm = this;
      axios
        .post(contextPath + "/api/page/shoppingcarts/checkin", request)
        .then(function (response) {
          if (response.data.success) {
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    // 沒有分頁功能
    selectAllcategories: function () {
      let vm = this;
      // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
      axios
        .get(contextPath + "/categories/fullData")
        .then(function (response) {
          vm.categories = response.data.list;
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },

    selectCategoryIdByCategoryName: function (name) {
      window.location.href = contextPath + "/?categoriesName=" + name;
    },
    findById: function (productsId) {
      this.selectReviewByProductsId(productsId);
      let vm = this;
      axios
        .get(contextPath + "/product/" + productsId)
        .then(function (response) {
          vm.productsOneData = response.data;
          vm.productsId = response.data.productsId;
          vm.categoriesId = response.data.categoriesId;
          vm.contractsId = response.data.contractsId;
          vm.name = response.data.name;
          vm.productsSpecification = response.data.productsSpecification;
          vm.productsDescription = response.data.productsDescription;
          vm.imagePath = response.data.imagePath;
          vm.sellingPrice = response.data.sellingPrice;
          vm.cost = response.data.cost;
          vm.lowestPrice = response.data.lowestPrice;
          vm.total = response.data.total;
          vm.orderQuantity = response.data.orderQuantity;
          vm.soldQuantity = response.data.soldQuantity;
          vm.suppliersId = response.data.suppliersId;
          vm.expiryDate = response.data.expiryDate;
          vm.sellingStartDate = response.data.sellingStartDate;
          vm.sellingStopDate = response.data.sellingStopDate;
          vm.discountStartDate = response.data.discountStartDate;
          vm.discountEndDate = response.data.discountEndDate;
          vm.discount = response.data.discount;
          vm.staffId = response.data.staffId;
          vm.createdDate = response.data.createdDate;

          vm.updateCountdown(vm.discountEndDate);
          // 设置一个定时器，每秒钟更新倒计时
          setInterval(function () {
            vm.updateCountdown(vm.discountEndDate);
          }, 1000);

          // Update the discount values based on discountEndDate
          let currentDate = new Date();
          if (new Date(vm.discountEndDate) < currentDate) {
            vm.discount = 1;
            vm.isShowDiscountDate = false;
          }
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    findCategoryIdByProductsId: function (productsId) {
      let vm = this;
      axios
        .get(contextPath + "/product/" + productsId)
        .then(function (response) {
          vm.productsId = response.data.productsId;
          vm.categoriesId = response.data.categoriesId;
          vm.findCategoryNameByCategoryId(vm.categoriesId);
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    findCategoryNameByCategoryId: function (categoriesId) {
      let vm = this;
      let request = {
        categoriesId: categoriesId,
      };
      axios
        .post(contextPath + "/categories/findById", request)
        .then(function (response) {
          vm.categoriesId = response.data.categories.categoriesId;
          vm.categoriesName = response.data.categories.name;
          vm.categoriesLink =
            contextPath + "/?categoriesName=" + vm.categoriesName;
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    goBack() {
      window.history.back(); // 使用浏览器的 history.back() 方法来回到上一页
    },
    updateCountdown(discountEndDate) {
      let targetDate = discountEndDate;
      const now = new Date().getTime();
      const targetTime = new Date(targetDate).getTime();
      const timeDifference = targetTime - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) - 8
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");
        countdownElement.innerHTML = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
      }
    },
    // 顯示所有評價
    selectReviewByProductsId: function (productsId, page) {
      // 在點選分頁(page from 1)時，呼叫出顯示的資料
      if (page) {
        // 當點選指定分頁時的動作
        this.start = (page - 1) * this.rows;
        this.current = page;
      } else {
        // 未點選指定分頁時的動作(預設為第一頁)
        this.start = 0;
        this.current = 1;
      }

      // 要使用spring boot 的pagable API，所需參數有current(目前頁面)，以及rows(每頁顯示資料數量)
      // 但是current在pagable API預設起始值為0!! 因此傳入後端controller後要再-1，需特別注意
      let request = {
        productsId: this.productsId,
        current: this.current,
        rows: this.rows,
      };

      let vm = this;
      // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
      axios
        .get(contextPath + "/review/findAllByProductsId/" + productsId, {
          params: request, // 将请求参数作为 params 对象
        })
        .then(function (response) {
          vm.products = response.data.list;
          // console.log(vm.products);
          let count = response.data.count;
          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;

          // 計算平均rating
          vm.calculateRating = response.data.calculateRating;
          // console.log("calculateRating: "+vm.calculateRating);

          // console.log(vm.products[0].membersId)
          for (var i = 0; i < vm.products.length; i++) {
            vm.findMemberNameById(vm.products[i].membersId, i);
          }
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },

    // 這段方法可以確保點擊分頁按鈕時，傳遞的參數是page而不是productsId!!!!!!!!!!
    handlePaginationClick(page) {
      this.selectReviewByProductsId(this.productsId, page);
    },
    findMemberNameById: function (membersId, index) {
      if (this.memberNames[membersId]) {
        // 如果已經獲取過該會員代號，直接使用緩存的值
        this.memberName = this.memberNames[membersId];
        this.memberPhotoPath =
          contextPath + "/pic/members/" + this.memberPhotoPath[membersId];
      } else {
        // 否則發起請求獲取會員代號
        let request = {
          membersId: membersId,
        };
        let vm = this;
        axios
          .post(contextPath + "/members/findByMembersId", request)
          .then(function (response) {
            // console.log("photoPath= " + response.data.list.photoPath);
            vm.products[index].memberName = response.data.list.userName; // 存入對應的 product 中
            vm.products[index].memberPhotoPath =
              contextPath + "/pic/members/" + response.data.list.photoPath; // 存入對應的 product 中
          })
          .catch(function (error) {
            console.error("資料請求失敗：", error);
          });
      }
    },
  },
  mounted: function () {
    this.selectAllcategories();
    // Get the productsId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productsId = urlParams.get("productsId");
    this.findById(productsId);
    this.findCategoryIdByProductsId(productsId);
    this.getUserID();
  },
});
app.mount("#app");
