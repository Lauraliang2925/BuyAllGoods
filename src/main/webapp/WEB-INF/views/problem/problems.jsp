<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ include file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>常見問題留言板</title>


</head>

<body style="padding-top: 9%">
	<%@ include file="../toolbar/navbar.jsp"%>

	<div class="container" id="app">
	

		<!-- 寫死的問答 -->
		<div v-if="isShowAlready">

			<p style="font-size: 30px; text-align: center; margin-bottom: 10px">
				常見問題<i class="fa-solid fa-q" style="color: #000000;"></i> <span
					style="font-size: 15px">&</span> <i class="fa-solid fa-a"
					style="color: #000000;"></i>
			</p>

			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：可以使用面交服務嗎？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：目前網站僅配合黑貓宅配寄送。
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：我可以在已成立的訂單中修改
				/ 添加更多商品嗎？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：若訂單已成立將無法再修改或添加更多商品；如有添加商品或是修改的需求，請您先取消該筆訂單，並於取消訂單後重新下單。
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：我一定要成為會員，才能訂購商品嗎？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：是的，為了保障您的權益，需要成為會員才能購買商品，成為會員才能時時掌握訂單進度唷！
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：如何查詢我的訂單資料呢？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：使用網頁右上角的下拉選單，點選「訂單查詢」，即可查詢訂單資料！
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：請問付款方式有哪些？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：目前僅提供信用卡付款。
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：已經完成付款，商品約何時送達？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：完成付款後1工作日商品廠商會安排出貨，約2-3工作日到貨。
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：收到商品不符、破損、瑕疵怎麼辦？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：可至「訂單查詢」>「查看」，申請商品退貨！
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：商品不滿意如何辦理退貨？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：可至「訂單查詢」>「查看」，申請商品退貨！
			</div>
			<br>
			<!-- 一組問答 -->
			<div>
				<i class="fa-solid fa-q" style="color: #001eff;"></i>：商品訂錯或不滿意，可以直接換購其他商品嗎？
			</div>
			<div>
				<i class="fa-solid fa-a" style="color: #f0a119;"></i>：不可以，請至「訂單查詢」>「查看」，申請商品退貨，再重新下訂符合需求之商品！
			</div>
			<br> <br>
			<div>在上述QA還沒有解惑到您的問題嗎？</div>

			<div>
				<span>可點選右側按鈕看看大家都問甚麼問題吧！</span>
				<button @click="controlShowQuestionFromAlready()"
					class="btn btn-outline-warning">
					<i class="fa-solid fa-g" style="color: #f1417f;"></i><i
						class="fa-solid fa-o" style="color: #f1417f;"></i>
				</button>
			</div>


			<div v-if="isShowGoMessageBtn">
				<span>也可點選右側按鈕進到留言板留下問題等版主為您解答！</span>
				<button @click="controlShowMessageFromAlready()"
					class="btn btn-outline-warning">
					<i class="fa-solid fa-g" style="color: #f1417f;"></i><i
						class="fa-solid fa-o" style="color: #f1417f;"></i>
				</button>
			</div>


		</div>
		<!-- 寫死的問答------結束 -->



		<div v-if="isShowQuestion">

			<p style="font-size: 30px; text-align: center; margin-bottom: 10px">
				顧客留言<i class="fa-solid fa-q" style="color: #000000;"></i> <span
					style="font-size: 15px">&</span> <i class="fa-solid fa-a"
					style="color: #000000;"></i>
			</p>

			<button @click="controlShowMessage()" class="btn btn-outline-info" v-if="isShowGoMessageBtn">
				<i class="fa-solid fa-comment-medical" style="color: #ff9500;"></i>我要詢問
			</button>
			&nbsp;&nbsp;&nbsp;
			<button @click="controlShowAlready()"
				class="btn btn-outline-secondary">
				<i class="fa-solid fa-right-to-bracket" style="color: #b1a9a9;"></i>回常見問題Q&A
			</button>

			<!-- 迴圈產出所有問題留言 -->
			<div v-for="(q,index) in allQData" v-bind:key="q.questionId">

				<div class="card mt-2">
					<div class="card-header">
						<div class="font-weight-bold">
							<i class="fa-solid fa-q" style="color: #001eff;"></i> {{q.title}}
						</div>
					</div>
					<div class="card-body">
						<div class="card-text">{{q.question}}</div>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<small class="text-muted"><i class="fas fa-user"></i>
							{{q.userName}}</small> <small class="text-muted"><i
							class="fas fa-clock"></i>{{q.createdDate}}</small>
					</div>
				</div>
				<div class="card mt-2">
					<div class="card-header text-bg-secondary">
						<div class="font-weight-bold">
							<i class="fa-solid fa-a" style="color: #ffffff;"></i> 問題回覆
						</div>
					</div>
					<div class="card-body" v-if="q.reply==null">
						<!-- 				當roleID=1的時候(admin大大) -->
						<div v-if="isShowReply1">
							<div v-if="isShowNotReply">
								<div
									class="card-text d-flex justify-content-between align-items-center">
									<span>尚未回覆！！！</span>
									<button class="btn btn-outline-secondary" type="button"
										@click="controlShowReply(index)">回覆</button>
								</div>
							</div>
							<div v-if="isShowReply2[index]">
								<div class="d-grid gap-2 d-md-flex justify-content-md-end"
									v-if="isShowReplyTextarea">
									<textarea style="resize: none; width: 100%; height: 80px;"
										v-model="reply"></textarea>
									<button class="btn btn-outline-success" type="button"
										@click="callReplyOne(q.questionId)">送出</button>
								</div>
							</div>
						</div>
						<!-- 				當roleID=3的時候(客人大大) -->
						<div v-if="isShowReply">
							<div class="card-text">尚未回覆，請耐心等待~</div>
							<div class="d-grid gap-2 d-md-flex justify-content-md-end">
							</div>
						</div>

					</div>

					<div v-if="q.reply!=null">
						<div class="card-body">
							<div class="card-text">{{q.reply}}</div>
						</div>
						<div
							class="card-footer d-flex justify-content-between text-bg-secondary">
							<small class="text-white"><i class="fa-solid fa-face-meh"
								style="color: #ffffff;"></i> 版主</small> <small class="text-white"><i
								class="fas fa-clock"></i>{{q.replyDate}}</small>
						</div>
					</div>

				</div>

			</div>
			<br>
			<div class="container d-flex justify-content-center">
				<!-- 我是分頁 -->
				<paginate first-last-button="true" first-button-text="&lt;&lt;"
					last-button-text="&gt;&gt;" prev-text="&lt;" next-text="&gt;"
					:page-count="pages" :initial-page="current"
					:click-handler="callFindAllQ"></paginate>
				<!-- 我是分頁 -->
			</div>
		</div>



		<!-- 問題留言板開始!!! -->
		<div v-if="isShowMessage">
			<p style="font-size: 30px; text-align: center; margin-bottom: 10px">
				問題留言板</p>


			<button @click="controlShowMessage()" class="btn btn-outline-info">
				<i class="fa-solid fa-eye" style="color: #ff9500;"></i>查看問答
			</button>
			&nbsp;&nbsp;&nbsp;
			<button @click="controlShowAlready()"
				class="btn btn-outline-secondary">
				<i class="fa-solid fa-right-to-bracket" style="color: #b1a9a9;"></i>回常見問題Q&A
			</button>

			<div class="d-flex">
				<!-- 表格起始 -->

				<div class="py-5 container col-sm-6">
					<div class="mb-3 row">
						<label for="" class="col-form-label col-sm-2">會員帳號</label> <input
							type="text" class="col-form-control col-sm-8" id=""
							v-model="userName" disabled />
					</div>

					<div class="mb-3 row">
						<label for="" class="col-form-label col-sm-2">主旨</label> <input
							type="text" class="col-form-control col-sm-8" id=""
							v-model="title" />
					</div>

					<div class="mb-3 row">
						<label for="" class="form-label col-sm-2">內容</label>
						<textarea style="resize: none; width: 390px; height: 200px;"
							v-model="question"></textarea>
					</div>

					<div
						style="text-align: center; margin-top: 10px; margin-bottom: 10px">
						<button class="btn btn-outline-success" @click="callInsertOne()">留言</button>
					</div>

				</div>
			</div>
		</div>
	</div>



	<%@ include file="/WEB-INF/views/toolbar/footer.jsp"%>
	<script type="text/javascript">
		const contextPath = "${pageContext.request.contextPath}";
	</script>

	<script type="text/javascript"
		src="<c:url value='/js/problem/problems.js'></c:url>"></script>
</body>
</html>
