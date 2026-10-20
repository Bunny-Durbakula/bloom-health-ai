package com.bloomhealth.service;

import com.bloomhealth.dto.AuthResponse;
import com.bloomhealth.dto.LoginRequest;
import com.bloomhealth.dto.RegisterRequest;
import com.bloomhealth.dto.UserDto;
import com.bloomhealth.exception.AuthenticationException;
import com.bloomhealth.model.User;
import com.bloomhealth.repository.UserRepository;
import com.bloomhealth.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new AuthenticationException("An account with this email address already exists.");
        }

        String userId = UUID.randomUUID().toString();
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        Instant now = Instant.now();

        User user = new User(userId, normalizedEmail, hashedPassword, now, now);
        userRepository.save(user);

        String token = tokenProvider.generateToken(userId, normalizedEmail);
        return new AuthResponse(token, new UserDto(userId, normalizedEmail, now));
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AuthenticationException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.passwordHash())) {
            throw new AuthenticationException("Invalid email or password.");
        }

        String token = tokenProvider.generateToken(user.id(), user.email());
        return new AuthResponse(token, new UserDto(user.id(), user.email(), user.createdAt()));
    }

    public UserDto getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AuthenticationException("User not found"));
        return new UserDto(user.id(), user.email(), user.createdAt());
    }
}
