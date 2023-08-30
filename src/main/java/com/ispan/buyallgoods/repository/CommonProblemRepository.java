	package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ispan.buyallgoods.model.CommonProblemBean;

public interface CommonProblemRepository extends JpaRepository<CommonProblemBean, Integer> {

	List<CommonProblemBean> findAllByOrderByCreatedDateDesc();
	
	Page<CommonProblemBean> findAllByOrderByCreatedDateDesc(Pageable pageable);
	
}
