package com.ispan.buyallgoods.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.FavoriteListBean;
import com.ispan.buyallgoods.service.FavoriteListService;

@RestController
@RequestMapping(path = "/api/page")
@CrossOrigin()
public class FavoriteListController {

	@Autowired
	private FavoriteListService favoriteListService;
	
	
	@PostMapping("/favorites")
	public FavoriteListBean create(@RequestBody FavoriteListBean favoriteList) {
		return favoriteListService.create(favoriteList);
	}
	
	@GetMapping("/favorites/find")
	public List<FavoriteListBean> findAll(){
		return favoriteListService.findAllFavoriteList();
	}
	
	@DeleteMapping("/favorites/{favorite_list_id}")
	public String remove(@PathVariable(name="favorite_list_id")Integer favorite_list_id) {
		if(!favoriteListService.exists(favorite_list_id)) {
			return "查無資料或不存在";
		}else {
			favoriteListService.remove(favorite_list_id);
			return "刪除資料成功";
		}			
	}
	
	@DeleteMapping("/favorites/delete/{members_id}")
	public void removeAllMember(@PathVariable("members_id")Integer members_id) {
		 favoriteListService.removeAllByMember(members_id); 
	}
	
	@DeleteMapping("/favorites")
	public String removeAll() {
		List<FavoriteListBean> favoriteList = favoriteListService.findAllFavoriteList();
		if(favoriteList!=null && !favoriteList.isEmpty()) {
			favoriteListService.removeAll();
			return "刪除資料成功";
		}else {
			return "無資料";
		}
	}
	
	@PostMapping("/favorites/multi")
	public List<FavoriteListBean> createAll(@RequestBody List<FavoriteListBean> favoriteList){
		return favoriteListService.createAll(favoriteList);
	}
	
	// 陣列方式顯示
	@GetMapping("/favorites/with2")
	public ResponseEntity<String> getFavoriteListWithProductInfo2(){
		 String favoriteListWithProductInfo = favoriteListService.getFavoriteListWithProductInfo2();
		if(!favoriteListWithProductInfo.isEmpty()) {
			return ResponseEntity.ok(favoriteListWithProductInfo);
		}else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// JSON方式顯示
	@GetMapping("/favorites/with")
	public List<Map<String,Object>> getFavoriteListWithProductInfo(){
		List<Object[]> favoriteListWithProductInfo = favoriteListService.getFavoriteListWithProductInfo();
		List<Map<String,Object>> result = new ArrayList<>();
		for(Object obj : favoriteListWithProductInfo) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("favorite_list_id", row[0]);
			map.put("members_id", row[1]);
			map.put("products_id", row[2]);
			map.put("name", row[3]);
			map.put("selling_price", row[4]);
			result.add(map);
			
		}
		return result;
	}
	
	@PostMapping("/favorites/checkin")
	public Map<String,Object> createAndCheck(@RequestBody FavoriteListBean favoriteListBean){
		Map<String, Object> responseJson = new HashMap<>();
		
		if(favoriteListService.findByFavoriteListCheckId(favoriteListBean)) {
			responseJson.put("message", "新增資料失敗，有重複");
            responseJson.put("success", false);
		}else {
			 FavoriteListBean create = favoriteListService.create(favoriteListBean);
			 responseJson.put("message", "新增資料成功");
	         responseJson.put("success", true);
	         responseJson.put("create", create);
		}
		  return responseJson;
	}
	
	@PostMapping("/favorites/{members_id}")
	public List<Map<String,Object>> findByFavoriteListWhereMemberId(@PathVariable("members_id")Integer members_id){
		List<Object[]> data = favoriteListService.findByFavoriteListWhereMemberId(members_id);
		List<Map<String, Object>> result = new ArrayList<>();
		
		LocalDate currentDate = LocalDate.now();
		
		for(Object obj : data) {
			Object[] row =(Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("shopping_cart_id", row[0]);
			map.put("members_id", row[1]);
			map.put("products_id", row[2]);
			map.put("name", row[3]);
			map.put("selling_price", row[4]);
			map.put("suppliers_id", row[8]);
			
			java.sql.Date sqlDiscountStartDate = (java.sql.Date) row[6];
			java.sql.Date sqlDiscountEndDate = (java.sql.Date) row[7];
			LocalDate discountStartDate = sqlDiscountStartDate.toLocalDate();
			LocalDate discountEndDate = sqlDiscountEndDate.toLocalDate();
			
//			LocalDate discountStartDate = (LocalDate) row[6];
//	        LocalDate discountEndDate = (LocalDate) row[7];

	        // Check if the current date is within the discount period
	        if (currentDate.isEqual(discountStartDate) || (currentDate.isAfter(discountStartDate) && currentDate.isBefore(discountEndDate))) {
	        	BigDecimal discount = (BigDecimal) row[5]; // Assuming the discount is a BigDecimal value
	        	Integer sellingPrice = (Integer) row[4]; // Assuming selling_price is int
	            BigDecimal sellingPriceDecimal = new BigDecimal(sellingPrice);// Assuming the selling price is a BigDecimal value
	            BigDecimal newSellingPrice = sellingPriceDecimal.multiply(discount);
	            map.put("new_selling_price", newSellingPrice.doubleValue());
	        } else {
	        	Integer sellingPrice = (Integer) row[4];
	            map.put("new_selling_price", sellingPrice.doubleValue());
	        }
	        
//			map.put("discount", row[5]);
//			map.put("discount_start_date", row[6]);
//			map.put("discount_end_date", row[7]);
	        
			result.add(map);
		}
		return result;
	}
}
