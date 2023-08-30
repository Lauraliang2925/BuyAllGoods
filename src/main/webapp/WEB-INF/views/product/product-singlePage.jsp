<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> <%@ include
file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>商品頁面</title>
  </head>

  <style>
    /* 調整預覽圖片顯示的高度 */
    .memberPhotoImg {
      height: 100px;
    }
  </style>

  <body style="padding-top: 8%">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp"%>
    <div class="container" id="app">
      <!-- 上方Breadcrumb起始 -->
      <div aria-label="breadcrumb">
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item active">
            <a href="<c:url value='/'/>">首頁</a>
          </li>
          <li class="breadcrumb-item active">
            <a :href="categoriesLink">{{ categoriesName }}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ name }}</li>
        </ol>
      </div>
      <!-- 上方Breadcrumb結束 -->

      <div class="d-flex mb-5 bg-light container border p-3 rounded">
        <!-- 左列商品分類內容起始 -->
        <div
          class="d-flex flex-column flex-shrink-0 p-3 bg-light"
          style="width: 280px"
        >
          <svg class="d-flex align-items-center" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span class="fs-4 text-center">商品分類</span>
          <hr />
          <ul
            class="nav nav-pills flex-column mb-3 align-items-center fs-5"
            v-for="category in categories"
            :key="category.categoriesId"
          >
            <li class="nav-item">
              <button
                class="nav-link link-dark"
                @click="selectCategoryIdByCategoryName(category.name)"
                :class="{ 'active bg-info': categoriesName == category.name }"
              >
                {{ category.name }}
              </button>
            </li>
          </ul>
        </div>
        <!-- 左列商品分類內容結束 -->

        <!-- 中間商品圖片起始 -->
        <div class="album py-5 bg-light container">
          <svg
            width="350"
            height="350"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>{{ name }}</title>
            <image
              :xlink:href="contextPath + '/pic/product/'+name+'.jpg'"
              width="100%"
              height="100%"
            />
          </svg>
        </div>
        <!-- 中間商品圖片結束 -->

        <!-- 右側商品敘述起始 -->
        <div class="bg-light card-body py-5 container">
          <div class="mb-3">
            <star-rating
              :increment="0.1"
              :max-rating="5"
              star-size="40"
              :animate="false"
              :active-color="['#ae0000','orange']"
              :active-border-color="['#F6546A','#a8c3c0']"
              :border-width="4"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              :active-on-click="true"
              :clearable="true"
              :padding="3"
              :rating="calculateRating"
              :read-only="true"
            ></star-rating>
          </div>
          <div class="fs-3 fw-bold mb-2">商品名稱: {{ name }}</div>
          <div class="">商品編號: {{ productsId }}</div>
          <br />
          <div
            class="d-flex container fs-9 text-danger"
            v-if="isShowDiscountDate"
          >
            <div>優惠倒數：</div>
            <div id="countdown"></div>
          </div>
          <div class="container fs-5" v-if="isShowDiscountDate">
            優惠期限: {{ discountStartDate }} ~ {{ discountEndDate }}
          </div>
          <br />
          <!-- 商品敘述/注意事項起始 -->
          <div class="bd-example-snippet bd-code-snippet">
            <div class="bd-example">
              <nav>
                <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                  <button
                    class="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    商品規格
                  </button>
                  <button
                    class="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                    tabindex="-1"
                  >
                    商品敘述
                  </button>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div
                  class="tab-pane fade active show"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <p>{{ productsSpecification }}</p>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <p>{{ productsDescription }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 商品敘述/注意事項結束 -->
          <br />

          <!-- 商品價格/數量/優惠券起始 -->
          <div class="container d-flex justify-content-around">
            <div class="fs-4 fw-bold" v-if="discount>=1">
              價格:$ {{ sellingPrice }}
            </div>

            <div
              class="container d-flex justify-content-around align-items-center"
              v-else
            >
              <del class="fs-5">原價:$ {{ sellingPrice }}</del>
              <div class="fs-4 fw-bold text-danger">
                優惠價格:$ {{ Math.floor(sellingPrice * discount) }}
              </div>
            </div>
          </div>
          <br />

          <div
            class="container d-flex justify-content-around align-items-center"
          >
            <div class="container">
              商品剩餘數量:{{ total - orderQuantity - soldQuantity }}
            </div>
            <div class="container">
              數量<input
                type="number"
                min="0"
                style="width: 50px; height: 30px"
                v-model="quantity"
              />
            </div>
          </div>

          <div class="container gap-2 py-3 d-flex justify-content-around">
            <button
              class="btn btn-sm btn-outline-primary"
              type="button"
              @click="addFavorites(productsId)"
            >
              加入收藏清單
            </button>
            <button
              class="btn btn-sm btn-outline-primary"
              type="button"
              @click="addShoppingcarts(productsId)"
            >
              加入購物車
            </button>
          </div>

          <!-- 商品價格/數量/優惠券結束 -->
        </div>
        <!-- 右側商品敘述結束 -->
      </div>




      <!-- 留言板樣式 -->

      <div
        class="mb-3 py-3 bg-light container border p-3 rounded col-sm-6"
        v-for="product in products"
        :key="product.productsId"
      >
        <!-- 評價編號（隱藏） -->
        <div class="mb-3 row" hidden>
          <label for="reviewId" class="col-sm-4 col-form-label">評價編號</label>
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="reviewId"
              :value="product.reviewId"
            />
          </div>
        </div>
        <!-- 會員編號（隱藏） -->

        <div class="mb-3 row" hidden>
          <label for="membersId" class="col-sm-4 col-form-label"
            >會員編號</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="membersId"
              :value="product.membersId"
            />
          </div>
        </div>

        <!-- 產品編號（隱藏） -->
        <div class="mb-3 row" hidden>
          <label for="productsId" class="col-sm-4 col-form-label"
            >產品編號</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="productsId"
              :value="product.productsId"
            />
          </div>
        </div>
        <!-- 訂單細節編號（隱藏） -->
        <div class="mb-3 row" hidden>
          <label for="orderDetailId" class="col-sm-4 col-form-label"
            >訂單細節編號</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="orderDetailId"
              :value="product.orderDetailId"
            />
          </div>
        </div>
        <div class="d-flex justify-content-between mb-3">

          <div >
            <star-rating
              :increment="1"
              :max-rating="5"
              star-size="30"
              :animate="false"
              :active-color="['#ae0000','orange']"
              :active-border-color="['#F6546A','#a8c3c0']"
              :border-width="4"
              :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
              :active-on-click="true"
              :clearable="true"
              :padding="3"
              :rating="product.rating"
              :read-only="true"
            ></star-rating>
          </div>

          <!-- 會員登入可以按讚，只能按一次 -->
          <!-- <div class="">
            <button class="btn btn-light" :disabled="!userLoggedIn" @click="toggleLike(product.reviewId)">
              {{ product.likesCount }}
              <i v-if="!liked" class="fa-regular fa-thumbs-up fa-bounce fa-xl"></i>
              <i v-else class="fa-solid fa-thumbs-up fa-xl" ></i>
            </button>
            
          </div> -->
        </div>

        <div class="d-flex mb-3">
          <div>
            <img
              :src="product.memberPhotoPath"
              alt="Preview"
              class="memberPhotoImg"
            />
          </div>

          <div class="mx-3 row">
            <label for="membersId" class=""></label>
            <div class="col-sm-8">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="membersId"
                :value="product.memberName"
              />
            </div>
          </div>
        </div>
        <!-- 商品評價標題 -->

        <!-- 詳細原因及說明 -->
        <div class="mb-3">
          <label for="comment" class="form-label">詳細原因及說明: </label>
          {{ product.comment == NULL ? "N/A" : product.comment }}
        </div>
        <div class="mb-3">
          日期：{{
            product.createdDate.substring(0, 10) +
              " " +
              product.createdDate.substring(11, 19)
          }}
        </div>
      </div>
      <!-- 留言板樣式結束 -->

      <div class="container d-flex justify-content-center" v-if="isShowPaginate">
        <!-- 我是分頁 -->
        <paginate
          first-last-button="true"
          first-button-text="&lt;&lt;"
          last-button-text="&gt;&gt;"
          prev-text="&lt;"
          next-text="&gt;"
          :page-count="pages"
          :initial-page="current"
          :click-handler="handlePaginationClick"
        ></paginate>
        <!-- 我是分頁 -->
      </div>

      <br />

      <div class="py-3 d-flex justify-content-end">
        <button class="btn btn-outline-success" @click="goBack">
          回到上一頁
        </button>
      </div>
    </div>

    <%@ include file="/WEB-INF/views/toolbar/footer.jsp"%>
  </body>
  <script type="text/javascript">
    const contextPath = "${pageContext.request.contextPath}";
  </script>

  <script
    type="text/javascript"
    src="<c:url value='/js/product/product-singlePage.js'></c:url>"
  ></script>
</html>
