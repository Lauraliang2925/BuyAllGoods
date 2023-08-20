<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>登入</title>
</head>
<body id="app">
	<div
		class="modal modal-signin position-static d-block bg-secondary py-5"
		tabindex="-1" role="dialog" id="modalSignin">
		<div class="modal-dialog" role="document">
			<div class="modal-content rounded-5 shadow">
				<div class="modal-header p-5 pb-4 border-bottom-0">
					<!-- <h5 class="modal-title">Modal title</h5> -->
					<h2 class="fw-bold mb-0">登入</h2>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>

				<div class="modal-body p-5 pt-0">
					<div class="form-floating mb-3">
						<input type="text" class="form-control rounded-4"
							id="floatingUserName" placeholder="UserName"
							v-model="findUserName"> <label for="floatingUserName">User
							Name</label>
					</div>
					<div class="form-floating mb-3">
						<input type="password" class="form-control rounded-4"
							id="floatingPassword" placeholder="Password"
							v-model="findPassword"> <label for="floatingPassword">Password</label>
					</div>
					<div class="form-floating mb-3">
						<input type="email" class="form-control rounded-4"
							id="floatingInput" placeholder="驗證碼"> <label
							for="floatingInput">輸入驗證碼</label>
					</div>
					<div>我是驗證碼</div>
					<br>
					<div class="checkbox mb-3">
						<label> <input type="checkbox" value="remember-me">
							記住我
						</label>
					</div>
					<button class="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
						type="submit" @click="callCheckUser()">登入</button>

				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/members/login.js"></script>
</body>
</html>