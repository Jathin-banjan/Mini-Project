package com.heritageai.backend.repository;

import com.heritageai.backend.model.Prediction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, String> {
    Page<Prediction> findAllByOrderByCreatedAtDesc(Pageable pageable);
    List<Prediction> findTop10ByOrderByCreatedAtDesc();
    long countByPredictedClass(String predictedClass);
    long countByLowConfidenceWarningTrue();
}
