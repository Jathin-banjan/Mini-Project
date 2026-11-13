package com.heritageai.backend.repository;

import com.heritageai.backend.model.ArtifactReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtifactReviewRepository extends JpaRepository<ArtifactReview, String> {
    List<ArtifactReview> findByArtifactId(String artifactId);
    List<ArtifactReview> findByPredictionId(String predictionId);
}
