# HeritageAI System Architecture

## Overview
**HeritageAI** is an AI-powered Cultural Heritage Intelligence and Digital Preservation Platform designed for the automatic identification, classification, explainability, and cataloging of traditional Indian cultural patterns.

The system is built on a 3-tier microservices architecture:
1. **Frontend**: Single Page Application built with React, Vite, TypeScript, and Tailwind CSS.
2. **Main Backend API**: Enterprise REST API built with Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA, PostgreSQL, and Flyway.
3. **AI Microservice**: Python 3.11 microservice built with FastAPI, TensorFlow/Keras, OpenCV, NumPy, Pillow, and scikit-learn.

---

## High-Level Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              REACT FRONTEND                             |
|    (Vite + TypeScript + Tailwind CSS + Framer Motion + Recharts)       |
+------------------------------------+------------------------------------+
                                     | REST API (HTTP / JSON)
                                     v
+------------------------------------+------------------------------------+
|                         SPRING BOOT BACKEND API                         |
|   (Java 21 + Spring Security JWT + Spring Data JPA + Flyway Engine)    |
+-------------------+--------------------------------+--------------------+
                    |                                | Internal HTTP
                    v                                v
+-------------------+---------------+   +------------+--------------------+
|         POSTGRESQL DATABASE       |   |       PYTHON AI MICROSERVICE       |
| (Artifacts, Users, Predictions,   |   |  (FastAPI + TensorFlow CNN +       |
|  Model Versions, Audit Logs)      |   |   Grad-CAM + OpenCV Preprocess)    |
+-----------------------------------+   +---------------------------------+
```

---

## Service Responsibilities

### 1. React Frontend (`frontend/`)
- User interface for researchers, archivists, and public users.
- Drag-and-drop image upload and preview.
- Real-time classification results and probability distribution bars.
- Grad-CAM heatmap visualization display.
- Heritage digital archive catalog with search, filtering, and CSV export.
- System metrics research dashboard with Recharts visual graphs.
- Administrative dataset registration and audit trail views.

### 2. Spring Boot Backend (`backend/`)
- Authentication & Authorization: JWT token generation, role-based access control (`ROLE_ADMIN`, `ROLE_RESEARCHER`, `ROLE_ARCHIVIST`).
- Metadata & Artifact Persistence: Full CRUD operations for cultural artifacts and images.
- AI Service Orchestration: Calls Python AI microservice `/predict` endpoint and persists prediction results linked to images.
- Review & Verification Workflow: Allows human experts to verify or correct model classifications without overwriting original AI outputs.
- Audit Logging: Tracks user actions and administrative changes.
- File Storage Abstraction: Manages local file uploads with path traversal security and UUID filename generation.

### 3. Python AI Microservice (`ai-service/`)
- Preprocessing Pipeline: EXIF rotation correction, aspect-ratio preserving resize to 224x224x3 RGB, pixel scaling [0.0, 1.0].
- Deep Learning Inference: Loads trained Keras CNN model (`heritage_cnn_v1.h5`) and performs 3-class Softmax classification.
- Explainable AI: Generates spatial Grad-CAM attention heatmaps from the target convolutional layer.
- Training & Evaluation Pipeline: Scripts for reproducible training (`train.py`), hyperparameter tuning (`optuna_tuning.py`), and test set metrics computation (`evaluate.py`).

---

## Data Flow for Image Classification

```
[ User ] --(Uploads Image)--> [ React Frontend ]
                                     |
                                 (POST /api/predictions)
                                     v
                           [ Spring Boot Backend ]
                                     |
                          (Stores Image File & DB Record)
                                     |
                          (POST http://ai-service:8000/predict)
                                     v
                         [ Python AI Microservice ]
                                     |
                       (Preprocesses to 224x224x3 RGB)
                       (Executes Keras CNN Inference)
                       (Generates Grad-CAM Base64 PNG)
                                     |
                               (Returns JSON)
                                     v
                           [ Spring Boot Backend ]
                                     |
                      (Persists Prediction in PostgreSQL)
                                     |
                          (Returns Prediction DTO)
                                     v
[ User ] <-- (Displays Class, Probabilities, Grad-CAM) -- [ React Frontend ]
```
