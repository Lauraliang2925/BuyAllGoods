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
	private Integer orderId;
	
	@Column(name="members_id")
	private Integer membersId;
		
	@Column(name="total_amount")
	private Integer totalAmount;
	
	@Column(name="payment_method", columnDefinition = "nvarchar")
	private String paymentMethod;
	
	@Column(name="shipping_address", columnDefinition = "nvarchar")
	private String shippingAddress;
	
	@Column(name=" placed", insertable = false, updatable = false)
	private LocalDateTime placed;
	
	@Column(name="order_status", columnDefinition = "nvarchar")
	private String orderStatus;
	
	@Column(name="order_notes", columnDefinition = "nvarchar")
	private String orderNotes;
	
	@Column(name="receipt_method", columnDefinition = "nvarchar")
	private String receiptMethod;
	
	@Column(name="delivered")
	private LocalDateTime delivered;
	
	

	
}
