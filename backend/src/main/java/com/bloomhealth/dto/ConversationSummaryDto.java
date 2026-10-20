package com.bloomhealth.dto;

import java.time.Instant;

public class ConversationSummaryDto {

    private String id;
    private String title;
    private String language;
    private Instant createdAt;
    private Instant updatedAt;

    public ConversationSummaryDto() {
    }

    public ConversationSummaryDto(String id, String title, String language, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.title = title;
        this.language = language;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
