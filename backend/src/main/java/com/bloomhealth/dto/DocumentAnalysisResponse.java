package com.bloomhealth.dto;

import java.time.Instant;

public class DocumentAnalysisResponse {

    private String documentId;
    private String originalFilename;
    private String status; // SUCCESS, NON_MEDICAL, UNCERTAIN, ERROR
    private String classification; // MEDICAL_DOCUMENT, NON_MEDICAL_DOCUMENT, UNCERTAIN_DOCUMENT
    private String explanation;
    private String message;
    private Instant processedAt;

    public DocumentAnalysisResponse() {
        this.processedAt = Instant.now();
    }

    public DocumentAnalysisResponse(String documentId, String originalFilename, String status,
                                    String classification, String explanation, String message) {
        this.documentId = documentId;
        this.originalFilename = originalFilename;
        this.status = status;
        this.classification = classification;
        this.explanation = explanation;
        this.message = message;
        this.processedAt = Instant.now();
    }

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getProcessedAt() {
        return processedAt;
    }

    public void setProcessedAt(Instant processedAt) {
        this.processedAt = processedAt;
    }
}
