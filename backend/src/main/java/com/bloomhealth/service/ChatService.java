package com.bloomhealth.service;

import com.bloomhealth.dto.ChatRequest;
import com.bloomhealth.dto.ChatResponse;
import com.bloomhealth.dto.ConversationSummaryDto;
import com.bloomhealth.dto.MessageDto;
import com.bloomhealth.exception.ResourceNotFoundException;
import com.bloomhealth.model.Conversation;
import com.bloomhealth.model.Message;
import com.bloomhealth.repository.ConversationRepository;
import com.bloomhealth.repository.MessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final GeminiService geminiService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ChatService(GeminiService geminiService,
                       ConversationRepository conversationRepository,
                       MessageRepository messageRepository) {
        this.geminiService = geminiService;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    public ChatResponse processChat(ChatRequest request, String currentUserId) {
        String convId = request.getConversationId();
        if (!StringUtils.hasText(convId)) {
            convId = UUID.randomUUID().toString();
        }

        String language = StringUtils.hasText(request.getLanguage()) ? request.getLanguage().trim() : "en";
        String messageText = request.getMessage().trim();

        // 1. Gather previous turns if conversation exists
        List<String> previousTurns = new ArrayList<>();
        try {
            List<Message> history = messageRepository.findByConversationId(convId);
            for (Message m : history) {
                previousTurns.add(m.role() + ": " + m.content());
            }
        } catch (Exception e) {
            log.debug("Database message lookup skipped or unavailable: {}", e.getMessage());
        }

        // 2. Call Gemini
        String aiReply = geminiService.chat(messageText, language, previousTurns);

        // 3. Persist conversation and messages if database is available
        try {
            Instant now = Instant.now();
            Optional<Conversation> existing = conversationRepository.findById(convId);
            if (existing.isEmpty()) {
                String title = generateTitleFromMessage(messageText);
                Conversation newConv = new Conversation(convId, currentUserId, title, language, now, now);
                conversationRepository.save(newConv);
            } else {
                conversationRepository.touch(convId);
            }

            Message userMsg = new Message(UUID.randomUUID().toString(), convId, "user", messageText, now);
            Message botMsg = new Message(UUID.randomUUID().toString(), convId, "assistant", aiReply, now);

            messageRepository.save(userMsg);
            messageRepository.save(botMsg);
        } catch (Exception e) {
            log.debug("Database message saving skipped or failed: {}", e.getMessage());
        }

        return new ChatResponse(convId, aiReply, language);
    }

    public List<ConversationSummaryDto> getUserConversations(String userId) {
        List<Conversation> conversations = conversationRepository.findByUserId(userId);
        return conversations.stream()
                .map(c -> new ConversationSummaryDto(c.id(), c.title(), c.language(), c.createdAt(), c.updatedAt()))
                .toList();
    }

    public List<MessageDto> getConversationMessages(String conversationId, String currentUserId) {
        Conversation conv = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found."));

        if (conv.userId() != null && !conv.userId().equals(currentUserId)) {
            throw new AccessDeniedException("You do not have access to this conversation.");
        }

        List<Message> messages = messageRepository.findByConversationId(conversationId);
        return messages.stream()
                .map(m -> new MessageDto(m.id(), m.conversationId(), m.role(), m.content(), m.createdAt()))
                .toList();
    }

    private String generateTitleFromMessage(String message) {
        String cleaned = message.replaceAll("\\s+", " ").trim();
        return cleaned.length() <= 40 ? cleaned : cleaned.substring(0, 37) + "...";
    }
}
