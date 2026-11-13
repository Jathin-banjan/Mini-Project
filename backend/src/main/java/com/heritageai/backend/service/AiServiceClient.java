package com.heritageai.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiServiceClient {

    @Value("${heritage.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> checkHealth() {
        try {
            String url = aiServiceUrl + "/health";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            return Map.of("status", "down", "error", e.getMessage());
        }
    }

    public Map<String, Object> checkReadiness() {
        try {
            String url = aiServiceUrl + "/ready";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            return Map.of("ready", false, "model_loaded", false, "message", "AI microservice unreachable: " + e.getMessage());
        }
    }

    public Map<String, Object> getModelInfo() {
        try {
            String url = aiServiceUrl + "/model/info";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            return Map.of("model_loaded", false, "error", e.getMessage());
        }
    }

    public Map<String, Object> predict(File file, boolean includeGradcam) {
        try {
            String url = aiServiceUrl + "/predict?include_gradcam=" + includeGradcam;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new FileSystemResource(file));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(url, requestEntity, Map.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("AI Service Prediction call failed: " + e.getMessage(), e);
        }
    }

    public Map<String, Object> getLatestEvaluation() {
        try {
            String url = aiServiceUrl + "/evaluation/latest";
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
            return response.getBody();
        } catch (Exception e) {
            return Map.of("status", "error", "message", "Evaluation service unavailable: " + e.getMessage());
        }
    }
}
