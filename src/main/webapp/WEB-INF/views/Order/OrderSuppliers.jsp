<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ include file="/includes/libs.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>訂單</title>
    <!-- 訂單廠商 -->
</head>

<body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar_k.jsp" %>
        <div class="container">
            <!-- 開始 -->
            <h2 class="text-center py-3 mt-3">訂單</h2>
            <!-- <div class="rowd d-flex justify-content-end">
                <div class="col-auto">
                    <div class="input-group mb-3">
                        <button class="btn btn btn-outline-secondary" type="button">更新</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <select class="form-select" aria-label="Default select example">
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
                    <select class="form-select" aria-label="Default select example">
                        <option selected value="所有物流狀態">所有物流狀態</option>
                        <option value="配送中">配送中</option>
                        <option value="已送達">已送達</option>
                        <option value="事故">事故</option>
                    </select>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="estimated_arrival">預計到貨日期</span>
                        <input type="date" class="form-control" aria-label="estimated_arrival"
                            aria-describedby="estimated_arrival" id="estimatedArrivalDate">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="delivered_arrival">實際到貨日期</span>
                        <input type="date" class="form-control" aria-label="delivered_arrival"
                            aria-describedby="delivered_arrival">
                    </div>
                </div>
            </div> -->
            <div class="card mt-3">
                <table class="table table-hover">
                    <thead class="table-primary">
                        <tr class="align-middle">
                            <!-- <th scope="col">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck3" />
                                <label class="custom-control-label" for="customCheck3">All</label>
                            </div>
                        </th> -->
                            <th>
                                <div hidden>廠商編號</div>
                                訂單編號
                            </th>
                            <th>訂單狀態</th>
                            <th>下單日期</th>
                            <th>配送地址</th>
                            <th>訂單總價格</th>
                            <th>物流狀態</th>
                            <th>預計到貨日期</th>
                            <th>實際到貨日期</th>
                        </tr>
                    </thead>
                    <tbody class="table-light">
                        <!-- <tr v-for="item in orderDetailBySuppliers" :key="item.order_detail_id" class="align-middle"> -->
                            <!-- <td>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck3" />
                                <label class="custom-control-label" for="customCheck3"></label>
                            </div>
                        </td> -->
                        <!-- init start -->
                            <!-- <td>
                                <div hidden>{{item.suppliers_id}}{{item.order_detail_id}}</div>
                                {{item.order_id}}
                            </td>
                            <td class="text-success">{{item.order_status}}</td>
                            <td>{{item.placed}}</td>
                            <td>{{item.shipping_address}}</td>
                            <td class="text-danger"><i class="bi bi-currency-dollar"></i>
                                {{item.total_amount}}</td>
                            <td class="text-success">{{item.track_shipment}}</td>
                            <td>{{item.estimated_arrival}}</td>
                            <td class="text-primary">{{item.delivered_arrival}}</td>
                            <td><button class="btn btn btn-outline-secondary" type="button">更新</button></td>
                        </tr> -->
                        <!-- init end -->
                        <!-- test start -->
                        <!-- <tr v-for="item in orderDetailBySuppliers" :key="item.order_detail_id" class="align-middle"> -->
                            <!-- <td>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck3" />
                                <label class="custom-control-label" for="customCheck3"></label>
                            </div>
                        </td> -->
                            <!-- <td>
                                <div hidden>{{item.suppliers_id}}{{item.order_detail_id}}</div>
                                {{item.order_id}}
                            </td>
                            <td class="text-success">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>{{item.order_status}}</option>
                                    <option value="廠商確認中">廠商確認中</option>
                                    <option value="送貨中">送貨中</option>
                                    <option value="訂單完成">訂單完成</option>
                                    <option value="申請退貨中">申請退貨中</option>
                                    <option value="退貨完成">退貨完成</option>
                                </select>
                            </td>
                            <td>{{item.placed}}</td>
                            <td>{{item.shipping_address}}</td>
                            <td class="text-danger"><i class="bi bi-currency-dollar"></i>
                                {{item.total_amount}}</td>
                            <td class="text-success">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>{{item.track_shipment}}</option>
                                    <option value="配送中">配送中</option>
                                    <option value="已送達">已送達</option>
                                    <option value="事故">事故</option>
                                </select>
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="date" class="form-control" aria-label="estimated_arrival"
                                        aria-describedby="estimated_arrival" id="estimatedArrivalDate">
                                </div>
                            </td>
                            <td class="text-primary">
                                <div class="input-group">
                                    <input type="date" class="form-control" aria-label="delivered_arrival"
                                        aria-describedby="delivered_arrival">
                                </div>
                            </td>
                            <td><button class="btn btn btn-outline-secondary" type="button">更新</button></td>
                        </tr> -->
                        <!-- test end -->
                        <!-- 3455 -->
                        <tr v-for="item in orderDetailBySuppliers" :key="item.order_detail_id" class="align-middle">
                            <template v-if="item.order_status === '訂單完成' && item.track_shipment === '已送達' && item.estimated_arrival !== null && item.delivered_arrival !== null">
                                <td>
                                    <div hidden>{{item.suppliers_id}}{{item.order_detail_id}}</div>
                                    {{item.order_id}}
                                </td>
                                <td class="text-success">{{item.order_status}}</td>
                                <td>{{item.placed}}</td>
                                <td>{{item.shipping_address}}</td>
                                <td class="text-danger"><i class="bi bi-currency-dollar"></i>
                                    {{item.total_amount}}</td>
                                <td class="text-success">{{item.track_shipment}}</td>
                                <td>{{item.estimated_arrival}}</td>
                                <td class="text-primary">{{item.delivered_arrival}}</td>
                            </template>
                            <template v-else>
                                <td>
                                    <div hidden>{{item.suppliers_id}}{{item.order_detail_id}}</div>
                                    {{item.order_id}}
                                </td>
                                <td class="text-success">
                                    <select class="form-select" aria-label="Default select example" 
                                    v-model="item.order_status"
                                    @change="updateOrderStatus(item)">
                                        <option >{{item.order_status}}</option>
                                        <option value="訂單成立">訂單成立</option>
                                        <option value="廠商確認中">廠商確認中</option>
                                        <option value="送貨中">送貨中</option>
                                        <option value="訂單完成">訂單完成</option>
                                        <option value="申請退貨中">申請退貨中</option>
                                        <option value="退貨完成">退貨完成</option>
                                    </select>
                                </td>
                                <td>{{item.placed}}</td>
                                <td>{{item.shipping_address}}</td>
                                <td class="text-danger"><i class="bi bi-currency-dollar"></i>
                                    {{item.total_amount}}</td>
                                <td class="text-success">
                                    <select class="form-select" aria-label="Default select example"
                                    v-model="item.track_shipment"
                                    @change="updateOrderDetailBySuppliers(item)">
                                        <option selected>{{item.track_shipment}}</option>
                                        <option value="配送中">配送中</option>
                                        <option value="已送達">已送達</option>
                                        <option value="事故">事故</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="input-group">
                                        <input type="date" class="form-control" aria-label="estimated_arrival"
                                            aria-describedby="estimated_arrival" id="estimatedArrivalDate"
                                            v-model="item.estimated_arrival"
                                            @change="updateOrderDetailBySuppliers(item)">
                                    </div>
                                </td>
                                <td class="text-primary">
                                    <div class="input-group">
                                        <input type="date" class="form-control" aria-label="delivered_arrival"
                                            aria-describedby="delivered_arrival" 
                                            v-model="item.delivered_arrival"
                                            @change="updateOrderDetailBySuppliers(item)">
                                    </div>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 結束 -->
        </div>
        <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
<script type="text/javascript">
    const contextPath = "${pageContext.request.contextPath}";
</script>
<script type="text/javascript" src="<c:url value='/js/Order/OrderSuppliers.js'></c:url>"></script>
</body>

</html>