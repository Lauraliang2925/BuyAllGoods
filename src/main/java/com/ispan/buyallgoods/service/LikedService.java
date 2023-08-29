package com.ispan.buyallgoods.service;

import java.util.List;

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
//	用reviewId和membersId尋找需要收回的like
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
	
//	用reviewId和membersId尋找特定會員是否已經按特定評論讚
	public Boolean isLikeExistByRIdAndMId(Integer reviewId, Integer membersId) {
		if (reviewId != null && membersId != null) {
			Long count = likeRepository.isLikeExistByRIdAndMId(reviewId, membersId);
			if(count>0) {
//  已經按過讚
				return true;
			}
		}
//  還沒按過讚
		return false;
	}
//	用reviewId和membersId尋找特定會員是否已經按特定評論讚	
	 public List<Object[]> findLikedStatusForReviewIds(List<Integer> reviewIds, Integer membersId) {
	        return likeRepository.findLikedStatusForReviewIds(reviewIds, membersId);
	    }

}
