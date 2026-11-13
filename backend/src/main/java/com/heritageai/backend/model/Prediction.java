package com.heritageai.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "predictions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prediction {

    @Id
    private String id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id", nullable = false)
    private ArtifactImage image;

    @Column(name = "predicted_class", nullable = false, length = 50)
    private String predictedClass;

    @Column(name = "predicted_display_name", nullable = false, length = 100)
    private String predictedDisplayName;

    @Column(nullable = false)
    private Double confidence;

    @Column(name = "low_confidence_warning", nullable = false)
    private Boolean lowConfidenceWarning;

    @Column(name = "model_version", nullable = false, length = 50)
    private String modelVersion;

    @Column(name = "inference_latency_sec", nullable = false)
    private Double inferenceLatencySec;

    @Column(name = "gradcam_storage_key", length = 500)
    private String gradcamStorageKey;

    @OneToMany(mappedBy = "prediction", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<PredictionProbability> probabilities = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;
}
