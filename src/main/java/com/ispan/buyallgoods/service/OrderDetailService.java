package com.ispan.buyallgoods.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.OrderDetailBean;
import com.ispan.buyallgoods.repository.OrderDetailRepository;

@Service
public class OrderDetailService {
	
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	public Optional<OrderDetailBean> findById(Integer order_detail_id) {
		return orderDetailRepository.findById(order_detail_id);
	}
	
	public OrderDetailBean modify(Integer order_detail_id, OrderDetailBean OrderDetail) {
		Optional<OrderDetailBean> optional = orderDetailRepository.findById(order_detail_id);
		if(optional.isPresent()) {
			return orderDetailRepository.save(OrderDetail);
		}
		
		return null;
	}
	
	public OrderDetailBean create(OrderDetailBean OrderDetail) {
		return orderDetailRepository.save(OrderDetail);
	}
	
	public OrderDetailBean remove(Integer order_detail_id) {
		Optional<OrderDetailBean> optional = orderDetailRepository.findById(order_detail_id);
		if(optional.isPresent()) {
			orderDetailRepository.deleteById(order_detail_id);			
		}
		return null;
	}
	
	public boolean exists(Integer order_detail_id) {
		return orderDetailRepository.existsById(order_detail_id);
	}
	
	public List<OrderDetailBean> createAllByJson(List<OrderDetailBean> orderDetaol){
		return orderDetailRepository.saveAll(orderDetaol);
	}
	
	public List<Map<String,Object>> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(Integer members_id, Integer order_id){
		List<Object[]> data = orderDetailRepository.findDataInnerJoinProductAndOrderByMemberIdAndOrderId(order_id, members_id);
		List<Map<String,Object>> result = new ArrayList<>();
		
		LocalDate currentDate = LocalDate.now();
		
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("order_detail_id", row[0]);
			map.put("order_id", row[1]);
			map.put("products_id", row[2]);
			map.put("quantity", row[3]);
			map.put("name", row[4]);
			map.put("selling_price", row[5]);
			
			java.sql.Date sqlDiscountStartDate = (java.sql.Date) row[6];
			java.sql.Date sqlDiscountEndDate = (java.sql.Date) row[7];
			LocalDate discountStartDate = sqlDiscountStartDate.toLocalDate();
			LocalDate discountEndDate = sqlDiscountEndDate.toLocalDate();
			
			if (currentDate.isEqual(discountStartDate) || (currentDate.isAfter(discountStartDate) && currentDate.isBefore(discountEndDate))) {
	        	BigDecimal discount = (BigDecimal) row[8]; // Assuming the discount is a BigDecimal value
	        	Integer sellingPrice = (Integer) row[5]; // Assuming selling_price is int
	            BigDecimal sellingPriceDecimal = new BigDecimal(sellingPrice);// Assuming the selling price is a BigDecimal value
	            BigDecimal newSellingPrice = sellingPriceDecimal.multiply(discount);
	            map.put("new_selling_price", newSellingPrice.doubleValue());
	        } else {
	        	Integer sellingPrice = (Integer) row[5];
	            map.put("new_selling_price", sellingPrice.doubleValue());
	        }
//			map.put("discount_start_date", row[6]);
//			map.put("discount_end_date", row[7]);
//			map.put("discount", row[8]);
			map.put("total_amount", row[9]);
			map.put("order_status", row[10]);
			map.put("placed", row[11]);
			map.put("members_id", row[12]);
			result.add(map);
		}
		return result;
	}
	
	public List<Map<String,Object>> getOrderDetailInnerJoinProductAndOrder(Integer order_id){
		List<Object[]> data = orderDetailRepository.getOrderDetailInnerJoinProductAndOrder(order_id);
		List<Map<String,Object>> result = new ArrayList<>();
		
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("order_detail_id", row[0]);
			map.put("order_id", row[1]);
			map.put("products_id", row[2]);
			map.put("quantity", row[3]);
			
			map.put("unit_price", row[4]);
//			Integer unitPrice = (Integer) row[4];
//            map.put("unit_price", unitPrice.doubleValue());
			
			map.put("subtotal", row[5]);
			map.put("delivered_arrival", row[6]);
			map.put("name", row[7]);
			map.put("order_status", row[8]);
			map.put("placed", row[9]);
			map.put("shipping_address", row[10]);
			map.put("total_amount", row[11]);
			
			result.add(map);
		}
		
		return result;
		
	}
	

}
