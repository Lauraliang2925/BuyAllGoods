package com.ispan.buyallgoods.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.SuppliersBean;
import com.ispan.buyallgoods.repository.SuppliersRepository;

@Service
public class SuppliersSrevice {

	@Autowired
	private SuppliersRepository sRepo;

	// 新增1筆資料
	public String insertOne(SuppliersBean suppliers) {
		if (suppliers.getMembersId() == 0 || suppliers.getSuppliersName() == null || suppliers.getTaxId() == 0
				|| suppliers.getLogistics() == null || suppliers.getSigningDate() == null
				|| suppliers.getContractEndDate() == null || suppliers.getBoss() == null
				|| suppliers.getPhoneNumber() == null || suppliers.getEmail() == null
				|| suppliers.getRemarks() == null) {
			return "新增失敗 (〒︿〒) 請再次確認內容";

		}
		suppliers.setUpdateDate(LocalDateTime.now());
		sRepo.save(suppliers);
		return "新增成功 (ﾉ>ω<)ﾉ";

	}

	// 查詢1筆資料
	public SuppliersBean findById(Integer suppliersId) {
		Optional<SuppliersBean> findById = sRepo.findById(suppliersId);
		if (!findById.isPresent()) {
			return null;
		}
		return findById.get();
	}

	// 修改資料
	public String updateBysId(SuppliersBean suppliers) {
		Optional<SuppliersBean> findById = sRepo.findById(suppliers.getSuppliersId());
		if (!findById.isPresent()) {
			return "修改失敗，請再次確認內容 ٩(ŏ﹏ŏ、)۶";
		}
		suppliers.setUpdateDate(LocalDateTime.now());
		sRepo.save(suppliers);
		return "修改成功 d(`･∀･)b";

	}
	
	
	// 終止合作!!
	public String updateByIdToFinish(SuppliersBean suppliers) {
		Optional<SuppliersBean> findById = sRepo.findById(suppliers.getSuppliersId());
		if (!findById.isPresent()) {
			return "找不到此廠商，請再次確認內容!!";
		}
		LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
		suppliers.setContractEndDate(yesterday);
		suppliers.setUpdateDate(LocalDateTime.now());
		sRepo.save(suppliers);
		return "已成功終止與此廠商之合作";

	}
	
	

	// 刪除資料
	public boolean deleteById(Integer suppliersId) {
		Optional<SuppliersBean> findById = sRepo.findById(suppliersId);
		if (findById.isPresent()) {
			sRepo.deleteById(suppliersId);
			return true;
		}
		return false;
	}

	// 查詢全部
	public List<SuppliersBean> findAll() {
		List<SuppliersBean> findAll = sRepo.findAll();
		// isEmpty檢查有沒有資料，true就是沒資料
		if (findAll.isEmpty()) {
			return null;
		}
		return findAll;
	}

	// 計算筆數
	public long countAll() {
		List<SuppliersBean> findAll = sRepo.findAll();
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
	
	//測試分頁
	public List<Object> findAllSCToViewPage(int offset) {
		List<Object> scViewPage = sRepo.getSCViewWithPagination(offset);
		if (scViewPage == null) {
			return null;
		}

		return scViewPage;
	}
	
	//計算資料量
	public Integer countAllSC() {
		return sRepo.getSCCount();
	}
	
	
}
