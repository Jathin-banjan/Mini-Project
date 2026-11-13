# REST API Documentation

## Spring Boot Backend API Endpoints (Port 8080)

Interactive OpenAPI / Swagger UI is available at `http://localhost:8080/swagger-ui.html`.

### 1. Authentication
- `POST /api/auth/login`: Authenticate user and return JWT Bearer token.
- `POST /api/auth/register`: Register new researcher account.
- `GET /api/auth/me`: Get current authenticated user profile.

### 2. Cultural Artifacts Archive
- `POST /api/artifacts`: Create new artifact catalog record.
- `GET /api/artifacts?category={cat}&region={reg}&search={q}&page=0&size=12`: Filter and paginate catalog artifacts.
- `GET /api/artifacts/{id}`: Fetch detailed artifact record.
- `PUT /api/artifacts/{id}`: Update artifact metadata.
- `DELETE /api/artifacts/{id}`: Delete artifact record (Admin only).
- `GET /api/artifacts/export/csv`: Export full catalog as downloadable CSV file.

### 3. Classification & Predictions
- `POST /api/predictions?includeGradcam=true` (Multipart form-data `file`): Upload image, invoke Python AI service, persist prediction, and return class probabilities & Grad-CAM heatmap.
- `GET /api/predictions/{id}`: Get stored prediction by ID.
- `GET /api/predictions`: Get recent predictions feed.
- `POST /api/predictions/{id}/review`: Submit expert review/correction.

### 4. Research & Telemetry
- `GET /api/research/summary`: System dashboard summary metrics.
- `GET /api/research/evaluations`: Latest held-out test evaluation report.
- `GET /api/research/models`: Current active model metadata.

### 5. Administration
- `GET /api/admin/datasets`: List registered datasets.
- `POST /api/admin/datasets`: Register dataset metadata.
- `GET /api/admin/audit-logs`: Paginated audit log trail.
- `GET /api/admin/users`: List all users.

---

## Python AI Microservice Endpoints (Port 8000)

- `GET /health`: Health status check.
- `GET /ready`: Model readiness check.
- `GET /model/info`: Keras model architecture & hyperparameter details.
- `POST /predict?include_gradcam=true`: Preprocess raw image bytes, execute CNN inference, return probabilities and Grad-CAM base64 PNG.
- `POST /evaluate`: Trigger evaluation run on test split.
- `GET /evaluation/latest`: Fetch cached evaluation report.
