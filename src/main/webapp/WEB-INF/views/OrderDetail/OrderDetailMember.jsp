<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8" %> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>訂單細節</title>
  </head>

  <body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
    <div class="container">
      <!-- 開始 -->
      <h2 class="text-center py-3 mt-3">訂單細節</h2>
      <div class="row mb-3">
        <div class="col-auto text-success fw-bold h5">{{ order_status }}</div>
        <div class="col-auto fw-bold h5">下單日期：{{ placed }}</div>
        <div class="col-7 d-flex justify-content-end">
          <button class="btn btn-secondary" type="button">
            <a
              href="<c:url value='/OrderMember'/>"
              style="text-decoration: none; color: inherit"
              >返回訂單</a
            >
          </button>
        </div>
      </div>
      <!-- 訂單細節起始 -->
      <table class="table table-hover text-center">
        <thead class="table-primary">
          <tr>
            <th scope="col" hidden></th>
            <th scope="col">商品圖片</th>
            <th scope="col">商品名稱</th>
            <th scope="col">單價</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
            <th scope="col" v-if="order_status==='訂單完成'"></th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr v-for="item in OrderDetailData" :key="item.order_detail_id">
            <td hidden>
              {{ item.order_detail_id }}
              {{ item.order_id }}
            </td>
            <td>
              <svg
                class="bd-placeholder-img card-img-top"
                width="100%"
                height="225"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>{{ item.name }}</title>
                <image
                  :xlink:href="contextPath + '/pic/product/' + item.name + '.jpg'"
                  width="100%"
                  height="100%"
                />
              </svg>
            </td>
            <td class="align-middle">{{ item.name }}</td>
            <td class="align-middle">
              <i class="bi bi-currency-dollar"></i> {{ item.unit_price }}
            </td>
            <td class="align-middle">
              {{ item.quantity }}
            </td>
            <td class="align-middle">
              <i class="bi bi-currency-dollar"></i> {{ item.subtotal }}
            </td>
            <td class="align-middle" v-if="order_status === '訂單完成'">
              <!-- 帶著products_id跳轉頁面至商品評價 -->
              <button
                class="btn btn-outline-primary mb-2 mt-3 btn-lg"
                @click="reviewProductById(item.products_id, item.order_detail_id)"
              >
                評價
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 訂單細節結束 -->

      <div class="container py-3 d-flex justify-content-between">
        <div class="h4">到貨日期：{{ delivered_arrival }}</div>
        <div class="h4">
          訂單總額:
          <span class="text-danger"
            ><i class="bi bi-currency-dollar"></i> {{ total_amount }}</span
          >
        </div>
      </div>

      <!-- 結束 -->
    </div>
    <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>
    <script
      type="text/javascript"
      src="<c:url value='/js/OrderDetail/OrderDetailMember.js'></c:url>"
    ></script>
  </body>
</html>
