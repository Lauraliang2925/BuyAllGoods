<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>首頁</title>
  </head>

  <body style="padding-top: 8%">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
    <div class="container">
      <!-- 我是上方滑動廣告起始 -->
      <div class="container" style="height: 280px">
        <div
          id="myCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
          style="height: 250px"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="0"
              class="active"
              aria-label="Slide 1"
              aria-current="true"
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              class=""
            ></button>
            <button
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              class=""
            ></button>
          </div>
          <!-- !!!!!! -->

          <div class="carousel-inner" style="height: 250px">
            <!-- 廣告圖1開始 -->
            <div class="carousel-item active">
              <div class="d-flex justify-content-center">
                <img
                  src="<c:url value='/pic/advertisement/advertisement1.jpg'></c:url>"
                  alt="Slide 1 Image"
                  height="250px"
                />
              </div>
            </div>
            <!-- 廣告圖1結束 -->
          
            <!-- 廣告圖2開始 -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <img
                  src="<c:url value='/pic/advertisement/advertisement2.jpg'></c:url>"
                  alt="Slide 2 Image"
                  height="250px"
                />
              </div>
            </div>
            <!-- 廣告圖2結束 -->
          
            <!-- 廣告圖3開始 -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <img
                  src="<c:url value='/pic/advertisement/advertisement3.jpg'></c:url>"
                  alt="Slide 3 Image"
                  height="250px"
                />
              </div>
            </div>
            <!-- 廣告圖3結束 -->
          </div>
          
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- 我是上方滑動廣告結束 -->

      <div class="container" id="index">
        <!-- 上方Breadcrumb起始 -->
        <div aria-label="breadcrumb">
          <ol class="breadcrumb justify-content-center">
            <li class="breadcrumb-item active">
              <a href="<c:url value='/'/>">首頁</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <a>{{ categoriesName }}</a>
            </li>
          </ol>
        </div>
        <!-- 上方Breadcrumb結束 -->

        <div class="d-flex">
          <!--       插入左邊的工具列要包在 <div class="d-flex "></div> 裡面!! -->
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
                  :class="{ 'active bg-info': categoriesName == category.name }"
                  @click="selectCategoryIdByCategoryName(category.name)"
                >
                  {{ category.name }}
                </button>
              </li>
            </ul>
          </div>
          <!-- 左列商品分類內容結束 -->

          <!-- 中間商品內容起始 -->
          <div class="album py-5 bg-light container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div
                class="col"
                v-for="product in products"
                :key="product.productsId"
              >
                <div class="card shadow-sm h-100 d-flex flex-column">
                  <button
                    class="btn btn-link"
                    @click="showDetails(product.productsId)"
                  >
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
                      <title>{{ product.name }}</title>
                      <image
                        :xlink:href="contextPath + '/pic/product/' + product.name + '.jpg'"
                        width="100%"
                        height="100%"
                      />
                    </svg>
                  </button>

                  <div class="card-body d-flex flex-column">
                    <p class="card-text container fs-4 text-center flex-grow-1">
                      {{ product.name }}
                    </p>
                    <!-- 評分的星星開始 -->
                    <div class="d-flex align-items-center">
                      <star-rating
                      :increment="0.1"
                      :max-rating="5"
                      star-size="25"
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
                    <!-- 評分的星星結束 -->
                    <div
                      style="padding: 15px"
                      class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
                    >
                      <div class="fs-4 text-danger">
                        價格:$ {{ Math.floor(product.sellingPrice * product.discount) }}
                      </div>
                      <div class="d-flex flex-wrap align-items-center">
                        數量<input
                          type="number"
                          min="0"
                          style="width: 50px; height: 30px"
                          v-model="productQuantities[product.productsId]"
                        />
                      </div>
                    </div>
                    <div class="container">
                      <div
                        class="gap-2 d-flex justify-content-between align-items-center"
                      >
                        <button
                          class="btn btn-sm btn-outline-primary"
                          type="button"
                          @click="addFavorites(product.productsId)"
                        >
                          加入收藏清單
                        </button>
                        <button
                          class="btn btn-sm btn-outline-primary"
                          type="button"
                          @click="addShoppingcarts(product.productsId)"
                        >
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container d-flex justify-content-center py-5">
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
          </div>
          <!-- 中間商品內容結束 -->
        </div>
      </div>
    </div>

    <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
  </body>
  <script type="text/javascript">
    const contextPath = "${pageContext.request.contextPath}";
  </script>
  <script
    type="text/javascript"
    src="<c:url value='/js/index.js'></c:url>"
  ></script>
</html>
