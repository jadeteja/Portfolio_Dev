package com.jadeteja.portfolio.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "pricing_plans")
public class PricingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "service_type", nullable = false)
    private String serviceType; // WEBSITE or ANDROID

    @Column(nullable = false)
    private String title;

    @Column(name = "development_price", nullable = false)
    private BigDecimal developmentPrice = new BigDecimal("5000.00");

    @Column(name = "annual_hosting_price", nullable = false)
    private BigDecimal annualHostingPrice = new BigDecimal("15000.00");

    @Column(name = "hosting_required", nullable = false)
    private boolean hostingRequired = false;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "jsonb")
    private String features;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    public PricingPlan() {
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }

    public BigDecimal getFirstYearTotal() {
        if (developmentPrice == null) return BigDecimal.ZERO;
        if (hostingRequired && annualHostingPrice != null) {
            return developmentPrice.add(annualHostingPrice);
        }
        return developmentPrice;
    }

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

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
