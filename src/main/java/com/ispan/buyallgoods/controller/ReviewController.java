package com.ispan.buyallgoods.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Review;
import com.ispan.buyallgoods.service.ReviewService;

@RestController
public class ReviewController {

	@Autowired
	ReviewService reviewService;

	@PostMapping("/review/insert")
	public Map<String, Object> insert(@RequestBody Review review) {

		Map<String, Object> responseJson = new HashMap<>();

		if (reviewService.insert(review) == null) {
			responseJson.put("message", "新增資料失敗");
			responseJson.put("success", false);
		} else {
			responseJson.put("message", "新增資料成功");
			responseJson.put("success", true);
		}
		return responseJson;
	}

//	使用商品ID尋找此商品底下所有評論(還要加上分頁功能)
	@GetMapping("/review/findAllByProductsId/{id}")
	public Map<String, Object> findAllByProductsId(@PathVariable(value = "id") Integer id,
			@RequestParam("current") int current, @RequestParam("rows") int rows) {
		if (id == null) {
			return null;
		}
		// spring boot 分頁API
		Pageable pageable = PageRequest.of((current - 1), rows);

		List<Review> list = reviewService.findAllByProductsId(id, pageable);
		long count = reviewService.findCountByProductId(id);
		Double calculateRating = reviewService.calAvgRatingByProductId(id);

		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("list", list);
		responseJson.put("count", count);
		responseJson.put("calculateRating", calculateRating);
		return responseJson;
	}
	

//	使用商品ID尋找此商品底下所有評論的平均分數
	@GetMapping("/review/findAvgRatingByProductId/{id}")
	public Map<String, Object> findAllByProductsId(@PathVariable(value = "id") Integer id) {
		if (id == null) {
			return null;
		}		
		Double calculateRating = reviewService.calAvgRatingByProductId(id);
		Map<String, Object> responseJson = new HashMap<>();
		responseJson.put("calculateRating", calculateRating);
		System.out.println(calculateRating);
		return responseJson;
	}
}
