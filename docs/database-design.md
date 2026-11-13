# Database Design & Relational Schema

## Entity Relationship Overview

The PostgreSQL database maintains normalized relational tables managed via Flyway versioned migrations (`db/migration/V1__init.sql`).

```
+---------------+        +----------------------+        +-------------------+
|     USERS     | 1    * |      USER_ROLES      | *    1 |       ROLES       |
+---------------+--------+----------------------+--------+-------------------+
        | 1
        |
        | *
+---------------+        +----------------------+        +-------------------+
|  AUDIT_LOGS   |        |  CULTURAL_ARTIFACTS  | 1    * |  ARTIFACT_IMAGES  |
+---------------+        +----------------------+--------+-------------------+
                                    | 1                           | 1
                                    |                             |
                                    | *                           | 1
                         +----------------------+        +-------------------+
                         |   ARTIFACT_REVIEWS   | *    1 |    PREDICTIONS    |
                         +----------------------+--------+-------------------+
                                                                  | 1
                                                                  | *
                                                         +-------------------+
                                                         | PREDICTION_PROBS  |
                                                         +-------------------+
```

---

## Key Tables & Fields

1. **`users`**: User account credentials, encrypted bcrypt passwords, full name, institution affiliation.
2. **`roles`**: System authority roles (`ROLE_ADMIN`, `ROLE_RESEARCHER`, `ROLE_ARCHIVIST`).
3. **`cultural_artifacts`**: Preservation catalog records storing artifact title, category (`warli`, `madhubani`, `textile`), verified category, region, artifact type, creation period, and description.
4. **`artifact_images`**: Metadata for uploaded image files including storage key, MIME type, file size, width, height.
5. **`predictions`**: Record of CNN model predictions including predicted class, display name, Softmax confidence, low-confidence warning flag, inference latency, model version, and optional Grad-CAM image key.
6. **`prediction_probabilities`**: Individual class probabilities for all 3 classes per inference.
7. **`artifact_reviews`**: Human expert review records preserving original AI predictions and reviewer-corrected classes.
8. **`datasets`**: Registered training/validation dataset metadata.
9. **`audit_logs`**: System audit logs recording user actions, timestamps, and target entities.

---

## Flyway Migration
All tables are created during startup via Flyway migration script `V1__init.sql`. Indices are placed on `cultural_category`, `region`, `image_id`, and `timestamp` for query performance.
