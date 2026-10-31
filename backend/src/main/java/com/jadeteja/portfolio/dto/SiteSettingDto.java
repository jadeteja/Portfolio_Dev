package com.jadeteja.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.OffsetDateTime;
import java.util.UUID;

public class SiteSettingDto {

    public static class UpsertRequest {
        @NotBlank(message = "Setting key is required")
        private String settingKey;

        @NotBlank(message = "Setting value is required")
        private String settingValue;

        public String getSettingKey() {
            return settingKey;
        }

        public void setSettingKey(String settingKey) {
            this.settingKey = settingKey;
        }

        public String getSettingValue() {
            return settingValue;
        }

        public void setSettingValue(String settingValue) {
            this.settingValue = settingValue;
        }
    }

    public static class Response {
        private UUID id;
        private String settingKey;
        private String settingValue;
        private OffsetDateTime updatedAt;

        public UUID getId() {
            return id;
        }

        public void setId(UUID id) {
            this.id = id;
        }

        public String getSettingKey() {
            return settingKey;
        }

        public void setSettingKey(String settingKey) {
            this.settingKey = settingKey;
        }

        public String getSettingValue() {
            return settingValue;
        }

        public void setSettingValue(String settingValue) {
            this.settingValue = settingValue;
        }

        public OffsetDateTime getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(OffsetDateTime updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
}
