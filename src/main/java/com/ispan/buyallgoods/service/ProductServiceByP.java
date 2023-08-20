package com.ispan.buyallgoods.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.ispan.buyallgoods.model.ContractsBean;
import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.repository.ProductRepository;

@Service
public class ProductServiceByP {

	@Autowired
	private ProductRepository productRepository;

	//拋整包合約的json找出所有合約ID去終止商品
	public String finishProductByCList(List<ContractsBean> CList) {
		if (!CList.isEmpty()) {
			for (ContractsBean c : CList) {
				int contractsId = c.getContractsId();
				List<Product> findAllByContractsId = productRepository.findAllByContractsId(contractsId);
				for (Product p : findAllByContractsId) {
					LocalDate today = LocalDate.now();
					LocalDate yesterday = today.minusDays(1);
					p.setSellingStopDate(yesterday);
					productRepository.save(p);
				}
			}
			return "成功";
		}
		return "失敗";

	}
	
	//用合約ID找對應合約所有商品，終止商品
	public String finishProductByCId(ContractsBean contracts){
		List<Product> findAllByContractsId = productRepository.findAllByContractsId(contracts.getContractsId());
		
		// isEmpty是空的會回傳true
		if(!findAllByContractsId.isEmpty()) {
			for(Product p:findAllByContractsId) {
				
			LocalDate today = LocalDate.now();
			LocalDate yesterday = today.minusDays(1);
			p.setSellingStopDate(yesterday);
			productRepository.save(p);
			}
			return "成功";
		}
		return "失敗";
		
	}
	
	//用商品ID找，終止商品
	public String finishProductByPId(Product product) {
		Optional<Product> findById = productRepository.findById(product.getProductsId());
		// isPresent不是null會回傳true
				if (findById.isPresent()) {
					LocalDate today = LocalDate.now();
					LocalDate yesterday = today.minusDays(1);
					product.setSellingStopDate(yesterday);
					productRepository.save(product);
					return "已成功下架此商品";
				}
				return "找不到此商品，請再次確認內容!!";
	}
	

	
	
	
}