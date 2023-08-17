package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.OrderDetailBean;

public interface OrderDetailRepository extends JpaRepository<OrderDetailBean, Integer> {


	@Query(nativeQuery = true,value = " SELECT DISTINCT od.order_detail_id, od.order_id, od.products_id, od.quantity, p.name, p.selling_price, p.discount_start_date, p.discount_end_date, p.discount, c.total_amount, c.order_status, c.placed, c.members_id \n"
			+ "	FROM orders_detail od\n"
			+ "	INNER JOIN product p ON od.products_id = p.products_id\n"
			+ "	INNER JOIN orders c ON od.order_id = c.order_id\n"
			+ "	WHERE c.members_id = :members_id AND c.order_id = :order_id ")
	List<Object[]> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(@Param("order_id")Integer order_id, @Param("members_id")Integer memebers_id);
	
	@Query(nativeQuery = true,
			value = "select od.order_detail_id , od.order_id , od.products_id , od.quantity , od.unit_price , od.subtotal , od.delivered_arrival , p.name , o.order_status , o.placed , o.shipping_address , o.total_amount\n"
					+ "from orders_detail od inner join product p on od.products_id = p.products_id\n"
					+ "inner join orders o on od.order_id = o.order_id\n"
					+ "where od.order_id = :order_id")
	List<Object[]> getOrderDetailInnerJoinProductAndOrder(@Param("order_id")Integer order_id);
	
}
