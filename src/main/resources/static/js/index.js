const index = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data: function () {
    return {
      contextPath: contextPath,
      categories:[],

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
      rows: 9, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量
    };
  },

   methods: {
    selectAllproduct: function (page) {
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
        current: this.current,
        rows: this.rows,
      };

      let vm = this;
      // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
      axios
        .get(contextPath + "/product/findAll", {
          params: request, // 将请求参数作为 params 对象
        })
        .then(function (response) {
          vm.products = response.data.list;
          console.log("selectAllproduct")

          let count = response.data.count;
          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;
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
    selectProductByCategoryId: function (categoriesId) {
      
      let vm = this;
      axios
        .post(contextPath + "/product/findByCategoriesId/" + categoriesId)
        .then(function (response) {
          vm.products = response;
          vm.products = response.data.list;
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
          vm.selectProductByCategoryId(vm.categoriesId);

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
    //   this.fullData();
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("categoriesName");
    
    if(name==null || name==''){
      this.selectProductByCategoryId(1)
    } else{
      this.selectCategoryIdByCategoryName(name)
    }
    
  },
});
index.mount("#index");
