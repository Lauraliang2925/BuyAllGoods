package com.ispan.buyallgoods.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="orders_detail")
public class OrderDetailBean {

	@Id
	@Column(name="order_detail_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer orderDetailId;
	
	@Column(name = "order_id")
	private Integer orderId;
	
	@Column(name = "products_id")
	private Integer productsId;
	
	@Column(name="quantity")
	private Integer quantity;
	
	@Column(name="unit_price", columnDefinition = "decimal")
	private double unitPrice;
	
	@Column(name="subtotal", columnDefinition = "decimal")
	private double subtotal;
	
	@Column(name="suppliers_id")
	private Integer suppliersId;
	
	@Column(name="track_shipment", columnDefinition = "nvarchar")
	private String trackShipment;
	
	@Column(name="estimated_arrival", columnDefinition = "date" )
	private LocalDate estimatedArrival;
	
	@Column(name = "delivered_arrival", columnDefinition = "date")
	private LocalDate deliveredArrival;
	
 
	
}
