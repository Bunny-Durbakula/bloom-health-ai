package com.bloomhealth;

import com.bloomhealth.dto.AuthResponse;
import com.bloomhealth.dto.LoginRequest;
import com.bloomhealth.dto.RegisterRequest;
import com.bloomhealth.exception.AuthenticationException;
import com.bloomhealth.model.User;
import com.bloomhealth.repository.UserRepository;
import com.bloomhealth.security.JwtTokenProvider;
import com.bloomhealth.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider tokenProvider;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository = Mockito.mock(UserRepository.class);
        passwordEncoder = new BCryptPasswordEncoder();
        tokenProvider = new JwtTokenProvider("TestSecretKeyForBloomHealthApplicationTestingPurposesOnly2026", 3600000);
        authService = new AuthService(userRepository, passwordEncoder, tokenProvider);
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void shouldRegisterNewUser() {
        RegisterRequest request = new RegisterRequest("patient@example.com", "Password123!");
        when(userRepository.existsByEmail("patient@example.com")).thenReturn(false);

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("patient@example.com", response.getUser().getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should reject registration with existing email")
    void shouldRejectDuplicateEmail() {
        RegisterRequest request = new RegisterRequest("patient@example.com", "Password123!");
        when(userRepository.existsByEmail("patient@example.com")).thenReturn(true);

        AuthenticationException ex = assertThrows(AuthenticationException.class, () ->
                authService.register(request)
        );
        assertTrue(ex.getMessage().contains("already exists"));
    }

    @Test
    @DisplayName("Should successfully login with correct credentials")
    void shouldLoginWithValidCredentials() {
        String rawPassword = "SecurePassword123!";
        String encoded = passwordEncoder.encode(rawPassword);
        User user = new User("u-123", "user@bloom.com", encoded, Instant.now(), Instant.now());

        when(userRepository.findByEmail("user@bloom.com")).thenReturn(Optional.of(user));

        LoginRequest request = new LoginRequest("user@bloom.com", rawPassword);
        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals("user@bloom.com", response.getUser().getEmail());
    }

    @Test
    @DisplayName("Should reject login with incorrect password")
    void shouldRejectBadPassword() {
        String encoded = passwordEncoder.encode("CorrectPassword");
        User user = new User("u-123", "user@bloom.com", encoded, Instant.now(), Instant.now());

        when(userRepository.findByEmail("user@bloom.com")).thenReturn(Optional.of(user));

        LoginRequest request = new LoginRequest("user@bloom.com", "WrongPassword");
        assertThrows(AuthenticationException.class, () -> authService.login(request));
    }
}
