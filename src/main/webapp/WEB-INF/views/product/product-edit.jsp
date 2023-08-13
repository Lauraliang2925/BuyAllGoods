<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>商品編輯</title>
    <style>
      /* 調整預覽圖片顯示的高度 */
      .preview-image {
        height: 200px;
      }
    </style>
  </head>
  <body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>

    <div class="container">
      <div class="d-flex">
        <!-- 商品表格起始 -->

        <div class="py-5 container col-sm-6">
            <div class="mb-3 row">
              <label for="productsId" class="col-sm-4 col-form-label"
                >品項編號</label
              >

              <div class="col-sm-8">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  v-model="productsId"
                  name="productsId"
                />
              </div>
            </div>

            <div class="mb-3 row">
              <label for="name" class="col-form-label col-sm-4">商品名稱</label>
              <div class="col-sm-8">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="name"
                v-model="name"
              />
            </div>
            
            </div>

            <div class="mb-3">
              <label for="files" class="col-form-label col-sm-4"
                >商品圖片(單張)</label
              >
              <file-upload
                input-id="files"
                input-name="files"
                v-model="files"
                class="btn btn-success"
                accept=".jpg"
                @change="previewImage"
                >選擇檔案</file-upload
              >
            </div>

            <div class="mb-3">
              圖片預覽
              <img
                :src="previewUrl"
                alt="Preview"
                class="preview-image"
              />
            </div>
            <!-- v-if="previewUrl" -->

            <button class="btn btn-success" @click="doUpload">上傳圖片</button>

            <hr />

            <div class="mb-3">
              <label for="suppliersId" class="col-form-label col-sm-4"
                >廠商編號</label
              >
              <select
                class="col-form-select form-select-sm col-sm-7"
                v-model="suppliersId"
                name="suppliersId"
              >
                <!-- <option selected>選擇廠商編號</option> -->
                <option
                  v-for="suppliersId in filteredSuppliersIds"
                  :key="suppliersId"
                  :value="suppliersId"
                >
                  {{ suppliersId }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="contractsId" class="col-form-label col-sm-4"
                >合約編號</label
              >
              <select
                class="col-form-select form-select-sm col-sm-7"
                v-model="contractsId"
                name="contractsId"
              >
                <!-- <option selected value="">選擇合約編號</option> -->
                <option
                  v-for="contractsId in filteredContractsIds"
                  :key="contractsId"
                  :value="contractsId"
                >
                  {{ contractsId }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="categoriesId" class="col-form-label col-sm-4"
                >分類</label
              >
              <select
                class="col-form-select form-select-sm col-sm-7"
                v-model="categoriesId"
                name="categoriesId"
              >
                <!-- <option selected>選擇商品分類</option> -->
                <option
                  v-for="categoriesId in filteredCategoriesIds"
                  :key="categoriesId"
                  :value="categoriesId"
                >
                  {{ categoriesId }}
                </option>
              </select>
            </div>

            <hr />

            <div class="mb-3 row" hidden>
              <label for="imagePath" class="col-form-label col-sm-4"
                >商品路徑</label
              >
              <input
                type="text"
                class="col-form-control col-sm-8"
                id="imagePath	"
                v-model="imagePath"
              />
            </div>

            <div class="mb-3">
              <label for="productsSpecification" class="form-label"
                >商品規格</label
              >
              <textarea
                class="form-control"
                id="productsSpecification	"
                v-model="productsSpecification"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="productsDescription" class="form-label"
                >商品說明</label
              >
              <textarea
                class="form-control"
                id="productsDescription"
                v-model="productsDescription"
              ></textarea>
            </div>

            <div class="mb-3 row">
              <label for="sellingPrice" class="col-form-label col-sm-4"
                >商品售價</label
              >
              <input
                type="number"
                class="col-form-control col-sm-8"
                id="sellingPrice	"
                v-model="sellingPrice"
              />
            </div>

            <div class="mb-3 row">
              <label for="cost" class="col-form-label col-sm-4">商品成本</label>
              <input
                type="number"
                class="col-form-control col-sm-8"
                id="cost	"
                v-model="cost"
              />
            </div>

            <div class="mb-3 row">
              <label for="lowestPrice" class="col-form-label col-sm-4"
                >最低單價</label
              >
              <input
                type="number"
                class="col-form-control col-sm-8"
                id="lowestPrice	"
                v-model="lowestPrice"
              />
            </div>

            <div class="mb-3 row">
              <label for="total" class="col-form-label col-sm-4"
                >商品總數量</label
              >
              <input
                type="number"
                class="col-form-control col-sm-8"
                id="total	"
                v-model="total"
              />
            </div>

            <div class="mb-3 row">
              <label for="orderQuantity" class="col-form-label col-sm-4"
                >下單數量</label
              >
              <input
                type="number"
                readonly
                class="col-form-control col-sm-8"
                id="orderQuantity  "
                v-model="orderQuantity"
              />
            </div>

            <div class="mb-3 row">
              <label for="soldQuantity" class="col-form-label col-sm-4"
                >售出數量</label
              >
              <input
                type="number"
                readonly
                class="col-form-control col-sm-8"
                id="soldQuantity  "
                v-model="soldQuantity"
              />
            </div>

            <div class="mb-3 row">
              <label for="expiryDate" class="col-form-label col-sm-4"
                >商品有效期限</label
              >
              <input
                type="date"
                class="col-form-control col-sm-8"
                id="expiryDate"
                v-model="expiryDate"
              />
            </div>

            <div class="mb-3 row">
              <label for="sellingStartDate" class="col-form-label col-sm-4"
                >販售開始日期</label
              >
              <input
                type="date"
                class="col-form-control col-sm-8"
                id="sellingStartDate"
                v-model="sellingStartDate"
              />
            </div>

            <div class="mb-3 row">
              <label for="sellingStopDate" class="col-form-label col-sm-4"
                >販售停止日期</label
              >
              <input
                type="date"
                class="col-form-control col-sm-8"
                id="sellingStopDate"
                v-model="sellingStopDate"
              />
            </div>

            <div class="mb-3 row">
              <label for="discountStartDate" class="col-form-label col-sm-4"
                >優惠期間開始日期</label
              >
              <input
                type="date"
                class="col-form-control col-sm-8"
                id="discountStartDate"
                v-model="discountStartDate"
              />
            </div>

            <div class="mb-3 row">
              <label for="discountEndDate" class="col-form-label col-sm-4"
                >優惠期間結束日期</label
              >
              <input
                type="date"
                class="col-form-control col-sm-8"
                id="discountEndDate"
                v-model="discountEndDate"
              />
            </div>

            <div class="mb-3 row">
              <label for="discount" class="col-form-label col-sm-4"
                >優惠打折</label
              >
              <input
                type="number"
                class="col-form-control col-sm-8"
                id="discount	"
                v-model="discount"
              />
            </div>

            <div class="mb-3 row">
              <label for="staffId" class="col-sm-4 col-form-label"
                >新增人員</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  readonly
                  class="form-control-plaintext"
                  id="staffId"
                  v-model="staffId"
                />
              </div>
            </div>

            <!-- <div class="mb-3 row">
                          <label for="createdDate" class="col-form-label col-sm-4">新增日期</label>
                          <input type="date" class="col-form-control col-sm-8" id="createdDate"
                          v-model="createdDate" readonly>
                        </div> -->
          

          <div class="container gap-2 py-3 d-flex justify-content-around">
            <a href="<c:url value='/product-list'></c:url>">
              <button class="btn btn-primary" type="button">
                回到商品清單
              </button>
            </a>

            <button
              class="btn btn-primary"
              type="button"
              @click="update(productsId)"
            >
              確定修改
            </button>
          </div>
        </div>
        <!-- 商品表格結束 -->
      </div>
    </div>

    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>

    <script
      type="text/javascript"
      src="<c:url value='/js/product/product-edit.js'></c:url>"
    ></script>
  </body>
</html>
