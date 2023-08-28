package com.ispan.buyallgoods.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "liked")
@Entity
public class Liked {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "like_id")
	    private Integer likeId;
	//FK
	    @Column(name = "review_id")
	    private Integer reviewId;	    
//FK
	    @Column(name = "members_id")
	    private Integer membersId;
	    

	    @Column(name = "created_date", nullable = false, insertable = false)
	    private java.time.LocalDateTime createdDate;
	    
	 
}
