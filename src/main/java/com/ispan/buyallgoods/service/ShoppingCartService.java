package com.ispan.buyallgoods.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ispan.buyallgoods.model.ShoppingCartBean;
import com.ispan.buyallgoods.repository.ShoppingCartRepository;

@Service
@Transactional(rollbackFor = {Exception.class})
public class ShoppingCartService {

	@Autowired
	private ShoppingCartRepository shoppingCartRepository;

	public List<ShoppingCartBean> findAllShoppingCart() {
		return shoppingCartRepository.findAll();
	}

	public ShoppingCartBean create(ShoppingCartBean shoppingCart) {
		return shoppingCartRepository.save(shoppingCart);
	}

	public List<ShoppingCartBean> createAll(List<ShoppingCartBean> shoppingCart) {
		return shoppingCartRepository.saveAll(shoppingCart);
	}

	public ShoppingCartBean modify(Integer shopping_cart_id, ShoppingCartBean shoppingCart) {
		Optional<ShoppingCartBean> optional = shoppingCartRepository.findById(shopping_cart_id);
		if (optional.isPresent()) {
			return shoppingCartRepository.save(shoppingCart);
		}
		return null;
	}

	public void remove(Integer shopping_cart_id) {
		shoppingCartRepository.deleteById(shopping_cart_id);
	}

	public void removeAll() {
		shoppingCartRepository.deleteAll();
	}
	
	public void removeAllByMemberId(Integer members_id) {
		shoppingCartRepository.removeAllByMemberId(members_id);
	}

	public boolean exists(Integer shopping_cart_id) {
		return shoppingCartRepository.existsById(shopping_cart_id);

	}
	
	public List<Object[]> getShoppingCartWithProductInfo(){
		return shoppingCartRepository.getShoppingCartWithProductInfo();
	}
	
	public Integer getCount() {
		return shoppingCartRepository.getCount();
	}
	
	public boolean findByShoppingCartCheckId(ShoppingCartBean shoppingCartBean) {
		Integer memberId = shoppingCartBean.getMembers_id();
		Integer productId = shoppingCartBean.getProducts_id();
		
		ShoppingCartBean checkId = shoppingCartRepository.findByShoppingCartCheckId(productId, memberId);
		
		return checkId != null;
	}
	
	public Integer getMemberIdCount(Integer memebers_id) {
		return shoppingCartRepository.getMemberIdCount(memebers_id);
	}
	
	public List<Object[]> findByShoppingCartWhereMemberId(Integer members_id){
		return shoppingCartRepository.findByShoppingCartWhereMemberId(members_id);
	}
}
