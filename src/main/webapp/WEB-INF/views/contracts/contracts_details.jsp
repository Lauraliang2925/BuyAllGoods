<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>合約明細</title>

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
			合約明細</p>
			<p style="font-size: 14px; text-align: center; margin-bottom: 10px ;color:red">
			{{hintFinishMessage}}</p>

		<!--流水編號(合約ID)欄位-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約ID</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" readonly
					v-model="findContractsId" />
			</div>
		</div>

		<!--欄位0-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約編號</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="" class="form-control" required
					v-model="findContractNumber" />
			</div>
		</div>


		<!--欄位1-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">廠商名稱</label>
			</div>
			<select class="form-select" aria-label="Default select example"
				style="width: 200px" v-model="findSuppliersId" id="">
				<!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
				<option v-for="s in suppliersAllData" v-bind:key="s.suppliersId"
					:value="s.suppliersId">{{s.suppliersName}}</option>

			</select>
		</div>




		<!--欄位2-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約起日</label>
			</div>
			<div class="col-auto text-center">
				<input type="date" id="" class="form-control" required
					v-model="findStartDate" @blur="checkStartDate()" />
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text" style="color: red">
					{{startDateMessage}} </span>
			</div>
		</div>

		<!--欄位3-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約迄日</label>
			</div>
			<div class="col-auto text-center">
				<input type="date" id="" class="form-control" v-model="findEndDate"
					@blur="checkEndDate()" />
			</div>
			<div class="col-auto text-center">
				<span id="" class="form-text" style="color: red">
					{{endDateMessage}}</span>
			</div>
		</div>

		<!--欄位4-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約標題</label>
			</div>
			<div class="col-auto text-center">
				<input type="text" id="contractTitle" class="form-control"
					v-model="findContractTitle" />
			</div>
		</div>

		<!--欄位5-->
		<div
			class="row g-3 align-items-center justify-content-center mb-1 mt-1">
			<div class="col-auto text-center">
				<label for="" class="col-form-label">合約金額</label>
			</div>
			<div class="col-auto text-center">
				<input type="number" id="" class="form-control" required
					v-model="findAmount" />
			</div>
		</div>



		<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
			<button class="btn btn-outline-success mx-5"
				@click="callAddContractsToUpdate()">編輯</button>
			<a href="<c:url value="/showSupplierPage"></c:url>"><button
					class="btn btn-outline-dark mx-5">回查詢頁</button></a>
					<button class="btn btn-outline-danger mx-5"
				@click="callFinishContracts()">終止合約</button>
		</div>
	</div>



	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/contracts/contracts_details.js"></script>

</body>
</html>
