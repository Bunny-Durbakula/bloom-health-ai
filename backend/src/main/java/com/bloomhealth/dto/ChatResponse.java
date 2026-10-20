package com.bloomhealth.dto;

import java.time.Instant;

public class ChatResponse {

    private String conversationId;
    private String message;
    private String language;
    private Instant timestamp;

    public ChatResponse() {
        this.timestamp = Instant.now();
    }

    public ChatResponse(String conversationId, String message, String language) {
        this.conversationId = conversationId;
        this.message = message;
        this.language = language;
        this.timestamp = Instant.now();
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
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

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }
}
