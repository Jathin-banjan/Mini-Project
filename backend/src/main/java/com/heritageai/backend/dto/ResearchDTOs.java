package com.heritageai.backend.dto;

import lombok.*;

import java.util.Map;

public class ResearchDTOs {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResearchSummaryDTO {
        private long totalStoredArtifacts;
        private long totalCompletedPredictions;
        private Map<String, Long> categoryDistribution;
        private long verifiedMetadataCount;
        private long unverifiedMetadataCount;
        private long lowConfidenceCount;
        private String activeModelVersion;
        private boolean modelOperational;
    }
}
