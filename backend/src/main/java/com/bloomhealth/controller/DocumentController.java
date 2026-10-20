package com.bloomhealth.controller;

import com.bloomhealth.dto.DocumentAnalysisResponse;
import com.bloomhealth.security.UserPrincipal;
import com.bloomhealth.service.DocumentAnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentAnalysisService documentAnalysisService;

    public DocumentController(DocumentAnalysisService documentAnalysisService) {
        this.documentAnalysisService = documentAnalysisService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<DocumentAnalysisResponse> analyzeDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "language", defaultValue = "en") String language,
            @AuthenticationPrincipal UserPrincipal principal) {

        // Strictly enforced on backend: must have valid authenticated principal
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        DocumentAnalysisResponse response = documentAnalysisService.processAndAnalyze(
                file, principal.getId(), language
        );

        return ResponseEntity.ok(response);
    }
}
