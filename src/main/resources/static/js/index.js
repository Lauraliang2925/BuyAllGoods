const index = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data: function () {
    return {
      contextPath: contextPath,
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

      // productsFullData: [],
      // findProductsName: "",
      // findSuppliersId: "",
      // findContractsId: "",

      // suppliersData: [],
      // suppliersAllData: [],

      // showPaginate: true,

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 9, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量
    };
  },
  // computed: {
  //   // 计算属性 filteredSuppliersIds 获取不重复的廠商ID列表
  //   filteredSuppliersIds() {
  //     const suppliersIdSet = new Set(); // 使用Set来存储不重复的廠商ID
  //     this.productsFullData.forEach((product) => {
  //       suppliersIdSet.add(product.suppliersId);
  //     });
  //     return Array.from(suppliersIdSet); // 将Set转换为数组，并返回数组作为计算属性的值
  //   },
  //   filteredContractsIds() {
  //     const contractsIdSet = new Set();
  //     this.productsFullData.forEach((product) => {
  //       contractsIdSet.add(product.contractsId);
  //     });
  //     return Array.from(contractsIdSet);
  //   },
  //   findInputsNotEmpty() {
  //     return (
  //       this.findProductsName !== "" ||
  //       this.findSuppliersId !== "" ||
  //       this.findContractsId !== ""
  //     );
  //   },
  // },
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

    // 查看廠商明細的按鈕，丟productsId
    //   showDetails: function (productsId) {
    //     // console.log("productsId:"+productsId)
    //     // const url = contextPath + "/product/" + productsId;
    //     // window.location.href = url;
    //     // 帶著選定的productsId跳轉至編輯頁面
    //     window.location.href =
    //       contextPath + "/product-edit?productsId=" + productsId;
    //   },
    //   findByCustomQuery: function () {
    //     this.showPaginate = false;

    //     if (this.findProductsName === "") {
    //       this.findProductsName = null;
    //     }
    //     if (this.findSuppliersId === "") {
    //       this.findSuppliersId = null;
    //     }
    //     if (this.findContractsId === "") {
    //       this.findContractsId = null;
    //     }
    //     let request = {
    //       name: this.findProductsName,
    //       contractsId: this.findContractsId,
    //       suppliersId: this.findSuppliersId,
    //     };
    //     let vm = this;
    //     axios
    //       .post(contextPath + "/product/findByCustomQuery", request)
    //       .then(function (response) {
    //         vm.products = response.data.list;
    //       })
    //       .catch(function (error) {
    //         console.error("資料請求失敗：", error);
    //       });
    //   },
  },
  mounted: function () {
    //   this.fullData();
    this.selectAllproduct();
    this.selectAllcategories();
  },
});
index.mount("#index");
