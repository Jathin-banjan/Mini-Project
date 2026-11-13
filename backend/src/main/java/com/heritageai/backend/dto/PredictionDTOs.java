package com.heritageai.backend.dto;

import lombok.*;

import java.time.ZonedDateTime;
import java.util.List;

public class PredictionDTOs {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProbabilityDTO {
        private String classKey;
        private String displayName;
        private Double confidence;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PredictionResponseDTO {
        private String id;
        private String imageId;
        private String imageUrl;
        private String predictedClass;
        private String predictedDisplayName;
        private Double confidence;
        private Boolean lowConfidenceWarning;
        private String modelVersion;
        private Double inferenceLatencySec;
        private String gradcamImageUrl;
        private List<ProbabilityDTO> probabilities;
        private ZonedDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewRequestDTO {
        private String reviewedClass;
        private String notes;
    }
}
