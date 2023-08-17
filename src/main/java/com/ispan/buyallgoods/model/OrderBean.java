package com.ispan.buyallgoods.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="orders")
public class OrderBean {
	
	@Id
	@Column(name="order_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer order_id;
	
	@Column(name="members_id")
	private Integer members_id;
		
	@Column(name="total_amount")
	private Integer total_amount;
	
	@Column(name="payment_method", columnDefinition = "nvarchar")
	private String payment_method;
	
	@Column(name="shipping_address", columnDefinition = "nvarchar")
	private String shipping_address;
	
	@Column(name=" placed", insertable = false, updatable = false)
	private LocalDateTime placed;
	
	@Column(name="order_status", columnDefinition = "nvarchar")
	private String order_status;
	
	@Column(name="order_notes", columnDefinition = "nvarchar")
	private String order_notes;
	
	@Column(name="receipt_method", columnDefinition = "nvarchar")
	private String receipt_method;
	
	@Column(name="delivered")
	private LocalDateTime delivered;
	
	

	
}
