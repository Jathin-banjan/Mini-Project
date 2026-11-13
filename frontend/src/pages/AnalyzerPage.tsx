import React, { useState } from 'react';
import { predictionApi, artifactApi, PredictionResponse } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Upload, Sparkles, AlertTriangle, Eye, CheckCircle2, BookmarkPlus, RefreshCw, Layers } from 'lucide-react';

export const AnalyzerPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [includeGradcam, setIncludeGradcam] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Save Modal Form State
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [artifactType, setArtifactType] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
      setSavedSuccess(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
      setSavedSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    try {
      const result = await predictionApi.classifyImage(selectedFile, includeGradcam);
      setPrediction(result);
      setTitle(`${result.predictedDisplayName} Artifact`);
    } catch (err: any) {
      console.error("Classification error", err);
      setError(err.response?.data?.detail || err.response?.data?.message || "Failed to classify pattern. Ensure Python AI microservice is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToArchive = async () => {
    if (!prediction) return;
    try {
      await artifactApi.createArtifact({
        title: title || `${prediction.predictedDisplayName} Pattern`,
        culturalCategory: prediction.predictedClass,
        region: region,
        artifactType: artifactType,
        description: description,
        imageId: prediction.imageId,
      });
      setSavedSuccess(true);
      setShowSaveModal(false);
    } catch (err: any) {
      alert("Failed to save artifact to archive: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-heritage-gold/30 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-indigo text-heritage-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> CNN Inference Engine
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-indigo">
          AI Cultural Pattern Analyzer
        </h1>
        <p className="text-heritage-slate/80 text-sm sm:text-base mt-1">
          Upload an image to perform neural network inference, probability estimation, and Grad-CAM explainability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Image Upload & Controls */}
        <div className="space-y-6">
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-heritage-gold/40 hover:border-heritage-terracotta bg-heritage-card rounded-2xl p-8 text-center transition-colors cursor-pointer relative group flex flex-col items-center justify-center min-h-[320px]"
          >
            {previewUrl ? (
              <div className="relative w-full h-72 rounded-xl overflow-hidden bg-heritage-ivory border border-heritage-gold/20 flex items-center justify-center">
                <img src={previewUrl} alt="Upload Preview" className="max-h-full max-w-full object-contain" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    setPrediction(null);
                  }}
                  className="absolute top-3 right-3 bg-heritage-indigo/80 hover:bg-heritage-terracotta text-heritage-ivory p-2 rounded-lg text-xs transition-colors shadow-md"
                >
                  <RefreshCw className="w-4 h-4" /> Replace Image
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-heritage-terracotta/10 text-heritage-terracotta flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif font-bold text-heritage-indigo text-lg">Drag & Drop Cultural Image Here</p>
                  <p className="text-xs text-heritage-slate/60 mt-1">Supports JPG, JPEG, PNG, WebP up to 10MB</p>
                </div>
                <span className="inline-block px-4 py-2 rounded-xl bg-heritage-indigo text-heritage-ivory text-xs font-semibold shadow-sm">
                  Browse Files
                </span>
                <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Controls */}
          <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-heritage-indigo font-medium">
                <input
                  type="checkbox"
                  checked={includeGradcam}
                  onChange={(e) => setIncludeGradcam(e.target.checked)}
                  className="rounded border-heritage-gold text-heritage-terracotta focus:ring-heritage-gold"
                />
                Generate Grad-CAM Attention Heatmap
              </label>
              <span className="text-xs text-heritage-slate/60">Target: conv2d_block3_2</span>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="w-full py-4 rounded-xl bg-heritage-terracotta hover:bg-heritage-gold disabled:bg-heritage-slate/30 text-heritage-ivory font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              {loading ? (
                <span>Running CNN Preprocessing & Inference...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Execute Pattern Identification
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Classification Error</p>
                <p className="text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Prediction Results & Grad-CAM */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-heritage-card rounded-2xl p-12 border border-heritage-gold/20 shadow-md flex items-center justify-center min-h-[400px]">
              <LoadingSpinner message="Resizing to 224x224x3, normalizing, and performing Softmax inference..." />
            </div>
          ) : prediction ? (
            <div className="bg-heritage-card rounded-2xl p-6 border border-heritage-gold/30 shadow-md space-y-6">
              
              {/* Header Result */}
              <div className="flex items-start justify-between border-b border-heritage-gold/20 pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-heritage-gold tracking-wider">Identified Category</span>
                  <h2 className="font-serif text-2xl font-bold text-heritage-indigo">{prediction.predictedDisplayName}</h2>
                  <p className="text-xs text-heritage-slate/60 mt-0.5">Model Version: {prediction.modelVersion} • Latency: {prediction.inferenceLatencySec}s</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-heritage-terracotta">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </div>
                  <span className="text-xs text-heritage-slate/60">Confidence</span>
                </div>
              </div>

              {/* Low Confidence Warning */}
              {prediction.lowConfidenceWarning && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Model confidence is below 60%. Human expert review is recommended before cataloging.</span>
                </div>
              )}

              {/* Probability Distribution */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-heritage-indigo text-sm">Class Probability Distribution</h4>
                {prediction.probabilities.map((prob) => (
                  <div key={prob.classKey} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-heritage-slate">
                      <span>{prob.displayName}</span>
                      <span>{(prob.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-heritage-ivory rounded-full overflow-hidden border border-heritage-gold/20">
                      <div
                        className={`h-full transition-all duration-500 ${
                          prob.classKey === prediction.predictedClass ? 'bg-heritage-terracotta' : 'bg-heritage-gold/60'
                        }`}
                        style={{ width: `${prob.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grad-CAM Heatmap Image */}
              {prediction.gradcamImageUrl && (
                <div className="space-y-2 border-t border-heritage-gold/20 pt-4">
                  <h4 className="font-serif font-bold text-heritage-indigo text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4 text-heritage-terracotta" /> Grad-CAM Spatial Heatmap Attention
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-heritage-gold/30 bg-black flex items-center justify-center max-h-56">
                    <img src={prediction.gradcamImageUrl} alt="Grad-CAM Heatmap" className="max-h-56 object-contain" />
                  </div>
                  <p className="text-[11px] text-heritage-slate/60 italic">
                    Warm red regions highlight convolutional feature map activations influencing the neural network prediction.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowSaveModal(true)}
                  disabled={savedSuccess}
                  className="px-5 py-2.5 rounded-xl bg-heritage-indigo hover:bg-heritage-gold disabled:bg-emerald-700 text-heritage-ivory text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
                >
                  {savedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Saved to Archive
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4" /> Save to Preservation Archive
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-heritage-card rounded-2xl p-12 border border-heritage-gold/20 shadow-md text-center text-heritage-slate/60 flex flex-col items-center justify-center min-h-[400px] space-y-3">
              <Layers className="w-12 h-12 text-heritage-gold/40" />
              <p className="font-serif font-bold text-heritage-indigo text-lg">Inference Results Panel</p>
              <p className="text-xs max-w-xs">Upload an image and click 'Execute Pattern Identification' to view Softmax probability distributions and Grad-CAM heatmaps.</p>
            </div>
          )}
        </div>

      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-heritage-card max-w-lg w-full rounded-2xl p-6 border border-heritage-gold/40 shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-heritage-indigo">Save Artifact to Digital Preservation Archive</h3>
            
            <div className="space-y-3 text-sm text-heritage-slate">
              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory text-heritage-slate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Region / Provenance</label>
                <input
                  type="text"
                  placeholder="e.g. Maharashtra, Mithila Bihar, Gujarat"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory text-heritage-slate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Artifact Type</label>
                <input
                  type="text"
                  placeholder="e.g. Wall Mural, Handloom Sari, Paper Painting"
                  value={artifactType}
                  onChange={(e) => setArtifactType(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory text-heritage-slate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe cultural motifs, symbols, or source information..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory text-heritage-slate"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 rounded-lg bg-heritage-slate/10 text-heritage-slate text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveToArchive}
                className="px-5 py-2 rounded-lg bg-heritage-terracotta text-heritage-ivory text-xs font-semibold shadow-sm hover:bg-heritage-gold transition-colors"
              >
                Confirm & Save Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
