<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/includes/libs.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>訂單</title>
</head>

<body style="padding-top: 8%">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
        <div class="container" id="app">
            <!-- 開始 -->
            <h2 class="text-center py-3 mt-3">訂單</h2>
            <div class="row mb-3">
                <div class="col-6">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="搜尋所有訂單" v-model="searchInput" />
                        <button class="btn btn-outline-secondary" type="button" @click="searchOrderNotes">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
                <div class="col-3">
                    <select class="form-select" aria-label="Default select example" v-model="selectedStatus"
                        @change="updateByOrderStatus">
                        <option selected value="所有訂單">所有訂單</option>
                        <option value="訂單開立">訂單開立</option>
                        <option value="廠商確認中">廠商確認中</option>
                        <option value="送貨中">送貨中</option>
                        <option value="訂單完成">訂單完成</option>
                        <option value="申請退貨中">申請退貨中</option>
                        <option value="退貨完成">退貨完成</option>
                        <option value="取消">取消</option>
                    </select>
                </div>
                <div class="col-3">
                    <select class="form-select" aria-label="Default select example" v-model="selectedTimeRange"
                        @change="updateTimeRange">
                        <option selected value="all">所有時間</option>
                        <option value="30">最近30天</option>
                        <option value="180">最近6個月</option>
                        <option value="365">2023</option>
                        <option value="2022">2022-之前</option>
                    </select>
                </div>
                <!-- 訂單點進去簡單資料開始 -->
                <div class="container" v-show="isShowCard">
                    <div class="row mt-3" v-if="getInnerJoinData.length > 0">
                        <div class="col-auto">
                            <p class="text-start text-lowercase text-success fw-bold">
                                {{getInnerJoinData[0].order_status}}</p>
                        </div>
                        <div class="col-3">
                            <p class="text-start text-lowercase fw-bold">訂單成立日期：{{getInnerJoinData[0].placed}}</p>
                        </div>
                        <div class="col-2">
                            <p class="text-start text-lowercase fw-bold">總金額：<i class="bi bi-currency-dollar"></i>
                                {{getInnerJoinData[0].total_amount}}</p>
                        </div>
                    </div>
                    <div class="card">
                        <table class="table table-borderless" v-for="(item,index) in getInnerJoinData"
                            :key="item.order_detail_id">
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex mb-3 h4">
                                            <div class="d-flex flex-row align-items-center">
                                                <!-- <img class="rounded float-start"
                                                    src="https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/0cd466686070c9edf2c01fad47919f56.jpg"> -->
                                                <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                                                    xmlns="http://www.w3.org/2000/svg" role="img"
                                                    aria-label="Placeholder: Thumbnail"
                                                    preserveAspectRatio="xMidYMid slice" focusable="false">
                                                    <title>{{ item.name }}</title>
                                                    <image
                                                        :xlink:href="contextPath + '/pic/product/' + item.name + '.jpg'"
                                                        width="100%" height="100%" />
                                                </svg>
                                            </div>
                                            <div class="d-flex flex-column">
                                                <div class="d-flex flex-row justify-content-start">商品名稱：{{item.name}}
                                                </div>
                                                <br>
                                                <div class="d-flex flex-row justify-content-start">數量 :
                                                    {{item.quantity}}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="d-flex flex-column ">
                                            <button class="btn btn-outline-primary mb-2 mt-3 btn-lg" v-if="index === 0"
                                                @click="redirectToOrderDetail(item.order_id)">
                                                查看訂單細節
                                            </button>
                                            <!-- <button class="btn btn-outline-primary mb-2 btn-lg" v-if="index === 0" @click="addToShoppingCart(item)">重新購買</button> -->
                                            <button class="btn btn-outline-dark mb-2 btn-lg"
                                                @click="modifyOrderStatusReturn" v-if="index === 0"
                                                v-show="!disableButton">退貨</button>
                                            <button class="btn btn btn-dark mb-2 btn-lg" v-if="index === 0" disabled
                                                v-show="disableButton">退貨</button>
                                            <button class="btn btn-outline-dark mb-2 btn-lg"
                                                @click="modifyOrderStatusCancel" v-if="index === 0"
                                                v-show="!cancel">取消訂單</button>
                                            <button class="btn btn btn-dark mb-2 btn-lg" v-if="index === 0"
                                                v-show="cancel" disabled>取消訂單</button>
                                            <button class="btn btn-outline-success btn-lg"
                                                @click="findAllOrdersWhereMember" v-if="index === 0">返回</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 訂單點進去簡單資料結束 -->
                <!-- 訂單初始畫面已表格方式呈現 開始 -->
                <div class="container" v-show="isShowTable">
                    <div class="card mt-3">
                        <table class="table fs-4 table-hover">
                            <thead>
                                <tr class="align-middle">
                                    <th></th>
                                    <th>訂單備註</th>
                                    <th>訂單金額</th>
                                    <th>訂單狀態</th>
                                    <th>訂單成立日期</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- 系統 -->
                                <tr v-if="RoleId === '1'" class="align-middle" v-for="item in OrdersWhereMemberData"
                                    :key="item.orderId" v-show="noSearchShowAll">
                                    <td></td>
                                    <td>
                                        <p hidden>{{item.orderId}}</p>
                                        {{item.orderNotes}}
                                    </td>
                                    <td><i class="bi bi-currency-dollar"></i> {{item.totalAmount}}</td>
                                    <td class="text-success">{{item.orderStatus}}</td>
                                    <td>{{item.placed}}</td>
                                    <td><button type="button" class="btn btn-outline-secondary btn-lg"
                                            @click="selectOrderId(item.orderId)"><i class="bi bi-search"></i>
                                            查看</button>
                                    </td>
                                </tr>
                                <!-- 系統 -->
                                <!-- 一般 -->
                                <tr v-if="RoleId === '3'" class="align-middle" v-for="item in OrdersWhereMemberData" :key="item.order_id"
                                    v-show="noSearchShowAll">
                                    <td></td>
                                    <td>
                                        <p hidden>{{item.order_id}}</p>
                                        {{item.order_notes}}
                                    </td>
                                    <td><i class="bi bi-currency-dollar"></i> {{item.total_amount}}</td>
                                    <td class="text-success">{{item.order_status}}</td>
                                    <td>{{item.placed}}</td>
                                    <td><button type="button" class="btn btn-outline-secondary btn-lg"
                                            @click="selectOrderId(item.order_id)"><i class="bi bi-search"></i>
                                            查看</button>
                                    </td>
                                </tr>
                                <!-- 一般 -->
                                <!-- 搜尋 -->
                                <tr class="align-middle" v-for="item in searchResult" :key="item.order_id"
                                    v-show="searchByNotes">
                                    <td></td>
                                    <td>
                                        <p hidden>{{item.order_id}}</p>
                                        {{item.order_notes}}
                                    </td>
                                    <td><i class="bi bi-currency-dollar"></i> {{item.total_amount}}</td>
                                    <td class="text-success">{{item.order_status}}</td>
                                    <td>{{item.placed}}</td>
                                    <td><button type="button" class="btn btn-outline-secondary btn-lg"
                                            @click="selectOrderId(item.order_id)"><i class="bi bi-search"></i>
                                            查看</button>
                                    </td>
                                </tr>
                                <!-- 搜尋 -->
                                <!-- 系統時間 -->
                                <tr v-if="RoleId === '1'" class="align-middle" v-for="item in filteredOrders" :key="item.orderId"
                                    v-show="searchTime">
                                    <td></td>
                                    <td>
                                        <p hidden>{{item.orderId}}</p>
                                        {{item.orderNotes}}
                                    </td>
                                    <td><i class="bi bi-currency-dollar"></i> {{item.totalAmount}}</td>
                                    <td class="text-success">{{item.orderStatus}}</td>
                                    <td class="text-primary">{{item.placed}}</td>
                                    <td><button type="button" class="btn btn-outline-secondary btn-lg"
                                            @click="selectOrderId(item.orderId)"><i class="bi bi-search"></i>
                                            查看</button>
                                    </td>
                                </tr>
                                <!-- 系統時間 -->
                                <!-- 時間 -->
                                <tr v-if="RoleId === '3'" class="align-middle" v-for="item in filteredOrders" :key="item.order_id"
                                    v-show="searchTime">
                                    <td></td>
                                    <td>
                                        <p hidden>{{item.order_id}}</p>
                                        {{item.order_notes}}
                                    </td>
                                    <td><i class="bi bi-currency-dollar"></i> {{item.total_amount}}</td>
                                    <td class="text-success">{{item.order_status}}</td>
                                    <td class="text-primary">{{item.placed}}</td>
                                    <td><button type="button" class="btn btn-outline-secondary btn-lg"
                                            @click="selectOrderId(item.orderId)"><i class="bi bi-search"></i>
                                            查看</button>
                                    </td>
                                </tr>
                                <!-- 時間 -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 沒有資料顯示 開始 -->
                <div class="container text-center">
                    <div v-if="OrdersWhereMemberData.length === 0">
                        <img class="rounded-5 mt-3"
                            src="https://memeprod.ap-south-1.linodeobjects.com/user-template/7946010b1537d8a68b58c736991cfc8f.png"
                            style="width: 200px;">
                        <p class="text-center fw-bold fs-5 mt-3">查無資料</p>
                    </div>
                </div>
                <div class="container text-center" v-show="data404">
                    <div v-if="searchResult.length === 0">
                        <img class="rounded-5 mt-3"
                            src="https://memeprod.ap-south-1.linodeobjects.com/user-template/7946010b1537d8a68b58c736991cfc8f.png"
                            style="width: 200px;">
                        <p class="text-center fw-bold fs-5 mt-3">查無資料</p>
                    </div>
                </div>
                <!-- 沒有資料顯示 結束 -->
                <!-- 訂單初始畫面已表格方式呈現 結束 -->
            </div>
            <!-- 結束 -->
        </div>
        <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
<script type="text/javascript">
    const contextPath = "${pageContext.request.contextPath}";
</script>
<script type="text/javascript" src="<c:url value='/js/Order/OrderMember.js'></c:url>"></script>
</body>

</html>