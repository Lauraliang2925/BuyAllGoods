<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core"%> 

<!-- <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title></title>
  </head> -->
  <!-- <body id="app"> -->
    <!-- 左列商品分類內容起始 -->
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style="width: 280px"
      id="leftbar"
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
	  <li class="nav-item">
		<a href="#" class="nav-link link-dark">
		  {{category.name}}
		</a>
	  </li>

      </ul>
    </div>
    <!-- 左列商品分類內容結束 -->
    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>
    <script
      type="text/javascript"
      src="<c:url value='/js/toolbar/leftbar.js'></c:url>"
    ></script>
  <!-- </body> -->
<!-- </html> -->