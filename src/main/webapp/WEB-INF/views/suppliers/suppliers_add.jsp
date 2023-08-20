<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>廠商登錄</title>

<style>
</style>
</head>
<body style="padding-top: 9%">
<%@ include file="../toolbar/navbar.jsp"%>
	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~form~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

	<div class="container" id="app">
		<p style="font-size: 30px; text-align: center; margin-bottom: 10px">
			廠商登錄</p>

		<!--欄位0-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">會員帳號</label>
			</div>
			<select class="form-select" aria-label="Default select example"
				style="width: 200px" v-model="findMembersId"
				@change="callFindByMembersIdForContractsAdd()">
				<option selected :value="">[選擇會員帳號]</option>
				<!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
				<option v-for="item in membersData" v-bind:key="item.membersId"
					:value="item.membersId.toString()">{{item.userName}}</option>

			</select>
			<div class="col-auto text-center">
				<span id="" class="form-text">{{reply}} </span>
			</div>

			<!-- 			連結value的部分，要改成新增會員的controller -->

		</div>
		<div class="col-auto text-center row">
			<p id="" class="form-text">
				※若選單中無此廠商對應之會員帳號，請先幫廠商新增會員資料 ➜➜➜ <a
					href="<c:url value="/showAddSupplierPage"></c:url>">前往新增</a>
			</p>
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
					{{contractEndDateMessage}} </span>
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
			<div class="col-auto text-center">
				<span id="" class="form-text"> [輸入欄位提示內容] </span>
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
			<div class="col-auto text-center">
				<span id="" class="form-text"> [輸入欄位提示內容] </span>
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
			<div class="col-auto text-center">
				<span id="" class="form-text"> [輸入欄位提示內容] </span>
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
			<div class="col-auto text-center">
				<span id="" class="form-text"> [輸入欄位提示內容] </span>
			</div>
		</div>

		<!--欄位12-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商備註</label>
			</div>
			<div class="col-auto text-center">
				<textarea id="" class="form-control" v-model="findRemarks"></textarea>
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text"> [輸入欄位提示內容] </span>
			</div>
		</div>

		<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
			<button class="btn btn-outline-success" @click="callAddSuppliers()">新增</button>
		</div>
	</div>


	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>


	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/suppliers/suppliers_add.js"></script>

</body>

</html>
