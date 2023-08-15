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

      categoriesLink:"",
    };
  },
  computed: {},
  methods: {
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

      window.location.href =
      contextPath + "/?categoriesName=" + name;
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
      axios
        .get(contextPath + "/categories/" + categoriesId)
        .then(function (response) {
          vm.categoriesId = response.data.categoriesId;
          vm.categoriesName = response.data.name;
          vm.categoriesLink=contextPath+"/?categoriesName="+vm.categoriesName     
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
  },
  mounted: function () {
    this.selectAllcategories();
    // Get the productsId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productsId = urlParams.get("productsId");
    this.findById(productsId);   
    this.findCategoryIdByProductsId(productsId)    
  },
});
app.mount("#app");
