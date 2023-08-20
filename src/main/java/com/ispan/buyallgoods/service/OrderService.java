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

	public Optional<OrderBean> findOrdersById(Integer orderId) {
		return orderRepository.findById(orderId);
	}

	public OrderBean create(OrderBean orderBean) {
		return orderRepository.save(orderBean);
	}

	public OrderBean modify(Integer orderId, OrderBean orderBean) {
		Optional<OrderBean> optional = orderRepository.findById(orderId);
		if (optional.isPresent()) {
			OrderBean bean = optional.get();
			bean.setMembersId(orderBean.getMembersId());
			bean.setTotalAmount(orderBean.getTotalAmount());
			bean.setPaymentMethod(orderBean.getPaymentMethod());
			bean.setShippingAddress(orderBean.getShippingAddress());
			bean.setOrderStatus(orderBean.getOrderStatus());
			bean.setOrderNotes(orderBean.getOrderNotes());
			bean.setOrderNotes(orderBean.getOrderNotes());
			bean.setDelivered(orderBean.getDelivered());

			return orderRepository.save(bean);

		} else {

			throw new IllegalArgumentException("Order with ID " + orderId + " not found.");

		}
	}

	
	public OrderBean modify2(Integer orderId, OrderBean orderBean) {
		Optional<OrderBean> optional = orderRepository.findById(orderId);
		if(optional.isPresent()) {
			
			return orderRepository.save(orderBean);
		}
		return null;
	}
	
	public boolean remove(Integer orderId) {
		Optional<OrderBean> optional = orderRepository.findById(orderId);
		 if (optional.isPresent()) {
			orderRepository.deleteById(orderId);
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
	
	public boolean exists(Integer orderId) {
		return orderRepository.existsById(orderId);
	}
	
	public List<OrderBean> createAllByJson(List<OrderBean> orders){
		return orderRepository.saveAll(orders);
	}
	
	public List<Object[]> findAllOrdersWhereMemberId(Integer membersId){
		return orderRepository.getAllOrdersWhereMemberID(membersId);
	}
	
//	public List<OrderBean> searchOrderByNotes(String order_notes){
//		List<OrderBean> searchOrderByNotes = orderRepository.searchOrderByNotes(order_notes);
//		
//	}
	
    public List<OrderBean> searchOrderByNotes(String orderNotes) {
        return orderRepository.searchOrderByNotes(orderNotes);
    }
    
    public List<Object[]> searchOrderByNotes2(String orderNotes) {
        return orderRepository.searchOrderByNotes2(orderNotes);
    }
    
	public Page<OrderBean> findAll(Pageable pageable) {
		return orderRepository.findAll(pageable);

	}

}
