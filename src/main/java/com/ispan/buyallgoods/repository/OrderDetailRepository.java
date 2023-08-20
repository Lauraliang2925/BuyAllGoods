package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.OrderDetailBean;

public interface OrderDetailRepository extends JpaRepository<OrderDetailBean, Integer> {


	@Query(nativeQuery = true,value = " SELECT DISTINCT od.order_detail_id, od.order_id, od.products_id, od.quantity, p.name, p.selling_price, p.discount_start_date, p.discount_end_date, p.discount, c.total_amount, c.order_status, c.placed, c.members_id , p.image_path \n"
			+ "	FROM orders_detail od\n"
			+ "	INNER JOIN product p ON od.products_id = p.products_id\n"
			+ "	INNER JOIN orders c ON od.order_id = c.order_id\n"
			+ "	WHERE c.members_id = :members_id AND c.order_id = :order_id ")
	List<Object[]> findDataInnerJoinProductAndOrderByMemberIdAndOrderId(@Param("order_id")Integer orderId, @Param("members_id")Integer memebersId);
	
	@Query(nativeQuery = true,
			value = "select od.order_detail_id , od.order_id , od.products_id , od.quantity , od.unit_price , od.subtotal , od.delivered_arrival , p.name , o.order_status , o.placed , o.shipping_address , o.total_amount , p.image_path\n"
					+ "from orders_detail od inner join product p on od.products_id = p.products_id\n"
					+ "inner join orders o on od.order_id = o.order_id\n"
					+ "where od.order_id = :order_id")
	List<Object[]> getOrderDetailInnerJoinProductAndOrder(@Param("order_id")Integer orderId);
	
	@Query(nativeQuery = true,
			value = "select od.order_detail_id,od.order_id,od.products_id,od.suppliers_id,p.name,od.quantity,od.unit_price,od.subtotal,od.track_shipment,od.estimated_arrival,od.delivered_arrival, o.placed , o.shipping_address , o.order_status , o.total_amount , o.delivered ,p.image_path \n"
					+ "from orders_detail od  INNER JOIN orders o on od.order_id = o.order_id\n"
					+ "inner join product p on od.products_id = p.products_id\n"
					+ "where od.suppliers_id = :suppliers_id and o.order_id = :order_id")
	List<Object[]> getOrderDetailBySuppliersIdAndOrderId(@Param("order_id")Integer orderId, @Param("suppliers_id")Integer suppliersId);
	
	@Query(nativeQuery = true,
			value = "select od.order_detail_id,od.order_id,od.products_id,od.suppliers_id, p.name,od.quantity,od.unit_price,od.subtotal,od.track_shipment,od.estimated_arrival,od.delivered_arrival, o.placed , o.shipping_address , o.order_status , o.total_amount , o.delivered,o.members_id,o.order_notes,o.receipt_method,o.payment_method, p.image_path \n"
					+ "from orders_detail od  INNER JOIN orders o on od.order_id = o.order_id\n"
					+ "inner join product p on od.products_id = p.products_id\n"
					+ "where od.suppliers_id = :suppliers_id")
	List<Object[]> getOrderDetailBySuppliersId(@Param("suppliers_id")Integer suppliersId);
	
    
//	@Transactional
//    @Modifying
//    @Query(nativeQuery = true,value = "UPDATE orders_detail od INNER JOIN orders o ON od.order_id = o.order_id " +
//           "SET od.track_shipment = :track_shipment, od.estimated_arrival = :estimated_arrival " +
//           "WHERE od.suppliers_id = :suppliers_id AND o.order_status = :order_status")
//    void updateOrderDetail(@Param("suppliers_id") Integer suppliers_id,
//                           @Param("order_status") String order_status,
//                           @Param("track_shipment") String track_shipment,
//                           @Param("estimated_arrival") LocalDate estimated_arrival);
}
