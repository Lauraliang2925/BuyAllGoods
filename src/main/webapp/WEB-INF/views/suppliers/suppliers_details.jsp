<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>廠商明細</title>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
	crossorigin="anonymous" />

<style>
</style>
</head>
<%@ include file="../toolbar/navbar.jsp"%>
<body style="padding-top: 8%" id="app">
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~form~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

	<div class="container">
		<p style="font-size: 30px; text-align: center; margin-bottom: 10px">
			廠商明細</p>
		<p style="font-size: 14px; text-align: center; margin-bottom: 10px ;color:red">
			{{hintFinishMessage}}</p>

		<!--流水編號(廠商ID)欄位-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商ID</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" readonly
					v-model="findSuppliersId" />
			</div>
		</div>

		<!--欄位0-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">會員帳號</label>
			</div>
			<select class="form-select" aria-label="Default select example"
				style="width: 200px" v-model="findMembersId"
				@change="callFindByMembersIdForContractsAdd()">
				<!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
				<option v-for="item in membersData" v-bind:key="item.membersId"
					:value="item.membersId.toString()">{{item.userName}}</option>

			</select>
			<div class="col-auto text-center">
				<span id="" class="form-text">{{reply}} </span>
			</div>
		</div>

		<!--欄位1-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商名稱</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" required
					v-model="findSuppliersName" />
			</div>

		</div>

		<!--欄位2-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">統一編號</label>
			</div>
			<div class="col-auto text-center">
				<input type="number" id="" class="form-control" required
					v-model="findTaxId" />
			</div>
		</div>

		<!--欄位3-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商電話</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" v-model="findPhone" />
			</div>

		</div>

		<!--欄位4-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商地址</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" v-model="findAddress" />
			</div>

		</div>

		<!--欄位5-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">配合物流</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" readonly
					v-model="findLogistics" />
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text"> 目前僅提供黑貓宅配 </span>
			</div>
		</div>

		<!--欄位6-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">簽約日期</label>
			</div>
			<div class="col-auto text-center">
				<input type="date" id="" class="form-control" required
					v-model="findSigningDate" @blur="checkSigningDate()" />
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text" style="color: red">
					{{signingDateMessage}} </span>
			</div>
		</div>

		<!--欄位7-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">契約到期日</label>
			</div>
			<div class="col-auto text-center">
				<input type="date" id="" class="form-control" required
					v-model="findContractEndDate" @blur="checkContractEndDate()" />
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text" style="color: red">
					{{contractEndDateMessage}}</span>
			</div>
		</div>

		<!--欄位8-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">負責人</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" required
					v-model="findBoss" />
			</div>

		</div>

		<!--欄位9-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">聯絡人</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" required
					v-model="findContactPerson" />
			</div>

		</div>

		<!--欄位10-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">手機號碼</label>
			</div>
			<div class="col-auto text-center">
				<input type="tel" id="" class="form-control" required
					v-model="findPhoneNumber" />
			</div>

		</div>

		<!--欄位11-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">Email</label>
			</div>
			<div class="col-auto text-center">
				<input type="email" id="" class="form-control" required
					v-model="findEmail" />
			</div>

		</div>

		<!--欄位12-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商備註</label>
			</div>
			<div class="col-auto text-center">
				<textarea type="text" id="" class="form-control"
					v-model="findRemarks"></textarea>
			</div>

		</div>

		<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
			<button class="btn btn-outline-success mx-5"
				@click="callAddSuppliersToUpdate()">編輯</button>
			<a href="<c:url value="/showSupplierPage"></c:url>"><button
					class="btn btn-outline-dark mx-5">回查詢頁</button></a>
					<button class="btn btn-outline-danger mx-5"
				@click="callFinishSuppliers()">終止合作</button>

		</div>
	</div>



	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/suppliers/suppliers_details.js"></script>

</body>
</html>
