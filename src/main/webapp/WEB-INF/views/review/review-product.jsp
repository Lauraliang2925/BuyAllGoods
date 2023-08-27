<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>商品評價</title>
  </head>
  <style>
    /* 調整預覽圖片顯示的高度 */
    .productImg {
      height: 100px;
    }
  </style>
  <body style="padding-top: 8%">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp"%>

    <div class="container" id="app">
      <!-- 留言板樣式 -->

      <div class="py-5 bg-light container border p-3 rounded col-sm-6">
           <!-- 會員編號（隱藏） -->
           <div class="mb-3 row" hidden>
            <label for="membersId" class="col-sm-4 col-form-label">會員編號</label>
            <div class="col-sm-8">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="membersId"
                v-model="membersId"
              />
            </div>
          </div>
             <!-- 產品編號（隱藏） -->
        <div class="mb-3 row" hidden>
          <label for="productsId" class="col-sm-4 col-form-label">產品編號</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="productsId"
              v-model="productsId"
            />
          </div>
        </div>
           <!-- 訂單細節編號（隱藏） -->
           <div class="mb-3 row" hidden>
            <label for="orderDetailId" class="col-sm-4 col-form-label">訂單細節編號</label>
            <div class="col-sm-8">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="orderDetailId"
                v-model="orderDetailId"
              />
            </div>
          </div>
        <div class="d-flex justify-content-between">
          <div>
            <h4 class="mb-4">商品評價</h4>
          </div>

          <div>
            <star-rating
              :increment="1"
              :max-rating="5"
              star-size="30"
              :animate="true"
              :active-color="['#ae0000','orange']"
              :active-border-color="['#F6546A','#a8c3c0']"
              :border-width="4"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              :active-on-click="true"
              :clearable="true"
              :padding="3"              
              @update:rating ="setRating"
              
            ></star-rating>
          </div>
          
        </div>
        <!-- 商品評價標題 -->

        <hr />


        <div class="d-flex justify-content-between">
          <div>
            <h4 class="mb-4">{{name}}</h4>
          </div>

          <div>
            <!-- 商品圖片 -->
            <img
              v-if="previewUrl"
              :src="previewUrl"
              alt="Preview"
              class="productImg"
            />
          </div>
          
        </div>

        <!-- 商品規格 -->
        <div class="mb-3">
          <label for="comment" class="form-label">詳細原因及說明</label>
          <textarea
            class="form-control"
            id="comment"
            v-model="comment"
            placeholder="詳細原因及說明"
          ></textarea>
        </div>

   

     

        <!-- 按鈕 -->
        <div class="container gap-2 py-3 d-flex justify-content-around">
          <a href="<c:url value='/'></c:url>">
            <button class="btn btn-outline-primary" type="button">
              回首頁
            </button>
          </a>

          <button
            class="btn btn-outline-primary"
            type="button"
            @click="createReview()"
          >
            確定新增
          </button>
        </div>
      </div>
      <!-- 留言板樣式結束 -->

      <!-- 留言板樣式1開始 -->

      <!-- <div class="row mt-3">
        <div class="col-md-12 d-flex justify-content-center">
          <div class="card card-lg" style="width: 800px">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="fs-4">商品評價</div>
                <div>
                  <star-rating
                    v-bind:increment="0.1"
                    v-bind:max-rating="5"
                    inactive-color="#000"
                    active-color="orange"
                    v-bind:star-size="30"
                  >
                  </star-rating>
                </div>
              </div>

              <hr />
              <div class="d-flex mt-3">
                <div class="col">
                  <image
                    class="productImg"
                    src="/buyallgoods/pic/product/洗衣機.jpg"
                  ></image>
                </div>
                <div class="col">洗衣機</div>
                <div class="col">數量: 2</div>
                <div class="col">
                  <i class="bi bi-currency-dollar"></i> 25610
                </div>
              </div>
            </div>
            <div class="container text-end mb-3">
              共有 <span class="text-danger" id="count">1</span> 項商品，數量
              <span class="text-danger" id="quantity">2</span> 個，訂單總額:
              <span class="text-danger"
                ><i class="bi bi-currency-dollar" id="price">51220</i>
              </span>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 留言板樣式1結束 -->
    </div>

    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>

    <script
      type="text/javascript"
      src="<c:url value='/js/review/review-product.js'></c:url>"
    ></script>
  </body>
</html>
