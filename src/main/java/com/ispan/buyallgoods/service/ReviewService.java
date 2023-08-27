package com.ispan.buyallgoods.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ispan.buyallgoods.model.Review;
import com.ispan.buyallgoods.repository.ReviewRepository;

@Service
@Transactional(rollbackFor = { Exception.class })
public class ReviewService {
	@Autowired
	ReviewRepository reviewRepository;

	public Review insert(Review review) {
		if (review.getRating() != null && review.getProductsId() != null) {
			return reviewRepository.save(review);
		}
		return null;
	}

//	使用商品ID尋找此商品底下所有評論	
	public List<Review> findAllByProductsId(Integer productsId, Pageable pageable) {
		return reviewRepository.findAllByProductsId(productsId, pageable);
	}

//	使用商品ID尋找此商品底下所有評論數量
	public long findCountByProductId(Integer productsId) {
		return reviewRepository.findCountByProductId(productsId);
	}
	
//	使用商品ID尋找此商品底下所有評論並計算平均分數
	public Double calAvgRatingByProductId(Integer productsId) {
		return reviewRepository.calAvgRatingByProductId(productsId);
	}

}
