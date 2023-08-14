<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    <%@taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
    <%@ include file="/includes/libs.jsp" %>

<!DOCTYPE html>
<html>
 <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>首頁</title>

  </head>

  <body style="padding-top: 8%;" >
    
      <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
    <div class="container" >

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
            <div class="carousel-item ">
              <img src="<c:url value='/pic/advertisement/advertisement1.jpg'></c:url>" alt="Slide 1 Image" height="250px" >
              
              <svg
                class="bd-placeholder-img"
                width="100%"
                height="300px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                
              >
              </svg>
        
            </div>
            <div class="carousel-item active">
              <img src="<c:url value='/pic/advertisement/advertisement2.jpg'></c:url>" alt="Slide 1 Image" height="250px" class="justify-content-center">
              <svg
                class="bd-placeholder-img"
                width="100%"
                height="300px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
              </svg>

            </div>
            <div class="carousel-item">
              <img src="<c:url value='/pic/advertisement/advertisement3.jpg'></c:url>" alt="Slide 1 Image" height="250px">
              <svg
                class="bd-placeholder-img"
                width="100%"
                height="300px"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
              </svg>
         
            </div>
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

      <div class="d-flex " id="index">
      
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
        class="nav nav-pills  flex-column mb-3 align-items-center fs-5"
        v-for="category in categories"
        :key="category.categoriesId"
      >
<!-- 
	  <li class="nav-item ">
		<a href="#" class="nav-link active" aria-current="page">
		  <svg class="bi me-2 "  width="16" height="16">
			<use xlink:href="#home"></use>
		  </svg>
		  特價商品
		</a>
	  </li> 
	-->
	  <li class="nav-item" >
      <button class="nav-link link-dark " 
      :class="{ active: categoriesName == category.name }"
      @click="selectCategoryIdByCategoryName(category.name)">
        {{ category.name }}
      </button>
    </li>

      </ul>
    </div>
    <!-- 左列商品分類內容結束 -->

        <!-- 中間商品內容起始 -->
        <div class="album py-5 bg-light container"  >
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col" v-for="product in products" :key="product.productsId">
                
                <div class="card shadow-sm">
                  <button class="btn btn-link" @click="showDetails(product.productsId)">

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
                    <title>{{product.name}}</title>
                    <image                  
                      :xlink:href="contextPath + '/pic/product/' + product.name + '.jpg'"
                      width="100%"
                      height="100%"
                    />
                  </svg>

                  </button>
                
             


                  <div class="card-body">
                    <p class="card-text container fs-4 text-center">{{product.name}}</p>
                    <div
                      style="padding: 15px"
                      class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
                    >
                      <div class="fs-4 text-danger">價格:{{product.sellingPrice*product.discount}}</div>
                      <div class="d-flex flex-wrap align-items-center">
                        數量<input
                          type="number"
                          min="0"
                          style="width: 50px; height: 30px"
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
                        >
                          加入收藏清單
                        </button>
                        <button
                          class="btn btn-sm btn-outline-primary"
                          type="button"
                        >
                          加入購物車
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container d-flex justify-content-center py-5" >
              <!-- 我是分頁 -->
              <paginate 
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
        <!-- 中間商品內容結束 -->
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