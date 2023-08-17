package com.ispan.buyallgoods.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contracts")
public class ContractsBean {

	@Id
	@Column(name = "contracts_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int contractsId;

	@Column(name = "contract_number", columnDefinition = "nvarchar", nullable = false)
	private String contractNumber;

	@Column(name = "suppliers_id", nullable = false)
	private int suppliersId;

	@Column(name = "start_date", columnDefinition = "date", nullable = false)
	private LocalDate startDate;

	@Column(name = "end_date", columnDefinition = "date", nullable = false)
	private LocalDate endDate;

	@Column(name = "contract_title", columnDefinition = "nvarchar", nullable = false)
	private String contractTitle;

	@Column(name = "amount", columnDefinition = "decimal", nullable = false)
	private double amount;

	@Column(name = "update_date", nullable = false)
	private LocalDateTime updateDate;

	public int getContractsId() {
		return contractsId;
	}

	public void setContractsId(int contractsId) {
		this.contractsId = contractsId;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}

	public int getSuppliersId() {
		return suppliersId;
	}

	public void setSuppliersId(int suppliersId) {
		this.suppliersId = suppliersId;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getContractTitle() {
		return contractTitle;
	}

	public void setContractTitle(String contractTitle) {
		this.contractTitle = contractTitle;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}

	
}
