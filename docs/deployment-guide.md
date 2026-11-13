# Local Setup & Deployment Guide

## Prerequisites
- **Python**: 3.11+
- **Java**: JDK 21
- **Node.js**: v18+ & npm
- **Maven**: 3.8+
- **PostgreSQL**: 14+ (or Docker Compose)

---

## Deployment Option A: Local Development Mode (Without Docker)

### 1. Database Setup (PostgreSQL)
Ensure PostgreSQL is running locally and create the database and user:

```sql
CREATE DATABASE heritageai_db;
CREATE USER heritage_user WITH PASSWORD 'heritage_secure_pass_123!';
GRANT ALL PRIVILEGES ON DATABASE heritageai_db TO heritage_user;
```

### 2. Python AI Microservice Setup
Open PowerShell / Terminal:

```powershell
cd ai-service

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Generate sample dataset & train model
python -m training.dataset_generator
python -m training.train
python -m evaluation.evaluate

# Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Spring Boot Backend Setup
Open a second PowerShell / Terminal:

```powershell
cd backend

# Build & run backend
mvn spring-boot:run
```

### 4. React Frontend Setup
Open a third PowerShell / Terminal:

```powershell
cd frontend

# Install dependencies & start Vite dev server
npm install
npm run dev
```

Access the frontend at `http://localhost:3000`.

---

## Deployment Option B: Docker Compose

To orchestrate PostgreSQL, Python AI service, Spring Boot backend, and React frontend with Nginx:

```bash
docker-compose up --build
```
