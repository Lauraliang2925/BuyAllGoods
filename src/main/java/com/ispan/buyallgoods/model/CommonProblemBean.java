package com.ispan.buyallgoods.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "common_problem")
public class CommonProblemBean {
	
	@Id
	@Column(name = "question_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int questionId;

	@Column(name = "member_id", nullable = false)
	private int memberId;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "question", nullable = false)
	private String question;

	@Column(name = "reply", nullable = true)
	private String reply;
	
	@Column(name = "created_date", nullable = false,insertable = false)
	private LocalDateTime createdDate;

	@Column(name = "reply_date", nullable = true)
	private LocalDateTime replyDate;
}
