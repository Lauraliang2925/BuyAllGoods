package com.ispan.buyallgoods.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ispan.buyallgoods.model.OrderBean;
import com.ispan.buyallgoods.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public List<OrderBean> findAllOrders() {
		return orderRepository.findAll();
	}

	public Optional<OrderBean> findOrdersById(Integer order_id) {
		return orderRepository.findById(order_id);
	}

	public OrderBean create(OrderBean orderBean) {
		return orderRepository.save(orderBean);
	}

	public OrderBean modify(Integer order_id, OrderBean orderBean) {
		Optional<OrderBean> optional = orderRepository.findById(order_id);
		if (optional.isPresent()) {
			OrderBean bean = optional.get();
			bean.setMembers_id(orderBean.getMembers_id());
			bean.setTotal_amount(orderBean.getTotal_amount());
			bean.setPayment_method(orderBean.getPayment_method());
			bean.setShipping_address(orderBean.getShipping_address());
			bean.setOrder_status(orderBean.getOrder_status());
			bean.setOrder_notes(orderBean.getOrder_notes());
			bean.setReceipt_method(orderBean.getReceipt_method());
			bean.setDelivered(orderBean.getDelivered());

			return orderRepository.save(bean);

		} else {

			throw new IllegalArgumentException("Order with ID " + order_id + " not found.");

		}
	}

	
	public OrderBean modify2(Integer order_id, OrderBean orderBean) {
		Optional<OrderBean> optional = orderRepository.findById(order_id);
		if(optional.isPresent()) {
			
			return orderRepository.save(orderBean);
		}
		return null;
	}
	
	public boolean remove(Integer order_id) {
		Optional<OrderBean> optional = orderRepository.findById(order_id);
		 if (optional.isPresent()) {
			orderRepository.deleteById(order_id);
			return true;
		}

		return false;
	}
	
	public List<OrderBean> createMultiByJson(List<OrderBean> orders){
		List<OrderBean> createOrders = new ArrayList<>();
		for(OrderBean orderBean : orders) {
			createOrders.add(orderRepository.save(orderBean));
		}
		return createOrders;
	}
	
	public boolean exists(Integer order_id) {
		return orderRepository.existsById(order_id);
	}
	
	public List<OrderBean> createAllByJson(List<OrderBean> orders){
		return orderRepository.saveAll(orders);
	}
	
	public List<Object[]> findAllOrdersWhereMemberId(Integer members_id){
		return orderRepository.getAllOrdersWhereMemberID(members_id);
	}
	
//	public List<OrderBean> searchOrderByNotes(String order_notes){
//		List<OrderBean> searchOrderByNotes = orderRepository.searchOrderByNotes(order_notes);
//		
//	}
	
    public List<OrderBean> searchOrderByNotes(String order_notes) {
        return orderRepository.searchOrderByNotes(order_notes);
    }
    
    public List<Object[]> searchOrderByNotes2(String order_notes) {
        return orderRepository.searchOrderByNotes2(order_notes);
    }
    
	public Page<OrderBean> findAll(Pageable pageable) {
		return orderRepository.findAll(pageable);

	}

}
