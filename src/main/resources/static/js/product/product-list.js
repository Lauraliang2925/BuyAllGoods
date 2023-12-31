const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data: function () {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return {
      contextPath: contextPath,

      products: [],
      productsId: "",
      name: "",
      contractsId: "",
      suppliersId: "",
      categoriesId: "",

      productsFullData: [],
      findProductsName: "",
      findSuppliersId: "",
      findContractsId: "",

      suppliersData: [],
      suppliersAllData: [],

      showPaginate: false,

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 5, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量

      //利用販售終止日判斷商品狀態
      yesterdayDate: yesterday,
      
      categoriesNames: {},
      SuppliersNames: {},
      contractsNames: {},

      membersId:null,
      roleId:null,
      isShowSearchBar:false,
      showPaginateForS:false,

      averageRatings: {},
    };
  },

  methods: {
    getUserID: function () {
     this.membersId = localStorage.getItem("MembersId");
     this.roleId = localStorage.getItem("RoleId");
      if(this.roleId==2){
        this.findSuppliersByMembersId(this.membersId);
      }
      if(this.roleId==1){
        this.fullData(); 
        this.FindAllSuppliers();
        this.FindAllContracts();
        this.FindAllcategories();
      }
      
    },
       //查詢全部的廠商有哪些，for廠商名稱的填寫欄位
       FindAllSuppliers: function () {
        let vm = this;
        axios
          .post(contextPath + "/suppliers/findAllSuppliers")
          .then(function (response) {
            vm.suppliersFullData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {});
      },
          //查詢全部的合約有哪些，for合約名編號的填寫欄位
    FindAllContracts: function () {
      let vm = this;
      axios
        .post(contextPath + "/contracts/findAllContracts")
        .then(function (response) {
          vm.contractFullData = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {});
    },
    // 查詢全部的分類有哪些，沒有分頁功能
    FindAllcategories: function () {
      let vm = this;
      // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
      axios
        .get(contextPath + "/categories/fullData")
        .then(function (response) {
          vm.categoriesFullData = response.data.list;
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },


    //使用categoriesId 尋找一筆分類名稱
    findCategoriesNameById: function (categoriesId) {          
     
      if (this.categoriesNames[categoriesId]) {
        // 如果已经获取过该分类名称，直接使用缓存的值
        return this.categoriesNames[categoriesId];
      } else {
        // 否则发起请求获取分类名称
        let request = {
          categoriesId: categoriesId,
        };
        let vm = this;
        axios
          .post(contextPath + "/categories/findById", request)
          .then(function (response) {
            // console.log(response.data);
            // console.log(response.data.categories.name);
            vm.categoriesNames[categoriesId] = response.data.categories.name; // 缓存分类名称
            // 如果这个请求的结果在一次 Vue.js 的循环渲染中会多次调用，
            // 你可以使用 $forceUpdate() 来强制更新视图
            vm.$forceUpdate();


          })
          .catch(function (error) {
            console.error("資料請求失敗：", error);
          });
      }
    },

      //使用categoriesId 尋找一筆分類名稱
      findSuppliersNameById: function (suppliersId) {          
     
        if (this.SuppliersNames[suppliersId]) {
          // 如果已经获取过该分类名称，直接使用缓存的值
          return this.SuppliersNames[suppliersId];
        } else {
          // 否则发起请求获取分类名称
          let request = {
            suppliersId: suppliersId,
          };
          let vm = this;
          axios
            .post(contextPath + "/suppliers/findById", request)
            .then(function (response) {
              // console.log(response.data);
              vm.SuppliersNames[suppliersId] = response.data.suppliers.suppliersName; // 缓存分类名称
              // 如果这个请求的结果在一次 Vue.js 的循环渲染中会多次调用，
              // 你可以使用 $forceUpdate() 来强制更新视图
              vm.$forceUpdate();
            })
            .catch(function (error) {
              console.error("資料請求失敗：", error);
            });
        }
      },

        //使用categoriesId 尋找一筆分類名稱
        findContractsNameById: function (contractsId) {          
     
      if (this.contractsNames[contractsId]) {
        // 如果已经获取过该分类名称，直接使用缓存的值
        return this.contractsNames[contractsId];
      } else {
        // 否则发起请求获取分类名称
        let request = {
          contractsId: contractsId,
        };
        let vm = this;
        axios
          .post(contextPath + "/contracts/findById", request)
          .then(function (response) {
          //   console.log(response.data);
            // console.log(response.data.categories.name);
            vm.contractsNames[contractsId] = response.data.contracts.contractNumber; // 缓存分类名称
            // 如果这个请求的结果在一次 Vue.js 的循环渲染中会多次调用，
            // 你可以使用 $forceUpdate() 来强制更新视图
            vm.$forceUpdate();
          })
          .catch(function (error) {
            console.error("資料請求失敗：", error);
          });
      }
    },

    // 顯示表單內容(給管理員)
    selectAllproduct: function (page) {
      this.isShowSearchBar= true;
      this.showPaginate = true;
      this.showPaginateForS = false;
      this.findProductsName = "";
      this.findSuppliersId = "";
      this.findContractsId = "";

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
        name: "",
        contractsId: "",
        suppliersId: "",
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

    findSuppliersByMembersId:function(membersId){
      let request = {
        membersId: membersId,
      };
      let vm = this;
      axios
        .post(contextPath + "/suppliers/findSupplier", request)
        .then(function (response) {
          console.log(response);
          vm.suppliersId = response.data.suppliersId; 
          vm.selectProductForSuppliers(vm.suppliersId,1);
        })
        .catch(function () {})
        .finally(function () {});
    },

    handlePaginationClick(page) {
      this.selectProductForSuppliers(this.suppliersId, page);
    },

      // 顯示表單內容(給個別廠商)
      selectProductForSuppliers: function (suppliersId, page) {
        this.isShowSearchBar= false;
        this.showPaginate = false;
        this.showPaginateForS = true;
        this.findProductsName = "";
        this.findSuppliersId = "";
        this.findContractsId = "";
  
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
          name: "",
          contractsId: "",
          suppliersId:this.suppliersId,
          current: this.current,
          rows: this.rows,
        };
  
        let vm = this;
        // 使用 Axios 進行 API 請求，獲取資料庫中的分類資料
        axios
          .get(contextPath + "/product/findBySuppliersId/"+suppliersId, {
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
      //一載入頁面就先找出所有下拉式選單的資料
      if(this.roleId==1){
        this.selectAllproduct()
      }
      if(this.roleId==2){
        this.selectProductForSuppliers()
      }
    
     
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
   
    // 查看廠商明細的按鈕，丟productsId
    showDetails: function (productsId) {
  
      // 帶著選定的productsId跳轉至編輯頁面
      window.location.href =
        contextPath + "/product-edit?productsId=" + productsId;
    },
    findByCustomQuery: function () {
      this.showPaginate = false;        

      if (this.findProductsName === "") {
        this.findProductsName = null;
      }
      if (this.findSuppliersId === "") {
        this.findSuppliersId = null;
      }
      if (this.findContractsId === "") {
        this.findContractsId = null;
      }
      let request = {
        name: this.findProductsName,
        contractsId: this.findContractsId,
        suppliersId: this.findSuppliersId,
      };
      let vm = this;
      axios
        .post(contextPath + "/product/findByCustomQuery", request)
        .then(function (response) {
          vm.products = response.data.list;
          console.log("findByCustomQuery")
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    
   
  },
  mounted: function () {     
    
  
    this.getUserID();

  

  },
});
app.mount("#app");
