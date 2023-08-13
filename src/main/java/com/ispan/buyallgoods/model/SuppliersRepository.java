package com.ispan.buyallgoods.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SuppliersRepository extends JpaRepository<Suppliers, Integer> {

//  select s.suppliers_id,s.suppliers_name,c.contracts_id
//	from suppliers as s left join contracts as c on s.suppliers_id=c.suppliers_id

	@Query(nativeQuery = true, value = "select s.suppliers_id," + "s.suppliers_name,c.contracts_id,s.contact_person "
			+ "from suppliers as s " + "left join contracts as c " + "on s.suppliers_id=c.suppliers_id")
	List<Object> getSCView();


	@Query(nativeQuery = true,value = "select suppliers_id from suppliers")
	List<Object> getAllSuppliers();
	
}
