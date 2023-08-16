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
@Table(name = "suppliers")
public class SuppliersBean {

	@Id
	@Column(name = "suppliers_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int suppliersId;

	@Column(name = "members_id", nullable = false)
	private int membersId;

	@Column(name = "suppliers_name", columnDefinition = "nvarchar", nullable = false)
	private String suppliersName;

	@Column(name = "tax_id", nullable = false)
	private int taxId;

	@Column(name = "phone", columnDefinition = "varchar")
	private String phone;

	@Column(name = "address", columnDefinition = "nvarchar")
	private String address;

	@Column(name = "logistics", columnDefinition = "nvarchar", nullable = false)
	private String logistics;

	@Column(name = "signing_date", columnDefinition = "date", nullable = false)
	private LocalDate signingDate;

	@Column(name = "contract_end_date", columnDefinition = "date", nullable = false)
	private LocalDate contractEndDate;

	@Column(name = "boss", columnDefinition = "nvarchar", nullable = false)
	private String boss;

	@Column(name = "contact_person", columnDefinition = "nvarchar", nullable = false)
	private String contactPerson;

	@Column(name = "phone_number", columnDefinition = "varchar", nullable = false)
	private String phoneNumber;

	@Column(name = "email", columnDefinition = "nvarchar", nullable = false)
	private String email;

	@Column(name = "remarks", columnDefinition = "nvarchar", nullable = false)
	private String remarks;

	@Column(name = "update_date", columnDefinition = "datatime", nullable = false)
	private LocalDateTime updateDate;
	

}
