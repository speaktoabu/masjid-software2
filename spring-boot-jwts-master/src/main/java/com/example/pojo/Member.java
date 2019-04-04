package com.example.pojo;

import java.util.Arrays;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Member {

	@Id
    public String id;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}


	private String name;
	private String mobileNumber;
	private String gender;
	private String area;
	private String address;
	private String age;
	private String married;
	private String occupation;
	private String income;
	private List<FamilyMemDetail> familyMemDetails; 
	
	
	
	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getMarried() {
		return married;
	}

	public void setMarried(String married) {
		this.married = married;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getIncome() {
		return income;
	}

	public void setIncome(String income) {
		this.income = income;
	}

	public Member() {
		
	}
	


	

	public Member(String id, String name, String mobileNumber, String gender, String area, String address, String age,
			String married, String occupation, String income, List<FamilyMemDetail> familyMemDetails) {
		super();
		this.id = id;
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.gender = gender;
		this.area = area;
		this.address = address;
		this.age = age;
		this.married = married;
		this.occupation = occupation;
		this.income = income;
		this.familyMemDetails = familyMemDetails;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<FamilyMemDetail> getFamilyMemDetails() {
		return familyMemDetails;
	}

	public void setFamilyMemDetails(List<FamilyMemDetail> familyMemDetails) {
		this.familyMemDetails = familyMemDetails;
	}

	@Override
	public String toString() {
		return "Member [id=" + id + ", name=" + name + ", mobileNumber=" + mobileNumber + ", gender=" + gender
				+ ", area=" + area + ", address=" + address + ", age=" + age + ", married=" + married + ", occupation="
				+ occupation + ", income=" + income + ", familyMemDetails=" + familyMemDetails + "]";
	}




	
}
