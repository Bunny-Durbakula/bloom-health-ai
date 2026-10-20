package com.bloomhealth.model;

import java.time.Instant;

public record MedicalDocument(
        String id,
        String userId,
        String originalFilename,
        String contentType,
        long sizeBytes,
        String processingStatus,
        Instant createdAt
) {}
