package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

//	使用商品ID尋找此商品底下所有評論
	List<Review> findAllByProductsId(Integer productsId, Pageable pageable);

//	使用商品ID尋找此商品底下所有評論數量
	@Query("SELECT COUNT(r) FROM Review r  WHERE r.productsId = :productsId")
	Long findCountByProductId(@Param("productsId") Integer productsId);
	
//	使用商品ID尋找此商品底下所有評論並計算平均分數
	@Query("SELECT ROUND(AVG(rating), 1) FROM Review  r  WHERE r.productsId = :productsId")
	Double calAvgRatingByProductId(@Param("productsId") Integer productsId);
}

