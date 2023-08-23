package com.ispan.buyallgoods.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.ispan.buyallgoods.model.OrderBean;
import com.ispan.buyallgoods.service.OrderService;

@RestController
@RequestMapping(path = "/api/page")
@CrossOrigin()
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping("/orders/find")
	public List<OrderBean> findAllOrder(){
		return orderService.findAllOrders();
	}
	
	@PostMapping("/orders/{order_id}")
	public Optional<OrderBean> findById(@PathVariable(name="order_id") Integer orderId) {
		return orderService.findOrdersById(orderId);
	}
	
	@PostMapping("/orders")
	public OrderBean create(@RequestBody OrderBean orderBean) {
		
		return orderService.create(orderBean);
	}
	
	@PostMapping("/orders/batch")
	public List<OrderBean> createMultipleOrders(@RequestBody List<OrderBean> orders){
		return orderService.createMultiByJson(orders);
	}
	
	@PutMapping("/orders/{order_id}")
	public OrderBean modify(@PathVariable(name="order_id") Integer orderId, @RequestBody OrderBean orderBean) {
		return orderService.modify(orderId, orderBean);
	}
	
	@DeleteMapping("/orders/{order_id}")
	public String delete(@PathVariable(name="order_id")Integer orderId) {
	    if(!orderService.exists(orderId)) {
	    	return "資料不存在";	
	    }else {
	    	orderService.remove(orderId);
	    	return "刪除資料成功";
	    }    
	}
	
	@PutMapping("/orders/modify2/{order_id}")
	public OrderBean modify2(@PathVariable(name="order_id")Integer orderId, @RequestBody OrderBean orderBean) {
		Optional<OrderBean> optional = orderService.findOrdersById(orderId);
		if(optional.isPresent()) {
			
			return orderService.modify2(orderId, orderBean);
		}
		return null;
	}
	
	
	@PostMapping("/orders/multi")
	public List<OrderBean> createAll(@RequestBody List<OrderBean> orderBean){
		return orderService.createAllByJson(orderBean);
	}
	
	@PostMapping("/orders/members/{members_id}")
	public List<Map<String,Object>> getAllOrdersWhereMemberId(@PathVariable("members_id")Integer membersId){
		List<Object[]> data = orderService.findAllOrdersWhereMemberId(membersId);
		List<Map<String,Object>> result = new ArrayList<>();
		for(Object obj : data) {
			Object[] row = (Object[])obj;
			HashMap<String, Object> map = new HashMap<>();
			map.put("order_id", row[0]);
			map.put("members_id", row[1]);
			map.put("total_amount", row[2]);
			map.put("placed", row[3]);
			map.put("order_notes", row[4]);
			map.put("order_status", row[5]);
			result.add(map);
		}
		return result;
	}
	
    @GetMapping("/orders/searchByNotes/{order_notes}")
    public List<OrderBean> searchOrderByNotes(@PathVariable String orderNotes) {
    	return orderService.searchOrderByNotes(orderNotes);
    }
    
    @PostMapping("/orders/searchByNotes2/{orderNotes}/{membersId}")
    public List<Map<String,Object>> searchOrderByNotes2(@PathVariable String orderNotes, @PathVariable Integer membersId) {
        List<Object[]> data = orderService.searchOrderByNotes2("%" + orderNotes + "%",membersId);
        List<Map<String,Object>> result = new ArrayList<>();
        for(Object obj : data) {
        	Object[] row = (Object[])obj;
            HashMap<String, Object> map = new HashMap<>();
            map.put("order_id", row[0]);
            map.put("members_id", row[1]);
            map.put("total_amount", row[2]);
            map.put("payment_method", row[3]);
            map.put("shipping_address", row[4]);
            map.put("placed", row[5]);
            map.put("order_status", row[6]);
            map.put("order_notes", row[7]);
            map.put("receipt_method", row[8]);
            map.put("delivered", row[9]);
    
            result.add(map);

        }
        return result;
    }
    
    @PostMapping("/orders/searchByNotesAll/{orderNotes}")
    public List<Map<String,Object>> searchOrderByNotesAll(@PathVariable String orderNotes) {
        List<Object[]> data = orderService.searchOrderByNotesAll("%" + orderNotes + "%");
        List<Map<String,Object>> result = new ArrayList<>();
        for(Object obj : data) {
        	Object[] row = (Object[])obj;
            HashMap<String, Object> map = new HashMap<>();
            map.put("order_id", row[0]);
            map.put("members_id", row[1]);
            map.put("total_amount", row[2]);
            map.put("payment_method", row[3]);
            map.put("shipping_address", row[4]);
            map.put("placed", row[5]);
            map.put("order_status", row[6]);
            map.put("order_notes", row[7]);
            map.put("receipt_method", row[8]);
            map.put("delivered", row[9]);
    
            result.add(map);

        }
        return result;
    }
    
    @PutMapping("/orders/modifyByStatusReturn/{orderId}")
    public ResponseEntity<String> modifyOrderStatus(@PathVariable Integer orderId) {
        try {
        	Optional<OrderBean> optional = orderService.findOrdersById(orderId);
        	 if (!optional.isPresent()) {
                 return new ResponseEntity<>("訂單不存在", HttpStatus.NOT_FOUND);
             }

             OrderBean orderBean = optional.get();
            // 更新訂單狀態
            orderBean.setOrderStatus("申請退貨中");
            orderService.modify2(orderId, orderBean);

            return new ResponseEntity<>("訂單狀態已更新為退貨", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("訂單狀態更新失敗", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
    
    @PutMapping("/orders/modifyByStatusCancel/{orderId}")
    public ResponseEntity<String> modifyOrderStatus2(@PathVariable Integer orderId) {
        try {
        	Optional<OrderBean> optional = orderService.findOrdersById(orderId);
        	 if (!optional.isPresent()) {
                 return new ResponseEntity<>("訂單不存在", HttpStatus.NOT_FOUND);
             }

             OrderBean orderBean = optional.get();
            // 更新訂單狀態
            orderBean.setOrderStatus("取消");
            orderService.modify2(orderId, orderBean);

            return new ResponseEntity<>("訂單狀態已更新為退貨", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("訂單狀態更新失敗", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 

//	@GetMapping("/orders/findByPage")
//	public Map<String, Object> findAll(@RequestParam("current") int current, @RequestParam("rows") int rows) {
//
//		// spring boot 分頁API
//		Pageable pageable = PageRequest.of((current - 1), rows);
//
//		Page<OrderBean> pages = orderService.findAll(pageable);
//		List<OrderBean> list = pages.getContent();
//		long count = pages.getTotalElements();
//
//		Map<String, Object> responseJson = new HashMap<>();
//		responseJson.put("list", list);
//		responseJson.put("count", count);
//
//		return responseJson;
//	}
}
