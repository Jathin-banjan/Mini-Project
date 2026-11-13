import React from 'react';
import { BookOpen, Award, Cpu, CheckCircle2, FileText, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-heritage-gold/30 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-indigo text-heritage-gold text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Research Paper & Patent Foundation
        </div>
        <h1 className="font-serif text-4xl font-bold text-heritage-indigo">
          About the Research Methodology & System Architecture
        </h1>
        <p className="text-heritage-slate/80 text-lg leading-relaxed">
          Detailed documentation of the theoretical CNN architecture, preprocessing parameters, baseline comparisons, and digital preservation capabilities.
        </p>
      </div>

      {/* Reported Paper Results Section */}
      <div className="bg-heritage-indigo text-heritage-ivory rounded-2xl p-8 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-heritage-gold/30 pb-4">
          <h2 className="font-serif text-2xl font-bold text-heritage-gold flex items-center gap-2">
            <Award className="w-6 h-6" /> Results Reported in Original Research Paper
          </h2>
          <span className="text-xs bg-heritage-gold/20 text-heritage-gold px-3 py-1 rounded-full uppercase tracking-wider font-semibold border border-heritage-gold/40">
            Paper Historical Benchmark
          </span>
        </div>

        <p className="text-sm text-heritage-ivory/80 leading-relaxed">
          The research paper presents experimental benchmarks on a proprietary 6,000-image dataset (4,000 train / 2,000 test) across Warli, Madhubani, and Indian Textile categories. Below are the published reference metrics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="bg-white/10 rounded-xl p-5 border border-heritage-gold/40 space-y-2">
            <div className="text-xs font-semibold uppercase text-heritage-gold">Proposed HeritageCNN</div>
            <div className="text-3xl font-bold text-heritage-ivory">96.2%</div>
            <div className="text-xs text-heritage-ivory/70">Mean Accuracy | Macro F1: 0.952</div>
            <div className="text-xs text-heritage-ivory/60 pt-1 border-t border-white/10">Inference Latency: 0.22 sec/img</div>
          </div>

          <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-2">
            <div className="text-xs font-semibold uppercase text-heritage-ivory/70">AlexNet Baseline</div>
            <div className="text-3xl font-bold text-heritage-ivory/80">79.5%</div>
            <div className="text-xs text-heritage-ivory/60">Macro Precision: 0.781 | Recall: 0.764</div>
            <div className="text-xs text-heritage-ivory/60 pt-1 border-t border-white/10">Inference Latency: 0.12 sec/img</div>
          </div>

          <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-2">
            <div className="text-xs font-semibold uppercase text-heritage-ivory/70">ResNet-50 Baseline</div>
            <div className="text-3xl font-bold text-heritage-ivory/80">86.8%</div>
            <div className="text-xs text-heritage-ivory/60">Macro Precision: 0.865 | Recall: 0.851</div>
            <div className="text-xs text-heritage-ivory/60 pt-1 border-t border-white/10">Inference Latency: 0.45 sec/img</div>
          </div>

        </div>
      </div>

      {/* Neural Network Architecture Details */}
      <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/20 shadow-md space-y-6">
        <h2 className="font-serif text-2xl font-bold text-heritage-indigo flex items-center gap-2">
          <Cpu className="w-6 h-6 text-heritage-terracotta" /> CNN Architectural Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-semibold text-heritage-indigo border-b border-heritage-gold/20 pb-1">Input & Preprocessing</h4>
            <ul className="space-y-2 text-heritage-slate/80">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Input Layer: (224, 224, 3) RGB</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Normalization: [0, 255] float scaling to [0.0, 1.0]</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> EXIF orientation transpose correction</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Aspect-ratio preserved resize with zero padding</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-heritage-indigo border-b border-heritage-gold/20 pb-1">Model Hyperparameters</h4>
            <ul className="space-y-2 text-heritage-slate/80">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Optimizer: Adam (Learning Rate = 0.0001)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Loss: Sparse Categorical Crossentropy</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Dropout Regularization: 0.45</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-heritage-terracotta" /> Early Stopping Patience: 8 Epochs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implemented vs Planned Scope */}
      <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/20 shadow-md space-y-6">
        <h2 className="font-serif text-2xl font-bold text-heritage-indigo">
          Capabilities vs Future Scope
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Implemented System Capabilities
            </h3>
            <ul className="space-y-2 text-sm text-heritage-slate/80">
              <li className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">✓ End-to-end 3-class CNN inference pipeline</li>
              <li className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">✓ Grad-CAM explainable AI spatial heatmap visualizer</li>
              <li className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">✓ Spring Boot JWT authentication & PostgreSQL catalog</li>
              <li className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">✓ Expert review & human classification correction workflow</li>
              <li className="p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">✓ CSV catalog data exporter & versioned audit logs</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-amber-700 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Planned Future Research Extensions
            </h3>
            <ul className="space-y-2 text-sm text-heritage-slate/80">
              <li className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200">⚙ Multi-label sub-motif segmentation</li>
              <li className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200">⚙ Expansion to 10+ South Asian heritage art forms</li>
              <li className="p-2 rounded bg-amber-50 text-amber-900 border border-amber-200">⚙ Mobile edge device offline inference model quantization</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
