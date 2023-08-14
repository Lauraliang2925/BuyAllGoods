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

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 9, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量
    };
  },
  computed: {},
  methods: {
    selectAllcategories: function () {
      let request = {
        categoriesId: this.categoriesId,
        name: this.name,
        current: this.current,
        rows: this.rows,
      };

      let vm = this;
      // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
      axios
        .get(contextPath + "/categories/findAll", {
          params: request, // 将请求参数作为 params 对象
        })
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
  },
  mounted: function () {
    this.selectAllcategories();
    // Get the productsId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productsId = urlParams.get("productsId");
    this.findById(productsId);    
  },
});
app.mount("#app");
