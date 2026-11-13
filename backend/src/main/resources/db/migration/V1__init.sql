-- Flyway Database Schema Migration V1__init.sql
-- HeritageAI Platform Database Initialization

-- Optional PostgreSQL UUID extension (not needed as UUIDs are generated in Java application layer)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles Table
CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (id, name) VALUES 
('role-admin-01', 'ROLE_ADMIN'),
('role-researcher-02', 'ROLE_RESEARCHER'),
('role-archivist-03', 'ROLE_ARCHIVIST');

-- 2. Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    institution VARCHAR(150),
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. User Roles Join Table
CREATE TABLE user_roles (
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id VARCHAR(36) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- 4. Cultural Artifacts Table
CREATE TABLE cultural_artifacts (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    cultural_category VARCHAR(50) NOT NULL, -- warli, madhubani, textile
    verified_category VARCHAR(50),
    region VARCHAR(100),
    artifact_type VARCHAR(100),
    description TEXT,
    creator_attribution VARCHAR(200),
    source_license VARCHAR(100),
    creation_period VARCHAR(100),
    review_status VARCHAR(30) DEFAULT 'UNREVIEWED', -- UNREVIEWED, VERIFIED, FLAG_INCORRECT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Artifact Images Table
CREATE TABLE artifact_images (
    id VARCHAR(36) PRIMARY KEY,
    artifact_id VARCHAR(36) REFERENCES cultural_artifacts(id) ON DELETE SET NULL,
    original_filename VARCHAR(255) NOT NULL,
    storage_key VARCHAR(500) NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    file_size BIGINT NOT NULL,
    width INT,
    height INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Predictions Table
CREATE TABLE predictions (
    id VARCHAR(36) PRIMARY KEY,
    image_id VARCHAR(36) REFERENCES artifact_images(id) ON DELETE CASCADE,
    predicted_class VARCHAR(50) NOT NULL,
    predicted_display_name VARCHAR(100) NOT NULL,
    confidence DOUBLE PRECISION NOT NULL,
    low_confidence_warning BOOLEAN NOT NULL DEFAULT FALSE,
    model_version VARCHAR(50) NOT NULL,
    inference_latency_sec DOUBLE PRECISION NOT NULL,
    gradcam_storage_key VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Prediction Probabilities Table
CREATE TABLE prediction_probabilities (
    id VARCHAR(36) PRIMARY KEY,
    prediction_id VARCHAR(36) NOT NULL REFERENCES predictions(id) ON DELETE CASCADE,
    class_key VARCHAR(50) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    confidence DOUBLE PRECISION NOT NULL
);

-- 8. Artifact Reviews Table
CREATE TABLE artifact_reviews (
    id VARCHAR(36) PRIMARY KEY,
    artifact_id VARCHAR(36) REFERENCES cultural_artifacts(id) ON DELETE CASCADE,
    prediction_id VARCHAR(36) REFERENCES predictions(id) ON DELETE CASCADE,
    reviewer_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    original_class VARCHAR(50) NOT NULL,
    reviewed_class VARCHAR(50) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Datasets Table
CREATE TABLE datasets (
    id VARCHAR(36) PRIMARY KEY,
    dataset_name VARCHAR(100) NOT NULL,
    version VARCHAR(30) NOT NULL,
    description TEXT,
    sample_count INT NOT NULL DEFAULT 0,
    license_info VARCHAR(150),
    source_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Model Versions Table
CREATE TABLE model_versions (
    id VARCHAR(36) PRIMARY KEY,
    version_tag VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    accuracy DOUBLE PRECISION,
    macro_f1 DOUBLE PRECISION,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Audit Logs Table
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    username VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(36),
    details TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient querying
CREATE INDEX idx_artifacts_category ON cultural_artifacts(cultural_category);
CREATE INDEX idx_artifacts_region ON cultural_artifacts(region);
CREATE INDEX idx_predictions_image ON predictions(image_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);

-- Seed default active model version record
INSERT INTO model_versions (id, version_tag, description, accuracy, macro_f1, is_active) VALUES
('mv-001', 'HeritageCNN-v1.0.0', 'Proposed stacked Conv2D CNN architecture for 3-class Indian cultural pattern identification', 0.962, 0.952, TRUE);

-- Seed sample dataset record
INSERT INTO datasets (id, dataset_name, version, description, sample_count, license_info, source_reference) VALUES
('ds-001', 'HeritageAI Sample Demonstration Dataset', 'v1.0', 'Legally generated demonstration dataset containing Warli, Madhubani and Indian Textile motifs', 150, 'CC-BY-4.0', 'HeritageAI Cultural Research Lab');
