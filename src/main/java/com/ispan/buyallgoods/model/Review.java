package com.ispan.buyallgoods.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "review")
@Entity
public class Review {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "review_id")
	    private Integer reviewId;
	    
//FK
	    @Column(name = "members_id")
	    private Integer membersId;
//FK
	    @Column(name = "order_detail_id")
	    private Integer orderDetailId;

//FK
	    @Column(name = "products_id")
	    private Integer productsId;

	    @Column(name = "rating", nullable = false)
	    private Integer rating;

	    @Column(name = "comment")
	    private String comment;

	    @Column(name = "likes_count", nullable = false)
	    private Integer likesCount;

	    @Column(name = "created_date", nullable = false, insertable = false)
	    private java.time.LocalDateTime createdDate;
	    
	 
}
