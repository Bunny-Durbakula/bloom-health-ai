package com.bloomhealth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChatRequest {

    @NotBlank(message = "Message must not be blank")
    @Size(max = 4000, message = "Message exceeds maximum allowed length of 4000 characters")
    private String message;

    private String language = "en";

    private String conversationId;

    public ChatRequest() {
    }

    public ChatRequest(String message, String language, String conversationId) {
        this.message = message;
        this.language = language;
        this.conversationId = conversationId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }
}
