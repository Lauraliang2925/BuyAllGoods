package com.ispan.buyallgoods.tools;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class CommonProblemMemberOthers {

	private int questionId;
	private int memberId;
	private String title;
	private String question;
	private String reply;
	private LocalDateTime createdDate;
	private LocalDateTime replyDate;
	private String userName;

}
