const searchPro = Vue.createApp({
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

      membersId: "",
      productQuantities: {}, // 以商品ID为键，数量为值的对象
      quantity: "",

      count:0,
       //找不當商品時顯示noImage.jpg
       previewUrl: contextPath + "/pic/product/noProduct.jpg",
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

    // 查看個別商品的按鈕，丟productsId
    showDetails: function (productsId) {
      // 帶著選定的productsId跳轉至個別商品頁面
      window.location.href =
        contextPath + "/product-singlePage?productsId=" + productsId;
    },

    findProductsByName: function (name) {
      let vm = this;
      axios
        .get(contextPath + "/product/findByVaildProductName/" + name)
        .then(function (response) {
          vm.products = response.data.list;
          vm.count=response.data.count;
          console.log("count= "+response.data.count)
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
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    this.findProductsByName(name);
    this.getUserID();
  },
});
searchPro.mount("#searchPro");
