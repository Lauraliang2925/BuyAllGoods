package com.ispan.buyallgoods.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ispan.buyallgoods.model.OrderDetailBean;
import com.ispan.buyallgoods.service.OrderDetailService;

@RestController
@RequestMapping(path = "/api/page")
public class OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;
	
	@PostMapping("/orders/detail/{order_detail_id}")
	public Optional<OrderDetailBean> findById(@PathVariable(name="order_detail_id")Integer order_detail_id) {
		return orderDetailService.findById(order_detail_id);
	}
	
	@PutMapping("/orders/detail/{order_detail_id}")
	public OrderDetailBean modify(@PathVariable(name="order_detail_id")Integer order_detail_id, @RequestBody OrderDetailBean orderDetail) {
		Optional<OrderDetailBean> optional = orderDetailService.findById(order_detail_id);
		if(optional.isPresent()) {
			return orderDetailService.modify(order_detail_id, orderDetail);
		}
		return null;
	}
	
	@PostMapping("/orders/detail")
	public OrderDetailBean create(@RequestBody OrderDetailBean orderDetail) {
		return orderDetailService.create(orderDetail);
	}
	
	@DeleteMapping("/orders/detail/{order_detail_id}")
	public String remove(@PathVariable(name="order_detail_id")Integer order_detail_id) {
		if(!orderDetailService.exists(order_detail_id)) {
			return "資料不存在";
		}else {
			orderDetailService.remove(order_detail_id);
			return "資料刪除成功";
		}
		
	}
	
	@PostMapping("/orders/detail/multi")
	public List<OrderDetailBean> createAll(@RequestBody List<OrderDetailBean> orderDetail){
		return orderDetailService.createAllByJson(orderDetail);
	}
	
	@PostMapping("/orders/detail/findInnerJoin/{members_id}/{order_id}")
	public Map<String, Object> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(@PathVariable("members_id")Integer members_id, @PathVariable("order_id")Integer order_id){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.findDataInnerJoinProductAndOrderByMemberIdAndOrderId(members_id, order_id);
		responseJson.put("list", list);
		return responseJson;
	}
	
	@PostMapping("/orders/detail/innerJoinDetail/{order_id}")
	public Map<String, Object> getOrderDetailInnerJoinProductAndOrder(@PathVariable("order_id")Integer order_id){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.getOrderDetailInnerJoinProductAndOrder(order_id);
		responseJson.put("list", list);
		return responseJson;
	}
}
