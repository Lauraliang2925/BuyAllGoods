const app = Vue.createApp({
	components: {
	  "paginate": VuejsPaginateNext
	},
	data: function () {
	  return {
		isShowSelect: true,
		isShowModify: false,
  
		categoriesId: "",
		name: "",
		categories: [],
		nameExistsMsg: "",
		nameById: "",
  
		// 分頁功能所需參數
		start: 0,  //起始資料index (from 0)
		rows: 3,  //每頁顯示資料數量
		pages: 0,  //總分頁數量
		current: 1,  //目前頁面 (from 1)
		lastPageRows: 0,  //最後一頁資料數量
	  };
	},
	methods: {
	  selectAllcategories: function (page) {     
		this.isShowSelect = true;
		this.isShowModify = false; 
		this.nameById = "";     
		this.nameExistsMsg = "";

		// 在點選分頁(page from 1)時，呼叫出顯示的資料
		if (page) {
		// 當點選指定分頁時的動作
		  this.start = (page-1)*this.rows ;
		  this.current = page;
		} else {
			
		// 未點選指定分頁時的動作(預設為第一頁)
		  this.start = 0;
		  this.current = 1;
		}
	
		// 要使用spring boot 的pagable API，所需參數有current(目前頁面)，以及rows(每頁顯示資料數量)
		// 但是current在pagable API預設起始值為0!! 因此傳入後端controller後要再-1，需特別注意
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
  
			let count = response.data.count;
			vm.pages = Math.ceil(count / vm.rows);
			vm.lastPageRows = count % vm.rows;
		  })
		  .catch(function (error) {
			console.error("資料請求失敗：", error);
		  });
	  },
	  create: function () {
		bootbox.dialog({
		  message:
		  '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
		  closeButton: false,
		});
  
		// 收集資料 start
		if (this.name === "") {
		  this.name = null; // 或者直接給一個預設值
		}
		let request = {
		  name: this.name,
		};
		// 收集資料 end
		let vm = this;
		axios
		  .post(contextPath + "/categories/insert", request)
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
				  vm.selectAllcategories(vm.current);
				  vm.name = "";
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
				  vm.name = "";
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
				vm.name = "";
				setTimeout(function () {
				  bootbox.hideAll();
				}, 500);
			  },
			});
		  })
		  .finally(function () {});
	  },
  
	  findById: function (categoriesId) {
		this.isShowSelect = false;
		this.isShowModify = true;  
		this.nameExistsMsg = "資料已存在";
		bootbox.dialog({
		  message:
		  '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
		  closeButton: false,
		});
  
		let vm = this;
		axios
		  .get(contextPath + "/categories/" + categoriesId)
		  .then(function (response) {
  
			this.isShowSelect = true;
			this.isShowModify = false; 
			
			vm.categoriesId = response.data.categoriesId;
			vm.nameById = response.data.name;
  
			setTimeout(function () {
			  bootbox.hideAll();
			}, 500);
		  })
		  .catch(function (error) {
			this.isShowSelect = true;
			this.isShowModify = false; 
			this.selectAllcategories(vm.current);
			bootbox.alert({
			  message:
				'<div class="text-center">查詢失敗：代碼=' + error + "</div>",
			  buttons: {
				ok: {
				  label: "關閉",
				  className: "btn btn-danger",
				},
			  },
			  callback: function () {
				setTimeout(function () {
				  bootbox.hideAll();
				}, 500);
			  },
			});
		  })
		  .finally(function () {});
	  },
	  update: function (categoriesId) {
		bootbox.dialog({
		  message:
		  '<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
		  closeButton: false,
		});
  
		// 收集資料 start
		if (this.categoriesId === "") {
		  this.categoriesId = null; 
		}
		if (this.nameById === "") {
		  this.nameById = null; 
		}
		let request = {
		  categoriesId: this.categoriesId,
		  name: this.nameById,
		};
		// 收集資料 end
		let vm = this;
		axios
		  .put(contextPath + "/categories/update/" + categoriesId, request)
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
				  vm.selectAllcategories(vm.current);
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
				  vm.selectAllcategories(vm.current);
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
				vm.selectAllcategories(vm.current);
				setTimeout(function () {
				  bootbox.hideAll();
				}, 500);
			  },
			});
		  })
		  .finally(function () {});
	  },
	  deleted: function (categoryId) {
		let vm = this;
		bootbox.confirm({
		  message: "確定刪除資料?",
		  buttons: {
			confirm: {
			  label: "確定",
			  className: "btn-success",
			},
			cancel: {
			  label: "取消",
			  className: "btn-danger",
			},
		  },
		  callback: function (result) {
			if (result) {
			  //loadind圖示
			  bootbox.dialog({
				message:
				'<div class="text-center"><i class="fa-solid fa-spinner fa-spin-pulse"></i> loading...</div>',
				closeButton: false,
			  });
  
			  //delete 不用加request
			  //不能用this.id，只能用id!!!
			  axios
				.delete(contextPath + "/categories/delete/" + categoryId)
				.then(function (response) {
				  if (response.data.success) {
					bootbox.alert({
					  message: "刪除成功",
  
					  buttons: {
						ok: {
						  label: "關閉",
						  className: "btn btn-success",
						},
					  },
					  callback: function () {
						if(vm.lastPageRows===1 && vm.current>1) {
							vm.current = vm.current - 1;
						}
						vm.selectAllcategories(vm.current);
						setTimeout(function () {
						  bootbox.hideAll();
						}, 500);
					  },
					});
				  } else {
					bootbox.alert({
					  message: "刪除失敗",
  
					  buttons: {
						ok: {
						  label: "關閉",
						  className: "btn btn-danger",
						},
					  },
					  callback: function () {
						vm.selectAllcategories(vm.current);
						setTimeout(function () {
						  bootbox.hideAll();
						}, 500);
					  },
					});
				  }
				})
				.catch(function (error) {
				  console.log(error);
				  bootbox.alert({
					message: "此分類底下還有商品，無法刪除",
  
					buttons: {
					  ok: {
						label: "關閉",
						className: "btn btn-danger",
					  },
					},
					callback: function () {
					  vm.selectAllcategories(vm.current);
					  setTimeout(function () {
						bootbox.hideAll();
					  }, 500);
					},
				  });
				})
				.finally(function () {});
			}
		  },
		});
	  },
	  checkName: function () {
		if (this.name !== "") {
		  let request = {};
		  let vm = this;
		  axios
			.post(contextPath + "/categories/" + this.name, request)
			.then(function (response) {
			  vm.nameExistsMsg = response.data.message;
			})
			.catch(function (error) {
			  vm.nameExistsMsg = "失敗：" + error.response.status;
			})
			.finally(function () {});
		}
	  },
	  checkNameById: function () {
		if (this.nameById !== "") {
		  let request = {};
		  let vm = this;
		  axios
			.post(contextPath + "/categories/" + this.nameById, request)
			.then(function (response) {
			  vm.nameExistsMsg = response.data.message;
			})
			.catch(function (error) {
			  vm.nameExistsMsg = "失敗：" + error.response.status;
			})
			.finally(function () {});
		}
	  },

	  
	},
	mounted: function () {
	  this.selectAllcategories();
	},
  });
  app.mount("#app");
  