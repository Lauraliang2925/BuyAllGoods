<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ include file="/includes/libs.jsp" %>

      <!DOCTYPE html>
      <html>

      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>收藏清單</title>
      </head>

      <body style="padding-top: 8%" id="app">
        <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
          <div class="container">
            <h2 class="text-center py-3 mt-3">收藏清單</h2>
            <div class="row mb-3">
              <div class="col-3"></div>
              <div class="col-6"></div>
              <div class="col-3 d-flex justify-content-end"><button class="btn btn-secondary" type="button"
                  @click="deleteAll" v-show="isShowFavorite">移除所有收藏清單</button></div>
            </div>
            <!-- 收藏清單起始 -->
            <table class="table text-center table-hover" v-show="isShowFavorite">
              <thead class="table-Primary">
                <tr>
                  <th scope="col" hidden>收藏清單編號</th>
                  <th scope="col">商品圖片</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">價錢</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody class="table-light">
                <tr v-for="(item, index) in favorite" :key="index">
                  <td><img
                      src='https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/d5dac084aa2905e2014f90f621dd5032.jpg'>
                  </td>
                  <td class="align-middle">{{ item.name }}</td>
                  <!-- <td class="align-middle"><i class="bi bi-currency-dollar"></i>{{ item.selling_price }}</td> -->
                  <td class="align-middle">
                    <i class="bi bi-currency-dollar"></i>
                    <span v-if="item.discounted">{{ item.new_selling_price }}</span>
                    <span v-else>{{ item.selling_price }}</span>
                  </td>
                  <td>
                    <div class="container gap-2 m-3" style="width: 150px">

                      <button class="btn btn-sm btn-outline-primary mb-3" type="button"
                        @click="addToShoppingCart(item)">
                        加入購物車
                      </button>
                      <br>
                      <button class="btn btn-sm btn-outline-danger" type="button"
                        @click="removeFromFavorites(item.favorite_list_id)">
                        移除
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- 收藏清單結束 -->

            <div class="container text-center" v-show="!isShowFavorite">
              <img class="rounded-5"
                src="https://memeprod.ap-south-1.linodeobjects.com/user-template/6d41d5c02fd173e39a09b18ae83ed2b9.png"
                style="width: 200px;">
              <p class="mt-3 fw-bold fs-5">你的收藏清單是空的</p>
            </div>

            <div class="container gap-2 py-3 d-flex justify-content-around">
              <a href="<c:url value='/'/>">
                <button class="btn btn-outline-primary" type="button">繼續購物</button>
              </a>
              <a href="<c:url value='ShoppingCartMember'/>">
                <button class="btn btn-outline-success" type="button">
                  購物車
                </button>
              </a>
            </div>
          </div>
          <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
            <script type="text/javascript">
              const contextPath = "${pageContext.request.contextPath}";
            </script>

            <script type="text/javascript" src="<c:url value='/js/Favorite/favoriteListMember.js'></c:url>"></script>
      </body>

      </html>