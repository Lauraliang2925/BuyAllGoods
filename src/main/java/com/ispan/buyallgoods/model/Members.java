package com.ispan.buyallgoods.model;

import java.time.LocalDate;
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
@Table(name = "members")
public class Members {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "members_id")
    private Integer  membersId;
	
	@Column(name = "user_name")
    private String  userName;
	
	@Column(name = "password")
    private String  password;
	
	@Column(name = "first_name")
    private String  firstName;
	
	@Column(name = "last_name")
    private String  lastName;
	
	@Column(name = "gender")
    private String  gender;
	
	@Column(name = "birthday")
    private LocalDate  birthday;
	
	@Column(name = "tel")
    private String  tel;
	
	@Column(name = "phone_number")
    private String  phoneNumber;
	
	@Column(name = "postal_code")
    private String  postalCode;
	
	@Column(name = "address")
    private String  address;

	@Column(name = "email")
    private String  email;

	@Column(name = "photo_path")
    private String  photoPath;

	@Column(name = "registration_date")
    private LocalDateTime  registrationDate;

	@Column(name = "role_id")
    private Integer  roleId;

	@Column(name = "expiration_date")
    private LocalDateTime expirationDate;

}
