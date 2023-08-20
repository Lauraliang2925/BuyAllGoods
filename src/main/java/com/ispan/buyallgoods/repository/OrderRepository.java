package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.OrderBean;

public interface OrderRepository extends JpaRepository<OrderBean, Integer> {

	@Query(nativeQuery = true,
			value = "select o.order_id, o.members_id, o.total_amount, o.placed, o.order_notes, o.order_status from orders o where o.members_id = :members_id")
	public List<Object[]> getAllOrdersWhereMemberID(@Param("members_id")Integer membersId);
		
//	 select od.order_detail_id, od.order_id, od.products_id, p.name, p.selling_price , p.discount_start_date, p.discount_end_date, p.discount, c.total_amount, c.order_status, c.placed,c.members_id 
//	  from orders_detail od inner JOIN product p on od.products_id = p.products_id
//			  INNER join orders c on od.order_id = c.order_id
//			  where c.members_id = '8'
	
//	@Query(nativeQuery = true,
//			value = "select * from orders where order_notes like CONCAT('%', :order_notes, '%')")
//	public List<OrderBean> searchOrderByNotes(@Param("order_notes")String order_notes);
	
//	@Query(nativeQuery = true,
//			value = "select * from orders where order_notes like :order_notes")
//	public List<OrderBean> searchOrderByNotes(@Param("order_notes")String order_notes);
//	
	@Query(nativeQuery = true,
			value = "select * from orders where order_notes like CONCAT('%', :order_notes, '%')")
	public List<Object[]> searchOrderByNotes2(@Param("order_notes")String orderNotes);
	
	@Query("from OrderBean where orderNotes like %:orderNotes% ")
	List<OrderBean> searchOrderByNotes(@Param("orderNotes")String orderNotes);
	

    
}
