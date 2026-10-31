package com.jadeteja.portfolio.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;

public class InquiryDto {

    public static class CreateRequest {
        @NotBlank(message = "Full name is required")
        @Size(max = 255, message = "Full name cannot exceed 255 characters")
        private String fullName;

        @NotBlank(message = "Email is required")
        @Email(message = "Please provide a valid email address")
        @Size(max = 255, message = "Email cannot exceed 255 characters")
        private String email;

        @NotBlank(message = "Mobile or WhatsApp number is required")
        @Size(max = 50, message = "Phone cannot exceed 50 characters")
        private String phone;

        @NotBlank(message = "Project type is required")
        private String projectType;

        @Size(max = 255, message = "Project name cannot exceed 255 characters")
        private String projectName;

        private String budgetRange;

        private String preferredTimeline;

        @Size(max = 5000, message = "Description cannot exceed 5000 characters")
        private String description;

        @AssertTrue(message = "You must agree to be contacted regarding your inquiry")
        private Boolean consentGiven = true;

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getProjectType() {
            return projectType;
        }

        public void setProjectType(String projectType) {
            this.projectType = projectType;
        }

        public String getProjectName() {
            return projectName;
        }

        public void setProjectName(String projectName) {
            this.projectName = projectName;
        }

        public String getBudgetRange() {
            return budgetRange;
        }

        public void setBudgetRange(String budgetRange) {
            this.budgetRange = budgetRange;
        }

        public String getPreferredTimeline() {
            return preferredTimeline;
        }

        public void setPreferredTimeline(String preferredTimeline) {
            this.preferredTimeline = preferredTimeline;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Boolean getConsentGiven() {
            return consentGiven;
        }

        public void setConsentGiven(Boolean consentGiven) {
            this.consentGiven = consentGiven;
        }
    }

    public static class StatusUpdateRequest {
        @NotBlank(message = "Status is required")
        private String status;

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public static class Response {
        private UUID id;
        private String fullName;
        private String email;
        private String phone;
        private String projectType;
        private String projectName;
        private String budgetRange;
        private String preferredTimeline;
        private String description;
        private String status;
        private boolean consentGiven;
        private OffsetDateTime createdAt;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getProjectType() {
            return projectType;
        }

        public void setProjectType(String projectType) {
            this.projectType = projectType;
        }

        public String getProjectName() {
            return projectName;
        }

        public void setProjectName(String projectName) {
            this.projectName = projectName;
        }

        public String getBudgetRange() {
            return budgetRange;
        }

        public void setBudgetRange(String budgetRange) {
            this.budgetRange = budgetRange;
        }

        public String getPreferredTimeline() {
            return preferredTimeline;
        }

        public void setPreferredTimeline(String preferredTimeline) {
            this.preferredTimeline = preferredTimeline;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public boolean isConsentGiven() {
            return consentGiven;
        }

        public void setConsentGiven(boolean consentGiven) {
            this.consentGiven = consentGiven;
        }

        public OffsetDateTime getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(OffsetDateTime createdAt) {
            this.createdAt = createdAt;
        }
    }
}
