package com.ispan.buyallgoods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

//	使用商品分類名稱尋找商品分類	
	@Query("SELECT c FROM Categories c WHERE c.name = :name")
	Categories findByCategoriesName(@Param("name") String name);
	
	@Query("SELECT c.categoriesId FROM Categories c WHERE c.name = :name")
    Integer findCategoriesIdByName(@Param("name") String name);

}
