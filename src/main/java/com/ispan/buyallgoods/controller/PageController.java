package com.ispan.buyallgoods.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

	@GetMapping("/")
	public String home() {
		return "/index";
	}


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
	
//	@GetMapping("/product-upload")
//	public String productUupload() {
//		return "/product/upload";
//	}

}
