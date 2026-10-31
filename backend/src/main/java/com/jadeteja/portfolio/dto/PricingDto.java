package com.jadeteja.portfolio.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public class PricingDto {

    public static class UpdateRequest {
        @NotNull(message = "Development price is required")
        private BigDecimal developmentPrice;

        @NotNull(message = "Annual hosting price is required")
        private BigDecimal annualHostingPrice;

        private Boolean hostingRequired;
        private String description;
        private String features; // JSON string
        private Boolean active;

        public BigDecimal getDevelopmentPrice() {
            return developmentPrice;
        }

        public void setDevelopmentPrice(BigDecimal developmentPrice) {
            this.developmentPrice = developmentPrice;
        }

        public BigDecimal getAnnualHostingPrice() {
            return annualHostingPrice;
        }

        public void setAnnualHostingPrice(BigDecimal annualHostingPrice) {
            this.annualHostingPrice = annualHostingPrice;
        }

        public Boolean getHostingRequired() {
            return hostingRequired;
        }

        public void setHostingRequired(Boolean hostingRequired) {
            this.hostingRequired = hostingRequired;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getFeatures() {
            return features;
        }

        public void setFeatures(String features) {
            this.features = features;
        }

        public Boolean getActive() {
            return active;
        }

        public void setActive(Boolean active) {
            this.active = active;
        }
    }

    public static class Response {
        private UUID id;
        private String serviceType;
        private String title;
        private BigDecimal developmentPrice;
        private BigDecimal annualHostingPrice;
        private boolean hostingRequired;
        private BigDecimal firstYearTotal;
        private String description;
        private String features;
        private boolean active;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getServiceType() {
            return serviceType;
        }

        public void setServiceType(String serviceType) {
            this.serviceType = serviceType;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public BigDecimal getDevelopmentPrice() {
            return developmentPrice;
        }

        public void setDevelopmentPrice(BigDecimal developmentPrice) {
            this.developmentPrice = developmentPrice;
        }

        public BigDecimal getAnnualHostingPrice() {
            return annualHostingPrice;
        }

        public void setAnnualHostingPrice(BigDecimal annualHostingPrice) {
            this.annualHostingPrice = annualHostingPrice;
        }

        public boolean isHostingRequired() {
            return hostingRequired;
        }

        public void setHostingRequired(boolean hostingRequired) {
            this.hostingRequired = hostingRequired;
        }

        public BigDecimal getFirstYearTotal() {
            return firstYearTotal;
        }

        public void setFirstYearTotal(BigDecimal firstYearTotal) {
            this.firstYearTotal = firstYearTotal;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getFeatures() {
            return features;
        }

        public void setFeatures(String features) {
            this.features = features;
        }

        public boolean isActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }
    }
}
