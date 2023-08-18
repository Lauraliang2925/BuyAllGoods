package com.ispan.buyallgoods.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.ContractsBean;
import com.ispan.buyallgoods.model.Product;
import com.ispan.buyallgoods.model.SuppliersBean;
import com.ispan.buyallgoods.service.ContractsService;

@RestController
@RequestMapping(path = "/contracts")
public class ContractsController {

	@Autowired
	private ContractsService cSer;

	// 查詢全部(create by Rong)
	@PostMapping("/findAllContracts")
	public ResponseEntity<List<ContractsBean>> findAllSuppliers() {
		List<ContractsBean> findAll = cSer.findAll();
		if (findAll == null) {
			return null;
		}
		return new ResponseEntity<>(findAll, HttpStatus.OK);
	}

	// 查詢byID
	@GetMapping("/findByContractsId/{contractsId}")
	public ContractsBean findByContractsId(@PathVariable Integer contractsId) {
		return cSer.findById(contractsId);
	}

	// 新增資料
	@PostMapping("/addContracts")
	public String addContracts(@RequestBody ContractsBean contracts) {
		System.out.println("addContracts");
		return cSer.insertOne(contracts);
	}

	// 修改資料
	@PostMapping("/editContracts")
	public String editContracts(@RequestBody ContractsBean contracts) {
		return cSer.updateById(contracts);

	}

	// 修改資料--終止合約，用ContractsID
	@PostMapping("/finishContracts")
	public String finishContracts(@RequestBody ContractsBean contracts) {
		return cSer.finishById(contracts);

	}

	// 修改資料--終止合約，用SuppliersID
	@PostMapping("/finishBySId")
	public List<ContractsBean> finishBySId(@RequestBody SuppliersBean suppliers) {
		return cSer.finishBySId(suppliers);
	}

	// 刪除
	@DeleteMapping("/deleteContracts/{contractsId}")
	public String deleteContracts(@PathVariable Integer contractsId) {
		return cSer.deleteById(contractsId);
	}

	// 用合約ID找對應的合約資料--for日期邏輯
	@PostMapping("/findProdustByCId")
	public ContractsBean findProdustByCId(@RequestBody Product product) {
		return cSer.findById(product.getContractsId());
	}

}