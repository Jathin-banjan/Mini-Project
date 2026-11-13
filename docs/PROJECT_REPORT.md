# HERITAGEAI: ARTIFICIAL INTELLIGENCE SYSTEM FOR AUTOMATIC IDENTIFICATION AND CLASSIFICATION OF CULTURAL PATTERNS

**A MINI PROJECT REPORT**

*Submitted by*

### **JATHIN V BANJAN**
### **USN: NN25MCA051**

*of*

### **MASTER OF COMPUTER APPLICATIONS**
### **NMAM Institute of Technology, Nitte**

---

<div align="center">

<img src="nitte_nmam_logo.png" alt="NITTE | NMAM INSTITUTE OF TECHNOLOGY" width="450" />

<p style="color: #1B358A; font-weight: bold; font-size: 14pt; margin: 5px 0;">
  NITTE (Deemed to be University) | NMAM INSTITUTE OF TECHNOLOGY
</p>
<p style="color: #1B358A; font-size: 11pt; margin: 2px 0;">
  <em>(An off-Campus Institution of Nitte (Deemed to be University), MANGALORE)</em>
</p>
<p style="color: #1B358A; font-weight: bold; font-size: 13pt; margin: 5px 0;">
  Nitte Mahalinga Adyanthaya Memorial Institute of Technology, Nitte
</p>
<p style="color: #1B358A; font-weight: bold; font-size: 14pt; margin: 5px 0;">
  Department of MCA
</p>
<p style="font-weight: bold; font-size: 14pt; margin-top: 10px;">
  November 2026
</p>

</div>

---
---

<div align="center">

<img src="nitte_nmam_logo.png" alt="NITTE | NMAM INSTITUTE OF TECHNOLOGY" width="400" />

<p style="color: #1B358A; font-size: 11pt; margin: 2px 0;">
  <em>(An off-Campus Institution of Nitte (Deemed to be University), MANGALORE)</em>
</p>
<p style="color: #1B358A; font-weight: bold; font-size: 16pt; letter-spacing: 1px; margin: 5px 0;">
  DEPARTMENT OF MCA
</p>

<hr style="border: 1px solid #1B358A; width: 100%;" />

</div>

### **BONAFIDE CERTIFICATE**

Certified that this project report **“HERITAGEAI: ARTIFICIAL INTELLIGENCE SYSTEM FOR AUTOMATIC IDENTIFICATION AND CLASSIFICATION OF CULTURAL PATTERNS”** is the bonafide work of **“JATHIN V BANJAN (USN: NN25MCA051)”** who carried out the project work under my supervision.

<br><br>

________________________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ________________________________________  
**SIGNATURE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **SIGNATURE**  
**(Project Guide)**  
**Dr. Anantha Murthy** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Dr. Mamatha Balipa**  
Associate Professor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Professor & Head  
Department of MCA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department of MCA  
NMAM Institute of Technology, Nitte &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NMAM Institute of Technology, Nitte  

---
---

### **ABSTRACT**

India possesses a rich and diverse tapestry of indigenous art forms, folk paintings, and handloom textile traditions. Among these, Warli tribal art from Maharashtra, Madhubani folk paintings from Bihar, and traditional Indian textile motifs (incorporating Paisley and Bandhani patterns) reflect centuries of cultural heritage and traditional knowledge. However, rapid globalization, lack of formal digitization, and subjective manual cataloging present critical risks of cultural attrition, misattribution, and loss of provenance. 

This mini-project report presents **HeritageAI**, a research-grade, locally deployable artificial intelligence platform designed for the automatic identification, classification, explainability, and digital preservation of Indian cultural patterns. The core computer vision pipeline utilizes a customized Convolutional Neural Network (CNN) architecture engineered for three distinct pattern categories: Warli Art Motifs, Madhubani Paintings, and Indian Textile Patterns. 

The image processing methodology enforces rigorous aspect-ratio preserving resizing with zero-padding (letterboxing) to 224 × 224 × 3 RGB and pixel intensity normalization to [0.0, 1.0]. The deep learning architecture incorporates stacked Conv2D feature extraction layers, 2 × 2 max-pooling, dense fully connected layers with ReLU activations, dropout regularization (rate 0.45) to prevent overfitting, and a three-unit Softmax classification layer trained via the Adam optimizer (learning rate 0.0001) under Sparse Categorical Crossentropy loss. To foster algorithmic transparency, the system implements Gradient-weighted Class Activation Mapping (Grad-CAM) to generate spatial attention heatmaps illustrating salient feature regions that influence model predictions. 

The software architecture integrates a React 18 / Vite / TypeScript single-page application, an enterprise Java 21 / Spring Boot 3 RESTful microservice with JWT authentication and Flyway database migrations, and a Python 3.11 / FastAPI deep learning inference service supported by PostgreSQL. Experimental evaluations demonstrated high classification accuracy alongside low inference latency, validating the system as an effective preservation instrument for archivists, museum curators, and cultural researchers.

---
---

### **TABLE OF CONTENTS**

| CHAPTER NO. | TITLE | PAGE NO. |
| :---: | :--- | :---: |
| &nbsp; | **BONAFIDE CERTIFICATE** | **ii** |
| &nbsp; | **ABSTRACT** | **iii** |
| &nbsp; | **TABLE OF CONTENTS** | **iv** |
| &nbsp; | **LIST OF TABLES** | **vi** |
| &nbsp; | **LIST OF FIGURES** | **vii** |
| **1.** | **INTRODUCTION** | **1** |
| &nbsp; | 1.1 Problem Definition | 1 |
| &nbsp; | 1.2 Objectives | 2 |
| &nbsp; | 1.3 Challenges | 3 |
| &nbsp; | 1.4 Literature Survey | 4 |
| **2.** | **SOFTWARE REQUIREMENT SPECIFICATION** | **6** |
| &nbsp; | 2.1 Functional Requirements | 6 |
| &nbsp; | 2.2 Non-functional Requirements | 7 |
| &nbsp; | 2.3 Hardware and Software Requirements | 8 |
| **3.** | **SYSTEM DESIGN** | **10** |
| &nbsp; | 3.1 High Level Design | 10 |
| &nbsp; | 3.2 Detailed Design | 11 |
| **4.** | **SYSTEM IMPLEMENTATION** | **13** |
| &nbsp; | 4.1 Module Description | 13 |
| &nbsp; | 4.2 Tools, Language and RDBMS used | 15 |
| &nbsp; | 4.3 Screen Shots | 16 |
| **5.** | **TESTING** | **18** |
| **6.** | **CONCLUSION AND FUTURE ENHANCEMENTS** | **20** |
| &nbsp; | **REFERENCES** | **21** |

---
---

### **LIST OF TABLES**

| TABLE NO. | TITLE | PAGE NO. |
| :---: | :--- | :---: |
| Table 1.1 | Benchmark Comparison of Visual Classification Architectures | 5 |
| Table 2.1 | Minimum Hardware Specifications for Training and Inference | 8 |
| Table 2.2 | Software Stack and Dependency Versions | 9 |
| Table 4.1 | Custom HeritageCNN Architectural Specification | 14 |
| Table 5.1 | Test Cases and Execution Results for Core System Modules | 19 |

---

### **LIST OF FIGURES**

| FIGURE NO. | TITLE | PAGE NO. |
| :---: | :--- | :---: |
| Figure 3.1 | High-Level Microservice System Architecture | 10 |
| Figure 3.2 | End-to-End Image Classification and Archival Data Flow | 11 |
| Figure 3.3 | Entity Relationship Diagram of PostgreSQL Relational Schema | 12 |
| Figure 4.1 | HeritageCNN Convolutional Feature Extraction Pipeline | 14 |
| Figure 4.2 | User Interface — AI Pattern Analyzer with Grad-CAM Visualization | 16 |
| Figure 4.3 | User Interface — Digital Heritage Preservation Archive Catalog | 17 |
| Figure 4.4 | User Interface — Research Metrics and Evaluation Dashboard | 17 |
| Figure 5.1 | Confusion Matrix Heatmap for Cultural Pattern Classification | 19 |

---
---

# CHAPTER 1: INTRODUCTION

Cultural heritage embodies the historical memory, spiritual philosophy, and aesthetic identity of human civilization. In the Indian subcontinent, traditional art and handloom forms have flourished over millennia, serving not merely as decorative expressions but as visual languages reflecting tribal folklore, sacred geometry, and socio-ecological connections. Prominent among these indigenous visual expressions are:
1. **Warli Art**: Originating from the Sahyadri tribal communities of Maharashtra, Warli art is distinguished by rudimentary geometric elements—circles representing the celestial bodies, triangles depicting sacred mountains and trees, and stylized human stick figures engaged in ritual Tarpa circle dances.
2. **Madhubani Paintings**: Practiced across the Mithila region of Bihar, Madhubani folk art is renowned for prominent double outlines, parallel line hatchings, vibrant natural pigments, and non-empty backgrounds embellished with sacred fish, peacocks, and floral motifs.
3. **Indian Textile Patterns**: Spanning pan-Indian block printing and tie-dye traditions, incorporating iconic Paisley (*Kalka*) silhouettes, Bandhani geometric dot matrices, and rhythmic repeating borders.

Despite their profound cultural importance, these fragile intangible traditions face risks of commercial imitation, intellectual property misattribution, and loss of historical records. The digitization of cultural archives combined with computational pattern intelligence offers a potent mechanism to catalog, verify, and preserve these indigenous traditions.

---

### 1.1 Problem Definition
Traditional cataloging of cultural heritage artifacts is predominantly manual, labor-intensive, and reliant upon the subjective expertise of specialized art historians. Archival institutions and museums often lack automated computational tools capable of:
- Accurately distinguishing between visual traditions that share overlapping geometric primitives.
- Ingesting arbitrary digital photographs while mitigating distortions introduced by non-uniform aspect ratios and lighting.
- Explaining the internal rationale of black-box deep neural networks to domain historians.
- Decoupling provisional machine-generated predictions from verified institutional metadata to prevent erroneous historical claims.

The fundamental objective of this project is to develop and validate **HeritageAI**, an automated computer vision intelligence and digital preservation platform that accepts arbitrary digital imagery, applies rigorous aspect-ratio preserving preprocessing, performs multi-class Convolutional Neural Network inference across Warli, Madhubani, and Indian Textile categories, provides Grad-CAM attention visualizations, and securely persists catalog records through a verified review workflow.

---

### 1.2 Objectives
The specific objectives accomplished in this mini-project are as follows:
1. **Research-Grade Preprocessing**: Design an automated image ingestion pipeline capable of validating file extensions (`JPG`, `PNG`, `WebP`), correcting EXIF orientation metadata, letterbox padding images to 224 × 224 × 3 RGB to prevent aspect-ratio skewing, and normalizing pixel intensities to [0.0, 1.0].
2. **Custom CNN Architecture**: Implement a custom stacked Conv2D neural network with ReLU activations, 2 × 2 max-pooling, dense fully connected layers, 0.45 dropout regularization, and a Softmax classifier optimized via Adam ($lr = 0.0001$) under Sparse Categorical Crossentropy.
3. **Model Interpretability (Explainable AI)**: Integrate Gradient-weighted Class Activation Mapping (Grad-CAM) to extract gradient signals from the final convolutional layer, producing spatial heatmaps that illustrate regions of model attention.
4. **Enterprise Multi-Tier Architecture**: Develop an enterprise backend using Java 21, Spring Boot 3, Spring Security with stateless JWT tokens, Spring Data JPA, and Flyway database migrations backed by PostgreSQL.
5. **Interactive Research Interface**: Deliver a modern, accessible web application in React 18, Vite, TypeScript, and Tailwind CSS incorporating an editorial cultural palette (Deep Indigo, Terracotta, Ivory, Gold), an AI Pattern Analyzer, an Archival Catalog, and a Research Telemetry Dashboard.
6. **Curatorial Integrity & Review Workflow**: Establish an expert verification workflow that explicitly separates AI inferences from human-reviewed provenance, while raising alerts whenever confidence scores fall below a configurable threshold (0.60).

---

### 1.3 Challenges
The engineering and algorithmic challenges encountered during development include:
- **Aspect Ratio Distortion**: Standard deep learning preprocessing indiscriminately squashes rectangular photographs into square dimensions, distorting authentic motif proportions. This was resolved by implementing letterbox zero-padding.
- **Intra-Class Variation and Inter-Class Similarities**: Tribal and folk artworks exhibit extensive natural variation due to differences in handcrafted brushstrokes, natural dyes, and weathered substrates.
- **Model Transparency**: Deep neural networks act as black-box function approximators. For cultural archivists, an unsubstantiated prediction is untrustworthy. Integrating Grad-CAM overcomes this barrier.
- **Data Integrity & Retraining Hazards**: Overwriting archival metadata directly with probabilistic model outputs risks propagating algorithmic hallucinations into historical catalogs. The schema strictly isolates predicted and verified categories.

---

### 1.4 Literature Survey
Deep learning and convolutional architectures have fundamentally transformed cultural heritage preservation:

* **Traditional Feature Handcrafting**: Early cultural pattern recognition relied upon hand-crafted visual descriptors such as Scale-Invariant Feature Transform (SIFT), Histogram of Oriented Gradients (HOG), and Gray-Level Co-occurrence Matrices (GLCM). While effective for rigid geometric structures, these descriptors failed to generalize across variations in hand-painted strokes and textured substrates.
* **Deep Transfer Learning**: Pre-trained convolutional backbones such as AlexNet, VGG-16, and ResNet-50 demonstrated the viability of automated feature extraction for art historical classification. However, heavy transfer architectures often present excessive computational footprints (e.g., ResNet-50 requiring substantial parameter counts and prolonged inference latency).
* **Research Paper Benchmark Foundation**: The research paper underlying this system validated an application-oriented, locally deployable CNN architecture tailored specifically for indigenous Indian cultural patterns. The comparative benchmarks reported in the research paper are summarized in Table 1.1.

##### Table 1.1: Benchmark Comparison of Visual Classification Architectures
| Architecture / Model | Mean Accuracy | Macro Precision | Macro Recall | Macro F1-Score | Inference Latency |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Proposed HeritageCNN** | **96.2%** | **0.958** | **0.946** | **0.952** | **0.22 s / img** |
| AlexNet Baseline | 79.5% | 0.781 | 0.764 | 0.772 | 0.12 s / img |
| ResNet-50 Baseline | 86.8% | 0.865 | 0.851 | 0.858 | 0.45 s / img |

The proposed HeritageCNN achieves a superior balance between discriminative accuracy and lightweight computational latency, rendering it ideally suited for local institutional deployment without requiring dedicated enterprise GPU clusters.

---
---

# CHAPTER 2: SOFTWARE REQUIREMENT SPECIFICATION

The Software Requirement Specification (SRS) establishes the complete operational capabilities, constraints, and dependencies governing the HeritageAI platform.

---

### 2.1 Functional Requirements
1. **User Authentication & Role-Based Authorization (RBAC)**:
   - The system must provide secure user registration and login functionality utilizing salted BCrypt password hashing and stateless JSON Web Tokens (JWT).
   - The system must enforce role permissions (`ROLE_ADMIN`, `ROLE_RESEARCHER`, `ROLE_ARCHIVIST`) to govern sensitive administrative and catalog modification operations.
2. **Cultural Image Ingestion & Preprocessing**:
   - The system must validate input file extensions (`.jpg`, `.jpeg`, `.png`, `.webp`) and reject files exceeding 10 MB.
   - The system must automatically normalize orientation using EXIF transpose tags.
   - The system must perform aspect-ratio preserving resizing with zero-padding (letterboxing) to 224 × 224 × 3 RGB and scale pixel values to [0.0, 1.0].
3. **Pattern Classification & Confidence Scoring**:
   - The system must execute neural inference on the preprocessed tensor and produce categorical probabilities across Warli, Madhubani, and Indian Textile categories.
   - The system must issue a prominent Low-Confidence Warning whenever the top-ranked Softmax probability is below 0.60.
4. **Explainable AI (Grad-CAM Visualization)**:
   - The system must calculate gradient activations from the final convolutional layer (`target_conv_layer`) and generate a jet-colormap heatmap overlaid on the original image.
5. **Digital Preservation Archiving & Expert Review**:
   - The system must allow users to persist classified artifacts with metadata including title, category, region, creator attribution, license, and creation period.
   - The system must enable authorized archivists to submit reviews and corrections without overwriting original AI predictions.
6. **Data Export & Audit Logging**:
   - The system must export catalog records in CSV format.
   - The system must record tamper-evident audit logs capturing timestamps, user identities, action types, and target entities.

---

### 2.2 Non-functional Requirements
1. **Performance & Latency**:
   - The AI microservice must complete single-image preprocessing and neural inference within 300 milliseconds on standard x86-64 CPUs.
2. **Reliability & Availability**:
   - The microservices must incorporate health check endpoints (`/health` and `/ready`) to detect model availability and decouple database failures from user session crashes.
3. **Security**:
   - Passwords must never be stored in plain text. JWT secrets must remain configurable through environment variables.
   - File uploads must employ UUID-based filename obfuscation to mitigate directory traversal attacks.
4. **Usability & Responsiveness**:
   - The frontend interface must adhere to WCAG accessibility principles, featuring responsive layouts compatible with desktop, tablet, and mobile displays.

---

### 2.3 Hardware and Software Requirements

##### Table 2.1: Minimum Hardware Specifications for Training and Inference
| Parameter | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **Processor** | Intel Core i5 / AMD Ryzen 5 (4 Cores) | Intel Core i7 / AMD Ryzen 7 (8+ Cores) |
| **Memory (RAM)** | 8 GB DDR4 | 16 GB or 32 GB DDR4/DDR5 |
| **Storage** | 10 GB free SSD storage | 50 GB free NVMe SSD storage |
| **GPU (Optional)** | Not mandatory for CPU inference | NVIDIA RTX 3060 / T4 GPU (CUDA 12.x) |
| **Display** | 1366 × 768 Resolution | 1920 × 1080 Full HD IPS Display |

##### Table 2.2: Software Stack and Dependency Versions
| Component | Technology / Library | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Programming Language** | Java (JDK) | 21 LTS | Main Backend Business Logic |
| **Backend Framework** | Spring Boot | 3.2.3 | Enterprise REST API Engine |
| **Security & Auth** | Spring Security + JJWT | 0.12.5 | JWT Authentication & RBAC |
| **Database Migration** | Flyway Core | 10.x | Relational Schema Versioning |
| **Database Engine** | PostgreSQL / H2 | 16.x / 2.2 | Persistent Relational Storage |
| **AI Language** | Python | 3.11 | Deep Learning Microservice |
| **AI Framework** | FastAPI + Uvicorn | 0.109 / 0.27 | High-performance Asynchronous API |
| **Neural Framework** | TensorFlow / Keras | 2.15.0 | CNN Architecture & Inference |
| **Computer Vision** | OpenCV Headless + Pillow | 4.9.0 / 10.2 | Image Preprocessing & Letterboxing |
| **Evaluation Metrics** | scikit-learn | 1.4.0 | Precision, Recall, F1, Confusion Matrix |
| **Hyperparameter Tuning**| Optuna | 3.5.0 | Bayesian Optimization Studies |
| **Frontend Framework** | React + Vite | 18.2 / 5.1 | Client Single Page Application |
| **Language & Styling** | TypeScript + Tailwind CSS | 5.2 / 3.4 | Type Safety & Design System |

---
---

# CHAPTER 3: SYSTEM DESIGN

System design translates the functional requirements into a modular, decoupled, and maintainable software architecture.

---

### 3.1 High Level Design
HeritageAI adopts a decoupled three-tier microservice architecture comprising a presentation layer, a business persistence layer, and a dedicated AI computation service.

```
+-------------------------------------------------------------------------+
|                              PRESENTATION TIER                          |
|         React 18 Single Page Application (TypeScript + Tailwind CSS)     |
+------------------------------------+------------------------------------+
                                     | HTTP / JSON REST APIs
                                     v
+------------------------------------+------------------------------------+
|                          APPLICATION BACKEND TIER                       |
|           Java 21 Spring Boot 3 Engine (Security + JPA + Flyway)        |
+-------------------+--------------------------------+--------------------+
                    | JDBC (Port 5432)               | Internal HTTP (Port 8000)
                    v                                v
+-------------------+---------------+   +------------+--------------------+
|            DATA TIER              |   |       AI COMPUTATION TIER       |
|       PostgreSQL Relational       |   |      Python FastAPI Service     |
|   (Catalog, Users, Predictions)   |   |   (TensorFlow CNN + Grad-CAM)   |
+-----------------------------------+   +---------------------------------+
```
*Figure 3.1: High-Level Microservice System Architecture*

- **Presentation Tier**: Renders the cultural user interface, manages client routing, previews uploaded images, graphs probability metrics, and renders Grad-CAM heatmaps.
- **Application Backend Tier**: Validates user identity via JWT tokens, handles file system storage abstractions, persists catalog records, and mediates requests to the AI engine.
- **AI Computation Tier**: Executes image preprocessing, performs forward CNN inferences, and calculates gradient activations for explainability.
- **Data Tier**: Manages relational records, relational constraints, foreign keys, and audit histories.

---

### 3.2 Detailed Design

#### 3.2.1 Data Flow Architecture
The sequence of operations during image upload, neural classification, and persistent cataloging is depicted in Figure 3.2.

```
[User Browser]           [Spring Boot API]         [Python AI Service]       [PostgreSQL DB]
      |                          |                          |                       |
      |-- 1. Upload Image ------>|                          |                       |
      |   (Multipart Form)       |-- 2. Validate & Store -->|                       |
      |                          |      File on Disk        |                       |
      |                          |                          |                       |
      |                          |-- 3. POST /predict ----->|                       |
      |                          |      (Image Stream)      |-- 4. Letterbox Resize |
      |                          |                          |   5. Scale [0, 1]     |
      |                          |                          |   6. CNN Inference    |
      |                          |                          |   7. Grad-CAM Gen     |
      |                          |<-- 8. Probs & Heatmap ---|                       |
      |                          |                          |                       |
      |                          |-- 9. Persist Prediction ------------------------>|
      |                          |      Record & Image ID                           |
      |<-- 10. Display Results --|                                                  |
      |    (Scores & Grad-CAM)   |                                                  |
      |                          |                                                  |
      |-- 11. Save to Archive -->|-- 12. Create Artifact -------------------------->|
```
*Figure 3.2: End-to-End Image Classification and Archival Data Flow*

#### 3.2.2 Relational Database Schema Design
The relational schema comprises eleven normalized tables managed via Flyway versioned migrations (`V1__init.sql`). Figure 3.3 illustrates the entity relationships.

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
*Figure 3.3: Entity Relationship Diagram of PostgreSQL Relational Schema*

* **`cultural_artifacts`**: Central preservation catalog storing `id`, `title`, `cultural_category`, `verified_category`, `region`, `artifact_type`, `review_status`, and descriptive metadata.
* **`artifact_images`**: Stores storage keys, MIME types, file sizes, and dimensions.
* **`predictions`**: Preserves model inference events, top-ranked class labels, Softmax confidence scores, model version tags, and Grad-CAM base64 data.
* **`prediction_probabilities`**: Retains per-class confidence distributions across all three supported categories.
* **`artifact_reviews`**: Preserves expert curatorial audits without overwriting baseline AI predictions.

---
---

# CHAPTER 4: SYSTEM IMPLEMENTATION

Implementation encompasses the realization of the theoretical CNN pipeline, backend microservices, and interactive web interfaces.

---

### 4.1 Module Description

#### 4.1.1 Image Preprocessing Module (`ai-service/app/preprocessing.py`)
To prevent spatial distortion, images undergo letterbox zero-padding rather than non-linear scaling:
$$\text{scale} = \min\left(\frac{224}{w}, \frac{224}{h}\right)$$
$$\text{canvas}[y_{\text{offset}}:y_{\text{offset}}+\text{scaled}_h, x_{\text{offset}}:x_{\text{offset}}+\text{scaled}_w] = \text{resized\_image}$$
Pixel values are cast to 32-bit floating-point numbers normalized to $[0.0, 1.0]$. Training samples are dynamically augmented with random rotations up to $\pm 15^\circ$, affine shearing, and Gaussian blurring. Production inference executes strictly deterministic preprocessing.

#### 4.1.2 HeritageCNN Neural Architecture Module (`ai-service/app/model.py`)
The neural network architecture follows a custom stacked configuration designed for optimal feature extraction from handcrafted cultural lines and geometric motifs.

##### Table 4.1: Custom HeritageCNN Architectural Specification
| Layer | Type | Configuration / Kernel | Output Shape | Activation |
| :--- | :--- | :--- | :--- | :--- |
| **Input** | InputLayer | RGB Channels | $(224, 224, 3)$ | — |
| **Conv Block 1** | Conv2D $\times$ 2 + MaxPool | $32\text{ filters}, (3 \times 3)$, stride 1 | $(112, 112, 32)$ | ReLU |
| **Conv Block 2** | Conv2D $\times$ 2 + MaxPool | $64\text{ filters}, (3 \times 3)$, stride 1 | $(56, 56, 64)$ | ReLU |
| **Conv Block 3** | Conv2D $\times$ 2 + MaxPool | $128\text{ filters}, (3 \times 3)$, stride 1 | $(28, 28, 128)$ | ReLU (`target_conv_layer`) |
| **Dense Block** | Flatten + Dense | 256 Units | $(256)$ | ReLU |
| **Regularization**| Dropout | Rate = 0.45 | $(256)$ | — |
| **Output** | Dense | 3 Units (Warli, Madhubani, Textile) | $(3)$ | Softmax |

```
Input (224x224x3) 
  --> [Conv2D(32) x2 + MaxPool] 
  --> [Conv2D(64) x2 + MaxPool] 
  --> [Conv2D(128) x2 (target_conv_layer) + MaxPool] 
  --> Flatten --> Dense(256) --> Dropout(0.45) --> Softmax(3)
```
*Figure 4.1: HeritageCNN Convolutional Feature Extraction Pipeline*

#### 4.1.3 Explainable AI Module (`ai-service/app/gradcam.py`)
Grad-CAM calculates the gradient of the winning class score $y^c$ with respect to feature activation maps $A^k$ of the final convolutional layer:
$$\alpha_k^c = \frac{1}{Z} \sum_{i} \sum_{j} \frac{\partial y^c}{\partial A_{i,j}^k}$$
$$L_{\text{Grad-CAM}}^c = \text{ReLU}\left(\sum_{k} \alpha_k^c A^k\right)$$
The resulting heatmap is upsampled to 224 × 224, colorized via OpenCV's Jet colormap, and blended onto the input image at a 40% transparency weight.

#### 4.1.4 Main Backend & Security Engine (`backend/src/...`)
- **`SecurityConfig.java`**: Implements Spring Security filter chains, disabling CSRF for stateless REST, enforcing BCrypt password hashing, and requiring JWT bearer authentication on protected endpoints.
- **`PredictionService.java`**: Orchestrates multipart uploads, invokes the AI microservice via `RestTemplate`, unpacks probabilities, and persists prediction records in PostgreSQL.
- **`ArtifactService.java`**: Executes paginated and filtered queries on catalog artifacts and generates CSV export records.

---

### 4.2 Tools, Language and RDBMS used
- **Backend Language**: Java 21 LTS with modern record classes and pattern matching.
- **Backend Framework**: Spring Boot 3.2.3, Spring Data JPA, Spring Security.
- **AI Microservice**: Python 3.11, FastAPI, TensorFlow/Keras 2.15, OpenCV, NumPy.
- **Relational Database**: PostgreSQL 16 managed via Flyway migration scripts.
- **Frontend Stack**: React 18, Vite, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- **Interactive Notebook**: Jupyter Notebook (`heritage_ai_research_pipeline.ipynb`) configured for local execution and Google Colab cloud execution.

---

### 4.3 Screen Shots

```
+-----------------------------------------------------------------------------------+
|  HeritageAI — AI Pattern Analyzer                                  [Dr. Ananya]   |
+-----------------------------------------------------------------------------------+
|  [ Drag & Drop Image Here ]             |  Identified: Madhubani Paintings       |
|  +------------------------------------+ |  Confidence: 97.4%                      |
|  |                                    | |  Latency:    0.218s                     |
|  |     [ Madhubani Fish Motif ]       | |  Model:      HeritageCNN-v1.0.0         |
|  |                                    | |-----------------------------------------|
|  +------------------------------------+ |  Probability Distribution:              |
|  [x] Generate Grad-CAM Heatmap        | |  Madhubani [=====================] 97.4%|
|  [ Execute Pattern Identification ]   | |  Warli     [=]                      1.8%|
|                                         |  Textile   [=]                      0.8%|
|  Grad-CAM Spatial Attention Heatmap:    |-----------------------------------------|
|  +------------------------------------+ |  [ Save to Preservation Archive ]       |
|  |     [ Jet Heatmap Overlay ]        | |  [ Report Classification Feedback ]    |
|  +------------------------------------+ |                                         |
+-----------------------------------------------------------------------------------+
```
*Figure 4.2: User Interface — AI Pattern Analyzer with Grad-CAM Visualization*

```
+-----------------------------------------------------------------------------------+
|  Heritage Digital Archive                                         [ Export CSV ]  |
+-----------------------------------------------------------------------------------+
|  [Search title, motifs...]  [Category: All v]  [Region: Bihar v]   [View: Grid/List]
+-----------------------------------------------------------------------------------+
|  +----------------------+ +----------------------+ +----------------------+       |
|  | [Warli Wall Mural]   | | [Madhubani Fish Art] | | [Paisley Silk Sari]  |       |
|  | Maharashtra, India   | | Mithila, Bihar       | | Varanasi, UP         |       |
|  | Status: VERIFIED     | | Status: VERIFIED     | | Status: UNREVIEWED   |       |
|  | [ View Details ]     | | [ View Details ]     | | [ View Details ]     |       |
|  +----------------------+ +----------------------+ +----------------------+       |
+-----------------------------------------------------------------------------------+
```
*Figure 4.3: User Interface — Digital Heritage Preservation Archive Catalog*

```
+-----------------------------------------------------------------------------------+
|  Research Dashboard & System Metrics                                              |
+-----------------------------------------------------------------------------------+
|  [Stored Artifacts: 154]  [Predictions: 312]  [Verified: 128]  [Low-Conf Alerts: 4]
+-----------------------------------------------------------------------------------+
|  Pattern Category Distribution (Bar Chart)   |  Verification Ratio (Pie Chart)   |
|  Warli     |============ (42%)              |  Verified:   83.1%                 |
|  Madhubani |=============== (48%)           |  Unverified: 16.9%                 |
|  Textiles  |=== (10%)                       |                                    |
+-----------------------------------------------------------------------------------+
```
*Figure 4.4: User Interface — Research Metrics and Evaluation Dashboard*

---
---

# CHAPTER 5: TESTING

Testing validates that all software components function reliably, satisfy security contracts, handle edge cases, and execute neural inference correctly.

##### Table 5.1: Test Cases and Execution Results for Core System Modules
| Test Case ID | Module Tested | Input / Scenario | Expected Outcome | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Preprocessing | Non-square photograph ($800 \times 400$) | Letterbox padding to $224 \times 224 \times 3$, range $[0, 1]$ | Tensor shape $(1, 224, 224, 3)$, min 0.0, max 1.0 | **PASS** |
| **TC-02** | File Ingestion | Unsupported file extension (`.bmp`, `.tiff`) | HTTP 400 Bad Request with descriptive validation message | Rejected with validation message | **PASS** |
| **TC-03** | Neural Inference | Valid preprocessed image tensor | Returns predicted class, 3 probabilities summing to 1.0 | Sum of probabilities = 1.000, latency $< 0.3$s | **PASS** |
| **TC-04** | Confidence Alert | Ambiguous input yielding top probability $< 0.60$ | `low_confidence_warning` flag set to `true` | UI displays review alert banner | **PASS** |
| **TC-05** | Grad-CAM | Preprocessed image with `includeGradcam=true` | Returns Base64-encoded PNG heatmap string | Valid PNG image string generated | **PASS** |
| **TC-06** | Authentication | Valid administrator credentials (`admin`) | HTTP 200 with signed JWT token and user profile | JWT token emitted, role `ROLE_ADMIN` | **PASS** |
| **TC-07** | Catalog Filtering | Query artifacts by category (`warli`) | Returns paginated JSON containing only Warli records | Correct filtered subset returned | **PASS** |
| **TC-08** | Review Workflow | Submit expert correction on artifact category | Verified category updated without altering original prediction | Original AI label preserved, status VERIFIED | **PASS** |

```
                Confusion Matrix (Test Evaluation Split)
                ----------------------------------------
                         Predicted Warli   Pred Madhubani   Pred Textile
        True Warli             15                0               0
        True Madhubani          0               14               1
        True Textile            1                0              14
```
*Figure 5.1: Confusion Matrix Heatmap for Cultural Pattern Classification*

The automated test suite combines unit tests via Pytest (`ai-service/tests/test_ai_service.py`), integration tests via JUnit 5 and MockMvc (`backend/src/test/java/...`), and end-to-end API validations.

---
---

# CHAPTER 6: CONCLUSION AND FUTURE ENHANCEMENTS

### 6.1 Conclusion
The **HeritageAI** platform successfully implements and operationalizes the research paper and patent application for automatic identification, classification, and digital preservation of Indian cultural patterns. By coupling an aspect-ratio preserving computer vision preprocessing pipeline with a tailored stacked Conv2D architecture, the system achieves research-grade classification across Warli, Madhubani, and Indian Textile motifs. 

The integration of Grad-CAM explainability bridges the gap between deep learning and art historical curation by visually highlighting the spatial motif regions responsible for classification. Furthermore, the multi-tier architecture—combining a React/TypeScript interface, an enterprise Spring Boot REST API, a FastAPI AI microservice, and a PostgreSQL relational repository—ensures robust data provenance, prevents algorithmic overwriting of historical records, and provides cultural institutions with a turnkey preservation platform.

---

### 6.2 Future Enhancements
1. **Multi-Label Object Detection & Semantic Segmentation**: Extend the architecture using YOLOv8 or Mask R-CNN to localize and segment individual motifs (e.g., distinguishing multiple Tarpa dancers and musical instruments) within large-scale composite murals.
2. **Expansion of Cultural Pattern Taxonomy**: Broaden the classification taxonomy from three categories to encompass over twenty indigenous South Asian art and textile traditions, including Kalamkari, Pattachitra, Phad, Gond, and Tanjore paintings.
3. **Edge Quantization for Offline Field Archiving**: Convert and quantize trained Keras models into TensorFlow Lite (TFLite) and ONNX formats to enable offline mobile inference on edge devices used by archivists in rural field sites lacking continuous internet connectivity.

---
---

# REFERENCES

1. Ariponnammal, S. and Natarajan, S. (1994) ‘Transport Phenomena of Sm Sel – X Asx’, *Pramana – Journal of Physics*, Vol. 42, No. 1, pp. 421-425.
2. Barnard, R.W. and Kellogg, C. (1980) ‘Applications of Convolution Operators to Problems in Univalent Function Theory’, *Michigan Mathematical Journal*, Vol. 27, pp. 81-94.
3. He, K., Zhang, X., Ren, S. and Sun, J. (2016) ‘Deep Residual Learning for Image Recognition’, *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, pp. 770-778.
4. Krizhevsky, A., Sutskever, I. and Hinton, G.E. (2012) ‘ImageNet Classification with Deep Convolutional Neural Networks’, *Advances in Neural Information Processing Systems (NeurIPS)*, Vol. 25, pp. 1097-1105.
5. Selvaraju, R.R., Cogswell, M., Das, A., Vedaldi, A., Parikh, D. and Batra, D. (2017) ‘Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization’, *IEEE International Conference on Computer Vision (ICCV)*, pp. 618-626.
6. Shin, K.G. and Mckay, N.D. (1984) ‘Open Loop Minimum Time Control of Mechanical Manipulations and its Applications’, *Proceedings of American Control Conference*, San Diego, CA, pp. 1231-1236.
