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
	
	public Optional<OrderDetailBean> findById(Integer orderDetailId) {
		return orderDetailRepository.findById(orderDetailId);
	}
	
	public OrderDetailBean modify(Integer orderDetailId, OrderDetailBean OrderDetail) {
		Optional<OrderDetailBean> optional = orderDetailRepository.findById(orderDetailId);
		if(optional.isPresent()) {
			return orderDetailRepository.save(OrderDetail);
		}
		
		return null;
	}
	
	public OrderDetailBean create(OrderDetailBean OrderDetail) {
		return orderDetailRepository.save(OrderDetail);
	}
	
	public OrderDetailBean remove(Integer orderDetailId) {
		Optional<OrderDetailBean> optional = orderDetailRepository.findById(orderDetailId);
		if(optional.isPresent()) {
			orderDetailRepository.deleteById(orderDetailId);			
		}
		return null;
	}
	
	public boolean exists(Integer orderDetailId) {
		return orderDetailRepository.existsById(orderDetailId);
	}
	
	public List<OrderDetailBean> createAllByJson(List<OrderDetailBean> orderDetaol){
		return orderDetailRepository.saveAll(orderDetaol);
	}
	
	public List<Map<String,Object>> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(Integer membersId, Integer orderId){
		List<Object[]> data = orderDetailRepository.findDataInnerJoinProductAndOrderByMemberIdAndOrderId(orderId, membersId);
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
			map.put("image_path", row[13]);
			result.add(map);
		}
		return result;
	}
	
	public List<Map<String,Object>> getOrderDetailInnerJoinProductAndOrder(Integer orderId){
		List<Object[]> data = orderDetailRepository.getOrderDetailInnerJoinProductAndOrder(orderId);
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
			map.put("image_path", row[12]);
			
			result.add(map);
		}
		
		return result;
		
	}
	
	public List<Map<String,Object>> getOrderDetailBySuppliersIdAndOrderId(Integer orderId, Integer suppliersId){
		List<Object[]> data = orderDetailRepository.getOrderDetailBySuppliersIdAndOrderId(orderId, suppliersId);
		List<Map<String,Object>> result = new ArrayList<>();
		
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("order_detail_id", row[0]);
			map.put("order_id", row[1]);
			map.put("products_id", row[2]);
			map.put("suppliers_id", row[3]);
			map.put("name", row[4]);
			map.put("quantity", row[5]);
			map.put("unit_price", row[6]);
			map.put("subtotal", row[7]);
			map.put("track_shipment", row[8]);
			map.put("estimated_arrival", row[9]);
			map.put("delivered_arrival", row[10]);
			map.put("placed", row[11]);
			map.put("shipping_address", row[12]);
			map.put("order_status", row[13]);
			map.put("total_amount", row[14]);
			map.put("delivered", row[15]);
			map.put("image_path", row[16]);
			
			result.add(map);
			
		}
		
		return result;
		
	}
	
	public List<Map<String,Object>> getOrderDetailBySuppliersId(Integer suppliersId){
		List<Object[]> data = orderDetailRepository.getOrderDetailBySuppliersId(suppliersId);
		List<Map<String,Object>> result = new ArrayList<>();
		
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("order_detail_id", row[0]);
			map.put("order_id", row[1]);
			map.put("products_id", row[2]);
			map.put("suppliers_id", row[3]);
			map.put("name", row[4]);
			map.put("quantity", row[5]);
			map.put("unit_price", row[6]);
			map.put("subtotal", row[7]);
			map.put("track_shipment", row[8]);
			map.put("estimated_arrival", row[9]);
			map.put("delivered_arrival", row[10]);
			map.put("placed", row[11]);
			map.put("shipping_address", row[12]);
			map.put("order_status", row[13]);
			map.put("total_amount", row[14]);
			map.put("delivered", row[15]);
			map.put("members_id", row[16]);
			map.put("order_notes", row[17]);
			map.put("receipt_method", row[18]);
			map.put("payment_method", row[19]);
			map.put("image_path", row[20]);
			
			result.add(map);
			
		}
		
		return result;
		
	}
	
//	public void updateOrderDetail(Integer suppliers_id, String order_status, String track_shipment, LocalDate estimated_arrival) {
//		orderDetailRepository.updateOrderDetail(suppliers_id,order_status,track_shipment,estimated_arrival);
//	}

}
