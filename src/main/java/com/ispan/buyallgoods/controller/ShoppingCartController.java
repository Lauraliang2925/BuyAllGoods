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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.ShoppingCartBean;
import com.ispan.buyallgoods.service.ShoppingCartService;

@RestController
@RequestMapping(path = "/api/page")
@CrossOrigin()
public class ShoppingCartController {

	@Autowired
	private ShoppingCartService shoppingCartService;
	
	@GetMapping("/shoppingcarts/find")
	public List<ShoppingCartBean> findAll(){
		return shoppingCartService.findAllShoppingCart();
	}
	
	@PostMapping("/shoppingcarts")
	public ShoppingCartBean create(@RequestBody ShoppingCartBean shoppingCart) {
		return shoppingCartService.create(shoppingCart);
	}
	
	@PostMapping("/shoppingcarts/multi")
	public List<ShoppingCartBean> createAllShoppingCart(@RequestBody List<ShoppingCartBean> shoppingCart){
		return shoppingCartService.createAll(shoppingCart);
	}
	
	@PutMapping("/shoppingcarts/{shopping_cart_id}")
	public ShoppingCartBean modify(@PathVariable(name="shopping_cart_id") Integer shopping_cart_id, @RequestBody ShoppingCartBean shoppingCart) {
		if(shoppingCartService.exists(shopping_cart_id)) {
			return shoppingCartService.modify(shopping_cart_id, shoppingCart);
		}
		return null;
	}
	
	@DeleteMapping("/shoppingcarts/{shopping_cart_id}")
	public String delete(@PathVariable(name = "shopping_cart_id") Integer shopping_cart_id) {
		if(!shoppingCartService.exists(shopping_cart_id)) {
			return "查無資料或不存在";
		}else {
			shoppingCartService.remove(shopping_cart_id);
			return "刪除資料成功";
		}
	
	}
	
	@DeleteMapping("/shoppingcarts/delete/{members_id}")
	public void removerAllByMemberId(@PathVariable("members_id")Integer members_id) {
		shoppingCartService.removeAllByMemberId(members_id);
	}
	
	
	@DeleteMapping("/shoppingcarts")
	public String removeAllShoppingCart() {
		List<ShoppingCartBean> shoppingCartList = shoppingCartService.findAllShoppingCart();
		if(shoppingCartList!=null && !shoppingCartList.isEmpty()) {
			shoppingCartService.removeAll();
			return "清空成功";
		}
		return "刪除失敗或無資料";
	}
	
	@GetMapping("/shoppingcarts/with")
	public List<Map<String,Object>> getShoppingCartWithProductInfo(){
		List<Object[]> cartWithProductInfo = shoppingCartService.getShoppingCartWithProductInfo();
		List<Map<String, Object>> result = new ArrayList<>();
		for(Object obj : cartWithProductInfo ) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("shopping_cart_id", row[0]);
			map.put("members_id", row[1]);
			map.put("products_id", row[2]);
			map.put("quantity", row[3]);
			map.put("name", row[4]);
			map.put("selling_price", row[5]);
			result.add(map);
		}
		
		return result;
	}
	
	@GetMapping("/shoppingcarts/count")
    public ResponseEntity<Integer> getTotalItemCount() {
        Integer totalItemCount = shoppingCartService.getCount();
        return ResponseEntity.ok(totalItemCount);
    }
	
	@PostMapping("/shoppingcarts/checkin")
	public Map<String,Object> createAndCheck(@RequestBody ShoppingCartBean shoppingCartBean){
		Map<String, Object> responseJson = new HashMap<>();
		
		if(shoppingCartService.findByShoppingCartCheckId(shoppingCartBean)) {
			responseJson.put("message", "新增資料失敗，有重複");
            responseJson.put("success", false);
		}else {
			ShoppingCartBean create = shoppingCartService.create(shoppingCartBean);
			 responseJson.put("message", "新增資料成功");
	         responseJson.put("success", true);
	         responseJson.put("create", create);
		}
		return responseJson;
	}
	
	@GetMapping("/shoppingcarts/count/{members_id}")
	public ResponseEntity<Integer> getMemberIdCount(@PathVariable("members_id")Integer members_id){
		Integer memberIdCount = shoppingCartService.getMemberIdCount(members_id);
		return ResponseEntity.ok(memberIdCount);
	}
	
	@PostMapping("/shoppingcarts/{members_id}")
	public List<Map<String,Object>> findByShoppingCartWhereMemberId(@PathVariable("members_id")Integer members_id){
		List<Object[]> data = shoppingCartService.findByShoppingCartWhereMemberId(members_id);
		List<Map<String,Object>> result = new ArrayList<>();
		LocalDate currentDate = LocalDate.now();
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("shopping_cart_id", row[0]);
			map.put("members_id", row[1]);
			map.put("products_id", row[2]);
			map.put("quantity", row[3]);
			map.put("name", row[4]);
			map.put("selling_price", row[5]);
			map.put("suppliers_id", row[9]);
			
			java.sql.Date sqlDiscountStartDate = (java.sql.Date) row[7];
			java.sql.Date sqlDiscountEndDate = (java.sql.Date) row[8];
			LocalDate discountStartDate = sqlDiscountStartDate.toLocalDate();
			LocalDate discountEndDate = sqlDiscountEndDate.toLocalDate();
			
			if (currentDate.isEqual(discountStartDate) || (currentDate.isAfter(discountStartDate) && currentDate.isBefore(discountEndDate))) {
	        	BigDecimal discount = (BigDecimal) row[6]; // Assuming the discount is a BigDecimal value
	        	Integer sellingPrice = (Integer) row[5]; // Assuming selling_price is int
	            BigDecimal sellingPriceDecimal = new BigDecimal(sellingPrice);// Assuming the selling price is a BigDecimal value
	            BigDecimal newSellingPrice = sellingPriceDecimal.multiply(discount);
	            map.put("new_selling_price", newSellingPrice.doubleValue());
	        } else {
	        	Integer sellingPrice = (Integer) row[5];
	            map.put("new_selling_price", sellingPrice.doubleValue());
	        }
			
//			map.put("discount", row[6]);
//			map.put("discount_start_date", row[7]);
//			map.put("discount_end_date", row[8]);
			
			result.add(map);
		}
		return result;
	}
}
