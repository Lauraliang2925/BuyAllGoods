<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>廠商/合約查詢</title>

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

	<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~table~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

	<div>
		<div class="container">
			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~table上方條件輸入框~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

			<div>
				<!-- 廠商ID輸入框 -->
				<div class="row">
					<div class="col">
						<div class="input-group mb-3">
							<span class="input-group-text" id="inputGroup-sizing-default">廠商ID</span>
							<input type="text" class="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-default"
								v-on:blur="callFindSomeSC()" v-model="findSuppliersId" />
						</div>
					</div>

					<!-- 廠商名稱輸入框 -->
					<div class="col">
						<div class="input-group mb-3">
							<span class="input-group-text" id="inputGroup-sizing-default">廠商名稱</span>
							<!-- 							<input type="text" class="form-control" -->
							<!-- 								aria-label="Sizing example input" -->
							<!-- 								aria-describedby="inputGroup-sizing-default" -->
							<!-- 								v-on:blur="callFindSomeSC()" v-model="findSuppliersName" /> -->
							<select class="form-select" aria-label="Default select example"
								style="width: 200px" v-model="findSuppliersName"
								v-on:blur="callFindSomeSC()">
								<option selected :value="">[請選擇廠商名稱]</option>
								<!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
								<option v-for="s in suppliersAllData" v-bind:key="s.suppliersId"
									:value="s.suppliersName">{{s.suppliersName}}</option>

							</select>
						</div>
					</div>



					<!-- 合約ID輸入框 -->
					<div class="col">
						<div class="input-group mb-3">
							<span class="input-group-text" id="inputGroup-sizing-default">合約ID</span>
							<input type="text" class="form-control"
								aria-label="Sizing example input"
								aria-describedby="inputGroup-sizing-default"
								v-on:blur="callFindSomeSC()" v-model="findContractsId" />
						</div>
					</div>
				</div>

			</div>

			<!-- table本體 -->
			<div>

				<table class="table table-hover table-bordered caption-top"
					style="margin: 0 auto">
					<caption
						style="font-size: 30px; text-align: center; margin-bottom: 10px">
						廠商/合約查詢</caption>
					<thead class="table-primary">
						<tr>

							<th scope="col" class="text-center align-middle">廠商ID</th>
							<th scope="col" class="text-center align-middle">廠商名稱</th>
							<th scope="col" class="text-center align-middle">合約ID</th>
							<th scope="col" class="text-center align-middle">合約編號</th>
							<th scope="col" class="text-center align-middle">合作狀態</th>
							<th scope="col" class="text-center align-middle">廠商明細</th>
							<th scope="col" class="text-center align-middle">合約狀態</th>
							<th scope="col" class="text-center align-middle">合約明細</th>
						</tr>
					</thead>
					<!--~~~~~~~~~~界接後端(用迴圈產出清單)~~~~~~~-->
					<tbody>
						<tr v-for="item in suppliersData" v-bind:key="item.contractsId">

							<td class="text-center align-middle">{{item.suppliersId}}</td>
							<td class="text-center align-middle">{{item.suppliersName}}</td>
							<td class="text-center align-middle">{{item.contractsId}}</td>
							<td class="text-center align-middle">{{item.contractnumber}}</td>
							
							<td class="text-center align-middle">
							
							<div v-if="new Date(item.suppliersEndDate)>tomorrowDate">
							<i class="fa-solid fa-user-group" style="color: #005eff;"></i>合作中
							</div>
							
							<div v-if="new Date(item.suppliersEndDate)<tomorrowDate">
							<i class="fa-solid fa-x" style="color: #ff0000;"></i>已終止
							</div>
							
							</td>
							
							<td class="text-center align-middle">
								<button class="btn btn-outline-dark"
									@click="showDetailsBySuppliersId(item.suppliersId)">
									<i class="fa-solid fa-magnifying-glass" style="color: #ffa424;"></i>查看
								</button>
							</td>
							
							
							<td class="text-center align-middle">
							
							<div v-if="item.contractsId!=null">
							<div v-if="new Date(item.contractsEndDate)<tomorrowDate">
							<i class="fa-regular fa-calendar-xmark" style="color: #ff0000;"></i>已到期
							</div>
							</div>
							
							<div v-if="item.contractsId!=null">
							<div v-if="new Date(item.contractsEndDate)>tomorrowDate">
							<i class="fa-regular fa-calendar-check" style="color: #005eff;"></i>有效
							</div>
							</div>
							
							
							</td>
							
							
							<td class="text-center">
								<button
									:class="item.contractsId != null ? 'btn btn-outline-dark' : 'btn btn-outline-warning'"
									@click="item.contractsId != null ? showDetailsByContractsId(item.contractsId) : callGoAddContracts(item.suppliersId)">
									<i class="fa-solid fa-magnifying-glass"
										:style="{ color: '#ffa424' }" v-if="item.contractsId != null"></i>
									<i class="fa-solid fa-file-circle-plus"
										:style="{ color: '#ff0000' }" v-if="item.contractsId == null"></i>
									{{ item.contractsId != null ? '查看' : '新增' }}
								</button>


							</td>
							
						</tr>
					</tbody> 
				</table>
				<table class="mx-auto" v-show="isShowPage">
					<tbody>
						<tr>
							<th class="text-center align-middle" v-for="p in pageCount"
								:key="p.page"><input type="button"
								class="btn btn-outline-dark"
								@click="callFindAllSCPage(p.offset)" :value="p.page" /></th>
						</tr>
					</tbody>
				</table>
				<br>

			</div>
		</div>
	</div>





	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>


	<script type="text/javascript"
		src="${pageContext.request.contextPath}/js/suppliers/suppliers_view.js"></script>

</body>
</html>
