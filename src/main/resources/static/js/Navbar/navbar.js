// 測試專用碼
//function upadateLocalStoraage() {
//	let storedJsonData = localStorage.getItem('count');
//	if (storedJsonData === null || storedJsonData) {
//		axios.get('http://localhost:8090/buyallgoods/api/page/shoppingcarts/count/8')
//			//        axios.get('http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8')
//			.then((response) => {
//				let cartCount = response.data
//				updateCartBadge(cartCount);
//				localStorage.setItem('count', cartCount);
//			})
//	}
//}

// 當登入從 localStorage 拿到 MemberId 來判斷哪位使用者
function upadateLocalStoraageByMembersId() {
	let storedMemberId = localStorage.getItem('MembersId')
	if (storedMemberId === null || storedMemberId) {
		axios.get(contextPathNav+`/api/page/shoppingcarts/count/${storedMemberId}`)
			.then((response) => {
				let cartCount = response.data
				updateCartBadge(cartCount);
				localStorage.setItem('count', cartCount);
			})
			.catch((error) => {
				updateCartBadge(0)
				localStorage.setItem('count', 0)
			})
	} else {
		updateCartBadge(0)
		localStorage.setItem('count', 0)
	}
}

function updateCartBadge(cartCount) {
	const cartBadge = document.getElementById('cart');
	if (cartBadge) {
		cartBadge.textContent = cartCount;
		localStorage.setItem('count', cartCount);
	}
}
//upadateLocalStoraage();
upadateLocalStoraageByMembersId()
// let test = document.getElementById('cart');
// if (test) {
//     test.textContent = storedJsonData;
// }
// console.log(storedJsonData)
// function getCount(){
//     axios.get('http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8')
//     .then((response)=>{
//         let storedJsonData = localStorage.getItem('count');
//         let cartCount = response.data
//         var cartBadge = document.getElementById('cart');
//         if(storedJsonData !== cartCount || cartBadge ){ 
//             localStorage.setItem('count', cartCount);
//             cartBadge.textContent = cartCount;
//             //getCount();
//         }
//     })
// }


//`${contextPath}api/page/shoppingcarts/count/${members_id}`
// 'http://localhost:8080/buyallgoods/api/page/shoppingcarts/count/8'


// let storedJsonData = localStorage.getItem('count');
// let storedcount = parseInt(storedJsonData) || 0; 

// // 获取用于显示 count 的元素
// let countElement = document.getElementById('cart');

// // 更新 count 的显示
// countElement.textContent = storedcount.toString();


const login = Vue.createApp({
	components: {},
	data: function () {
	  return {
		isShowLogin: true,
		isShowLogout: false,
  
		isShowAddSupplier: false,
		isShowAddContracts: false,
  
		roleId: null,
		isShowAdminButton: false,
		isShowCartButton: true,
  
		searchProductName: "",
	  };
	},
	computed: {},
	methods: {
	  goLogin: function () {
		let userName = localStorage.getItem("UserName");
		if (userName === null) {
		  this.isShowLogin = true;
		  this.isShowLogout = false;
		} else {
		  this.isShowLogin = false;
		  this.isShowLogout = true;
		}
	  },
	  logout: function () {
		console.log("登出!!!!!!!!!!!!");
		bootbox.confirm({
		  title: "再次確認！",
		  message: '<div class="text-center">' + "確定要登出嗎？" + "</div>",
		  buttons: {
			confirm: {
			  label: "我要登出",
			  className: "btn-danger",
			},
			cancel: {
			  label: "繼續購物",
			  className: "btn-success",
			},
		  },
		  callback: function (result) {
			//確認就往下修改
			if (result) {
			  localStorage.clear();
			  bootbox.alert({
				message:
				  '<div class="text-center">登出成功，歡迎再次使用٩(●˙▿˙●)۶…⋆ฺ</div>',
				buttons: {
				  ok: { label: "關閉", className: "btn btn-warning" },
				},
				callback: function () {
				  const url = contextPath + "/?login=out";
				  window.location.href = url;
				},
			  });
			} else {
			}
		  },
		});
	  },
	  
	  showNavButton: function () {
		let roleId = localStorage.getItem("RoleId");
		if (roleId === "1" || roleId === "2") {
		  this.isShowAdminButton = true;
		  this.isShowCartButton = false;
		} else {
		  this.isShowAdminButton = false;
		  this.isShowCartButton = true;
		}
	  },
  
	  goShowManagerButton: function () {
		let roleId = localStorage.getItem("RoleId");
		if (roleId === "1") {
		  this.isShowManagerButton = true;
		} else {
		  this.isShowManagerButton = false;
		}
	  },
  
  
	  check: function () {
		let roleIdStorage = localStorage.getItem("RoleId");
		if(roleIdStorage === '1' || roleIdStorage === '2' || roleIdStorage === '3'){
			this.roleId = roleIdStorage
		}
	  },

	   // 搜尋商品的按鈕，丟products Name
	   searchProduct: function (name) {
		// 帶著選定的products Name跳轉至商品頁面
		window.location.href = contextPath + "/product-search?name=" + name;
	  },
	},
	mounted: function () {
	  this.goLogin();
  
	  this.check();
  
	  this.showNavButton();
  
	  this.goShowManagerButton();
	},
  });
  
  login.mount("#login");