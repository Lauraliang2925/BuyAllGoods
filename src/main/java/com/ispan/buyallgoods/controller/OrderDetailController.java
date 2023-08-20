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
	public Optional<OrderDetailBean> findById(@PathVariable(name="order_detail_id")Integer orderDetailId) {
		return orderDetailService.findById(orderDetailId);
	}
	
	@PutMapping("/orders/detail/{order_detail_id}")
	public OrderDetailBean modify(@PathVariable(name="order_detail_id")Integer orderDetailId, @RequestBody OrderDetailBean orderDetail) {
		Optional<OrderDetailBean> optional = orderDetailService.findById(orderDetailId);
		if(optional.isPresent()) {
			return orderDetailService.modify(orderDetailId, orderDetail);
		}
		return null;
	}
	
	@PostMapping("/orders/detail")
	public OrderDetailBean create(@RequestBody OrderDetailBean orderDetail) {
		return orderDetailService.create(orderDetail);
	}
	
	@DeleteMapping("/orders/detail/{order_detail_id}")
	public String remove(@PathVariable(name="order_detail_id")Integer orderDetailId) {
		if(!orderDetailService.exists(orderDetailId)) {
			return "資料不存在";
		}else {
			orderDetailService.remove(orderDetailId);
			return "資料刪除成功";
		}
		
	}
	
	@PostMapping("/orders/detail/multi")
	public List<OrderDetailBean> createAll(@RequestBody List<OrderDetailBean> orderDetail){
		return orderDetailService.createAllByJson(orderDetail);
	}
	
	@PostMapping("/orders/detail/findInnerJoin/{members_id}/{order_id}")
	public Map<String, Object> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(@PathVariable("members_id")Integer membersId, @PathVariable("order_id")Integer orderId){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.findDataInnerJoinProductAndOrderByMemberIdAndOrderId(membersId, orderId);
		responseJson.put("list", list);
		return responseJson;
	}
	
	@PostMapping("/orders/detail/innerJoinDetail/{order_id}")
	public Map<String, Object> getOrderDetailInnerJoinProductAndOrder(@PathVariable("order_id")Integer orderId){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.getOrderDetailInnerJoinProductAndOrder(orderId);
		responseJson.put("list", list);
		return responseJson;
	}
	
	@PostMapping("/orders/detail/dataBySuppliers/{order_id}/{suppliers_id}")
	public Map<String, Object> getOrderDetailBySuppliersIdAndOrderId(@PathVariable("order_id")Integer orderId, @PathVariable("suppliers_id")Integer suppliersId){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.getOrderDetailBySuppliersIdAndOrderId(orderId,suppliersId);
		responseJson.put("list", list);
		return responseJson;
	}
	
	@PostMapping("/orders/detail/dataBySuppliersId/{suppliers_id}")
	public Map<String, Object> getOrderDetailBySuppliersId(@PathVariable("suppliers_id")Integer suppliersId){
		Map<String, Object> responseJson = new HashMap<>();
		List<Map<String, Object>> list = orderDetailService.getOrderDetailBySuppliersId(suppliersId);
		responseJson.put("list", list);
		return responseJson;
	}
	
//	 @PutMapping("/orders/detail/update/{{order_detail_id}}")
//	    public ResponseEntity<String> updateOrderDetail(@RequestParam Integer suppliers_id,
//	                                                    @RequestParam String order_status,
//	                                                    @RequestParam String track_shipment,
//	                                                    @RequestParam LocalDate estimated_arrival) {
//	        orderDetailService.updateOrderDetail(suppliers_id, order_status, track_shipment, estimated_arrival);
//	        return ResponseEntity.ok("Order details updated successfully.");
//	   }
}
