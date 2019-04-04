package com.example.pojo;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Revenue {

	@Id
    public String id;
	
	private String type;
	private String isGuest;
	private String guestName;
	private String memberId;
	private String amount;
	private String paidDate;
	private String fromDate;
	private String toDate;
	
	
	public Revenue() {
		
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getIsGuest() {
		return isGuest;
	}


	public void setIsGuest(String isGuest) {
		this.isGuest = isGuest;
	}


	public String getGuestName() {
		return guestName;
	}


	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}


	public String getMemberId() {
		return memberId;
	}


	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}


	public String getAmount() {
		return amount;
	}


	public void setAmount(String amount) {
		this.amount = amount;
	}


	public String getPaidDate() {
		return paidDate;
	}


	public void setPaidDate(String paidDate) {
		this.paidDate = paidDate;
	}


	public String getFromDate() {
		return fromDate;
	}


	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}


	public String getToDate() {
		return toDate;
	}


	public void setToDate(String toDate) {
		this.toDate = toDate;
	}


	@Override
	public String toString() {
		return "Revenue [id=" + id + ", type=" + type + ", isGuest=" + isGuest + ", guestName=" + guestName
				+ ", memberId=" + memberId + ", amount=" + amount + ", paidDate=" + paidDate + ", fromDate=" + fromDate
				+ ", toDate=" + toDate + "]";
	}

	


	
}
