package com.bloomhealth.service;

import com.bloomhealth.exception.InvalidDocumentException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@Service
public class DocumentValidationService {

    private static final Logger log = LoggerFactory.getLogger(DocumentValidationService.class);

    public static final long MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

    public record ValidatedFile(
            String filename,
            String detectedMimeType,
            long sizeBytes,
            byte[] bytes,
            String extractedText
    ) {}

    public ValidatedFile validateAndExtract(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidDocumentException("Please select a file to upload. Empty files are not accepted.");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new InvalidDocumentException("File exceeds the maximum allowed size of 15 MB.");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            originalFilename = "uploaded_document";
        }

        byte[] bytes;
        try {
            bytes = file.getBytes();
        } catch (IOException e) {
            log.error("Failed to read uploaded file bytes: {}", e.getMessage());
            throw new InvalidDocumentException("Could not read uploaded file. Please try again.");
        }

        if (bytes.length == 0) {
            throw new InvalidDocumentException("The uploaded file is empty.");
        }

        // Validate Magic Bytes (File Signature)
        String mimeType = detectMimeTypeFromMagicBytes(bytes);
        if (mimeType == null) {
            throw new InvalidDocumentException(
                    "Unsupported file format. Please upload a medical document in PDF, PNG, JPEG, or WebP format."
            );
        }

        String extractedText = "";
        if ("application/pdf".equals(mimeType)) {
            extractedText = extractPdfText(bytes);
        }

        return new ValidatedFile(originalFilename, mimeType, file.getSize(), bytes, extractedText);
    }

    /**
     * Inspect file magic bytes / signatures to prevent extension spoofing.
     */
    public String detectMimeTypeFromMagicBytes(byte[] bytes) {
        if (bytes.length < 4) {
            return null;
        }

        // PDF: %PDF-
        if (bytes[0] == 0x25 && bytes[1] == 0x50 && bytes[2] == 0x44 && bytes[3] == 0x46) {
            return "application/pdf";
        }

        // PNG: 89 50 4E 47 0D 0A 1A 0A
        if (bytes.length >= 8 &&
                bytes[0] == (byte) 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47 &&
                bytes[4] == 0x0D && bytes[5] == 0x0A && bytes[6] == 0x1A && bytes[7] == 0x0A) {
            return "image/png";
        }

        // JPEG: FF D8 FF
        if (bytes.length >= 3 &&
                bytes[0] == (byte) 0xFF && bytes[1] == (byte) 0xD8 && bytes[2] == (byte) 0xFF) {
            return "image/jpeg";
        }

        // WebP: RIFF .... WEBP
        if (bytes.length >= 12 &&
                bytes[0] == 'R' && bytes[1] == 'I' && bytes[2] == 'F' && bytes[3] == 'F' &&
                bytes[8] == 'W' && bytes[9] == 'E' && bytes[10] == 'B' && bytes[11] == 'P') {
            return "image/webp";
        }

        return null;
    }

    private String extractPdfText(byte[] pdfBytes) {
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            if (document.isEncrypted()) {
                throw new InvalidDocumentException("Password-protected PDFs cannot be analyzed. Please provide an unlocked document.");
            }
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            String text = stripper.getText(document);
            return text != null ? text.trim() : "";
        } catch (InvalidDocumentException ide) {
            throw ide;
        } catch (Exception e) {
            log.warn("PDF parsing warning: {}", e.getMessage());
            throw new InvalidDocumentException("The uploaded PDF file is damaged, corrupted, or unreadable.");
        }
    }
}
