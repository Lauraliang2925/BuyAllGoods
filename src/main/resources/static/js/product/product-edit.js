const app = Vue.createApp({
  components: {
    "file-upload": VueUploadComponent,},
  data: function () {
    return {
      productsOneData: [],
      productsFullData: [],

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

      files: [],
      desc: null,

      //圖片預覽
      selectedFile: null,
      //未更新圖片時顯示原始圖片
      // previewUrl: contextPath + "/pic/product/"+this.name+".jpg",
      previewUrl:''
    };
  },
  computed: {
    // 计算属性 filteredSuppliersIds 获取不重复的廠商ID列表
    filteredSuppliersIds() {
      const suppliersIdSet = new Set(); // 使用Set来存储不重复的廠商ID
      this.productsFullData.forEach((product) => {
        suppliersIdSet.add(product.suppliersId);
      });
      return Array.from(suppliersIdSet); // 将Set转换为数组，并返回数组作为计算属性的值
    },
    filteredContractsIds() {
      const contractsIdSet = new Set();
      this.productsFullData.forEach((product) => {
        contractsIdSet.add(product.contractsId);
      });
      return Array.from(contractsIdSet);
    },
    filteredCategoriesIds() {
      const categoriesIdSet = new Set();
      this.productsFullData.forEach((product) => {
        categoriesIdSet.add(product.categoriesId);
      });
      return Array.from(categoriesIdSet);
    },
  },
  methods: {
    findById: function (productsId) {
      let vm = this;
      axios
        .get(contextPath + "/product/" + productsId)
        .then(function (response) {
          vm.productsOneData = response.data;
          //   console.log(vm.productsOneData);
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
    // 不使用分頁功能查所有資料，for下拉式選單的所有選項
    fullData: function () {
      let vm = this;
      axios
        .get(contextPath + "/product/fullData")
        .then(function (response) {
          vm.productsFullData = response.data.list;
          console.log(vm.productsFullData);
        })
        .catch(function (error) {
          console.error("資料請求失敗：", error);
        });
    },
    update: function (productsId) {
      bootbox.dialog({
        message:
          '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
        closeButton: false,
      });

      // 收集資料 start
      if (this.categoriesId === "") {
        this.categoriesId = null;
      }
      if (this.contractsId === "") {
        this.contractsId = null;
      }
      if (this.name === "") {
        this.name = null;
      }
      if (this.productsSpecification === "") {
        this.productsSpecification = null;
      }
      if (this.productsDescription === "") {
        this.productsDescription = null;
      }
      if (this.imagePath === "") {
        this.imagePath = null;
      }
      if (this.sellingPrice === "") {
        this.sellingPrice = 0;
      }
      if (this.cost === "") {
        this.cost = 0;
      }
      if (this.lowestPrice === "") {
        this.lowestPrice = 0;
      }
      if (this.total === "") {
        this.total = 0;
      }
      if (this.orderQuantity === "") {
        this.orderQuantity = 0;
      }
      if (this.suppliersId === "") {
        this.suppliersId = null;
      }
      if (this.expiryDate === "") {
        this.expiryDate = null;
      }
      if (this.sellingStartDate === "") {
        this.sellingStartDate = null;
      }
      if (this.sellingStopDate === "") {
        this.sellingStopDate = null;
      }
      if (this.discountStartDate === "") {
        this.discountStartDate = null;
      }
      if (this.discountEndDate === "") {
        this.discountEndDate = null;
      }
      if (this.discount === "") {
        this.discount = 0;
      }
      if (this.staffId === "") {
        this.staffId = null;
      }

      let request = {
        productsId: this.productsId,
        categoriesId: this.categoriesId,
        contractsId: this.contractsId,
        name: this.name,
        productsSpecification: this.productsSpecification,
        productsDescription: this.productsDescription,
        imagePath: this.imagePath,
        sellingPrice: this.sellingPrice,
        cost: this.cost,
        lowestPrice: this.lowestPrice,
        total: this.total,
        orderQuantity: this.orderQuantity,
        soldQuantity: this.soldQuantity,
        suppliersId: this.suppliersId,
        expiryDate: this.expiryDate,
        sellingStartDate: this.sellingStartDate,
        sellingStopDate: this.sellingStopDate,
        discountStartDate: this.discountStartDate,
        discountEndDate: this.discountEndDate,
        discount: this.discount,
        staffId: this.staffId,
        createdDate: this.createdDate,
      };
      // 收集資料 end
      let vm = this;
      axios
        .put(contextPath + "/product/update/" + productsId, request)
        .then(function (response) {
          if (response.data.success) {
            bootbox.alert({
              message: "修改成功",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-success",
                },
              },
              callback: function () {
                // vm.selectAllcategories(vm.current);
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
              },
            });
          } else {
            bootbox.alert({
              message: "修改失敗",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-danger",
                },
              },
              callback: function () {
                // vm.selectAllcategories(vm.current);
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
              },
            });
          }
        })
        .catch(function (error) {
          bootbox.alert({
            message: "修改失敗",
            buttons: {
              ok: {
                label: "關閉",
                className: "btn btn-danger",
              },
            },
            callback: function () {
              // vm.selectAllcategories(vm.current);
              setTimeout(function () {
                bootbox.hideAll();
              }, 500);
            },
          });
        })
        .finally(function () {});
    },
    // 按下選擇檔案後預覽圖片
    previewImage: function (event) {

      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = function () {
          this.previewUrl = reader.result; // 更新 previewUrl
        }.bind(this);

        reader.readAsDataURL(file);
        }
     
    },

    checkFile: function (uploadFiles) {
      if (uploadFiles.length == 0) {
        alert("請選擇檔案");
        return false;
      }
  
      let uploadFile = uploadFiles[0];
      if (uploadFile.size > 10000000) {
        alert("檔案大小超出限制(10M)");
        return false;
      }
      return true;
    },
    doUpload: function () {
      if (!this.checkFile(this.files)) {
        this.files = [];
        return;
      }

      //利用File物件產生上傳用的HTML Form資料
      let formData = new FormData();
      formData.append("file", this.files[0].file);
      formData.append("desc", this.desc);
      formData.append("name", this.name);

      let vm = this;
      axios
        .post(contextPath + "/product/single-file-update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          
          
          alert(response.data.message);
          // console.log("vm.previewUrl="+vm.previewUrl)
          console.log(contextPath + "/pic/product/" + vm.name + ".jpg")
          // vm.previewUrl = response.data.imagePath;
          vm.files = [];
          vm.desc = null;
          //強制重新載入頁面
          vm.findById(productsId);
          vm.previewUrl = contextPath + "/pic/product/" + vm.name + ".jpg";
        })
        .catch(function (error) {
          console.log(contextPath + "/product/single-file");
          // alert(error);
        })
        .finally(function () {});
    },

  },
  mounted: function () {
    
    // Get the productsId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productsId = urlParams.get("productsId");
    this.findById(productsId);
    this.fullData();
  },
});
app.mount("#app");
