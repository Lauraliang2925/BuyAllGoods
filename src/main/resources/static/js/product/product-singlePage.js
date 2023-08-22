const app = Vue.createApp({
  components: {},
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
      createdDate: "",

      categoriesName: "",

      categoriesLink: "",

      membersId: "",
      quantity: "",

      isShowDiscountDate:true
    };
  },
  computed: {},
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
      let quantity = this.quantity;
      membersId = this.getUserID();
      if (membersId == null) {
        alert("請先登入");
        return
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

             
          // Update the discount values based on discountEndDate
          let currentDate = new Date();         
            if (new Date(vm.discountEndDate) < currentDate) {
              vm.discount = 1;
              vm.isShowDiscountDate=false
            }
         

          // 當畫面一載入時，自動顯示當前圖片
          vm.previewUrl = contextPath + "/pic/product/" + vm.name + ".jpg"; // 設定 this.previewUrl
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
