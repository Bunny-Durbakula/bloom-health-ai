package com.bloomhealth.model;

import java.time.Instant;

public record Conversation(
        String id,
        String userId,
        String title,
        String language,
        Instant createdAt,
        Instant updatedAt
) {}
