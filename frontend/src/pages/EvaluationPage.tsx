import React, { useEffect, useState } from 'react';
import { researchApi } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Award, BarChart3, Grid, FileText, CheckCircle2 } from 'lucide-react';

export const EvaluationPage: React.FC = () => {
  const [evalData, setEvalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadEval = async () => {
      try {
        const data = await researchApi.getEvaluations();
        setEvalData(data);
      } catch (err) {
        console.error("Failed to load evaluation metrics", err);
      } finally {
        setLoading(false);
      }
    };
    loadEval();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Calculating test evaluation metrics..." />;
  }

  // Baseline paper comparisons
  const paperBaselines = [
    { name: 'Proposed HeritageCNN (Research Paper)', meanAcc: '96.2%', precision: '0.958', recall: '0.946', f1: '0.952', latency: '0.22s', source: 'Published Research Paper Result' },
    { name: 'AlexNet Baseline', meanAcc: '79.5%', precision: '0.781', recall: '0.764', f1: '0.772', latency: '0.12s', source: 'Published Research Paper Result' },
    { name: 'ResNet-50 Baseline', meanAcc: '86.8%', precision: '0.865', recall: '0.851', f1: '0.858', latency: '0.45s', source: 'Published Research Paper Result' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-heritage-gold/30 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-indigo text-heritage-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" /> Held-Out Test Evaluation
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-indigo">
          Model Evaluation & Performance Metrics
        </h1>
        <p className="text-heritage-slate/80 text-sm mt-1">
          Scikit-learn calculated classification metrics, confusion matrix, and paper baseline comparisons.
        </p>
      </div>

      {/* Live System Metrics Cards */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-heritage-indigo">Newly Evaluated Model Metrics</h2>
        
        {evalData?.status === 'pending' || !evalData?.overall_accuracy ? (
          <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-sm text-sm text-heritage-slate/70">
            <strong>Status:</strong> Evaluation Pending. Run evaluation training pipeline to compute real-time test split metrics.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
              <span className="text-xs uppercase font-bold text-heritage-slate/60">Overall Accuracy</span>
              <div className="font-serif text-3xl font-bold text-heritage-terracotta">
                {(evalData.overall_accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-heritage-slate/60">Test Samples: {evalData.total_test_samples}</div>
            </div>

            <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
              <span className="text-xs uppercase font-bold text-heritage-slate/60">Macro Precision</span>
              <div className="font-serif text-3xl font-bold text-heritage-indigo">
                {evalData.macro_precision}
              </div>
              <div className="text-xs text-heritage-slate/60">Across 3 Classes</div>
            </div>

            <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
              <span className="text-xs uppercase font-bold text-heritage-slate/60">Macro Recall</span>
              <div className="font-serif text-3xl font-bold text-heritage-indigo">
                {evalData.macro_recall}
              </div>
              <div className="text-xs text-heritage-slate/60">Across 3 Classes</div>
            </div>

            <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
              <span className="text-xs uppercase font-bold text-heritage-slate/60">Macro F1-Score</span>
              <div className="font-serif text-3xl font-bold text-heritage-gold">
                {evalData.macro_f1}
              </div>
              <div className="text-xs text-heritage-slate/60">Harmonic Mean</div>
            </div>
          </div>
        )}
      </div>

      {/* Paper Baseline Comparison Table */}
      <div className="bg-heritage-card rounded-2xl p-6 border border-heritage-gold/30 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-heritage-indigo">
            Historical Paper Baseline Comparison
          </h2>
          <span className="text-xs bg-heritage-gold/20 text-heritage-indigo px-3 py-1 rounded-full font-semibold border border-heritage-gold/40 uppercase tracking-wider">
            Explicit Paper Citation
          </span>
        </div>

        <p className="text-xs text-heritage-slate/70">
          The values below represent published reference benchmark metrics reported directly in the original research paper.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-heritage-slate">
            <thead className="bg-heritage-ivory text-heritage-indigo uppercase text-xs font-semibold border-b border-heritage-gold/20">
              <tr>
                <th className="p-3">Architecture Model</th>
                <th className="p-3">Mean Accuracy</th>
                <th className="p-3">Macro Precision</th>
                <th className="p-3">Macro Recall</th>
                <th className="p-3">Macro F1</th>
                <th className="p-3">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-gold/10">
              {paperBaselines.map((row, idx) => (
                <tr key={idx} className={idx === 0 ? 'bg-heritage-gold/10 font-semibold' : ''}>
                  <td className="p-3 text-heritage-indigo">{row.name}</td>
                  <td className="p-3">{row.meanAcc}</td>
                  <td className="p-3">{row.precision}</td>
                  <td className="p-3">{row.recall}</td>
                  <td className="p-3">{row.f1}</td>
                  <td className="p-3">{row.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
