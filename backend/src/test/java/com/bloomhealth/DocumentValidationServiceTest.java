package com.bloomhealth;

import com.bloomhealth.exception.InvalidDocumentException;
import com.bloomhealth.service.DocumentValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.*;

class DocumentValidationServiceTest {

    private DocumentValidationService validationService;

    @BeforeEach
    void setUp() {
        validationService = new DocumentValidationService();
    }

    @Test
    @DisplayName("Should detect PDF magic bytes correctly")
    void shouldDetectPdfMagicBytes() {
        byte[] pdfHeader = "%PDF-1.7 sample data".getBytes(StandardCharsets.UTF_8);
        String mime = validationService.detectMimeTypeFromMagicBytes(pdfHeader);
        assertEquals("application/pdf", mime);
    }

    @Test
    @DisplayName("Should detect PNG magic bytes correctly")
    void shouldDetectPngMagicBytes() {
        byte[] pngHeader = new byte[]{(byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00};
        String mime = validationService.detectMimeTypeFromMagicBytes(pngHeader);
        assertEquals("image/png", mime);
    }

    @Test
    @DisplayName("Should detect JPEG magic bytes correctly")
    void shouldDetectJpegMagicBytes() {
        byte[] jpegHeader = new byte[]{(byte) 0xFF, (byte) 0xD8, (byte) 0xFF, (byte) 0xE0, 0x00, 0x10};
        String mime = validationService.detectMimeTypeFromMagicBytes(jpegHeader);
        assertEquals("image/jpeg", mime);
    }

    @Test
    @DisplayName("Should detect WebP magic bytes correctly")
    void shouldDetectWebpMagicBytes() {
        byte[] webpHeader = new byte[]{
                'R', 'I', 'F', 'F', 0, 0, 0, 0, 'W', 'E', 'B', 'P', 'V', 'P', '8'
        };
        String mime = validationService.detectMimeTypeFromMagicBytes(webpHeader);
        assertEquals("image/webp", mime);
    }

    @Test
    @DisplayName("Should reject files with spoofed extension and invalid magic bytes")
    void shouldRejectSpoofedFileExtension() {
        // Plain text file named "report.pdf" with no PDF signature
        byte[] fakePdf = "Hello, this is just plain text!".getBytes(StandardCharsets.UTF_8);
        MockMultipartFile file = new MockMultipartFile("file", "report.pdf", "application/pdf", fakePdf);

        InvalidDocumentException ex = assertThrows(InvalidDocumentException.class, () ->
                validationService.validateAndExtract(file)
        );
        assertTrue(ex.getMessage().contains("Unsupported file format"));
    }

    @Test
    @DisplayName("Should reject empty files")
    void shouldRejectEmptyFiles() {
        MockMultipartFile emptyFile = new MockMultipartFile("file", "empty.pdf", "application/pdf", new byte[0]);
        assertThrows(InvalidDocumentException.class, () ->
                validationService.validateAndExtract(emptyFile)
        );
    }
}
