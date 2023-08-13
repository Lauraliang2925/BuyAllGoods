package com.ispan.buyallgoods.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.Suppliers;
import com.ispan.buyallgoods.model.SuppliersRepository;

@Service
public class SuppliersSrevice {

	@Autowired
	private SuppliersRepository sRepo;

	// 新增1筆資料
	public Suppliers insertOne(Suppliers suppliers) {
		if (suppliers.getMembersId() == 0 || suppliers.getSuppliersName() == null || suppliers.getTaxId() == 0
				|| suppliers.getLogistics() == null || suppliers.getSigningDate() == null
				|| suppliers.getContractEndDate() == null || suppliers.getBoss() == null
				|| suppliers.getPhoneNumber() == null || suppliers.getEmail() == null
				|| suppliers.getRemarks() == null) {
			return null;

		}
		suppliers.setUpdateDate(LocalDateTime.now());
		return sRepo.save(suppliers);

	}

	// 查詢1筆資料
	public Suppliers findById(Integer suppliersId) {
		Optional<Suppliers> findById = sRepo.findById(suppliersId);
		if (!findById.isPresent()) {
			return null;
		}

		return findById.get();
	}

	// 修改資料
	public Suppliers updateBysId(Suppliers suppliers) {
		Optional<Suppliers> findById = sRepo.findById(suppliers.getSuppliersId());
		if (!findById.isPresent()) {
			return null;
		}
		suppliers.setUpdateDate(LocalDateTime.now());
		return sRepo.save(suppliers);

	}

	// 刪除資料
	public boolean deleteById(Integer suppliersId) {
		Optional<Suppliers> findById = sRepo.findById(suppliersId);
		if (findById.isPresent()) {
			sRepo.deleteById(suppliersId);
			return true;
		}
		return false;
	}

	// 查詢全部
	public List<Suppliers> findAll() {
		List<Suppliers> findAll = sRepo.findAll();
		// isEmpty檢查有沒有資料，true就是沒資料
		if (findAll.isEmpty()) {
			return null;
		}
		return findAll;
	}

	// 計算筆數
	public long countAll() {
		List<Suppliers> findAll = sRepo.findAll();
		if (findAll.isEmpty()) {
			return 0;
		}

		return sRepo.count();
	}

	// 檢視廠商page用，有join+查合約ID
	public List<Object> findAllSCToView() {
		List<Object> scView = sRepo.getSCView();
		if (scView == null) {
			return null;
		}

		return scView;
	}
}
