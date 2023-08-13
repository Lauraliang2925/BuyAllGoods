package com.ispan.buyallgoods.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Contracts;
import com.ispan.buyallgoods.service.ContractsService;

@RestController
@RequestMapping(path = "/contracts")
public class ContractsController {

	@Autowired
	private ContractsService cSer;

	@GetMapping("/findByContractsId/{contractsId}")
	public Contracts findByContractsId(@PathVariable Integer contractsId) {
		Contracts findById = cSer.findById(contractsId);
		if (findById != null) {
			return findById;
		}
		return null;
	}

	@PostMapping("/addContracts")
	public String addContracts(@RequestBody Contracts contracts) {
		System.out.println("add新增");
		Contracts insertOne = cSer.insertOne(contracts);

		if (insertOne==null) {
			return "新增失敗";
		}
		
		return "新增成功";
	}

	@PostMapping("/editContracts")
//	public ContractsBean editContracts(@RequestBody ContractsBean contracts) {
//		return cSer.updateById(contracts, contracts.getContractsId());
//		
//	}

	public Contracts editContracts(@RequestBody Contracts contracts) {
		return cSer.updateById(contracts);

	}

	@DeleteMapping("/deleteContracts/{contractsId}")
	public String deleteContracts(@PathVariable Integer contractsId) {
		boolean deleteById = cSer.deleteById(contractsId);
		if (deleteById) {
			return "刪除成功";
		}
		return "刪除失敗";
	}

}
