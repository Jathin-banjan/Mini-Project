package com.heritageai.backend.controller;

import com.heritageai.backend.dto.PredictionDTOs.*;
import com.heritageai.backend.service.AuditService;
import com.heritageai.backend.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class PredictionController {

    private final PredictionService predictionService;
    private final AuditService auditService;

    @PostMapping
    public ResponseEntity<PredictionResponseDTO> createPrediction(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "includeGradcam", defaultValue = "false") boolean includeGradcam,
            Authentication authentication
    ) {
        PredictionResponseDTO result = predictionService.processImageAndPredict(file, includeGradcam);
        String username = authentication != null ? authentication.getName() : "ANONYMOUS";
        auditService.logAction(null, username, "CNN_INFERENCE", "PREDICTION", result.getId(), "Classified image as: " + result.getPredictedDisplayName() + " (" + result.getConfidence() + ")");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PredictionResponseDTO> getPredictionById(@PathVariable String id) {
        return ResponseEntity.ok(predictionService.getPredictionById(id));
    }

    @GetMapping
    public ResponseEntity<Page<PredictionResponseDTO>> getPredictions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(predictionService.getPredictions(page, size));
    }

    @PostMapping("/{id}/review")
    public ResponseEntity<Void> submitReview(
            @PathVariable String id,
            @RequestBody ReviewRequestDTO request,
            Authentication authentication
    ) {
        String username = authentication != null ? authentication.getName() : "ANONYMOUS";
        predictionService.submitReview(id, request, username);
        auditService.logAction(null, username, "REVIEW_PREDICTION", "PREDICTION", id, "Reviewed class correction: " + request.getReviewedClass());
        return ResponseEntity.ok().build();
    }
}
