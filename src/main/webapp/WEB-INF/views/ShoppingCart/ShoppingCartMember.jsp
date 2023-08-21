<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ include file="/includes/libs.jsp" %>

            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8">
                <title>購物車</title>
            </head>

            <body style="padding-top: 8%" >
                <%@ include file="/WEB-INF/views/toolbar/navbar.jsp" %>
                        <div class="container" id="app">
                            <h2 class="text-center py-3 mt-3">購物車清單</h2>
                            <div class="row mb-3">
                                <div class="col-3"></div>
                                <div class="col-6"></div>
                                <div class="col-3 d-flex justify-content-end"><button class="btn btn-secondary"
                                        type="button" @click="removeAll()" v-show="isShowByMemberId">移除所有商品</button>
                                </div>
                            </div>
                            <!-- 購物車清單起始 -->
                            <table class="table table-hover text-center" v-show="isShowByMemberId">
                                <thead class="table-primary">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">商品圖片</th>
                                        <th scope="col">商品名稱</th>
                                        <th scope="col">單價</th>
                                        <th scope="col">數量</th>
                                        <th scope="col">小計</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody class="table-light">
                                    <tr v-for="(item, index) in ShoppingCart" :key="index">
                                        <td></td>
                                        <td>
                                            <!-- <img 
                                                src='https://memeprod.ap-south-1.linodeobjects.com/user-template-thumbnail/2047ceddc1d91c629b3a04117178bde1.jpg'> -->
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
                                                <title>{{ item.name }}</title>
                                                <image
                                                  :xlink:href="contextPath + '/pic/product/' + item.name + '.jpg'"
                                                  width="100%"
                                                  height="100%"
                                                />
                                              </svg>
                                        </td>
                                        <td class="align-middle">{{item.name}}</td>
                                        <td class="align-middle"><i class="bi bi-currency-dollar"></i>
                                            {{item.selling_price}}</td>
                                        <td class="align-middle">
                                            <div class="d-flex flex-wrap align-items-center">
                                                <input type="number" min="1" style="width: 50px; height: 30px"
                                                    v-model="item.quantity" @change="updateShoppingCart(item)" />
                                            </div>
                                        </td>
                                        <td class="align-middle"><i class="bi bi-currency-dollar"></i> {{ item.selling_price
                                            * item.quantity }}</td>
                                        <td>
                                            <div class="row container gap-2" style="width: 150px">
                                                <button class="btn btn-sm btn-outline-primary" type="button"
                                                    @click="addFavoriteList(item)">
                                                    加入收藏清單
                                                </button>
                                                <button class="btn btn-sm btn-outline-danger" type="button"
                                                    @click="removeShoppingCart(item.shopping_cart_id)">
                                                    移除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
    
                                    </tr>
                                </tbody>
                            </table>
                            
                        <!-- 購物車清單結束 -->

                        <div class="container py-3 d-flex justify-content-end">
                            <div class="container"></div>
                            <div class="container h4" v-show="isShowByMemberId">
                                共有 <span class="text-danger">{{totalItemMemberCount}}</span> 項商品，數量 <span
                                    class="text-danger">{{totalQuantity}}</span> 個，訂單總額:
                                <span class="text-danger"><i class="bi bi-currency-dollar"></i> {{totalPrice}}</span>
                            </div>
                        </div>
    
                        <div class="container text-center" v-show="!isShowByMemberId">
                            <img class="rounded-5"
                                src="https://pic.52112.com/180610/JPG-180610_374/eCNhbzY2oh_small.jpg"
                                style="width: 200px;">
                            <p class="mt-3 fw-bold fs-5">你的購物車是空的</p>
                        </div>
                        <div class="container gap-2 py-3 d-flex justify-content-around">
                            <a href="<c:url value='/'/>">
                                <button class="btn btn-outline-primary" type="button" v-show="isShowByMemberId">
                                    繼續購物
                                </button>
                            </a>
                            <a href="<c:url value='/ShoppingCartNext'/>">
                                <button class="btn btn-outline-success" type="button" v-show="isShowByMemberId" @click="storageShoppingCart">
                                    結帳
                                </button>
                            </a>
                        </div>
                        <div class="container gap-2 py-3 d-flex justify-content-around">
                            <a href="<c:url value='/'/>">
                                <button class="btn btn-outline-primary" type="button" v-show="!isShowByMemberId">
                                    繼續購物
                                </button>
                            </a>
                            <button class="btn btn-outline-success" type="button" disabled
                                v-show="!isShowByMemberId">
                                結帳
                            </button>
                        </div>

                    </div>

                    <%@ include file="/WEB-INF/views/toolbar/footer.jsp" %>
                        <script type="text/javascript">
                            const contextPath = "${pageContext.request.contextPath}";
                        </script>

                        <script type="text/javascript"
                            src="<c:url value='/js/ShoppingCart/shoppingCartMember.js'></c:url>"></script>


            </body>

            </html>