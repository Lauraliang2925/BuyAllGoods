package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ispan.buyallgoods.model.SuppliersBean;

public interface SuppliersRepository extends JpaRepository<SuppliersBean, Integer> {

//  select s.suppliers_id,s.suppliers_name,c.contracts_id
//	from suppliers as s left join contracts as c on s.suppliers_id=c.suppliers_id

	@Query(nativeQuery = true, value = "select s.suppliers_id," + "s.suppliers_name,c.contracts_id,c.contract_number, s.contract_end_date,c.end_date  "
			+ "from suppliers as s " + "left join contracts as c " + "on s.suppliers_id=c.suppliers_id")
	List<Object> getSCView();

	@Query(nativeQuery = true, value = "select suppliers_id from suppliers")
	List<Object> getAllSuppliers();
	
	
	//分頁
	@Query(nativeQuery = true, value = "SELECT s.suppliers_id, s.suppliers_name, c.contracts_id, c.contract_number, s.contract_end_date,c.end_date "
		    + "FROM suppliers AS s "
		    + "LEFT JOIN contracts AS c ON s.suppliers_id = c.suppliers_id "
		    + "ORDER BY s.suppliers_id "  // 可以根据需要指定排序字段
		    + "OFFSET :offset ROWS FETCH NEXT 5 ROWS ONLY")
		List<Object> getSCViewWithPagination(int offset);

	
	//計算兩個表的總資料數
	@Query(nativeQuery = true, value = "SELECT COUNT(*) FROM suppliers AS s "
	        + "LEFT JOIN contracts AS c ON s.suppliers_id = c.suppliers_id")
	Integer getSCCount();


}
	