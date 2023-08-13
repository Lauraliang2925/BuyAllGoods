package com.ispan.buyallgoods.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.ispan.buyallgoods.model.Suppliers;
import com.ispan.buyallgoods.model.SuppliersContractsOthers;
import com.ispan.buyallgoods.model.SuppliersRepository;
import com.ispan.buyallgoods.service.SuppliersSrevice;

@RestController
@RequestMapping(path = "/suppliers")
public class SuppliersController {

	@Autowired
	private SuppliersRepository sRepo;

	@Autowired
	private SuppliersSrevice sSre;

	// 新增1筆資料
	@PostMapping("/addSuppliers")
	public String addSuppliers(@RequestBody Suppliers suppliers) {
		Suppliers insertOne = sSre.insertOne(suppliers);

		if (insertOne == null) {
			return "新增失敗";
		}

		return "新增成功";
	}

	// 查詢1筆資料
	@GetMapping("/findBySuppliersId/{suppliersId}")
	public Suppliers findBySuppliersId(@PathVariable Integer suppliersId) {
		System.out.println("addSuppliers");
		Suppliers findById = sSre.findById(suppliersId);
		if (findById == null) {
			return null;
		}
		return findById;
	}

	@PostMapping("/updateBySuppliersId")
	public Suppliers updateBySuppliersId(@RequestBody Suppliers suppliers) {
		Suppliers updateBysId = sSre.updateBysId(suppliers);
		if (updateBysId == null) {
			return null;
		}
		return suppliers;

	}

	// 刪除資料
	@DeleteMapping("/deleteBySuppliersId/{suppliersId}")
	public String deleteBySuppliersId(@PathVariable Integer suppliersId) {
		boolean deleteById = sSre.deleteById(suppliersId);
		if (deleteById) {
			return "刪除成功";
		}
		return "刪除失敗";
	}

	// 查詢全部
	@PostMapping("/findAllSuppliers")
	public ResponseEntity<List<Suppliers>> findAllSuppliers() {
		System.out.println("findAllSuppliers");
		List<Suppliers> findAll = sSre.findAll();
		if (findAll == null) {
			return null;
		}
		return new ResponseEntity<>(findAll, HttpStatus.OK);
	}

	// 計算全部數量
	@GetMapping("/countAllSuppliers")
	public long countAllSuppliers() {
		return sSre.countAll();

	}

	// 查詢頁面的查詢全部
	@PostMapping("/findAllSC")
	public ResponseEntity<List<Map<String, Object>>> findAllSC() {
		List<Object> scView = sSre.findAllSCToView();
		if (scView == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object obj : scView) {
			if (obj instanceof Object[]) {
				Object[] row = (Object[]) obj;
				Map<String, Object> map = new HashMap<>();
				map.put("suppliersId", row[0]);
				map.put("suppliersName", row[1]);
				map.put("contractsId", row[2]);
				map.put("contactPerson", row[3]);
				result.add(map);
			}
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 查詢頁面的條件查詢
	@PostMapping("/findSomeSC")
	public ResponseEntity<List<Map<String, Object>>> findSomeSC1(@RequestBody SuppliersContractsOthers sCOthers) {
		List<Object> scView = sSre.findAllSCToView();
		if (scView == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object obj : scView) {
			if (obj instanceof Object[]) {
				Object[] row = (Object[]) obj;
				Map<String, Object> map = new HashMap<>();
				map.put("suppliersId", row[0]);
				map.put("suppliersName", row[1]);
				map.put("contractsId", row[2]);
				map.put("contactPerson", row[3]);
				result.add(map);
			}
		}

		List<Map<String, Object>> result2 = new ArrayList<>();
		for (int i = 0; i < result.size(); i++) {
			Map<String, Object> data = result.get(i);
			Integer suppliersIdFromDataSID = (Integer) data.get("suppliersId");
			Integer contractsIdFromDataCID = (Integer) data.get("contractsId");
			String suppliersNameFromDataSN = (String) data.get("suppliersName");

			if ((sCOthers.getSuppliersId() == 0
					|| (suppliersIdFromDataSID != null && sCOthers.getSuppliersId() == suppliersIdFromDataSID))
					&& (sCOthers.getContractsId() == 0
							|| (contractsIdFromDataCID != null && sCOthers.getContractsId() == contractsIdFromDataCID))
					&& (sCOthers.getSuppliersName() == null || (suppliersNameFromDataSN != null
							&& sCOthers.getSuppliersName().equals(suppliersNameFromDataSN)))) {
				result2.add(data);
			}
		}

		return new ResponseEntity<>(result2, HttpStatus.OK);

	}

}
