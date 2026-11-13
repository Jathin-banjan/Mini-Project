# Automated Testing Report

## Overview
Automated tests are implemented across both the Python AI microservice and Spring Boot backend to verify correctness, data preprocessing, schema consistency, security, and REST contracts.

---

## 1. Python AI Service Tests (`pytest`)

Located at: `ai-service/tests/test_ai_service.py`

### Test Cases Covered:
- `test_validate_image_file_valid`: Validates file size limits (10MB) and allowed extensions (`.jpg`, `.jpeg`, `.png`, `.webp`).
- `test_validate_image_file_invalid_ext`: Verifies rejection of unsupported file formats (`.bmp`).
- `test_preprocessing_output_shape_and_range`: Asserts preprocessing returns `(1, 224, 224, 3)` float32 array in `[0.0, 1.0]`.
- `test_class_mapping_consistency`: Ensures 3-class mappings (`warli`, `madhubani`, `textile`) remain identical across modules.
- `test_heritage_cnn_architecture`: Validates layer configurations, Dropout(0.45), Softmax output, and `target_conv_layer`.
- `test_fastapi_health_endpoint`: Tests `/health` endpoint HTTP 200 response.
- `test_fastapi_ready_endpoint`: Tests `/ready` endpoint status reporting.

### Execution Command:
```bash
cd ai-service
pytest
```

---

## 2. Spring Boot Backend Tests (JUnit 5 / Spring Security Test)

Located at: `backend/src/test/java/com/heritageai/backend/HeritageAiBackendApplicationTests.java`

### Test Cases Covered:
- `testLoginDefaultAdmin`: Verifies default admin user login (`admin` / `AdminPass123!`) and JWT token emission.
- `testUserRegistration`: Verifies user registration and role assignment.
- `testCreateAndGetArtifact`: Tests Artifact CRUD operations and category query filtering.
- `testResearchSummaryEndpoint`: Verifies research dashboard telemetry API endpoint.

### Execution Command:
```bash
cd backend
mvn clean test
```
