package com.heritageai.backend.dto;

import lombok.*;

import java.time.ZonedDateTime;

public class AdminDTOs {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DatasetDTO {
        private String id;
        private String datasetName;
        private String version;
        private String description;
        private Integer sampleCount;
        private String licenseInfo;
        private String sourceReference;
        private ZonedDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuditLogDTO {
        private String id;
        private String userId;
        private String username;
        private String action;
        private String entityType;
        private String entityId;
        private String details;
        private ZonedDateTime timestamp;
    }
}
