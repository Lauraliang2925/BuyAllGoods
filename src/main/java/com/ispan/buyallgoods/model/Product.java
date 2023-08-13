package com.ispan.buyallgoods.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "product")
@Entity
public class Product {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "products_id")
	    private Integer productsId;
	 
//FK
	    @Column(name = "categories_id")
	    private Integer categoriesId;

//FK
	    @Column(name = "contracts_id")
	    private Integer contractsId;

	    @Column(name = "name", nullable = false)
	    private String name;

	    @Column(name = "products_specification", nullable = false)
	    private String productsSpecification;

	    @Column(name = "products_description")
	    private String productsDescription;

	    @Column(name = "image_path", nullable = false)
	    private String imagePath;

	    @Column(name = "selling_price", nullable = false)
	    private Integer sellingPrice;

	    @Column(name = "cost", nullable = false)
	    private Integer cost;

	    @Column(name = "lowest_price", nullable = false)
	    private Integer lowestPrice;

	    @Column(name = "total", nullable = false)
	    private Integer total;

	    @Column(name = "order_quantity", nullable = false)
	    private Integer orderQuantity;

	    @Column(name = "sold_quantity", nullable = false)
	    private Integer soldQuantity;
	    
//FK
	    @Column(name = "suppliers_id", nullable = false)
	    private Integer suppliersId;

	    @Column(name = "expiry_date", nullable = false)
	    private java.time.LocalDate expiryDate;

	    @Column(name = "selling_start_date", nullable = false)
	    private java.time.LocalDate sellingStartDate;

	    @Column(name = "selling_stop_date", nullable = false)
	    private java.time.LocalDate sellingStopDate;

	    @Column(name = "discount_start_date")
	    private java.time.LocalDate discountStartDate;

	    @Column(name = "discount_end_date")
	    private java.time.LocalDate discountEndDate;

	    @Column(name = "discount", columnDefinition = "decimal(5, 4)")
	    private Double discount;

	    
//FK
	    @Column(name = "members_id", nullable = false)
	    private Integer staffId;

	    @Column(name = "created_date", nullable = false, insertable = false)
	    private java.time.LocalDateTime createdDate;
	    
	 
}
