package com.bloomhealth.service;

import com.bloomhealth.dto.DocumentAnalysisResponse;
import com.bloomhealth.model.MedicalDocument;
import com.bloomhealth.repository.MedicalDocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.UUID;

@Service
public class DocumentAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(DocumentAnalysisService.class);

    private final DocumentValidationService validationService;
    private final GeminiService geminiService;
    private final MedicalDocumentRepository documentRepository;

    public DocumentAnalysisService(
            DocumentValidationService validationService,
            GeminiService geminiService,
            MedicalDocumentRepository documentRepository) {
        this.validationService = validationService;
        this.geminiService = geminiService;
        this.documentRepository = documentRepository;
    }

    public DocumentAnalysisResponse processAndAnalyze(MultipartFile file, String userId, String language) {
        // Step 1: File signature & structure validation
        DocumentValidationService.ValidatedFile validatedFile = validationService.validateAndExtract(file);

        String docId = UUID.randomUUID().toString();

        // Step 2: Content classification with Gemini
        String classification = geminiService.classifyDocument(
                validatedFile.extractedText(),
                validatedFile.bytes(),
                validatedFile.detectedMimeType()
        );

        log.info("Document {} ({}) classified as: {}", docId, validatedFile.filename(), classification);

        // Step 3: Handle Non-Medical Documents with EXACT required message
        if ("NON_MEDICAL_DOCUMENT".equalsIgnoreCase(classification)) {
            // Save metadata
            saveDocumentRecordSafely(docId, userId, validatedFile, "REJECTED_NON_MEDICAL");

            return new DocumentAnalysisResponse(
                    docId,
                    validatedFile.filename(),
                    "NON_MEDICAL",
                    "NON_MEDICAL_DOCUMENT",
                    null,
                    GeminiService.NON_MEDICAL_REJECTION_MESSAGE
            );
        }

        // Step 4: Handle Uncertain Documents
        if ("UNCERTAIN_DOCUMENT".equalsIgnoreCase(classification)) {
            saveDocumentRecordSafely(docId, userId, validatedFile, "UNCERTAIN");

            String uncertainMsg = "I could not clearly verify this upload as a healthcare document. " +
                    "Please upload a clearer, readable medical test report, prescription, or lab result.";

            return new DocumentAnalysisResponse(
                    docId,
                    validatedFile.filename(),
                    "UNCERTAIN",
                    "UNCERTAIN_DOCUMENT",
                    null,
                    uncertainMsg
            );
        }

        // Step 5: Explain Verified Medical Document
        String explanation = geminiService.explainMedicalDocument(
                validatedFile.extractedText(),
                validatedFile.bytes(),
                validatedFile.detectedMimeType(),
                language
        );

        saveDocumentRecordSafely(docId, userId, validatedFile, "COMPLETED");

        return new DocumentAnalysisResponse(
                docId,
                validatedFile.filename(),
                "SUCCESS",
                "MEDICAL_DOCUMENT",
                explanation,
                "Medical document analyzed successfully."
        );
    }

    private void saveDocumentRecordSafely(String docId, String userId,
                                          DocumentValidationService.ValidatedFile file, String status) {
        try {
            MedicalDocument record = new MedicalDocument(
                    docId,
                    userId,
                    file.filename(),
                    file.detectedMimeType(),
                    file.sizeBytes(),
                    status,
                    Instant.now()
            );
            documentRepository.save(record);
        } catch (Exception e) {
            log.warn("Database record saving skipped or failed: {}", e.getMessage());
        }
    }
}
