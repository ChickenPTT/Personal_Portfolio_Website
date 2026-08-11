package com.example.Profile.Model;

public class ContactResponse {

    private boolean success;
    private String message;

    public ContactResponse() {}

    public ContactResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // Static factory methods
    public static ContactResponse success(String message) {
        return new ContactResponse(true, message);
    }

    public static ContactResponse error(String message) {
        return new ContactResponse(false, message);
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
