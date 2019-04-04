package com.example.pojo;

public class FamilyMemDetail {

	private String famName;
	private String relation;
	private String famAge;
	private String famMarried;
	private String famEmployed;
	private String famEducation;
	
	
	
	public FamilyMemDetail(String famName, String relation, String famAge, String famMarried, String famEmployed,
			String famEducation) {
		super();
		this.famName = famName;
		this.relation = relation;
		this.famAge = famAge;
		this.famMarried = famMarried;
		this.famEmployed = famEmployed;
		this.famEducation = famEducation;
	}



	public String getFamName() {
		return famName;
	}



	public void setFamName(String famName) {
		this.famName = famName;
	}



	public String getRelation() {
		return relation;
	}



	public void setRelation(String relation) {
		this.relation = relation;
	}



	public String getFamAge() {
		return famAge;
	}



	public void setFamAge(String famAge) {
		this.famAge = famAge;
	}



	public String getFamMarried() {
		return famMarried;
	}



	public void setFamMarried(String famMarried) {
		this.famMarried = famMarried;
	}



	public String getFamEmployed() {
		return famEmployed;
	}



	@Override
	public String toString() {
		return "FamilyMemDetail [famName=" + famName + ", relation=" + relation + ", famAge=" + famAge + ", famMarried="
				+ famMarried + ", famEmployed=" + famEmployed + ", famEducation=" + famEducation + "]";
	}



	public void setFamEmployed(String famEmployed) {
		this.famEmployed = famEmployed;
	}



	public String getFamEducation() {
		return famEducation;
	}



	public void setFamEducation(String famEducation) {
		this.famEducation = famEducation;
	}



	public FamilyMemDetail() {
	}
}
