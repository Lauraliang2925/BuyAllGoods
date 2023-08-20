package com.ispan.buyallgoods.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
@Controller
public class PageController {
	
	@GetMapping("/members")
	public String home() {
		return "index-members";		
	}
	
	
	//渝平-----開始

	@GetMapping("/")
	public String home1() {
		return "index";
	}

	@RequestMapping("/showAddSupplierPage")
	public String showAddSupplierPage() {
		return "suppliers/suppliers_add";
	}

	@RequestMapping("/showSupplierPage")
	public String showSupplierPage() {
		return "suppliers/suppliers_view";
	}

	@RequestMapping("/showAddContractsPage")
	public String showAddContractsPage() {
		return "contracts/contracts_add";
	}

	@RequestMapping("/showSuppliersDetailsPage")
	public String showSuppliersDetailsPage(@RequestParam(name = "suppliersId", required = false) String suppliersId,
	        Model model) {
	    System.out.println(suppliersId);
	    model.addAttribute("suppliersId", suppliersId);
	    return "suppliers/suppliers_details";
	}


	@RequestMapping("/showContractsDetailsPage")
	public String showContractsDetailsPage(@RequestParam(name = "contractsId", required = false) String contractsId,
	        Model model) {
		return "contracts/contracts_details";
	}
	
	@RequestMapping("/goAddContracts")
	public String goAddContracts(@RequestParam(name = "suppliersId", required = false) String suppliersId,
	        Model model) {
	    model.addAttribute("suppliersId", suppliersId);
	    return "contracts/contracts_details_for_view_to_add";
	}
	
	@RequestMapping("/goLogin")
	public String goLogin() {
	    return "members/login";
	}
	
	//渝平-----結束
	
	//正融-----開始

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
	
	//正融-----開始
	
	// 任凱 --- 開始
	
	@GetMapping("/ShoppingCartMember")
	public String ShoppingCartMember() {
		return "/ShoppingCart/ShoppingCartMember";
	}
	
	@GetMapping("/FavoriteMember")
	public String FavoriteList() {
		return "/Favorite/FavoriteListMember";
	}
	
	@GetMapping("/OrderMember")
	public String Order() {
		return "/Order/OrderMember";
	}
	
	@GetMapping("/ShoppingCartNext")
	public String ShoppingCartNext() {
		return "/ShoppingCart/ShoppingCartMember-next";
	}
	
	@GetMapping("/OrderDetailMember")
	public String OrderDetail() {
		return "/OrderDetail/OrderDetailMember";
	}
	
	@GetMapping("/OrderSuppliers")
	public String OrderBySuppliers() {
		return "/Order/OrderSuppliers";
	}
	// 任凱 --- 結束
}
