package com.bloomhealth.controller;

import com.bloomhealth.dto.ChatRequest;
import com.bloomhealth.dto.ChatResponse;
import com.bloomhealth.dto.ConversationSummaryDto;
import com.bloomhealth.dto.MessageDto;
import com.bloomhealth.security.UserPrincipal;
import com.bloomhealth.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(
            @Valid @RequestBody ChatRequest request,
            @AuthenticationPrincipal UserPrincipal principal) {
        String userId = principal != null ? principal.getId() : null;
        ChatResponse response = chatService.processChat(request, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationSummaryDto>> getUserConversations(
            @AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.ok(List.of());
        }
        List<ConversationSummaryDto> list = chatService.getUserConversations(principal.getId());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/conversations/{id}")
    public ResponseEntity<List<MessageDto>> getConversationMessages(
            @PathVariable("id") String conversationId,
            @AuthenticationPrincipal UserPrincipal principal) {
        String userId = principal != null ? principal.getId() : null;
        List<MessageDto> messages = chatService.getConversationMessages(conversationId, userId);
        return ResponseEntity.ok(messages);
    }
}
