package com.heritageai.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "datasets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dataset {

    @Id
    private String id;

    @Column(name = "dataset_name", nullable = false, length = 100)
    private String datasetName;

    @Column(nullable = false, length = 30)
    private String version;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "sample_count", nullable = false)
    private Integer sampleCount;

    @Column(name = "license_info", length = 150)
    private String licenseInfo;

    @Column(name = "source_reference", length = 255)
    private String sourceReference;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;
}
