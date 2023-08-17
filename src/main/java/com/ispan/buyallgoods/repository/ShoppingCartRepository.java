package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.ShoppingCartBean;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCartBean, Integer> {

	@Query(nativeQuery = true,
			value = "  select s.shopping_cart_id, s.members_id, s.products_id, s.quantity, p.name , p.selling_price\n"
					+ "  from shopping_cart s inner JOIN product  p ON s.products_id = p.products_id")
	List<Object[]> getShoppingCartWithProductInfo();
	
	@Query(nativeQuery = true,
			value = "select count(*) from shopping_cart")
	Integer getCount();
	
	@Query(nativeQuery = true,
			value = "select * from shopping_cart s where s.products_id = :products_id and s.members_id = :members_id")
	ShoppingCartBean findByShoppingCartCheckId(@Param("products_id")Integer products_id, @Param("members_id")Integer members_id );
	
	@Query(nativeQuery = true,
			value = "select count(*) from shopping_cart where members_id = :members_id")
	Integer getMemberIdCount(@Param("members_id")Integer members_id);
	
	@Query(nativeQuery = true,
			value = "select s.shopping_cart_id, s.members_id, s.products_id, s.quantity, p.name, p.selling_price, p.discount, p.discount_start_date, p.discount_end_date, p.suppliers_id  \n"
					+ "from shopping_cart s  inner join product p on s.products_id = p.products_id where s.members_id = :members_id")
	List<Object[]> findByShoppingCartWhereMemberId(@Param("members_id")Integer members_id);
	
	@Modifying
	@Query(nativeQuery = true,
			value = "delete from shopping_cart where members_id = :members_id")
	void removeAllByMemberId(@Param("members_id")Integer members_id);
}
