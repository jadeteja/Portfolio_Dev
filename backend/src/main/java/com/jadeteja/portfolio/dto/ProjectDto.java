package com.jadeteja.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public class ProjectDto {

    public static class UpsertRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Slug is required")
        private String slug;

        @NotBlank(message = "Category is required")
        private String category;

        private String shortDescription;
        private String fullDescription;
        private String problemStatement;
        private String solution;
        private String technologies; // JSON array string e.g. ["React", "Node.js"]
        private String coverImageUrl;
        private String demoUrl;
        private String githubUrl;
        private String projectStatus = "CONCEPT";
        private boolean featured = false;
        private boolean published = true;
        private int displayOrder = 0;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getSlug() {
            return slug;
        }

        public void setSlug(String slug) {
            this.slug = slug;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getShortDescription() {
            return shortDescription;
        }

        public void setShortDescription(String shortDescription) {
            this.shortDescription = shortDescription;
        }

        public String getFullDescription() {
            return fullDescription;
        }

        public void setFullDescription(String fullDescription) {
            this.fullDescription = fullDescription;
        }

        public String getProblemStatement() {
            return problemStatement;
        }

        public void setProblemStatement(String problemStatement) {
            this.problemStatement = problemStatement;
        }

        public String getSolution() {
            return solution;
        }

        public void setSolution(String solution) {
            this.solution = solution;
        }

        public String getTechnologies() {
            return technologies;
        }

        public void setTechnologies(String technologies) {
            this.technologies = technologies;
        }

        public String getCoverImageUrl() {
            return coverImageUrl;
        }

        public void setCoverImageUrl(String coverImageUrl) {
            this.coverImageUrl = coverImageUrl;
        }

        public String getDemoUrl() {
            return demoUrl;
        }

        public void setDemoUrl(String demoUrl) {
            this.demoUrl = demoUrl;
        }

        public String getGithubUrl() {
            return githubUrl;
        }

        public void setGithubUrl(String githubUrl) {
            this.githubUrl = githubUrl;
        }

        public String getProjectStatus() {
            return projectStatus;
        }

        public void setProjectStatus(String projectStatus) {
            this.projectStatus = projectStatus;
        }

        public boolean isFeatured() {
            return featured;
        }

        public void setFeatured(boolean featured) {
            this.featured = featured;
        }

        public boolean isPublished() {
            return published;
        }

        public void setPublished(boolean published) {
            this.published = published;
        }

        public int getDisplayOrder() {
            return displayOrder;
        }

        public void setDisplayOrder(int displayOrder) {
            this.displayOrder = displayOrder;
        }
    }

    public static class Response {
        private UUID id;
        private String title;
        private String slug;
        private String category;
        private String shortDescription;
        private String fullDescription;
        private String problemStatement;
        private String solution;
        private String technologies;
        private String coverImageUrl;
        private String demoUrl;
        private String githubUrl;
        private String projectStatus;
        private boolean featured;
        private boolean published;
        private int displayOrder;
        private List<ProjectImageDto> images;
        private OffsetDateTime createdAt;
        private OffsetDateTime updatedAt;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getSlug() {
            return slug;
        }

        public void setSlug(String slug) {
            this.slug = slug;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getShortDescription() {
            return shortDescription;
        }

        public void setShortDescription(String shortDescription) {
            this.shortDescription = shortDescription;
        }

        public String getFullDescription() {
            return fullDescription;
        }

        public void setFullDescription(String fullDescription) {
            this.fullDescription = fullDescription;
        }

        public String getProblemStatement() {
            return problemStatement;
        }

        public void setProblemStatement(String problemStatement) {
            this.problemStatement = problemStatement;
        }

        public String getSolution() {
            return solution;
        }

        public void setSolution(String solution) {
            this.solution = solution;
        }

        public String getTechnologies() {
            return technologies;
        }

        public void setTechnologies(String technologies) {
            this.technologies = technologies;
        }

        public String getCoverImageUrl() {
            return coverImageUrl;
        }

        public void setCoverImageUrl(String coverImageUrl) {
            this.coverImageUrl = coverImageUrl;
        }

        public String getDemoUrl() {
            return demoUrl;
        }

        public void setDemoUrl(String demoUrl) {
            this.demoUrl = demoUrl;
        }

        public String getGithubUrl() {
            return githubUrl;
        }

        public void setGithubUrl(String githubUrl) {
            this.githubUrl = githubUrl;
        }

        public String getProjectStatus() {
            return projectStatus;
        }

        public void setProjectStatus(String projectStatus) {
            this.projectStatus = projectStatus;
        }

        public boolean isFeatured() {
            return featured;
        }

        public void setFeatured(boolean featured) {
            this.featured = featured;
        }

        public boolean isPublished() {
            return published;
        }

        public void setPublished(boolean published) {
            this.published = published;
        }

        public int getDisplayOrder() {
            return displayOrder;
        }

        public void setDisplayOrder(int displayOrder) {
            this.displayOrder = displayOrder;
        }

        public List<ProjectImageDto> getImages() {
            return images;
        }

        public void setImages(List<ProjectImageDto> images) {
            this.images = images;
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

    public static class ProjectImageDto {
        private UUID id;
        private String imageUrl;
        private String storagePath;
        private String altText;
        private int displayOrder;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getStoragePath() {
            return storagePath;
        }

        public void setStoragePath(String storagePath) {
            this.storagePath = storagePath;
        }

        public String getAltText() {
            return altText;
        }

        public void setAltText(String altText) {
            this.altText = altText;
        }

        public int getDisplayOrder() {
            return displayOrder;
        }

        public void setDisplayOrder(int displayOrder) {
            this.displayOrder = displayOrder;
        }
    }
}
