package com.jadeteja.portfolio.controller;

import com.jadeteja.portfolio.dto.ApiResponse;
import com.jadeteja.portfolio.dto.AuthDto;
import com.jadeteja.portfolio.security.JwtTokenProvider;
import com.jadeteja.portfolio.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final AdminService adminService;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, AdminService adminService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> login(@Valid @RequestBody AuthDto.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String role = authentication.getAuthorities().iterator().next().getAuthority();
        String accessToken = tokenProvider.generateAccessToken(request.getEmail(), role);
        String refreshToken = tokenProvider.generateRefreshToken(request.getEmail());

        AuthDto.AuthResponse response = new AuthDto.AuthResponse(accessToken, refreshToken, request.getEmail(), role);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> refresh(@Valid @RequestBody AuthDto.RefreshTokenRequest request) {
        if (!tokenProvider.validateToken(request.getRefreshToken())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid or expired refresh token"));
        }

        String email = tokenProvider.getEmailFromToken(request.getRefreshToken());
        String accessToken = tokenProvider.generateAccessToken(email, "ROLE_ADMIN");
        String newRefreshToken = tokenProvider.generateRefreshToken(email);

        AuthDto.AuthResponse response = new AuthDto.AuthResponse(accessToken, newRefreshToken, email, "ROLE_ADMIN");
        return ResponseEntity.ok(ApiResponse.ok("Token refreshed", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        return ResponseEntity.ok(ApiResponse.ok("Logged out successfully", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthDto.UserProfileResponse>> me(@AuthenticationPrincipal UserDetails userDetails) {
        String role = userDetails.getAuthorities().iterator().next().getAuthority();
        return ResponseEntity.ok(ApiResponse.ok(new AuthDto.UserProfileResponse(userDetails.getUsername(), role)));
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AuthDto.ChangePasswordRequest request) {
        adminService.changePassword(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.ok("Password changed successfully", null));
    }
}
