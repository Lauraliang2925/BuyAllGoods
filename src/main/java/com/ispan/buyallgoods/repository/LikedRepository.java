package com.ispan.buyallgoods.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.Liked;

public interface LikedRepository extends JpaRepository<Liked, Integer> {
	
//	用reviewId和membersId尋找需要收回的like
	@Modifying
	@Query("DELETE FROM Liked WHERE reviewId = :reviewId AND membersId = :membersId")
	Integer deleteByReviewIdAndMembersId(@Param("reviewId") Integer reviewId,@Param("membersId") Integer membersId);
	
//	使用reviewId尋找底下所有like數量
	@Query("SELECT COUNT(l) FROM Liked l WHERE l.reviewId = :reviewId")
	Long findCountByReviewId(@Param("reviewId") Integer reviewId);


}
