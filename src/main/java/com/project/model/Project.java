package com.project.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	private String pname;
	private String pdesc;
	private double amount;
	private String clientEmail;
	private String status;
	private String assignedFreelancer;
	
	@JsonIgnoreProperties("project")
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Bid> bids;
	
	
	public String getAssignedFreelancer() {
		return assignedFreelancer;
	}
	public void setAssignedFreelancer(String assignedFreelancer) {
		this.assignedFreelancer = assignedFreelancer;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getPid() {
		return pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPdesc() {
		return pdesc;
	}
	public void setPdesc(String pdesc) {
		this.pdesc = pdesc;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getClientEmail() {
		return clientEmail;
	}
	public void setClientEmail(String clientEmail) {
		this.clientEmail = clientEmail;
	}
	
	
}
