const app = Vue.createApp({
  components: {
    "file-upload": VueUploadComponent,
  },
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

      isProductExist: "",
      pleaseInputProductName: "請先輸入商品名稱",

      files: [],
      desc: null,

      //圖片預覽
      selectedFile: null,
      //未上傳圖片時顯示noImage.jpg
      previewUrl: contextPath + "/pic/product/noImage.jpg",
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
    create: function () {
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
        this.imagePath = "null";
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
      if (this.soldQuantity === "") {
        this.soldQuantity = 0;
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
        this.staffId = 1;
      }
      // 收集資料 end

      let request = {
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
      };
      let vm = this;
      axios
        .post(contextPath + "/product/insert", request)
        .then(function (response) {
          if (response.data.success) {
            bootbox.alert({
              message: "新增成功",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-success",
                },
              },
              callback: function () {
                vm.categoriesId = "";
                vm.contractsId = "";
                vm.name = "";
                vm.productsSpecification = "";
                vm.productsDescription = "";
                vm.imagePath = "";
                vm.sellingPrice = "";
                vm.cost = "";
                vm.lowestPrice = "";
                vm.total = "";
                vm.orderQuantity = "";
                vm.soldQuantity = "";
                vm.suppliersId = "";
                vm.expiryDate = "";
                vm.sellingStartDate = "";
                vm.sellingStopDate = "";
                vm.discountStartDate = "";
                vm.discountEndDate = "";
                vm.discount = "";
                vm.staffId = "";
                vm.createdDate = "";
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
              },
            });
          } else {
            bootbox.alert({
              message: "新增失敗",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-danger",
                },
              },
              callback: function () {
                vm.categoriesId = "";
                vm.contractsId = "";
                vm.name = "";
                vm.productsSpecification = "";
                vm.productsDescription = "";
                vm.imagePath = "";
                vm.sellingPrice = "";
                vm.cost = "";
                vm.lowestPrice = "";
                vm.total = "";
                vm.orderQuantity = "";
                vm.soldQuantity = "";
                vm.suppliersId = "";
                vm.expiryDate = "";
                vm.sellingStartDate = "";
                vm.sellingStopDate = "";
                vm.discountStartDate = "";
                vm.discountEndDate = "";
                vm.discount = "";
                vm.staffId = "";
                vm.createdDate = "";
                setTimeout(function () {
                  bootbox.hideAll();
                }, 500);
              },
            });
          }
        })
        .catch(function (error) {
          bootbox.alert({
            message: "新增失敗(請重新輸入資料)",
            buttons: {
              ok: {
                label: "關閉",
                className: "btn btn-danger",
              },
            },
            callback: function () {
              vm.categoriesId = "";
              vm.contractsId = "";
              vm.name = "";
              vm.productsSpecification = "";
              vm.productsDescription = "";
              vm.imagePath = "";
              vm.sellingPrice = "";
              vm.cost = "";
              vm.lowestPrice = "";
              vm.total = "";
              vm.orderQuantity = "";
              vm.soldQuantity = "";
              vm.suppliersId = "";
              vm.expiryDate = "";
              vm.sellingStartDate = "";
              vm.sellingStopDate = "";
              vm.discountStartDate = "";
              vm.discountEndDate = "";
              vm.discount = "";
              vm.staffId = "";
              vm.createdDate = "";
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
      event.preventDefault();

      if (this.name.length > 0) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;

          const reader = new FileReader();
          reader.onload = function () {
            this.previewUrl = reader.result;
          }.bind(this);

          reader.readAsDataURL(file);
        }
      } else {
        alert("請輸入商品名稱");
      }
    },

    uploadImage() {
      if (this.selectedFile) {
        // 在这里处理上传图片的逻辑
        // 将 this.selectedFile 作为上传的文件
        // 发送到后端存储
        this.selectedFile = null;
        this.previewUrl = contextPath + "/pic/product/noImage.jpg";
      } else {
        alert("請選擇圖片");
      }
    },
    checkFile: function (uploadFiles) {
      if (uploadFiles.length == 0) {
        alert("請選擇檔案");
        return false;
      }
      if (this.name.length === 0) {
        alert("請輸入商品名稱");
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
        .post(contextPath + "/product/single-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          // alert(response.data.success + ":" + response.data.message);

          if (response.data.success) {
            vm.imagePath = response.data.imagePath;
            vm.showImagePath = contextPath + vm.imagePath;
            console.log("vm.imagePath=" + vm.imagePath);
            // console.log("contextPath="+contextPath)
            vm.files = [];
            vm.desc = null;
            alert("上傳成功");
          } else {
            alert("商品名稱不能重複");
          }
        })
        .catch(function (error) {
          // console.log(contextPath + "/product/single-file");
          alert(error);
        })
        .finally(function () {});
    },
    checkNamePrecise: function () {
      if (this.name !== "") {
        this.pleaseInputProductName = "";
        let request = {};
        let vm = this;
        axios
          .post(contextPath + "/product/precise/" + this.name, request)
          .then(function (response) {
            vm.isProductExist = response.data.message;
          })
          .catch(function (error) {
            vm.isProductExist = "失敗：" + error.response.status;
          })
          .finally(function () {});
      } else if (this.name.length == 0) {
        this.pleaseInputProductName = "請先輸入商品名稱";
      }
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
  },
  mounted: function () {
    this.fullData();
  },
});
app.mount("#app");
