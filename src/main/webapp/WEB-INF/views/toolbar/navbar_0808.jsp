<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
   

  </head>
<body>
<div class="container">
      <!-- 上方工具列起始 -->
        <header
        class="container d-flex align-items-center  justify-content-md-between py-3 mb-4 border-bottom fixed-top bg-light "
      >
        <a
          href="<c:url value='/'/>"
          class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none fs-2"
          >Buy All Goods
          <svg
            class="bi me-2"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
          >
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>
   
        <!-- 搜尋列起始 -->
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <form class="d-flex" role="search">
                <input
                  style="width: 250px"
                  class="me-2"
                  type="search"
                  placeholder="搜尋商品"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  搜尋
                </button>
              </form>
            </div>
          </div>
        </nav>
        <!-- 搜尋列結束 -->
   
        <div class="dropdown d-flex">
          <!-- 會員登入/登出/個人資訊起始 -->
          <div class="container">
            <a
              href="#"
              class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <strong>會員名字</strong>
            </a>
            <ul
              class="dropdown-menu text-small shadow"
              aria-labelledby="dropdownUser2"
            >
              <li><a class="dropdown-item" href="#">會員資料</a></li>
              <li><a class="dropdown-item" href="#">收藏清單</a></li>
              <li><a class="dropdown-item" href="#">訂單查詢</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">登出</a></li>
            </ul>
          </div>
          <!-- 會員登入/登出/個人資訊結束 -->
   
          <!-- 購物車圖示起始 (顯示給:一般會員)-->
          <div class="container">
            <button
              type="button"
              class="btn btn-primary position-relative"
              style="width: 80px"
            >
              購物車
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                >5 <span class="visually-hidden">unread messages</span></span
              >
            </button>
          </div>
          <!-- 購物車圖示結束 -->
   
          <!-- 後臺管理按鈕起始 (顯示給:管理員) -->
          <div class="container-fluid">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  管理
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="<c:url value='/product-edit'/>">檢視商品</a></li>
                  <li><a class="dropdown-item" href="<c:url value='/product-edit'/>">編輯商品</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="<c:url value='/categories-edit'/>">檢視分類</a></li>
                  <li><a class="dropdown-item" href="<c:url value='/categories-edit'/>">編輯分類</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">檢視廠商</a></li>
                  <li><a class="dropdown-item" href="#">編輯廠商</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">檢視合約</a></li>
                  <li><a class="dropdown-item" href="#">編輯合約</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">檢視會員</a></li>
                  <li><a class="dropdown-item" href="#">編輯會員</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 後臺管理按鈕結束 -->
        </div>
      </header>
      <!-- 上方工具列結束 -->
      </div>
</body>
</html>