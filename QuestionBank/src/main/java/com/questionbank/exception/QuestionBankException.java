package com.questionbank.exception;

public class QuestionBankException extends RuntimeException {
	
private static final long serialVersionUID = 1L;
	

	public String message;

	public QuestionBankException(String message) {
		super();
		this.message = message;
	}

	public QuestionBankException() {
		super();
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
