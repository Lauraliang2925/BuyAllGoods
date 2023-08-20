package com.ispan.buyallgoods.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.ContractsBean;
import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.service.ProductServiceByP;

@RestController
@RequestMapping(path = "/product")
public class ProductControllerByP {

	@Autowired
	private ProductServiceByP pSer;

	// 拋整包合約的json找出所有合約ID去終止商品--for廠商明細的終止合作按鈕
	@PostMapping("/finishProductDate")
	public String finishProductDate(@RequestBody List<ContractsBean> CList) {
		return pSer.finishProductByCList(CList);
	}

	// 拋一份合約的資料，找出所有商品ID去終止商品--for合約明細的終止合約按鈕
	@PostMapping("/finishProductDate2")
	public String finishProductDate2(@RequestBody ContractsBean contracts) {
		return pSer.finishProductByCId(contracts);
	}

	// 拋一份商品的資料，找出商品後終止商品--for商品明細的下架商品按鈕
	@PostMapping("/finishProductDateByPId")
	public String finishProductDateByPId(@RequestBody Product product) {
		return pSer.finishProductByPId(product);
	}


}