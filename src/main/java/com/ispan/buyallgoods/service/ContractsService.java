package com.ispan.buyallgoods.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.Contracts;
import com.ispan.buyallgoods.model.ContractsRepository;

@Service
public class ContractsService {

	@Autowired
	private ContractsRepository cRepo;

	// 查詢1筆資料BY contractsId
	public Contracts findById(Integer contractsId) {
		Optional<Contracts> optional = cRepo.findById(contractsId);

		// isPresent不是null會回傳true
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	// 新增1筆資料
	public Contracts insertOne(Contracts contracts) {

		// 判斷如果欄位沒有輸入，就回傳null
		if (contracts.getAmount() == 0 || contracts.getContractNumber() == "" || contracts.getContractTitle() == ""
				|| contracts.getEndDate() == null || contracts.getStartDate() == null
				|| contracts.getSuppliersId() == 0) {
			return null;
		}
		contracts.setUpdateDate(LocalDateTime.now());
		return cRepo.save(contracts);
	}

	// 修改資料
//	@Transactional
//	public ContractsBean updateById(ContractsBean contracts, Integer contractsId) {
//		Optional<ContractsBean> findById = cRepo.findById(contractsId);
//
//		// isPresent不是null會回傳true
//		if (findById.isPresent()) {
//			ContractsBean contractsBean = findById.get();
//			contractsBean.setContractNumber(contracts.getContractNumber());
//			contractsBean.setSuppliersId(contracts.getSuppliersId());
//			contractsBean.setStartDate(contracts.getStartDate());
//			contractsBean.setEndDate(contracts.getEndDate());
//			contractsBean.setContractTitle(contracts.getContractTitle());
//			contractsBean.setAmount(contracts.getAmount());
//			contractsBean.setUpdateDate(LocalDateTime.now());
//
//			return contracts;
//
//		}
//
//		return null;
//	}
	public Contracts updateById(Contracts contracts) {
		Optional<Contracts> findById = cRepo.findById(contracts.getContractsId());

		// isPresent不是null會回傳true
		if (findById.isPresent()) {
			contracts.setUpdateDate(LocalDateTime.now());
			return cRepo.save(contracts);

		}

		return null;
	}

	public boolean deleteById(Integer contractsId) {
		Optional<Contracts> findById = cRepo.findById(contractsId);

		// isPresent不是null會回傳true
		if (findById.isPresent()) {
			cRepo.deleteById(contractsId);
			return true;
		}
		return false;

	}

}
