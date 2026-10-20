package com.bloomhealth;

import com.bloomhealth.dto.ChatRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class ChatRequestValidationTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Should accept valid chat request")
    void shouldAcceptValidRequest() {
        ChatRequest request = new ChatRequest("What does a high fasting blood glucose mean?", "en", null);
        Set<ConstraintViolation<ChatRequest>> violations = validator.validate(request);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject blank message")
    void shouldRejectBlankMessage() {
        ChatRequest request = new ChatRequest("   ", "en", null);
        Set<ConstraintViolation<ChatRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty());
        assertEquals("Message must not be blank", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("Should reject message exceeding length limit")
    void shouldRejectOversizedMessage() {
        String oversized = "a".repeat(4001);
        ChatRequest request = new ChatRequest(oversized, "en", null);
        Set<ConstraintViolation<ChatRequest>> violations = validator.validate(request);
        assertFalse(violations.isEmpty());
        assertTrue(violations.iterator().next().getMessage().contains("exceeds maximum allowed length"));
    }
}
