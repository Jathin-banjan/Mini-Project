package com.heritageai.backend.controller;

import com.heritageai.backend.dto.AuthDTOs.*;
import com.heritageai.backend.service.AuditService;
import com.heritageai.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuditService auditService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        auditService.logAction(response.getUser().getId(), response.getUser().getUsername(), "USER_LOGIN", "USER", response.getUser().getId(), "User logged in successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        auditService.logAction(response.getUser().getId(), response.getUser().getUsername(), "USER_REGISTER", "USER", response.getUser().getId(), "New user account registered");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        UserDTO user = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(user);
    }
}
