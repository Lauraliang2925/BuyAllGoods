package com.ispan.buyallgoods.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.Liked;
import com.ispan.buyallgoods.service.LikedService;

@RestController
public class LikedController {

	@Autowired
	LikedService likeService;

	@PostMapping("/liked/insert")
	public Map<String, Object> insert(@RequestBody Liked like) {

		Map<String, Object> responseJson = new HashMap<>();

		if (likeService.insert(like) == null) {
			long count = likeService.findCountByProductId(like.getReviewId());
			responseJson.put("count", count);
			responseJson.put("message", "按讚失敗");
			responseJson.put("success", false);
		} else {
			long count = likeService.findCountByProductId(like.getReviewId());
			responseJson.put("count", count);
			responseJson.put("message", "按讚成功");
			responseJson.put("success", true);
		}
		return responseJson;
	}
	
	@DeleteMapping("/liked/delete")
	public Map<String, Object> delete(@RequestParam("reviewId") Integer reviewId
			, @RequestParam("membersId") Integer membersId) {

		Map<String, Object> responseJson = new HashMap<>();

		if (likeService.deleteByReviewIdAndMembersId(reviewId,membersId)>0) {
			long count = likeService.findCountByProductId(reviewId);
			responseJson.put("count", count);
			responseJson.put("message", "刪除成功");
			responseJson.put("success", true);
		
		} else {
			long count = likeService.findCountByProductId(reviewId);
			responseJson.put("count", count);
			responseJson.put("message", "刪除失敗");
			responseJson.put("success", false);
		}
		return responseJson;
	}

}
