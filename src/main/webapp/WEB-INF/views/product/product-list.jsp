<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>商品查詢</title>
  </head>
  <style>
    /* 調整預覽圖片顯示的高度 */
    .productImg {
      height: 100px;
    }
  </style>
  <body style="padding-top: 8%">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp"%>

    <div class="container"  id="app">
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~table上方條件輸入框~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <div>
        <!-- 廠商ID輸入框 -->
        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >商品名稱</span
              >
              <input
                type="text"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                @blur="findByCustomQuery()"
                v-model="findProductsName"
              />
            </div>
          </div>

          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >廠商名稱</span
              >
              <select
                class="form-select"
                aria-label="Default select example"
                style="width: 200px"
                v-model="findSuppliersId"
                @change="findByCustomQuery()"
              >
                <option selected value="">[請選擇廠商名稱]</option>
                <!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
                <option
                  v-for="supplier in suppliersFullData"
                  :key="supplier.suppliersId"
                  :value="supplier.suppliersId"
                >
                  {{ supplier.suppliersName }}
                </option>
              </select>
            </div>
          </div>

          <!-- 合約ID輸入框 -->
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >合約編號</span
              >
              <select
                class="form-select"
                aria-label="Default select example"
                style="width: 200px"
                v-model="findContractsId"
                @change="findByCustomQuery()"
              >
                <option selected value="">[請選擇合約編號]</option>
                <!--~~~~~~~~~~~~~~~~~~用迴圈~~~~~~~~~~~~~~~~~~-->
                <option
                  v-for="contract in contractFullData"
                  :key="contract.contractsId"
                  :value="contract.contractsId"
                >
                  {{ contract.contractNumber }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- table本體 -->
      <div>
        <table
          class="table table-bordered caption-top table-hover text-center align-middle mb-5"
        >
          <caption
            style="font-size: 30px; text-align: center; margin-bottom: 10px"
          >
            商品查詢
          </caption>
          <thead class="table-primary">
            <tr>
              <th scope="col">品項編號</th>
              <th scope="col">商品圖片</th>
              <th scope="col">商品名稱</th>
              <th scope="col">商品狀態</th>
              <th scope="col">分類名稱</th>
              <th scope="col">廠商名稱</th>
              <th scope="col">合約編號</th>
              <th scope="col">詳細資訊</th>
            </tr>
          </thead>
          <!--~~~~~~~~~~界接後端(用迴圈產出清單)~~~~~~~-->
          <tbody class="table-light">
            <!-- <template v-if="findInputsNotEmpty"> -->
            <tr v-for="product in products" :key="product.productsId">
              <td>{{ product.productsId }}</td>
              <td>
                <img
                  :src="contextPath + '/pic/product/' + product.name + '.jpg'"
                  class="productImg"
                />
              </td>
              <td>{{ product.name }}</td>
              <td>
                <div v-if="new Date(product.sellingStopDate)<yesterdayDate">
                  <i
                    class="fa-regular fa-circle-xmark"
                    style="color: #ff0000"
                  ></i
                  >已下架
                </div>
                <div v-if="new Date(product.sellingStopDate)>yesterdayDate">
                  <i class="fa-solid fa-sack-dollar" style="color: #005eff"></i
                  >販售中
                </div>
              </td>
              <template>
                <td>{{ product.categoriesId }}</td>
              </template>
              <td>{{ findCategoriesNameById(product.categoriesId) }}</td>

              <template>
                <td>{{ product.suppliersId }}</td>
              </template>
              <td>{{ findSuppliersNameById(product.suppliersId) }}</td>

              <template>
                <td>{{ product.contractsId }}</td>
              </template>
              <td>{{ findContractsNameById(product.contractsId) }}</td>

              <td>
                <button
                  class="btn btn-outline-dark"
                  @click="showDetails(product.productsId)"
                >
                  <i
                    class="fa-solid fa-magnifying-glass"
                    style="color: #ffa424"
                  ></i
                  >查看
                </button>
              </td>
            </tr>
            <!-- </template> -->
          </tbody>
        </table>

        <div class="container d-flex justify-content-center">
          <!-- 我是分頁 -->
          <paginate
            v-show="showPaginate"
            first-last-button="true"
            first-button-text="&lt;&lt;"
            last-button-text="&gt;&gt;"
            prev-text="&lt;"
            next-text="&gt;"
            :page-count="pages"
            :initial-page="current"
            :click-handler="selectAllproduct"
          ></paginate>
          <!-- 我是分頁 -->
        </div>
      </div>
    

    <div class="container d-flex justify-content-center py-3">
      <div>
        <button class="btn btn-outline-success" @click="selectAllproduct()">
          檢視完整商品清單
        </button>
      </div>
    </div>
  </div>

    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>

    <script
      type="text/javascript"
      src="<c:url value='/js/product/product-list.js'></c:url>"
    ></script>
  </body>
</html>
