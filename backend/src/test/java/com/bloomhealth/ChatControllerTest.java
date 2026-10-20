package com.bloomhealth;

import com.bloomhealth.controller.ChatController;
import com.bloomhealth.dto.ChatRequest;
import com.bloomhealth.dto.ChatResponse;
import com.bloomhealth.security.JwtTokenProvider;
import com.bloomhealth.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ChatController.class)
@AutoConfigureMockMvc(addFilters = false)
class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ChatService chatService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("Should successfully handle POST /api/chat with valid payload")
    void shouldProcessChatSuccessfully() throws Exception {
        ChatRequest request = new ChatRequest("What does elevated AST/ALT indicate?", "en", null);
        ChatResponse response = new ChatResponse("conv-123", "Elevated AST and ALT may suggest liver inflammation.", "en");

        when(chatService.processChat(any(ChatRequest.class), any())).thenReturn(response);

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.conversationId").value("conv-123"))
                .andExpect(jsonPath("$.message").value("Elevated AST and ALT may suggest liver inflammation."))
                .andExpect(jsonPath("$.language").value("en"));
    }

    @Test
    @DisplayName("Should return 400 Bad Request when message is blank")
    void shouldRejectBlankMessage() throws Exception {
        ChatRequest request = new ChatRequest("", "en", null);

        mockMvc.perform(post("/api/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Error"));
    }
}
