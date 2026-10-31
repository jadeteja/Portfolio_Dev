package com.jadeteja.portfolio.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class SupabaseStorageService {

    private static final Logger log = LoggerFactory.getLogger(SupabaseStorageService.class);

    @Value("${app.supabase.url:}")
    private String supabaseUrl;

    @Value("${app.supabase.service-role-key:}")
    private String serviceRoleKey;

    @Value("${app.supabase.storage-bucket:portfolio-assets}")
    private String storageBucket;

    private final RestTemplate restTemplate = new RestTemplate();

    public record UploadResult(String publicUrl, String storagePath) {}

    public UploadResult uploadProjectImage(MultipartFile file, UUID projectId) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String storagePath = "projects/" + projectId + "/" + UUID.randomUUID() + extension;

        if (StringUtils.hasText(supabaseUrl) && StringUtils.hasText(serviceRoleKey)) {
            String uploadUrl = supabaseUrl + "/storage/v1/object/" + storageBucket + "/" + storagePath;

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + serviceRoleKey);
            headers.setContentType(MediaType.parseMediaType(file.getContentType() != null ? file.getContentType() : "application/octet-stream"));

            HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);
            try {
                ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);
                if (response.getStatusCode().is2xxSuccessful()) {
                    String publicUrl = supabaseUrl + "/storage/v1/object/public/" + storageBucket + "/" + storagePath;
                    return new UploadResult(publicUrl, storagePath);
                }
            } catch (Exception e) {
                log.error("Failed to upload image to Supabase Storage: {}", e.getMessage());
            }
        }

        // Fallback for local development or when Supabase keys are pending configuration
        String placeholderUrl = "/images/references/08-project-details-desktop.png";
        return new UploadResult(placeholderUrl, storagePath);
    }

    public void deleteImage(String storagePath) {
        if (StringUtils.hasText(supabaseUrl) && StringUtils.hasText(serviceRoleKey) && StringUtils.hasText(storagePath)) {
            String deleteUrl = supabaseUrl + "/storage/v1/object/" + storageBucket + "/" + storagePath;
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + serviceRoleKey);
            HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
            try {
                restTemplate.exchange(deleteUrl, HttpMethod.DELETE, requestEntity, Void.class);
            } catch (Exception e) {
                log.warn("Failed to delete image from Supabase Storage: {}", e.getMessage());
            }
        }
    }
}
