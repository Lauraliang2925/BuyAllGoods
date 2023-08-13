package com.ispan.buyallgoods.model;

import lombok.Data;

@Data
public class ProductDTO {
	private Integer productsId;
	private String name;
	private Integer contractsId;
	private Integer suppliersId;

}
