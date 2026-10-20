package com.bloomhealth.model;

import java.time.Instant;

public record User(
        String id,
        String email,
        String passwordHash,
        Instant createdAt,
        Instant updatedAt
) {}
