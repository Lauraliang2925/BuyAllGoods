<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/includes/libs.jsp" %>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>購物車</title>
</head>

<body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
        <div class="container">
            <h2 class="text-center py-3 mt-3">付款方式</h2>
            <!-- 確認接收商品會員資料和付款方式起始 -->
            <div class="row mt-3">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="card card-lg" style="width: 800px">
                        <div class="card-body">
                            <h4>付款方式</h4>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" data-bs-toggle="collapse" href="#collapseExample"
                                    role="button" aria-expanded="false" aria-controls="collapseExample">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    信用卡
                                </label>
                            </div>
                            <div class="collapse" id="collapseExample">
                                <div class="input-group mb-3 mt-3">
                                    <span class="input-group-text" id="inputGroup-sizing-default">持卡人：</span>
                                    <input type="text" class="form-control" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="inputGroup-sizing-default">信用卡號：</span>
                                    <input type="text" class="form-control" maxlength="4">
                                    <span class="input-group-text">-</span>
                                    <input type="text" class="form-control" maxlength="4">
                                    <span class="input-group-text">-</span>
                                    <input type="text" class="form-control" maxlength="4">
                                    <span class="input-group-text">-</span>
                                    <input type="text" class="form-control" maxlength="4">
                                </div>
                                ....
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="card card-lg" style="width:800px">
                        <div class="card-body">
                            <h4>取貨方式</h4>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    宅配
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="card card-lg" style="width:800px">
                        <div class="card-body">
                            <h4>會員資料</h4>
                            <div class="form-floating mt-3 mb-3">
                                <input type="text" class="form-control" id="MemberName" v-model="MemberName" readonly="readonly">
                                <label for="MemberName">姓名 : </label>
                            </div>
                            <div class="form-floating mb-3 mt-3">
                                <input type="text" class="form-control" id="address" v-model="address">
                                <label for="address">地址 : </label>
                            </div>
                            <div class="form-floating mb-3 mt-3">
                                <input type="text" class="form-control" id="order_notes" v-model="order_notes">
                                <label for="order_notes">訂單備註或商品備註 : </label>
                                <p class="text-danger mt-2" v-if="isOrderNotesEmpty">訂單備註或商品備註為必填項目</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="card card-lg" style="width:800px">
                        <div class="card-body">
                            <h4>購買商品資訊</h4>
                            <div class="d-flex mt-3" v-for="item in ShoppingCart" :key="item.shopping_cart_id">
                                <div class="col">
                                    <!-- <img src="https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/2047ceddc1d91c629b3a04117178bde1.jpg" style="width: 50px;"> -->
                                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                                        xmlns="http://www.w3.org/2000/svg" role="img"
                                        aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"
                                        focusable="false">
                                        <title>{{ item.name }}{{item.members_id}}</title>
                                        <image :xlink:href="contextPath + '/pic/product/' + item.name + '.jpg'"
                                            width="100%" height="100%" />
                                    </svg>
                                </div>
                                <div class="col">{{item.name}}</div>
                                <div class="col">數量: {{item.quantity}}</div>
                                <div class="col"><i class="bi bi-currency-dollar"></i> {{item.selling_price}}</div>
                            </div>
                        </div>
                        <div class="container text-end mb-3">
                            共有 <span class="text-danger"
                                id="count">{{totalItemMemberCount?totalItemMemberCount:0}}</span> 項商品，數量 <span
                                class="text-danger" id="quantity">{{totalQuantity?totalQuantity:0}}</span> 個，訂單總額:
                            <span class="text-danger"><i class="bi bi-currency-dollar" id="price"></i>
                                {{totalPrice}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 確認接收商品會員資料和付款方式結束 -->

            <div class="container gap-2 py-3 d-flex justify-content-around mt-3">
                <a href="<c:url value='/ShoppingCartMember'/>">
                    <button class="btn btn-outline-primary" type="button">
                        上一步
                    </button>
                </a>
                <button class="btn btn-outline-success" type="button" @click="createOrders()">
                    送出訂單
                </button>
            </div>

        </div>

        <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
<script type="text/javascript">
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script type="text/javascript"
src="<c:url value='/js/ShoppingCart/shoppingCartMember-next.js'></c:url>"></script>

</body>

</html>