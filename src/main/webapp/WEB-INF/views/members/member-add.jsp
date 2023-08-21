<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>

<c:set var="contextRoot" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<link rel="buy icon"
	href="${pageContext.request.contextPath}/favicon.ico" />
<meta charset="UTF-8">
<title>會員資料新增</title>
</head>
<body style="padding-top: 8%" >
	<%@ include file="/WEB-INF/views/toolbar/navbar.jsp"%>
	<div class="container" id="app">
		<h2 class="text-center py-3">會員資料新增</h2>
		<div class="album py-5 bg-light container">
				
				

				<div class="">
					<div class="row">
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="userNameSid">帳號</span>
								<input id="userName" name="userName"
									type="text" class="form-control" placeholder="User Name"
									aria-label="User Name" aria-describedby="userNameSid"
									value="${onemember.userName}">
							</div>
						</div>
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="passwordSid">密碼</span> 
								<input id="password"								
									type="password" class="form-control" placeholder="Password"
									aria-label="Password" aria-describedby="passwordSid"
									value="${onemember.password}">
							</div>
						</div>
					</div>
						<div class="row">
					<div class="d-flex">
						<div>
							<img id="myImage" :src="imgSrcVue" :alt="個人圖檔" width="100"
								height="100" class="rounded-circle me-2">
						</div>						
					</div>
					<div class="d-flex">
						<label for="selectFile" class="form-label">更換您的個人圖檔</label>
					</div>
					<div class="d-flex">
						<div class="">
							<input class="form-control" type="file" id="selectFile"
								accept=".jpg, .jpeg, .png">
						</div>
						<div class="" style="margin-left:9px">
							<button type="button" class="btn btn-outline-primary" @click="uploadFile()">上傳圖檔</button>
						</div>						
					</div>
				</div>
					
					
					<div class="row mt-3">
						<div class="input-group mb-3">
							<span class="input-group-text" id="firstNameSid">姓氏和名字</span> 
							<input id="firstName"
								type="text" class="form-control" placeholder="First Name"
								aria-label="First Name" aria-describedby="firstNameSid"
								value="${onemember.firstName}"> 
							<input id="lastName"
								type="text" class="form-control" placeholder="Last Name"
								aria-label="Last Name" aria-describedby="firstNameSid"
								value="${onemember.lastName}">
						</div>
					</div>
				
					
					
					
					<div class="row">
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="birthdaySid">生日</span> 
								<input id="birthday"
									type="date" class="form-control" value="${onememberBirthday}">
							</div>
						</div>
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="genderIDSid">性別</span>
								<select id="gender"
									class="form-select" aria-label="gender" aria-describedby="genderIDSid"
									value="no">
									<option value="no"selected>性別選擇</option>
									<option value="male">男</option>
									<option value="female">女</option>
									<option value="others">其他</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="telSid">電話</span> 
								<input id="tel"
									type="text" class="form-control" placeholder="Tel"
									aria-label="Tel" aria-describedby="telSid"
									value="${onemember.tel}">
							</div>
						</div>
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="phoneNumberSid">手機</span> 
								<input id="phoneNumber"
									type="text" class="form-control" placeholder="Cell Phone"
									aria-label="Cell Phone" aria-describedby="phoneNumberSid"
									value="${onemember.phoneNumber}">
							</div>


						</div>
					</div>

					<div class="row">
						<div class="col-3">
							<div class="input-group mb-3">
								<span class="input-group-text" id="postalCodeSid">郵遞區號</span> 
								<input id="postalCode"
									type="text" class="form-control" placeholder="Postal Code"
									aria-label="Postal Code" aria-describedby="postalCodeSid"
									value="${onemember.postalCode}">
							</div>
						</div>
						<div class="col">

							<div class="input-group mb-3">
								<span class="input-group-text" id="addressSid">地址</span> 
								<input id="address"
									type="text" class="form-control" placeholder="Address"
									aria-label="Address" aria-describedby="addressSid"
									value="${onemember.address}">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col">

							<div class="input-group mb-3">
								<span class="input-group-text" id="emailSid">Email</span> 
								<input id="email"
									type="text" class="form-control" placeholder="Email"
									aria-label="Email" aria-describedby="emailSid"
									value="${onemember.email}">
							</div>
						</div>
						<div class="col">

							<div class="input-group mb-3">
								<span class="input-group-text" id="registrationDateSid">生效日</span> 
								<input id="registrationDate"
									type="datetime-local" class="form-control"
									placeholder="Registration Date" aria-label="Registration Date"
									aria-describedby="registrationDateSid" disabled
									value="${onememberRegistrationDate}">
							</div>
						</div>
					</div>


					<div class="row">
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="roleSid">角色</span> 
								<select id="role"
									class="form-select" 
									value="2" disabled>
									<option value="0">角色選擇</option>
									<option value="1">系統管理者</option>
									<option value="2">廠商</option>
									<option value="3">會員</option>
								</select>
							</div>
						</div>
						<div class="col">
							<div class="input-group mb-3">
								<span class="input-group-text" id="expirationDateSid">失效日</span> 
								<input id="expirationDate"
									type="datetime-local" class="form-control" placeholder="Expiration Date"
									aria-label="Expiration Date" aria-describedby="expirationDateSid"
									value="${onememberExpirationDate}" disabled>
							</div>
						</div>
					</div>
				</div>
				<input id="membersId" name ="membersId" type="hidden" value="">
				
					<div class="row justify-content-end">					    
						<div class="col-5">
							<button type="button" class="btn btn-outline-primary"  @click="addMember()">新增</button>
						</div>						
						<div class="col-2" style="text-align: right">
							<button type="button" class="btn btn-outline-primary pull-right"  @click="gotoMembersList()">回到會員列表</button>
						</div>
						
						
						
					</div>
		</div>
	</div>
	

	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>
	<script type="text/javascript"
		src="<c:url value='/js/members/members-add.js'></c:url>">
	</script>


</body>
</html>