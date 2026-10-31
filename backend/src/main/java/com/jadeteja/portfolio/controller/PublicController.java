package com.jadeteja.portfolio.controller;

import com.jadeteja.portfolio.dto.*;
import com.jadeteja.portfolio.service.PublicService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public")
public class PublicController {

    private final PublicService publicService;

    public PublicController(PublicService publicService) {
        this.publicService = publicService;
    }

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceDto.Response>>> getServices() {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getActiveServices()));
    }

    @GetMapping("/pricing")
    public ResponseEntity<ApiResponse<List<PricingDto.Response>>> getPricing() {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getActivePricingPlans()));
    }

    @GetMapping("/additional-charges")
    public ResponseEntity<ApiResponse<List<AdditionalChargeDto.Response>>> getAdditionalCharges() {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getActiveAdditionalCharges()));
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto.Response>>> getProjects(@RequestParam(required = false) String category) {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getPublishedProjects(category)));
    }

    @GetMapping("/projects/{slug}")
    public ResponseEntity<ApiResponse<ProjectDto.Response>> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getProjectBySlug(slug)));
    }

    @GetMapping("/faqs")
    public ResponseEntity<ApiResponse<List<FaqDto.Response>>> getFaqs() {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getActiveFaqs()));
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<SiteSettingDto.Response>> getSettings(@RequestParam(defaultValue = "general") String key) {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getSetting(key)));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<SiteSettingDto.Response>> getProfile() {
        return ResponseEntity.ok(ApiResponse.ok(publicService.getSetting("general")));
    }

    @PostMapping("/inquiries")
    public ResponseEntity<ApiResponse<InquiryDto.Response>> submitInquiry(@Valid @RequestBody InquiryDto.CreateRequest request) {
        InquiryDto.Response response = publicService.submitInquiry(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Inquiry received successfully. We will get in touch shortly.", response));
    }
}
