<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html>
<head>
<link rel="buy icon"
	href="${pageContext.request.contextPath}/favicon.ico" />
<meta charset="UTF-8">
<title>會員列表</title>
</head>

<body style="padding-top: 8%" id="app">


	<%@ include file="/WEB-INF/views/toolbar/navbar.jsp"%>

	<div class="container">
		<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~table上方條件輸入框~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
		<div>
			<div class="row">
				<div class="col">
					<div class="input-group mb-3">
						<span class="input-group-text" id="inputGroup-sizing-default">帳號</span>
						<input type="text" class="form-control"
							aria-label="Sizing example input"
							aria-describedby="inputGroup-sizing-default"
							v-model="findUserName" />
						<button class="btn btn-outline-dark" @click="findUserNameByLike()">
							<i class="fa-solid fa-magnifying-glass" style="color: #ffa424"></i>搜尋
						</button>
						
					</div>
				</div>
				<div class="col">
					<div v-show="showValidationMessage" class="text-primary fs-5">{{validationMessage}}</div>
					<button v-show="showAllMemberButton" class="btn btn-outline-dark" @click="showAllMember()">
							<i class="fa-solid fa-magnifying-glass" style="color: #ffa424"></i>所有會員列表
					</button>					
				</div>
				<div class="col">
				</div>				
				<div class="col" style="text-align:right;">
					<button class="btn btn-outline-dark" @click="addMember()">
							<i class="fa-solid fa-user"></i>新增會員
					</button>
				</div>
			</div>

			<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~table上方條件輸入框~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
			<h2 class="text-center py-3">會員列表</h2>		

			<div id="select" v-show="isShowSelect">
				<!--會員列表起始 -->
				<table class="table table-hover">
					<thead class="table-primary">
						<tr>
							<th scope="col">圖像</th>
							<th scope="col">帳號</th>
							<th scope="col">性別</th>
							<th scope="col">生日</th>
							<th scope="col">手機</th>
							<th scope="col">Email</th>
							<th scope="col">角色</th>
							<th scope="col">操作</th>
						</tr>
					</thead>
					<tbody class="table-light">

						<tr v-for="item in memberItems" v-bind:key="item.membersId">
							<td><img :src="contextPathVue + item.photoPath"
								:alt="'From Pngtree '+item.photoPath" style="width: 100px;"></td>

							<td>{{item.userName}} <input
								:id="'membersId_' + item.membersId" type="hidden"
								:value="item.membersId">
							</td>
							<td>{{item.gender}}</td>
							<td>{{item.birthday}}</td>
							<td>{{item.phoneNumber}}</td>
							<td>{{item.email}}</td>
							<td>{{item.roleId}}</td>
							<td>					
								<a :href="contextPathVue+'/members/readedit?membersId='+item.membersId" class="btn btn-outline-dark" role="button">
								<i class="fa-solid fa-magnifying-glass" style="color: #ffa424"></i>
								檢視</a>	
							</td>
						</tr>



					</tbody>
					<tfoot class="table-light" v-show="showNoData">
						<tr>
							<td class="text-center" colspan="8">查無資料</td>
						</tr>
					</tfoot>
				</table>
				<paginate v-show="showPaginate" v-bind:first-last-button="true"
					v-bind:first-button-text="'&lt;&lt;'"
					v-bind:last-button-text="'&gt;&gt;'" v-bind:prev-text="'Prev'"
					v-bind:next-text="'Next'" v-bind:container-class="pagination"
					v-bind:page-count="pages" v-bind:initial-page="current"
					v-bind:click-handler="callFindAll"> </paginate>
			</div>
		</div>
		</div>
		
		
		<script type="text/javascript">
			const contextPath = "${pageContext.request.contextPath}";
		</script>
		<script type="text/javascript"
			src="<c:url value='/js/members/members-list.js'></c:url>"></script>
</body>

</html>





