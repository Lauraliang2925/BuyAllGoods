package com.ispan.buyallgoods.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class PageController {

	@GetMapping("/members")
	public String home() {
		return "index-members";
	}

	// 渝平-----開始

	// Alan 2023/8/21 1507
	@GetMapping("/")
	public String home1(Model model, HttpSession seesion,
			@RequestParam(name = "login", required = false) String login) {

//		System.out.println("/ UserId="+ seesion.getAttribute("UserId"));
//		System.out.println("/ RoleId="+ seesion.getAttribute("RoleId"));
//		System.out.println("/ UserName="+ seesion.getAttribute("UserName"));
//		System.out.println("/ PhotoPath="+ seesion.getAttribute("PhotoPath"));

		if (login != null && login.compareTo("out") == 0) {
			// 執行登出
			seesion.setAttribute("UserName", null);
		}

		if (seesion.getAttribute("UserName") != null) {
			model.addAttribute("membersId", seesion.getAttribute("UserId"));
			model.addAttribute("roleId", seesion.getAttribute("RoleId"));

			model.addAttribute("userName",
					(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
			model.addAttribute("photoPath",
					(seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
							: seesion.getAttribute("PhotoPath"));

			System.out.println("home1_userName_login=" + seesion.getAttribute("UserName"));
//			System.out.println("home1_photoPath="+seesion.getAttribute("PhotoPath"));

		} else {

			seesion.setAttribute("UserName", null);
			seesion.setAttribute("UserId", null);
			seesion.setAttribute("RoleId", null);
			seesion.setAttribute("PhotoPath", null);

			model.addAttribute("membersId", null);
			model.addAttribute("roleId", null);

			model.addAttribute("userName", null);
			model.addAttribute("photoPath", "/pic/members/Photo_Default.png");
//			System.out.println("home1_userName_logout=" + model.getAttribute("UserName"));
//			System.out.println("home1_photoPath_out="+model.getAttribute("PhotoPath"));

		}

		return "index";
	}

	@RequestMapping("/showAddSupplierPage")
	public String showAddSupplierPage(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "suppliers/suppliers_add";
	}

	@RequestMapping("/showSupplierPage")
	public String showSupplierPage(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "suppliers/suppliers_view";
	}

	@RequestMapping("/showAddContractsPage")
	public String showAddContractsPage(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "contracts/contracts_add";
	}

	@RequestMapping("/showSuppliersDetailsPage")
	public String showSuppliersDetailsPage(HttpSession seesion,
			@RequestParam(name = "suppliersId", required = false) String suppliersId, Model model) {
		model.addAttribute("suppliersId", suppliersId);
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "suppliers/suppliers_details";
	}

	@RequestMapping("/showContractsDetailsPage")
	public String showContractsDetailsPage(HttpSession seesion,
			@RequestParam(name = "contractsId", required = false) String contractsId, Model model) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "contracts/contracts_details";
	}

	@RequestMapping("/goAddContracts")
	public String goAddContracts(HttpSession seesion,
			@RequestParam(name = "suppliersId", required = false) String suppliersId, Model model) {
		model.addAttribute("suppliersId", suppliersId);
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "contracts/contracts_details_for_view_to_add";
	}

	@RequestMapping("/goLogin")
	public String goLogin(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));

		return "members/login";
	}

	// 渝平-----結束

	// 正融-----開始

	@GetMapping("/categories-edit")
	public String categoriesEdit(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/categories/categories-edit";
	}

	@GetMapping("/product-edit")
	public String productEdit(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/product/product-edit";
	}

	@GetMapping("/product-list")
	public String productList(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/product/product-list";
	}

	@GetMapping("/product-add")
	public String productAdd(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/product/product-add";
	}

	@GetMapping("/product-singlePage")
	public String productSinglePage(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/product/product-singlePage";
	}

	@GetMapping("/product-search")
	public String productSearch(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/product/product-search";
	}

	
	@GetMapping("/review-product")
	public String reviewProduct(Model model, HttpSession seesion) {
		model.addAttribute("userName",
				(seesion.getAttribute("UserName") == null) ? "" : seesion.getAttribute("UserName"));
		model.addAttribute("photoPath", (seesion.getAttribute("PhotoPath") == null) ? "/pic/members/Photo_Default.png"
				: seesion.getAttribute("PhotoPath"));
		return "/review/review-product";
	}
	// 正融-----結束

	// 任凱 --- 開始

	@GetMapping("/ShoppingCartMember")
	public String ShoppingCartMember(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/ShoppingCart/ShoppingCartMember";
	}

	@GetMapping("/FavoriteMember")
	public String FavoriteList(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/Favorite/FavoriteListMember";
	}

	@GetMapping("/OrderMember")
	public String Order(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/Order/OrderMember";
	}

	@GetMapping("/ShoppingCartNext")
	public String ShoppingCartNext(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/ShoppingCart/ShoppingCartMember-next";
	}

	@GetMapping("/OrderDetailMember")
	public String OrderDetail(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/OrderDetail/OrderDetailMember";
	}

	@GetMapping("/OrderSuppliers")
	public String OrderBySuppliers(Model model, HttpSession session) {

		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/Order/OrderSuppliers";
	}

	@GetMapping("/OrderDetailSuppliers")
	public String OrderDetailSupploers(Model model, HttpSession session) {
		model.addAttribute("userName", session.getAttribute("UserName"));
		model.addAttribute("photoPath", session.getAttribute("PhotoPath"));

		return "/OrderDetail/OrderDetailSuppliers";
	}
	// 任凱 --- 結束
}
