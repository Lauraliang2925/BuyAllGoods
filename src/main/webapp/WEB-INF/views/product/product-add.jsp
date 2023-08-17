<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>商品新增</title>
  </head>
  <style>
    /* 調整預覽圖片顯示的高度 */
    .preview-image {
      height: 200px;
    }
  </style>
  <body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>

    <div class="container">
      <div class="d-flex">
        <!-- 商品表格起始 -->

        <div class="py-5 container col-sm-6">
          <div class="mb-3 row">
            <label for="name" class="col-form-label col-sm-4">商品名稱</label>
            <input
              type="text"
              class="col-form-control col-sm-4"
              id="name"
              v-model="name"
              @input="checkNamePrecise()"
            />
            <div class="col-form-control col-sm-4">{{ isProductExist }}</div>
          </div>

          <div class="mb-3">
            <label for="files" class="col-form-label col-sm-4"
              >商品圖片(單張)</label
            >
            <file-upload
              input-id="files"
              input-name="files"
              v-model="files"
              class="btn btn-outline-success"
              accept=".jpg"
              :disabled="name.length === 0"
              @change="previewImage"
              >選擇檔案</file-upload
            ><span class="text-danger">{{ pleaseInputProductName }}</span>
          </div>

          <div class="mb-3">
            圖片預覽
            <img
              v-if="previewUrl"
              :src="previewUrl"
              alt="Preview"
              class="preview-image"
            />
          </div>

          <button class="btn btn-outline-success" @click="doUpload">上傳圖片</button>
          <hr />

          <div class="mb-3">
            <label for="suppliersId" class="col-form-label col-sm-4"
              >廠商名稱</label
            >
            <select
              class="col-form-select form-select-sm col-sm-7"
              v-model="suppliersId"
              name="suppliersId"
            >
              <!-- <option selected>選擇廠商名稱</option> -->
              <option
                v-for="supplier in suppliersFullData"
                :key="supplier.suppliersId"
                :value="supplier.suppliersId"
              >
                {{ supplier.suppliersName }}
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
                v-for="contract in contractFullData"
                :key="contract.contractsId"
                :value="contract.contractsId"
              >
                {{ contract.contractNumber }}
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
                v-for="category in categoriesFullData"
                :key="category.categoriesId"
                :value="category.categoriesId"
              >
                {{ category.name }}
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
            <label for="productsDescription" class="form-label">商品說明</label>
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

          <div class="mb-3 row" hidden>
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
            <label for="expiryDate" class="col-form-label col-sm-4"
              >商品有效期限</label
            >
            <input
              type="date"
              class="col-form-control col-sm-8"
              id="expiryDate"
              v-model="expiryDate"
              @blur="checkExpiryDate()"
            />
            <span id="" class="form-text" style="color: red">{{
              expiryDateMessage
            }}</span>
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
              @blur="checkSellingStartDate()"
            />
            <span id="" class="form-text" style="color: red">{{
              sellingStartDateMessage
            }}</span>
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
              @blur="checkSellingEndDate()"
            />
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="sellingEndDateMessage!=''&&sellingDateMessage!=''"
            >
              1.{{ sellingEndDateMessage }}<br />2.{{ sellingDateMessage }}
            </span>
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="sellingEndDateMessage==''&&sellingDateMessage!=''"
            >
              {{ sellingDateMessage }}</span
            >
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="sellingEndDateMessage!=''&&sellingDateMessage==''"
            >
              {{ sellingEndDateMessage }}</span
            >
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
              @blur="checkDiscountStartDate()"
            />
            <span id="" class="form-text" style="color: red">
              {{ discountSellingStartDateMessage }}</span
            >
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
              @blur="checkDiscountStopDate()"
            />
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="discountDateMessage!=''&&discountSellingStopDateMessage!=''"
            >
              1.{{ discountSellingStopDateMessage }}<br />2.{{
                discountDateMessage
              }}
            </span>
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="discountDateMessage==''&&discountSellingStopDateMessage!=''"
            >
              {{ discountSellingStopDateMessage }}</span
            >
            <span
              id=""
              class="form-text"
              style="color: red"
              v-if="discountDateMessage!=''&&discountSellingStopDateMessage==''"
            >
              {{ discountDateMessage }}</span
            >
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

          <div class="mb-3 row" hidden>
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

          <div class="container gap-2 py-3 d-flex justify-content-around">
            <a href="<c:url value='/product-list'></c:url>">
              <button class="btn btn-outline-primary" type="button">
                回到商品清單
              </button>
            </a>

            <button class="btn btn-outline-primary" type="button" @click="create()">
              確定新增
            </button>
          </div>
        </div>
        <!-- 商品表格結束 -->
      </div>
    </div>

    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
      type = "text/javascript";
    </script>
    <script src="<c:url value='/js/product/product-add.js'></c:url>"></script>
  </body>
</html>
