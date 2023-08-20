package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.Members;

import jakarta.transaction.Transactional;

public interface MembersRepository extends JpaRepository<Members, Integer> {

	//用上面搜尋列找會員帳號	
	@Query("from Members where userName like %:username% ")
	List<Members> findUserNameByLike(@Param("username") String userName);
	
	
	@Transactional
	@Modifying
	@Query("update Members set photoPath = :photopath where membersId = :membersId")
	Integer updatePhotoById(@Param("photopath") String photopath,@Param("membersId") Integer membersId);
	
	
	//渝平-----開始
	//新增廠商的會員帳號下拉選單，要綁會員ID寫進資料庫，篩選角色ID=2，且失效日==null
		@Query(nativeQuery = true, value = "select members_id as membersId,"
				+ "user_name as userName,first_name as firstName,"
				+ "last_name as lastName from members where role_id=2 "
				+ "and expiration_date is NULL")
		List<Object> getAllMemberId();
		
		@Query(nativeQuery = true, value = "select members_id as membersId,"
				+ "user_name as userName,first_name as firstName,"
				+ "last_name as lastName from members where role_id=2 and members_id = :membersId and expiration_date is NULL ")
		List<Object> getOneByMemberId(Integer membersId);
		
		//用帳號去找資料
		Members findByUserName(String userName);
	//渝平-----結束

}
