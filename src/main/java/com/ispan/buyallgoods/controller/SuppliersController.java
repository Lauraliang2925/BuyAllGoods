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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Members;
import com.ispan.buyallgoods.model.SuppliersBean;
import com.ispan.buyallgoods.repository.SuppliersRepository;
import com.ispan.buyallgoods.service.SuppliersSrevice;
import com.ispan.buyallgoods.tools.SuppliersContractsOthers;

@RestController
@RequestMapping(path = "/suppliers")
public class SuppliersController {

	@Autowired
	private SuppliersRepository sRepo;

	@Autowired
	private SuppliersSrevice sSre;
	
	//使用suppliersId 尋找一筆分類(create by Rong-0818)
	@PostMapping("/findById")
	public Map<String, Object> findById(@RequestBody SuppliersBean suppliers) {

		SuppliersBean ExistSuppliers = sSre.findById(suppliers.getSuppliersId());
		
		Map<String, Object> responseJson = new HashMap<>();

		if (ExistSuppliers==null) {
			responseJson.put("message", "查詢失敗，此廠商不存在");
			responseJson.put("success", false);
		} else {
			responseJson.put("suppliers", ExistSuppliers);
			responseJson.put("message", "查詢成功");
			responseJson.put("success", true);
		}
		return responseJson;		
	
	}

	// 新增1筆資料
	@PostMapping("/addSuppliers")
	public String addSuppliers(@RequestBody SuppliersBean suppliers) {
		return sSre.insertOne(suppliers);
	}

	// 查詢1筆資料
	@GetMapping("/findBySuppliersId/{suppliersId}")
	public SuppliersBean findBySuppliersId(@PathVariable Integer suppliersId) {
		return sSre.findById(suppliersId);
	}

	// 修改資料
	@PostMapping("/updateBySuppliersId")
	public String updateBySuppliersId(@RequestBody SuppliersBean suppliers) {
		return sSre.updateBysId(suppliers);

	}

	// 修改資料-終止合作
	@PostMapping("/finishSuppliers")
	public String finishSuppliers(@RequestBody SuppliersBean suppliers) {
		return sSre.updateByIdToFinish(suppliers);

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
	public ResponseEntity<List<SuppliersBean>> findAllSuppliers() {
		List<SuppliersBean> findAll = sSre.findAll();
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
				map.put("contractnumber", row[3]);
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
				map.put("contractnumber", row[3]);
				map.put("suppliersEndDate", row[4]);
				map.put("contractsEndDate", row[5]);
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

	// 分頁--全部
	@GetMapping("/findAllSCPage")
	public ResponseEntity<List<Map<String, Object>>> findAllSCPage(@RequestParam("offset") int offset) {
		List<Object> scViewPage = sSre.findAllSCToViewPage(offset);
		if (scViewPage == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object obj : scViewPage) {
			if (obj instanceof Object[]) {
				Object[] row = (Object[]) obj;
				Map<String, Object> map = new HashMap<>();
				map.put("suppliersId", row[0]);
				map.put("suppliersName", row[1]);
				map.put("contractsId", row[2]);
				map.put("contractnumber", row[3]);
				map.put("suppliersEndDate", row[4]);
				map.put("contractsEndDate", row[5]);
				result.add(map);
			}
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	
	// 分頁--By廠商ID
	@GetMapping("/findSomeSCPage")
	public ResponseEntity<List<Map<String, Object>>> findSomeSCPage(@RequestParam("suppliersId") int suppliersId,@RequestParam("offset") int offset) {
		List<Object> scViewPage = sSre.findSomeAllSCToViewPage(suppliersId,offset);
		if (scViewPage == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object obj : scViewPage) {
			if (obj instanceof Object[]) {
				Object[] row = (Object[]) obj;
				Map<String, Object> map = new HashMap<>();
				map.put("suppliersId", row[0]);
				map.put("suppliersName", row[1]);
				map.put("contractsId", row[2]);
				map.put("contractnumber", row[3]);
				map.put("suppliersEndDate", row[4]);
				map.put("contractsEndDate", row[5]);
				result.add(map);
			}
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 計算資料量
	@GetMapping("/countAllSC")
	public ResponseEntity<List<Map<String, Integer>>> countAllSC() {

		Integer total = sSre.countAllSC();
		Integer row = 5;
		// 5是設定好的每行顯示5筆，這裡算出來的pages是拿來用在分頁下面的循環
		double pages = (double) total / row;
		// 無條件進位
		double ans = Math.ceil(pages);
		List<Map<String, Integer>> result = new ArrayList<>();
		for (int i = 1; i <= ans; i++) {
			Map<String, Integer> list = new HashMap<>();
			int offset = (i - 1) * row;
			list.put("page", i);
			list.put("offset", offset);
			result.add(list);
		}

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	//用會員代號找廠商
	@PostMapping("/findSupplier")
	public SuppliersBean findSupplier(@RequestBody Members members) {
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+members.toString());
		return sSre.findSByMId(members);
	}

}