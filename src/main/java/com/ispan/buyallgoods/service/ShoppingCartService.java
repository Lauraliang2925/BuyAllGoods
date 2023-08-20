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

	public ShoppingCartBean modify(Integer shoppingCartId, ShoppingCartBean shoppingCart) {
		Optional<ShoppingCartBean> optional = shoppingCartRepository.findById(shoppingCartId);
		if (optional.isPresent()) {
			return shoppingCartRepository.save(shoppingCart);
		}
		return null;
	}

	public void remove(Integer shoppingCartId) {
		shoppingCartRepository.deleteById(shoppingCartId);
	}

	public void removeAll() {
		shoppingCartRepository.deleteAll();
	}
	
	public void removeAllByMemberId(Integer membersId) {
		shoppingCartRepository.removeAllByMemberId(membersId);
	}

	public boolean exists(Integer shoppingCartId) {
		return shoppingCartRepository.existsById(shoppingCartId);

	}
	
	public List<Object[]> getShoppingCartWithProductInfo(){
		return shoppingCartRepository.getShoppingCartWithProductInfo();
	}
	
	public Integer getCount() {
		return shoppingCartRepository.getCount();
	}
	
	public boolean findByShoppingCartCheckId(ShoppingCartBean shoppingCartBean) {
		Integer memberId = shoppingCartBean.getMembersId();
		Integer productId = shoppingCartBean.getProductsId();
		
		ShoppingCartBean checkId = shoppingCartRepository.findByShoppingCartCheckId(productId, memberId);
		
		return checkId != null;
	}
	
	public Integer getMemberIdCount(Integer membersId) {
		return shoppingCartRepository.getMemberIdCount(membersId);
	}
	
	public List<Object[]> findByShoppingCartWhereMemberId(Integer membersId){
		return shoppingCartRepository.findByShoppingCartWhereMemberId(membersId);
	}
}
