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
@Table(name="favorite_list")
public class FavoriteListBean {

	@Id
	@Column(name="favorite_list_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer favorite_list_id;
	
	@Column(name = "members_id")
	private Integer members_id;
	
	@Column(name="products_id")
	private Integer products_id;
	

}
