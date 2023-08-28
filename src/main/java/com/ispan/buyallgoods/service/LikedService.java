package com.ispan.buyallgoods.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ispan.buyallgoods.model.Liked;
import com.ispan.buyallgoods.repository.LikedRepository;

@Service
@Transactional(rollbackFor = { Exception.class })
public class LikedService {
	@Autowired
	LikedRepository likeRepository;

	public Liked insert(Liked like) {
		if (like.getMembersId() != null && like.getReviewId() != null) {
			return likeRepository.save(like);
		}
		return null;
	}

	public Integer deleteByReviewIdAndMembersId(Integer reviewId, Integer membersId) {
		if (reviewId != null && membersId != null) {
		return likeRepository.deleteByReviewIdAndMembersId(reviewId, membersId);
		}
		return null;
	}
	
//	使用商品ID尋找此商品底下所有評論數量
	public long findCountByProductId(Integer reviewId) {
		return likeRepository.findCountByReviewId(reviewId);
	}

}
