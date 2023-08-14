package com.ispan.buyallgoods.model;

import lombok.Data;

//使用分類名稱查商品 left join
@Data
public class ProductCategoriesPOJO {

	private Product product;
	private Categories categories;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Categories getCategories() {
		return categories;
	}

	public void setCategories(Categories categories) {
		this.categories = categories;
	}

	private Integer productsId;

//FK
	private Integer categoriesId;

//FK
	private Integer contractsId;

	private String name;

	private String productsSpecification;

	private String productsDescription;

	private String imagePath;

	private Integer sellingPrice;

	private Integer cost;

	private Integer lowestPrice;

	private Integer total;

	private Integer orderQuantity;

	private Integer soldQuantity;

//FK
	private Integer suppliersId;

	private java.time.LocalDate expiryDate;

	private java.time.LocalDate sellingStartDate;

	private java.time.LocalDate sellingStopDate;

	private java.time.LocalDate discountStartDate;

	private java.time.LocalDate discountEndDate;

	private Double discount;

//FK
	private Integer staffId;

	private String categoriesName;

}
