package com.ispan.buyallgoods.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.ContractsBean;
import com.ispan.buyallgoods.model.SuppliersBean;
import com.ispan.buyallgoods.repository.ContractsRepository;

@Service
public class ContractsService {

	@Autowired
	private ContractsRepository cRepo;
	
	// 查詢全部
	public List<ContractsBean> findAll() {
		List<ContractsBean> findAll = cRepo.findAll();
		// isEmpty檢查有沒有資料，true就是沒資料
		if (findAll.isEmpty()) {
			return null;
		}
		return findAll;
	}

	// 查詢1筆資料BY contractsId
	public ContractsBean findById(Integer contractsId) {
		Optional<ContractsBean> optional = cRepo.findById(contractsId);

		// isPresent不是null會回傳true
		if (!optional.isPresent()) {
			return null;
		}
		return optional.get();
	}

	// 新增1筆資料
	public String insertOne(ContractsBean contracts) {

		// 判斷如果欄位沒有輸入，就回傳null
		if (contracts.getAmount() == 0 || contracts.getContractNumber() == "" || contracts.getContractTitle() == ""
				|| contracts.getEndDate() == null || contracts.getStartDate() == null
				|| contracts.getSuppliersId() == 0) {
			return "新增失敗～請再次確認內容";
		}
		contracts.setUpdateDate(LocalDateTime.now());
		cRepo.save(contracts);
		return "新增成功 (ﾉ>ω<)ﾉ";
	}

	// 修改資料
	public String updateById(ContractsBean contracts) {
		Optional<ContractsBean> findById = cRepo.findById(contracts.getContractsId());

		// isPresent不是null會回傳true
		if (findById.isPresent()) {
			contracts.setUpdateDate(LocalDateTime.now());
			cRepo.save(contracts);
			return "修改成功 d(`･∀･)b";

		}
		return "修改失敗，請再次確認內容 ٩(ŏ﹏ŏ、)۶";

	}

	// 修改資料--終止合作，用合約ID
	public String finishById(ContractsBean contracts) {
		Optional<ContractsBean> findById = cRepo.findById(contracts.getContractsId());

		// isPresent不是null會回傳true
		if (findById.isPresent()) {
			LocalDate today = LocalDate.now();
			LocalDate yesterday = today.minusDays(1);
			contracts.setEndDate(yesterday);
			contracts.setUpdateDate(LocalDateTime.now());
			cRepo.save(contracts);
			return "已成功終止與此合約";

		}
		return "找不到此合約，請再次確認內容!!";

	}

	// 用SuppliersId找所有對應合約，一鍵終止
	public List<ContractsBean> finishBySId(SuppliersBean suppliers) {
		List<ContractsBean> findAllBySuppliersId = cRepo.findAllBySuppliersId(suppliers.getSuppliersId());

		// isEmpty判斷List裡是不是空白，是的話回傳true
		if (!findAllBySuppliersId.isEmpty()) {
			// 把每個資料迴圈跑出來，然後把EndDate押上昨天，並更新修改當下的系統時間
			for (ContractsBean obj : findAllBySuppliersId) {
				LocalDate today = LocalDate.now();
				LocalDate yesterday = today.minusDays(1);
				obj.setEndDate(yesterday);
				obj.setUpdateDate(LocalDateTime.now());

				cRepo.save(obj);
			}
			return findAllBySuppliersId;
		}
		return null;

	}

	public String deleteById(Integer contractsId) {
		Optional<ContractsBean> findById = cRepo.findById(contractsId);

		// isPresent不是null會回傳true
		if (findById.isPresent()) {
			cRepo.deleteById(contractsId);
			return "刪除成功";
		}
		return "刪除失敗";

	}

}