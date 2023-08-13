<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ include file="/includes/libs.jsp"%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>分類編輯</title>
   
  </head>

  <body style="padding-top: 8%" id="app">
    <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
    <div class="container">
      <h2 class="text-center py-3">分類編輯</h2>
      <!-- 商品分類清單起始 -->
      <table
        class="table table-hover text-center w-auto container"
        v-show="isShowSelect"
      >
        <thead class="table-primary">
          <tr>
            <th hidden>商品分類ID</th>
            <th>商品分類名稱</th>
            <td></td>
            <th></th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr v-for="category in categories" :key="category.categoriesId">
            <td hidden>{{ category.categoriesId }}</td>
            <td>{{ category.name }}</td>
            <td></td>
            <td>
              <div class="container gap-5" style="width: 150px">
                <button
                  class="btn btn-sm btn-outline-primary"
                  type="button"
                  @click="findById(category.categoriesId)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="deleted(category.categoriesId)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td hidden></td>
            <td>
              <label for="name" class="col-form-label col-sm-4">分類名稱</label>
              <input
                type="text"
                class="col-form-control col-sm-6"
                id="name"
                v-model="name"
                @input="checkName()"
                placeholder="請輸入分類名稱"
              />
            </td>
            <td>
              <div class="container gap-5" style="width: 150px">
                <button
                  class="btn btn-sm btn-outline-success"
                  type="button"
                  @click="create()"
                >
                  新增分類
                </button>
              </div>
            </td>
            <td>{{ nameExistsMsg }}</td>
          </tr>
        </tfoot>
      </table>
      <!-- 商品分類清單結束 -->

      

      <div class="container d-flex justify-content-center">
        
        <!-- 我是分頁 -->
    
        <paginate
          v-show="isShowSelect"          
          first-last-button="true"
          first-button-text="&lt;&lt;"
          last-button-text="&gt;&gt;"
          prev-text="&lt;"
          next-text="&gt;"
          :page-count="pages"
          :initial-page="current"
          :click-handler="selectAllcategories"
          :container-class="'pagination'"
          :page-class="'page-item'"
        ></paginate>
        <!-- 我是分頁 -->

      </div>

      <!-- 商品分類修改起始 -->
      <table
        class="table table-hover text-center w-auto container"
        v-show="isShowModify"
      >
        <thead class="table-primary">
          <tr>
            <th hidden>商品分類ID</th>
            <th>商品分類名稱</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr>
            <td hidden></td>
            <td>
              <label for="name" class="col-form-label col-sm-4">分類名稱</label>
              <input
                type="text"
                class="col-form-control col-sm-8"
                id="name"
                v-model="nameById"
                @input="checkNameById()"
              />
            </td>
            <td>{{ nameExistsMsg }}</td>
            <td>
              <div class="container gap-5" style="width: 150px">
                <button
                  class="btn btn-sm btn-outline-primary"
                  type="button"
                  @click="update(categoriesId)"
                >
                  修改
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  type="button"
                  @click="selectAllcategories()"
                >
                  取消
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 商品分類修改結束 -->

      <div class="container gap-2 py-3 d-flex justify-content-around">
        <a href="<c:url value='/'></c:url>">
          <button class="btn btn-outline-primary" type="button">回首頁</button>
        </a>
      </div>
    </div>
    <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>

    <script type="text/javascript">
      const contextPath = "${pageContext.request.contextPath}";
    </script>

    <script
      type="text/javascript"
      src="<c:url value='/js/categories/categories-edit.js'></c:url>"
    ></script>

  </body>
</html>
