package com.ispan.buyallgoods.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ispan.buyallgoods.model.FavoriteListBean;

public interface FavoriteListRepository extends JpaRepository<FavoriteListBean, Integer> {

	@Query(nativeQuery = true,
	           value = "select f.favorite_list_id, f.members_id, f.products_id, p.name, p.selling_price, p.image_path from favorite_list f inner join product p on f.products_id = p.products_id")
	List<Object[]> getFavoriteListWithProductInfo();
	
	@Query(nativeQuery = true,
			value = "select * from favorite_list f where f.products_id = :products_id and f.members_id = :members_id")
	FavoriteListBean findByFavoriteListCheckId(@Param("products_id")Integer productsId, @Param("members_id")Integer membersId );
	
	
	@Query(nativeQuery = true,
			value = "select f.favorite_list_id, f.members_id, f.products_id , p.name, p.selling_price, p.discount , p.discount_start_date, p.discount_end_date, p.suppliers_id , p.image_path from favorite_list f\n"
					+ "inner join product p on f.products_id = p.products_id where f.members_id = :members_id")
	List<Object[]> findByFavoriteListWhereMemberId(@Param("members_id")Integer membersId);
	
	@Modifying
	@Query(nativeQuery = true,
			value = "delete from favorite_list  where members_id = :members_id")
	void removeAllByMemberId(@Param("members_id")Integer membersId);
}
