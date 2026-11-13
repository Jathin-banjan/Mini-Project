package com.heritageai.backend.service;

import com.heritageai.backend.dto.PredictionDTOs.*;
import com.heritageai.backend.model.*;
import com.heritageai.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final FileStorageService fileStorageService;
    private final AiServiceClient aiServiceClient;
    private final ArtifactImageRepository imageRepository;
    private final PredictionRepository predictionRepository;
    private final ArtifactReviewRepository reviewRepository;
    private final CulturalArtifactRepository artifactRepository;
    private final UserRepository userRepository;

    @Transactional
    public PredictionResponseDTO processImageAndPredict(MultipartFile file, boolean includeGradcam) {
        // 1. Store file locally
        String storageKey = fileStorageService.storeFile(file);
        Path filePath = fileStorageService.loadFile(storageKey);

        ArtifactImage artifactImage = ArtifactImage.builder()
                .id(UUID.randomUUID().toString())
                .originalFilename(file.getOriginalFilename())
                .storageKey(storageKey)
                .mimeType(file.getContentType() != null ? file.getContentType() : "image/jpeg")
                .fileSize(file.getSize())
                .width(224)
                .height(224)
                .build();

        artifactImage = imageRepository.save(artifactImage);

        // 2. Invoke Python AI Service
        File storedFile = filePath.toFile();
        Map<String, Object> aiResult = aiServiceClient.predict(storedFile, includeGradcam);

        String predictedClass = (String) aiResult.get("predicted_class");
        String predictedDisplayName = (String) aiResult.get("predicted_display_name");
        Double confidence = Double.valueOf(aiResult.get("confidence").toString());
        Boolean lowConfidenceWarning = (Boolean) aiResult.get("low_confidence_warning");
        String modelVersion = (String) aiResult.get("model_version");
        Double latency = Double.valueOf(aiResult.get("inference_latency_sec").toString());
        String gradcamB64 = (String) aiResult.get("gradcam_image_base64");

        // 3. Create Prediction entity
        Prediction prediction = Prediction.builder()
                .id(UUID.randomUUID().toString())
                .image(artifactImage)
                .predictedClass(predictedClass)
                .predictedDisplayName(predictedDisplayName)
                .confidence(confidence)
                .lowConfidenceWarning(lowConfidenceWarning)
                .modelVersion(modelVersion)
                .inferenceLatencySec(latency)
                .gradcamStorageKey(gradcamB64) // Stored as base64 or reference
                .build();

        List<Map<String, Object>> rawProbs = (List<Map<String, Object>>) aiResult.get("probabilities");
        List<PredictionProbability> probsList = new ArrayList<>();

        if (rawProbs != null) {
            for (Map<String, Object> p : rawProbs) {
                PredictionProbability prob = PredictionProbability.builder()
                        .id(UUID.randomUUID().toString())
                        .prediction(prediction)
                        .classKey((String) p.get("class_key"))
                        .displayName((String) p.get("display_name"))
                        .confidence(Double.valueOf(p.get("confidence").toString()))
                        .build();
                probsList.add(prob);
            }
        }
        prediction.setProbabilities(probsList);

        Prediction savedPrediction = predictionRepository.save(prediction);
        return mapToDTO(savedPrediction);
    }

    public PredictionResponseDTO getPredictionById(String id) {
        Prediction p = predictionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prediction not found with id " + id));
        return mapToDTO(p);
    }

    public Page<PredictionResponseDTO> getPredictions(int page, int size) {
        Page<Prediction> pageResult = predictionRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));
        return pageResult.map(this::mapToDTO);
    }

    @Transactional
    public void submitReview(String predictionId, ReviewRequestDTO request, String reviewerUsername) {
        Prediction prediction = predictionRepository.findById(predictionId)
                .orElseThrow(() -> new RuntimeException("Prediction not found"));

        User reviewer = userRepository.findByUsername(reviewerUsername).orElse(null);

        ArtifactReview review = ArtifactReview.builder()
                .id(UUID.randomUUID().toString())
                .prediction(prediction)
                .reviewer(reviewer)
                .originalClass(prediction.getPredictedClass())
                .reviewedClass(request.getReviewedClass())
                .notes(request.getNotes())
                .build();

        reviewRepository.save(review);
    }

    public PredictionResponseDTO mapToDTO(Prediction p) {
        List<ProbabilityDTO> probDtos = p.getProbabilities().stream()
                .map(prob -> ProbabilityDTO.builder()
                        .classKey(prob.getClassKey())
                        .displayName(prob.getDisplayName())
                        .confidence(prob.getConfidence())
                        .build())
                .collect(Collectors.toList());

        return PredictionResponseDTO.builder()
                .id(p.getId())
                .imageId(p.getImage().getId())
                .imageUrl("/uploads/" + p.getImage().getStorageKey())
                .predictedClass(p.getPredictedClass())
                .predictedDisplayName(p.getPredictedDisplayName())
                .confidence(p.getConfidence())
                .lowConfidenceWarning(p.getLowConfidenceWarning())
                .modelVersion(p.getModelVersion())
                .inferenceLatencySec(p.getInferenceLatencySec())
                .gradcamImageUrl(p.getGradcamStorageKey())
                .probabilities(probDtos)
                .createdAt(p.getCreatedAt())
                .build();
    }
}
