# HeritageAI: Artificial Intelligence System for Automatic Identification and Classification of Cultural Patterns

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.3-green.svg)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-emerald.svg)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-ff69b4.svg)](https://www.tensorflow.org/)
[![React](https://img.shields.io/badge/React-18.2-blueviolet.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

**HeritageAI** is a research-grade, full-stack, AI-powered Cultural Heritage Intelligence and Digital Preservation Platform based on the research paper and patent application for CNN-based cultural pattern recognition across three Indian pattern traditions:
1. **Warli Art Motifs**
2. **Madhubani Paintings**
3. **Indian Textile Patterns**

---

## Key Features

- **CNN Computer Vision Pipeline**: Custom stacked Conv2D architecture with 224x224x3 RGB preprocessing, aspect-ratio preserving zero-padding, pixel scaling [0.0, 1.0], Adam optimizer (lr=0.0001), Dropout (0.45), Softmax activation, and early stopping.
- **Grad-CAM Explainable AI**: Generates spatial attention heatmaps from target convolutional layers (`conv2d_block3_2`).
- **Spring Boot Backend**: Java 21 enterprise backend with Flyway schema migrations, PostgreSQL database persistence, Spring Security with JWT authentication, and file storage.
- **Digital Preservation Archive**: Searchable catalog with category/region filtering, metadata editing, expert human review workflows, and CSV export.
- **Research Dashboard**: System metrics telemetry, category distribution graphs (Recharts), low-confidence alerts, and active model operational status.
- **Premium Heritage UI**: React Single Page Application crafted with Tailwind CSS using a heritage palette (Deep Indigo `#171C3A`, Heritage Ivory `#F7F1E5`, Terracotta `#B85C38`, Muted Gold `#C7A45A`).

---

## Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Recharts, React Router, Axios.
- **Main Backend**: Java 21, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA, Maven, PostgreSQL, Flyway, OpenAPI/Swagger.
- **AI Microservice**: Python 3.11, FastAPI, TensorFlow/Keras, OpenCV, NumPy, Pillow, scikit-learn, Optuna, pytest.
- **Orchestration**: Docker & Docker Compose.

---

## Quick Start (Local Setup Without Docker)

### Step 1: Database Setup
Create PostgreSQL database:
```sql
CREATE DATABASE heritageai_db;
CREATE USER heritage_user WITH PASSWORD 'heritage_secure_pass_123!';
GRANT ALL PRIVILEGES ON DATABASE heritageai_db TO heritage_user;
```

### Step 2: Start Python AI Microservice (Port 8000)
```powershell
cd ai-service
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Generate demonstration dataset and train initial model
python -m training.dataset_generator
python -m training.train
python -m evaluation.evaluate

# Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Step 3: Start Spring Boot Backend (Port 8080)
Open a new terminal:
```powershell
cd backend
mvn spring-boot:run
```

### Step 4: Start React Frontend (Port 3000)
Open a new terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:3000`.

Default Login Credentials:
- **Username**: `admin`
- **Password**: `AdminPass123!`

---

## Running with Docker Compose

```bash
docker-compose up --build
```

---

## Documentation Index

- [`docs/system-architecture.md`](docs/system-architecture.md): Service architecture & components.
- [`docs/research-methodology.md`](docs/research-methodology.md): CNN specs, preprocessing, & baseline comparisons.
- [`docs/database-design.md`](docs/database-design.md): PostgreSQL schema & ER diagram.
- [`docs/api-documentation.md`](docs/api-documentation.md): Spring Boot & FastAPI REST contracts.
- [`docs/model-training-guide.md`](docs/model-training-guide.md): Dataset layout, training, & evaluation.
- [`docs/dataset-and-licensing.md`](docs/dataset-and-licensing.md): Sourcing policy & Creative Commons licensing.
- [`docs/testing-report.md`](docs/testing-report.md): Automated pytest & JUnit 5 test suites.
- [`docs/deployment-guide.md`](docs/deployment-guide.md): Docker Compose & PowerShell setup commands.
- [`docs/limitations-and-future-work.md`](docs/limitations-and-future-work.md): Scope boundaries & future extensions.
