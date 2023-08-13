package com.ispan.buyallgoods.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

//	使用商品分類名稱尋找商品分類	
	@Query("SELECT c FROM Categories c WHERE c.name = :name")
	Categories findByCategoriesName(@Param("name") String name);

}
