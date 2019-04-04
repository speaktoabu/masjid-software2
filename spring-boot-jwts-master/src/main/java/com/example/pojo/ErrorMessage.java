package com.example.pojo;

public class ErrorMessage {

	private String error;
	
	public ErrorMessage(String error)
	{
		this.error = error;
	}

	public static synchronized ErrorMessage getIns(String error)
	{
		return new ErrorMessage(error);
	}
	
	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
}
