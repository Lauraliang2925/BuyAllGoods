const app = Vue.createApp({
	data() {
		return {
			favorite: [],
			searchKeyword: "",
			selectAll: false,
			shoppingCart: "",
			isShowFavorite: false,
			Product: [],
			count: localStorage.getItem('count'),
			tt_number: 8,
			membersId: localStorage.getItem('MembersId'),
			image_path: "",
			contextPath: contextPath,
		};
	},
	mounted() {
		this.getFavoritesByMemberID();
	},
	computed: {

	},
	created() {

	},
	methods: {
		getFavoritesByMemberID() {
			let vm = this
			// axios.post(contextPath + "/api/page/favorites/" + vm.tt_number)
			axios.post(contextPath + "/api/page/favorites/" + vm.membersId)
				.then((response) => {
					//console.log(response.data)
					vm.favorite = response.data.map(item => {
						if (item.new_selling_price !== null) {
							item.discounted = true;
							item.selling_price = item.new_selling_price;
						} else {
							item.discounted = false;
						}
						return item;
					});
					console.log(vm.favorite)
					vm.isShowFavorite = vm.favorite.length > 0
				})
				.catch((error) => {
					vm.isShowFavorite = false
				})
		},
		addToShoppingCart(item) {
			const originalData = {
				membersId: item.members_id,
				productsId: item.products_id,
				quantity: 1,
			};
			axios.post(contextPath + "/api/page/shoppingcarts/checkin", originalData)
				.then((response) => {
					let vm = this
					//console.log(response.data.success)
					if (!response.data.success) {
						const notyf = new Notyf({
							position: {
								x: 'right',
								y: 'top',
							},
						});
						notyf.error('購物車已有此商品');
					} else {
						console.log("hahahahaha")
						const notyf = new Notyf({
							position: {
								x: 'right',
								y: 'top',
							},
						});
						notyf.success('已加入購物車');
						vm.count++
						const newCount = vm.count
						var jsonData = JSON.stringify(newCount);
						localStorage.setItem('count', jsonData);
						vm.ifCount()
					}
				}).catch((error) => {
					const notyf = new Notyf({
						position: {
							x: 'right',
							y: 'top',
						},
					});
					notyf.error('加入購物車失敗');
				});
		},
		removeFromFavorites(favorite_list_id) {
			bootbox.confirm({
				message: `<div class="text-center">確定將此商品從收藏清單移除嗎？</div>`,
				buttons: {
					confirm: {
						label: "確定",
						className: "btn btn-primary"
					},
					cancel: {
						label: "取消",
						className: "btn btn-secondary"
					}
				},
				callback: (result) => {
					if (result) {
						let vm = this
						axios.delete(contextPath + "/api/page/favorites/" + favorite_list_id)
							.then((response) => {
								// console.log(response.data)
								vm.favorite = vm.favorite.filter((item) => item.favorite_list_id !== favorite_list_id);
								const notyf = new Notyf({
									position: {
										x: 'right',
										y: 'top',
									},
								});
								notyf.success('已成功從收藏清單中移除');
							})
							.catch((error) => {
								const notyf = new Notyf({
									position: {
										x: 'right',
										y: 'top',
									},
								});
								notyf.error('移除收藏商品失敗');
							});
					} else {

					}
				}
			});
		},

		deleteAll() {
			let vm = this
			bootbox.confirm(`<div class="text-center">確定要將所有收藏清單移除嗎？</div>`, (result) => {
				if (result) {
					// axios.delete(contextPath + '/api/page/favorites/delete/' + this.tt_number)
					axios.delete(contextPath + '/api/page/favorites/delete/' + vm.membersId)
						.then((response) => {
							const notyf = new Notyf({
								position: {
									x: 'right',
									y: 'top',
								},
							});
							notyf.success('已成功將所有收藏清單移除');

							vm.getFavoritesByMemberID()
						})
						.catch((error) => {
							const notyf = new Notyf({
								position: {
									x: 'right',
									y: 'top',
								},
							});
							notyf.error('移除收藏清單錯誤');

							vm.getFavoritesByMemberID()
						});
				}
			});
		},
		addToFavoriteList(item) {
			const originalData = {
				members_id: item.members_id,
				products_id: item.products_id
			};
			axios.post(contextPath + '/api/page/favorites/checkin', originalData).then((response) => {
				if (!response.data.success) {
					const notyf = new Notyf({
						position: {
							x: 'right',
							y: 'top',
						},
					});
					notyf.error('收藏清單已有此商品');
				} else {
					const notyf = new Notyf({
						position: {
							x: 'right',
							y: 'top',
						},
					});
					notyf.success('已加入收藏清單');
				}
			}).catch((error) => {
				const notyf = new Notyf({
					position: {
						x: 'right',
						y: 'top',
					},
				});
				notyf.error('加入收藏清單失敗');
			})
		},
		ifCount() {
			let checkCount = localStorage.getItem('count')
			const cartBadge = document.getElementById('cart');
			if (cartBadge != checkCount) {
				cartBadge.textContent = checkCount;
			}
		}
	}
});

app.mount("#app")
