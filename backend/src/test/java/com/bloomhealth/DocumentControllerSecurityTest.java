package com.bloomhealth;

import com.bloomhealth.config.SecurityConfig;
import com.bloomhealth.controller.DocumentController;
import com.bloomhealth.security.JwtAuthenticationFilter;
import com.bloomhealth.security.JwtTokenProvider;
import com.bloomhealth.service.DocumentAnalysisService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = DocumentController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class})
class DocumentControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentAnalysisService documentAnalysisService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("Unauthenticated user must be rejected with 401 Unauthorized when uploading medical documents")
    void shouldRejectUnauthenticatedDocumentUpload() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "blood_report.pdf",
                "application/pdf",
                "%PDF-1.4 test".getBytes()
        );

        mockMvc.perform(multipart("/api/documents/analyze")
                        .file(file)
                        .param("language", "en"))
                .andExpect(status().isUnauthorized());
    }
}
