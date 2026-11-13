package com.heritageai.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "model_versions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ModelVersion {

    @Id
    private String id;

    @Column(name = "version_tag", nullable = false, unique = true, length = 50)
    private String versionTag;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double accuracy;

    @Column(name = "macro_f1")
    private Double macroF1;

    @Column(name = "is_active")
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;
}
