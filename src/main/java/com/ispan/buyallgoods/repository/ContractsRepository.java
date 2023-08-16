package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ispan.buyallgoods.model.ContractsBean;

public interface ContractsRepository extends JpaRepository<ContractsBean, Integer> {


    // 使用廠商ID尋找底下所有商品
	List<ContractsBean> findAllBySuppliersId(Integer suppliersId);
	
}
