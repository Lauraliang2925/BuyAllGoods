<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<div class="container" id="login">

	<!-- 上方工具列起始 -->
	<header
		class="container d-flex align-items-center fixed-top justify-content-md-between py-3 mb-4 border-bottom bg-light ">
		<a href="<c:url value='/'/>"
			class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-2">Buy
			All Goods <svg class="bi me-2" width="40" height="32" role="img"
				aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
		</a>

		<!-- 搜尋列起始 -->
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<input style="width: 250px" class="me-2" type="search"
							placeholder="搜尋商品" aria-label="Search" v-model="searchProductName"
							@keydown.enter="searchProduct(searchProductName)"/>
							
						<button class="btn btn-outline-success"  @click="searchProduct(searchProductName)" >搜尋
						</button>
				</div>
			</div>
		</nav>
		<!-- 搜尋列結束 -->

		<div class="dropdown d-flex">
			<!-- 會員登入/登出/個人資訊起始 -->
			<div class="container" >
				<a href="#"
					class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
					id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://github.com/mdo.png" alt="" width="32" height="32"
					class="rounded-circle me-2" /> <strong>會員名字</strong>
				</a>
				<ul class="dropdown-menu text-small shadow"
					aria-labelledby="dropdownUser2">
					<li><a class="dropdown-item" href="<c:url value='/members/readedit?membersId=${membersId}'/>">會員資料</a></li>
					<li><a class="dropdown-item"
						href="<c:url value='/FavoriteMember'/>">收藏清單</a></li>
					<li v-show="isShowOrder"><a class="dropdown-item" href="<c:url value='/OrderMember'/>"  >訂單查詢</a></li>
					<li v-show="isShowButton"><a class="dropdown-item" href="<c:url value='/OrderSuppliers'/>"  >訂單查詢</a></li>	
					<li><hr class="dropdown-divider" /></li>
					<li v-show="isShowLogin"><a class="dropdown-item"
						href="<c:url value="goLogin"></c:url>">登入</a></li>
					<li v-show="isShowLogout"><button class="dropdown-item"
							@click="logout">登出</button></li>
				</ul>
			</div>
			<!-- 會員登入/登出/個人資訊結束 -->

			<!-- 購物車圖示起始 (顯示給:一般會員)-->
			<!-- 			<div class="container"> -->
			<!-- 				<button type="button" class="btn btn-light position-relative btn-lg"> -->
			<!-- 					<i class="bi bi-cart3"></i> -->
			<!-- 					              購物車ICON -->
			<!-- 					<span -->
			<!-- 						class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">5 -->
			<!-- 						<span class="visually-hidden">unread messages</span> -->
			<!-- 					</span> -->
			<!-- 				</button> -->
			<!-- 			</div> -->
			<div class="container" v-if="isShowCartButton">
              <a href="<c:url value='/ShoppingCartMember'/>">
                <button type="button" class="btn btn-light position-relative btn-lg">
                  <i class="bi bi-cart3"></i>
                  <!-- 購物車ICON -->
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart">
                    {{count?count:0}}
                    <span class="visually-hidden"></span>
                  </span>
                </button>
				
              </a>
            </div>
			<!-- 購物車圖示結束 -->

			<!-- 後臺管理按鈕起始 (顯示給:管理員) -->
			<div class="container-fluid" v-if="isShowAdminButton">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item dropdown"><a
						class="nav-link dropdown-toggle" href="#" role="button"
						data-bs-toggle="dropdown" aria-expanded="false"> 管理 </a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item"
								href="<c:url value='/product-list'/>">檢視商品</a></li>
							<li><a class="dropdown-item"
								href="<c:url value='/product-add'/>">新增商品</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item"
								href="<c:url value='/categories-edit'/>">編輯分類</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item"
								href="<c:url value="/showSupplierPage"></c:url>">檢視廠商</a></li>
							<li v-show="isShowAddSupplier"><a class="dropdown-item"
								href="<c:url value="/showAddSupplierPage"></c:url>">新增廠商</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item"
								href="<c:url value="/showSupplierPage"></c:url>">檢視合約</a></li>
							<li v-show="isShowAddContracts"><a class="dropdown-item"
								href="<c:url value="/showAddContractsPage"></c:url>">新增合約</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item" href="<c:url value="/members/list"></c:url>">會員列表</a></li>							
						</ul></li>
				</ul>
			</div>
			<!-- 後臺管理按鈕結束 -->
		</div>
	</header>
	<!-- 上方工具列結束 -->
</div>


<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/Navbar/navbar.js"></script>

	