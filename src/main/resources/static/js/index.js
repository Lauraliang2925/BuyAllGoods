const index = Vue.createApp({
  components: {
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
      createdDate: "",

      categoriesName: "特價商品",

      // showPaginate: true,

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 6, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量


// 目前先把會員寫死~~~~~~~~~~~~~~~~~~~~~
      membersId: 1,
      quantity:"",

    };
  },

  methods: {
    addFavorites: function (productsId) {
      let request = {
        productsId: productsId,
        membersId: this.membersId,
      };
      let vm = this;
      axios
        .post(contextPath + "/api/page/favorites/checkin", request)
        .then(function (response) {
          console.log("productsId: " + productsId);
          vm.favoritesFullData = response.data.list;
          console.log("vm.productsId: " + vm.productsId);
          console.log("vm.membersId: " + vm.membersId);
          console.log("vm.favoriteListId: " + vm.favoriteListId);
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
      addShoppingcarts: function (productsId) {
      let request = {
        productsId: productsId,
        membersId: this.membersId,
        quantity:this.quantity
      };
      let vm = this;
      axios
        .post(contextPath + "/api/page/shoppingcarts/checkin", request)
        .then(function (response) {
          console.log("productsId: " + productsId);
          vm.favoritesFullData = response.data.list;
          console.log("vm.productsId: " + vm.productsId);
          console.log("vm.membersId: " + vm.membersId);
          console.log("vm.quantity: " + vm.quantity);
        })
        .catch(function (error) {
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
      console.log("current t1 = " + this.current);
    },

    //	使用分類ID尋找底下"販售中"商品 (還要加上分頁功能)
    findVaildByCategoriesId: function (categoriesId, page) {
      if (page) {
        // 當點選指定分頁時的動作
        this.start = (page - 1) * this.rows;
        this.current = page;
        console.log("if page=" + this.page);
      } else {
        // 未點選指定分頁時的動作(預設為第一頁)
        this.start = 0;
        this.current = 1;
        console.log("else page=" + this.page);
      }

      let request = {
        current: this.current,
        rows: this.rows,
      };
      console.log("current t2 = " + this.current);
      let vm = this;
      axios
        .get(contextPath + "/product/findVaildByCategoriesId/" + categoriesId, {
          params: request, // 将请求参数作为 params 对象
        })
        .then(function (response) {
          vm.products = response;
          vm.products = response.data.list;
          let count = response.data.count;
          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;
          console.log("current t3 = " + vm.current);
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
          console.log("current t4 = " + vm.current);
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
      this.categoriesName = "特價商品";
      this.findVaildByCategoriesId(1);
    } else {
      this.categoriesName = name;
      this.selectCategoryIdByCategoryName(name);
    }
  },
});
index.mount("#index");
