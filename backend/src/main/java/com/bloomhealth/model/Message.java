package com.bloomhealth.model;

import java.time.Instant;

public record Message(
        String id,
        String conversationId,
        String role,
        String content,
        Instant createdAt
) {}
