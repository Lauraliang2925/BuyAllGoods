
const index = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
    'star-rating': VueStarRating.default,
  },
  data: function () {
    return {
      contextPath: contextPath,
      categories: [],

      products: [],
      productsId: "",
      //預設為載入頁面要顯示的商品分類ID
      categoriesId: 2,
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
      createdDate: "",

      categoriesName: "3C",

      // showPaginate: true,

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 6, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量

      membersId: "",
      productQuantities: {}, // 以商品ID为键，数量为值的对象
      quantity: "",

      calculateRating:"",
      productsAvgRatings: {},
      rating:"",
    };
  },

  methods: {
    getUserID: function () {
      let membersId = localStorage.getItem("MembersId");
      return membersId;
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
      membersId = this.getUserID();
      if (membersId == null) {
        alert("請先登入");
        return;
      }
      let quantity = this.productQuantities[productsId]; // 获取该商品的数量
      if (quantity === undefined || quantity <= 0) {
        alert("請選擇有效的商品數量!");
        return;
      }

      let request = {
        productsId: productsId,
        membersId: this.getUserID(),
        quantity: quantity,
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
          alert("資料請求失敗：" + error);
          console.error("資料請求失敗：", error);
        });
    },

    // 不使用分頁功能查所有資料，for最上方搜尋BAR
    fullData: function () {
      let vm = this;
      axios
        .get(contextPath + "/product/fullData")
        .then(function (response) {
          vm.productsFullData = response.data.list;
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

    // 這段方法可以確保點擊分頁按鈕時，傳遞的參數是page而不是categoriesId!!!!!!!!!!
    handlePaginationClick(page) {
      this.findVaildByCategoriesId(this.categoriesId, page);
    },

    calculateAvgRating: function (productsId, index) {
      

      if (this.productsAvgRatings[productsId]) {
        // 如果已經獲取過該會員代號，直接使用緩存的值
        this.rating = this.productsAvgRatings[productsId];
      } else {
        // 否則發起請求獲取會員代號
        let request = {
          productsId: productsId,
        };
        let vm = this;
        axios
        .get(contextPath + "/review/findAvgRatingByProductId/" + productsId, {
          params: request,
        })
          .then(function (response) {
            console.log("productsAvgRatings= " + response.data.calculateRating);
            vm.products[index].rating = response.data.calculateRating; // 存入對應的 product 中
        
          })
          .catch(function (error) {
            console.error("資料請求失敗：", error);
          });
      }

    },
    
   
    //	使用分類ID尋找底下"販售中"商品 (還要加上分頁功能)
    findVaildByCategoriesId: function (categoriesId, page) {
      if (page) {
        // 當點選指定分頁時的動作
        this.start = (page - 1) * this.rows;
        this.current = page;
      } else {
        // 未點選指定分頁時的動作(預設為第一頁)
        this.start = 0;
        this.current = 1;
      }

      let request = {
        current: this.current,
        rows: this.rows,
      };
      let vm = this;
      axios
        .get(contextPath + "/product/findVaildByCategoriesId/" + categoriesId, {
          params: request, // 将请求参数作为 params 对象
        })
        .then(function (response) {
          vm.products = response;
          vm.products = response.data.list;

          for (var i = 0; i < vm.products.length; i++) {
            vm.calculateAvgRating(vm.products[i].productsId, i);
          }
    
          // Update the discount values based on discountEndDate
          let currentDate = new Date();
          for (let product of vm.products) {
            if (new Date(product.discountEndDate) < currentDate) {
              product.discount = 1;
            }
          }

          let count = response.data.count;
          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    selectCategoryIdByCategoryName: function (name) {
      let vm = this;
      axios
        .get(contextPath + "/categories/findCategoriesIdByName/" + name)
        .then(function (response) {
          vm.categoriesId = response.data.id;
          vm.categoriesName = name;
          vm.findVaildByCategoriesId(vm.categoriesId);
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },

    // 查看個別商品的按鈕，丟productsId
    showDetails: function (productsId) {
      // 帶著選定的productsId跳轉至個別商品頁面
      window.location.href =
        contextPath + "/product-singlePage?productsId=" + productsId;
    },
  },
  mounted: function () {
    this.selectAllcategories();
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("categoriesName");

    if (name == null || name == "") {
      this.categoriesName = "3C";
      this.findVaildByCategoriesId(2);
    } else {
      this.categoriesName = name;
      this.selectCategoryIdByCategoryName(name);
    }

    this.getUserID();
  },
});
index.mount("#index");
