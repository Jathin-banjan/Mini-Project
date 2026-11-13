import os
import time
import json
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import Config
from app.preprocessing import validate_image_file, preprocess_image
from app.model import load_heritage_model
from app.gradcam import generate_gradcam
from evaluation.evaluate import evaluate_model

app = FastAPI(
    title="HeritageAI Pattern Intelligence Service",
    description="Python AI microservice for CNN-based cultural pattern classification and analysis.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance
model_instance = None

@app.on_event("startup")
def startup_event():
    global model_instance
    if os.path.exists(Config.MODEL_PATH):
        print(f"[FastAPI] Loading CNN model from {Config.MODEL_PATH}")
        model_instance = load_heritage_model(Config.MODEL_PATH)
    else:
        print("[FastAPI Warning] No trained model found. Service in setup/uninitialized state.")

# Pydantic Schemas
class ProbabilityItem(BaseModel):
    class_key: str
    display_name: str
    confidence: float

class PredictionResponse(BaseModel):
    predicted_class: str
    predicted_display_name: str
    confidence: float
    probabilities: List[ProbabilityItem]
    low_confidence_warning: bool
    inference_latency_sec: float
    model_version: str
    gradcam_image_base64: Optional[str] = None
    processed_dimensions: str = "224x224x3"

class ModelInfoResponse(BaseModel):
    model_version: str
    model_loaded: bool
    input_shape: List[int]
    class_names: List[str]
    class_display_names: Dict[str, str]
    paper_baselines: Dict[str, Any]
    metadata: Optional[Dict[str, Any]] = None

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "heritageai-ai-service", "timestamp": time.time()}

@app.get("/ready")
def readiness_check():
    global model_instance
    if model_instance is None and os.path.exists(Config.MODEL_PATH):
        model_instance = load_heritage_model(Config.MODEL_PATH)
        
    is_ready = model_instance is not None
    return {
        "ready": is_ready,
        "model_loaded": is_ready,
        "model_version": Config.MODEL_VERSION if is_ready else "UNTRAINED",
        "message": "Model is loaded and ready for inference." if is_ready else "CNN model is not trained yet. Run training pipeline first."
    }

@app.get("/model/info", response_model=ModelInfoResponse)
def get_model_info():
    global model_instance
    is_loaded = model_instance is not None
    metadata = None
    if os.path.exists(Config.MODEL_METADATA_PATH):
        try:
            with open(Config.MODEL_METADATA_PATH, "r") as f:
                metadata = json.load(f)
        except Exception:
            pass
            
    return ModelInfoResponse(
        model_version=Config.MODEL_VERSION if is_loaded else "UNTRAINED",
        model_loaded=is_loaded,
        input_shape=list(Config.INPUT_SHAPE),
        class_names=Config.CLASS_NAMES,
        class_display_names=Config.CLASS_DISPLAY_NAMES,
        paper_baselines=Config.PAPER_RESULTS,
        metadata=metadata
    )

@app.post("/predict", response_model=PredictionResponse)
async def predict_pattern(
    file: UploadFile = File(...),
    include_gradcam: bool = Query(False, description="Generate Grad-CAM heatmap visualization")
):
    global model_instance
    if model_instance is None:
        if os.path.exists(Config.MODEL_PATH):
            model_instance = load_heritage_model(Config.MODEL_PATH)
        else:
            raise HTTPException(
                status_code=503,
                detail="CNN model is not trained/loaded. Please run model training setup before inference."
            )
            
    file_bytes = await file.read()
    
    try:
        validate_image_file(file_bytes, file.filename)
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))
        
    # Preprocess image
    t0 = time.time()
    input_tensor = preprocess_image(file_bytes)
    
    # Run Inference
    raw_preds = model_instance.predict(input_tensor, verbose=0)[0]
    t1 = time.time()
    latency = round(t1 - t0, 4)
    
    probs = [float(p) for p in raw_preds]
    top_idx = int(np.argmax(probs))
    top_class = Config.CLASS_NAMES[top_idx]
    top_display = Config.CLASS_DISPLAY_NAMES[top_class]
    top_confidence = round(probs[top_idx], 4)
    
    prob_list = [
        ProbabilityItem(
            class_key=cls,
            display_name=Config.CLASS_DISPLAY_NAMES[cls],
            confidence=round(probs[idx], 4)
        )
        for idx, cls in enumerate(Config.CLASS_NAMES)
    ]
    
    low_conf = top_confidence < Config.LOW_CONFIDENCE_THRESHOLD
    
    gradcam_b64 = None
    if include_gradcam:
        gradcam_b64 = generate_gradcam(model_instance, input_tensor, class_index=top_idx)
        
    return PredictionResponse(
        predicted_class=top_class,
        predicted_display_name=top_display,
        confidence=top_confidence,
        probabilities=prob_list,
        low_confidence_warning=low_conf,
        inference_latency_sec=latency,
        model_version=Config.MODEL_VERSION,
        gradcam_image_base64=gradcam_b64,
        processed_dimensions="224x224x3"
    )

@app.post("/evaluate")
def run_evaluation():
    report = evaluate_model()
    if report is None:
        raise HTTPException(status_code=400, detail="Evaluation failed. Ensure model and test dataset are available.")
    return report

@app.get("/evaluation/latest")
def get_latest_evaluation():
    report_path = os.path.join(Config.ARTIFACTS_DIR, "evaluation_report.json")
    if not os.path.exists(report_path):
        return {
            "status": "pending",
            "message": "Evaluation pending. Run evaluation to compute metrics.",
            "paper_baselines": Config.PAPER_RESULTS
        }
    with open(report_path, "r") as f:
        return json.load(f)
