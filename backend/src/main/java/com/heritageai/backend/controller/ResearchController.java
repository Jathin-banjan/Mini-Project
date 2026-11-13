package com.heritageai.backend.controller;

import com.heritageai.backend.dto.ResearchDTOs.ResearchSummaryDTO;
import com.heritageai.backend.repository.CulturalArtifactRepository;
import com.heritageai.backend.repository.PredictionRepository;
import com.heritageai.backend.service.AiServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/research")
@RequiredArgsConstructor
public class ResearchController {

    private final CulturalArtifactRepository artifactRepository;
    private final PredictionRepository predictionRepository;
    private final AiServiceClient aiServiceClient;

    @GetMapping("/summary")
    public ResponseEntity<ResearchSummaryDTO> getResearchSummary() {
        long totalArtifacts = artifactRepository.count();
        long totalPredictions = predictionRepository.count();
        long verifiedCount = artifactRepository.countByReviewStatus("VERIFIED");
        long unverifiedCount = artifactRepository.countByReviewStatus("UNREVIEWED");
        long lowConfCount = predictionRepository.countByLowConfidenceWarningTrue();

        Map<String, Long> categoryDist = new HashMap<>();
        categoryDist.put("warli", predictionRepository.countByPredictedClass("warli"));
        categoryDist.put("madhubani", predictionRepository.countByPredictedClass("madhubani"));
        categoryDist.put("textile", predictionRepository.countByPredictedClass("textile"));

        Map<String, Object> readyInfo = aiServiceClient.checkReadiness();
        boolean isOperational = Boolean.TRUE.equals(readyInfo.get("ready"));
        String modelVersion = (String) readyInfo.getOrDefault("model_version", "HeritageCNN-v1.0.0");

        ResearchSummaryDTO summary = ResearchSummaryDTO.builder()
                .totalStoredArtifacts(totalArtifacts)
                .totalCompletedPredictions(totalPredictions)
                .categoryDistribution(categoryDist)
                .verifiedMetadataCount(verifiedCount)
                .unverifiedMetadataCount(unverifiedCount)
                .lowConfidenceCount(lowConfCount)
                .activeModelVersion(modelVersion)
                .modelOperational(isOperational)
                .build();

        return ResponseEntity.ok(summary);
    }

    @GetMapping("/evaluations")
    public ResponseEntity<Map<String, Object>> getEvaluations() {
        return ResponseEntity.ok(aiServiceClient.getLatestEvaluation());
    }

    @GetMapping("/models")
    public ResponseEntity<Map<String, Object>> getModelInfo() {
        return ResponseEntity.ok(aiServiceClient.getModelInfo());
    }
}
