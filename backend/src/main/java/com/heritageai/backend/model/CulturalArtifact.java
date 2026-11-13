package com.heritageai.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cultural_artifacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CulturalArtifact {

    @Id
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "cultural_category", nullable = false, length = 50)
    private String culturalCategory; // warli, madhubani, textile

    @Column(name = "verified_category", length = 50)
    private String verifiedCategory;

    @Column(length = 100)
    private String region;

    @Column(name = "artifact_type", length = 100)
    private String artifactType;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "creator_attribution", length = 200)
    private String creatorAttribution;

    @Column(name = "source_license", length = 100)
    private String sourceLicense;

    @Column(name = "creation_period", length = 100)
    private String creationPeriod;

    @Column(name = "review_status", length = 30)
    @Builder.Default
    private String reviewStatus = "UNREVIEWED"; // UNREVIEWED, VERIFIED, FLAG_INCORRECT

    @OneToMany(mappedBy = "artifact", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ArtifactImage> images = new ArrayList<>();

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;
}
