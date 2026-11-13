package com.heritageai.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.List;

public class ArtifactDTOs {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ArtifactCreateRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Cultural Category is required")
        private String culturalCategory;

        private String verifiedCategory;
        private String region;
        private String artifactType;
        private String description;
        private String creatorAttribution;
        private String sourceLicense;
        private String creationPeriod;
        private String imageId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ArtifactResponseDTO {
        private String id;
        private String title;
        private String culturalCategory;
        private String verifiedCategory;
        private String region;
        private String artifactType;
        private String description;
        private String creatorAttribution;
        private String sourceLicense;
        private String creationPeriod;
        private String reviewStatus;
        private ImageDTO mainImage;
        private ZonedDateTime createdAt;
        private ZonedDateTime updatedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ImageDTO {
        private String id;
        private String originalFilename;
        private String storageUrl;
        private String mimeType;
        private Long fileSize;
        private Integer width;
        private Integer height;
    }
}
