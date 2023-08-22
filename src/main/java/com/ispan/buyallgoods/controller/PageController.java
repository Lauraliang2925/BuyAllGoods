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

		if (login != null && login.compareTo("in") == 0) {
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
			model.addAttribute("membersId", null);
			model.addAttribute("roleId", null);

			model.addAttribute("userName", "");
			model.addAttribute("photoPath", "/pic/members/Photo_Default.png");
			System.out.println("home1_userName_logout=" + model.getAttribute("UserName"));
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
	public String categoriesEdit() {
		return "/categories/categories-edit";
	}

	@GetMapping("/product-edit")
	public String productEdit() {
		return "/product/product-edit";
	}

	@GetMapping("/product-list")
	public String productList() {
		return "/product/product-list";
	}

	@GetMapping("/product-add")
	public String productAdd() {
		return "/product/product-add";
	}

	@GetMapping("/product-singlePage")
	public String productSinglePage() {
		return "/product/product-singlePage";
	}

	@GetMapping("/product-search")
	public String productSearch() {
		return "/product/product-search";
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
	// 任凱 --- 結束
}
