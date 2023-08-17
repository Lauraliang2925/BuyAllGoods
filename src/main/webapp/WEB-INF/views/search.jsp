<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %> <%@ include file="/includes/libs.jsp"
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Search Bar</title>
<style>
    * {
  box-sizing: border-box;
}
body {
  background-color: #efe9e7;
}
a {
  text-decoration: none;
  color: #3d1101;
}
.wrap {
  max-width: 960px;
  margin: 20px auto 0 auto;
  height: auto;
}
* {
  box-sizing: border-box;
}
body {
  background-color: #efe9e7;
}
a {
  text-decoration: none;
  color: #3d1101;
}
.wrap {
  max-width: 960px;
  margin: 20px auto 0 auto;
  height: auto;
}
.search {
  position: relative;
  width: 80%;
  float: left;
}
.search-bar {
  width: 100%;
  height: 32px;
  font-size: 20px;
  border: 3px solid #3d1101;
  background-color: #efe9e7;
}
.search-btn {
  width: 36px;
  height: 32px;
  background-color: #3d1101;
  color: #efe9e7;
  outline: none;
  border: 2px solid #3d1101;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.search-cart li {
  float: left;
  margin-left: 17px;
  padding-top: 5px 0;
  line-height: 32px;
}
.search-cart li a {
  font-size: 16px;
}

.pay {
  padding-right: 10px;
  border-right: 1px solid #3d1101;
}

.search {
  position: relative;
  width: 80%;
  float: left;
}
.search-bar {
  width: 100%;
  height: 32px;
  font-size: 20px;
  border: 3px solid #3d1101;
  background-color: #efe9e7;
}
.search-btn {
  width: 36px;
  height: 32px;
  background-color: #3d1101;
  color: #efe9e7;
  outline: none;
  border: 2px solid #3d1101;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.search-cart li {
  float: left;
  margin-left: 17px;
  padding-top: 5px 0;
  line-height: 32px;
}
.search-cart li a {
  font-size: 16px;
}

.pay {
  padding-right: 10px;
  border-right: 1px solid #3d1101;
}

</style>
</head>
<body>
<div class="wrap">
  <div class="search">
    <input class="search-bar" type="text" name="search" id="search" placeholder="輸入名稱">
    <button class="search-btn">
      <i class="fas fa-search"></i>
    </button>
  </div>
  <div class="search-cart">
    <ul>
      <li><a class="pay" href="#">結帳去</a></li>
      <li>
        <a href="#">
          <i class="fas fa-shopping-cart"></i>
        </a>
      </li>
    </ul>
  </div>
</div>
     
</body>
</html>