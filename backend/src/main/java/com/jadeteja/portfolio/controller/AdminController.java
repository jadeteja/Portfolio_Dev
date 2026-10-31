package com.jadeteja.portfolio.controller;

import com.jadeteja.portfolio.dto.*;
import com.jadeteja.portfolio.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getDashboardStats()));
    }

    // Projects
    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto.Response>>> getProjects() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllProjects()));
    }

    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<ProjectDto.Response>> createProject(@Valid @RequestBody ProjectDto.UpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Project created successfully", adminService.createProject(request)));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectDto.Response>> updateProject(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectDto.UpsertRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", adminService.updateProject(id, request)));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable UUID id) {
        adminService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }

    @PostMapping("/projects/{id}/images")
    public ResponseEntity<ApiResponse<ProjectDto.ProjectImageDto>> uploadProjectImage(
            @PathVariable UUID id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "altText", required = false) String altText) throws IOException {
        ProjectDto.ProjectImageDto imageDto = adminService.uploadProjectImage(id, file, altText);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Image uploaded successfully", imageDto));
    }

    @DeleteMapping("/projects/{id}/images/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteProjectImage(
            @PathVariable UUID id,
            @PathVariable UUID imageId) {
        adminService.deleteProjectImage(id, imageId);
        return ResponseEntity.ok(ApiResponse.ok("Image deleted successfully", null));
    }

    // Services
    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceDto.Response>>> getServices() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllServices()));
    }

    @PostMapping("/services")
    public ResponseEntity<ApiResponse<ServiceDto.Response>> createService(@Valid @RequestBody ServiceDto.UpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Service created successfully", adminService.createService(request)));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<ServiceDto.Response>> updateService(
            @PathVariable UUID id,
            @Valid @RequestBody ServiceDto.UpsertRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Service updated successfully", adminService.updateService(id, request)));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable UUID id) {
        adminService.deleteService(id);
        return ResponseEntity.ok(ApiResponse.ok("Service deleted successfully", null));
    }

    // Pricing
    @GetMapping("/pricing")
    public ResponseEntity<ApiResponse<List<PricingDto.Response>>> getPricing() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllPricingPlans()));
    }

    @PutMapping("/pricing/{id}")
    public ResponseEntity<ApiResponse<PricingDto.Response>> updatePricing(
            @PathVariable UUID id,
            @Valid @RequestBody PricingDto.UpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Pricing plan updated", adminService.updatePricingPlan(id, request)));
    }

    // Additional Charges
    @GetMapping("/additional-charges")
    public ResponseEntity<ApiResponse<List<AdditionalChargeDto.Response>>> getAdditionalCharges() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllAdditionalCharges()));
    }

    @PostMapping("/additional-charges")
    public ResponseEntity<ApiResponse<AdditionalChargeDto.Response>> createAdditionalCharge(
            @Valid @RequestBody AdditionalChargeDto.UpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Additional charge created", adminService.createAdditionalCharge(request)));
    }

    @PutMapping("/additional-charges/{id}")
    public ResponseEntity<ApiResponse<AdditionalChargeDto.Response>> updateAdditionalCharge(
            @PathVariable UUID id,
            @Valid @RequestBody AdditionalChargeDto.UpsertRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Additional charge updated", adminService.updateAdditionalCharge(id, request)));
    }

    @DeleteMapping("/additional-charges/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAdditionalCharge(@PathVariable UUID id) {
        adminService.deleteAdditionalCharge(id);
        return ResponseEntity.ok(ApiResponse.ok("Additional charge deleted", null));
    }

    // FAQs
    @GetMapping("/faqs")
    public ResponseEntity<ApiResponse<List<FaqDto.Response>>> getFaqs() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllFaqs()));
    }

    @PostMapping("/faqs")
    public ResponseEntity<ApiResponse<FaqDto.Response>> createFaq(@Valid @RequestBody FaqDto.UpsertRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("FAQ created", adminService.createFaq(request)));
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<ApiResponse<FaqDto.Response>> updateFaq(
            @PathVariable UUID id,
            @Valid @RequestBody FaqDto.UpsertRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("FAQ updated", adminService.updateFaq(id, request)));
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFaq(@PathVariable UUID id) {
        adminService.deleteFaq(id);
        return ResponseEntity.ok(ApiResponse.ok("FAQ deleted", null));
    }

    // Inquiries
    @GetMapping("/inquiries")
    public ResponseEntity<ApiResponse<Page<InquiryDto.Response>>> getInquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getInquiries(page, size)));
    }

    @GetMapping("/inquiries/{id}")
    public ResponseEntity<ApiResponse<InquiryDto.Response>> getInquiryById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getInquiryById(id)));
    }

    @PatchMapping("/inquiries/{id}/status")
    public ResponseEntity<ApiResponse<InquiryDto.Response>> updateInquiryStatus(
            @PathVariable UUID id,
            @Valid @RequestBody InquiryDto.StatusUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Inquiry status updated", adminService.updateInquiryStatus(id, request.getStatus())));
    }

    // Settings
    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<List<SiteSettingDto.Response>>> getSettings() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getAllSettings()));
    }

    @PutMapping("/settings")
    public ResponseEntity<ApiResponse<SiteSettingDto.Response>> updateSettings(@Valid @RequestBody SiteSettingDto.UpsertRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Settings updated", adminService.updateSetting(request)));
    }
}
