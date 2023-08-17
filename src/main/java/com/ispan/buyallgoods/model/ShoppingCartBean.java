package com.ispan.buyallgoods.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="shopping_cart")
public class ShoppingCartBean {
	
	@Id
	@Column(name="shopping_cart_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer shoppingCartId;
	
	@Column(name = "members_id")
	private Integer membersId;
	
	@Column(name="products_id")
	private Integer productsId;
	
	@Column(name = "quantity")
	private Integer quantity;
		     
	

}
