const app = Vue.createApp({
	components: {
	},
	data: function () {
	  return {
		categoriesId: "",
		name: "",
		categories: [],
		rows: 20,  //每頁顯示資料數量
		current: 1,  //目前頁面 (from 1)

	  };
	},
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
	},
	mounted: function () {
	  this.selectAllcategories();
	},
  });
  app.mount("#leftbar");
  