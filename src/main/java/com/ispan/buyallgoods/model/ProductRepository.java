package com.ispan.buyallgoods.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

//	使用商品名稱尋找商品(模糊搜尋)	
	@Query("SELECT p FROM Product p WHERE p.name LIKE '%' + :name + '%'")
	List<Product> findByProductName(@Param("name") String name);
	
//	使用商品名稱尋找商品(精確搜尋)	
	@Query("SELECT p FROM Product p WHERE p.name = :name")
	Product findByPreciseProductName(@Param("name") String name);

//	使用商品分類ID尋找此分類底下所有商品
	List<Product> findAllByCategoriesId(Integer categoriesId);

//	使用廠商ID尋找底下所有商品
	List<Product> findAllBySuppliersId(Integer suppliersId);

//	使用合約ID尋找底下所有商品
	List<Product> findAllByContractsId(Integer contractsId);

//	使用廠商名稱尋找底下所有商品
	@Query(nativeQuery = true, value = "SELECT p.products_id, p.name, p.contracts_id, p.suppliers_id "
			+ "FROM product p " + "LEFT JOIN suppliers s ON p.suppliers_id = s.suppliers_id "
			+ "WHERE s.suppliers_name = :suppliersName")
	List<Object[]> findProductsBySupplierName(String suppliersName);
	
//	使用分類名稱尋找底下所有商品
	@Query(nativeQuery = true, value = "SELECT p.products_id, p.name, p.categories_id "
			+ "FROM product p " + "LEFT JOIN categories c ON p.categories_id = c.categories_id "
			+ "WHERE c.name = :categoriesName")
	List<Object[]> findProductsByCategoriesName(String categoriesName);

//	@Query("SELECT p FROM Product p LEFT JOIN Suppliers s ON p.suppliersId = s.suppliersId WHERE s.suppliersName = :suppliersName")
//	List<ProductDTO> findProductsBySupplierName(@Param("suppliersName") String suppliersName);

//	用上面搜尋列找商品，實現任意1-3個條件縮小範圍搜尋	
	@Query("SELECT p FROM Product p " +
	           "WHERE (:name is null OR p.name LIKE '%' || :name || '%') " +
	           "AND (:suppliersId is null OR p.suppliersId = :suppliersId) " +
	           "AND (:contractsId is null OR p.contractsId = :contractsId)")
	    List<Product> findByCustomQuery(@Param("name") String name,
	                                    @Param("suppliersId") Integer suppliersId,
	                                    @Param("contractsId") Integer contractsId);
}
