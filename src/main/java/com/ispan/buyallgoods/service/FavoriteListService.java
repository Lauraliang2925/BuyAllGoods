package com.ispan.buyallgoods.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ispan.buyallgoods.model.FavoriteListBean;
import com.ispan.buyallgoods.repository.FavoriteListRepository;

@Service
@Transactional(rollbackFor = {Exception.class})
public class FavoriteListService {

	@Autowired
	private FavoriteListRepository favoriteListRepository;
	
	public FavoriteListBean create(FavoriteListBean fListBean) {
		return favoriteListRepository.save(fListBean);
	}
	
	public List<FavoriteListBean> findAllFavoriteList(){
		return favoriteListRepository.findAll();
	}
	
	public Optional<FavoriteListBean> findById(Integer favorite_list_id) {
		return favoriteListRepository.findById(favorite_list_id);
	}
	
	public boolean remove(Integer favorite_list_id) {
		Optional<FavoriteListBean> optional = favoriteListRepository.findById(favorite_list_id);
		if(optional.isPresent()) {
			favoriteListRepository.deleteById(favorite_list_id);
			return true;
		}
		return false;
	}
	
	public void removeAllByMember(Integer membersId) {
       favoriteListRepository.removeAllByMemberId(membersId);
    }
    
	public void removeAll() {
		favoriteListRepository.deleteAll();
	}
	
	public List<FavoriteListBean> createAll(List<FavoriteListBean> favoriteList){
		return favoriteListRepository.saveAll(favoriteList);
	}
	
	public boolean exists(Integer favorite_list_id) {
		return favoriteListRepository.existsById(favorite_list_id);
	}
	
	
	// 給陣列使用 "/with2"
	public String getFavoriteListWithProductInfo2(){
		 List<Object[]> favoriteListWithProductInfo = favoriteListRepository.getFavoriteListWithProductInfo();
		 ObjectMapper objectMapper = new ObjectMapper();
		 try {
			return objectMapper.writeValueAsString(favoriteListWithProductInfo);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	// JSON 使用 “/with"
	public List<Object[]> getFavoriteListWithProductInfo(){
		return favoriteListRepository.getFavoriteListWithProductInfo(); 
	}
	
	public boolean findByFavoriteListCheckId(FavoriteListBean favoriteListBean) {
		Integer memberId = favoriteListBean.getMembers_id();
		Integer productId = favoriteListBean.getProducts_id();
		
		FavoriteListBean checkId = favoriteListRepository.findByFavoriteListCheckId(productId, memberId);
		
		return checkId != null;
	}
	
	// 依據 members_id 去取得資料
	public List<Object[]> findByFavoriteListWhereMemberId(Integer members_id){
		return favoriteListRepository.findByFavoriteListWhereMemberId(members_id);
	}
}
