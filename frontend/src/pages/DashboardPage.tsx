import React, { useEffect, useState } from 'react';
import { researchApi, predictionApi, ResearchSummary, PredictionResponse } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Database, Cpu, CheckCircle, AlertTriangle, BarChart2, Activity, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<ResearchSummary | null>(null);
  const [recentPredictions, setRecentPredictions] = useState<PredictionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [sumData, predData] = await Promise.all([
          researchApi.getSummary(),
          predictionApi.getPredictions(0, 5)
        ]);
        setSummary(sumData);
        setRecentPredictions(predData.content || []);
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading research dashboard metrics..." />;
  }

  const categoryChartData = [
    { name: 'Warli Art', count: summary?.categoryDistribution?.warli || 0, color: '#B85C38' },
    { name: 'Madhubani', count: summary?.categoryDistribution?.madhubani || 0, color: '#C7A45A' },
    { name: 'Textiles', count: summary?.categoryDistribution?.textile || 0, color: '#171C3A' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-heritage-gold/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-heritage-indigo">Research Dashboard & System Metrics</h1>
          <p className="text-heritage-slate/80 text-sm">Real-time status, artifact repository counts, and CNN inference telemetry.</p>
        </div>

        {/* Operational Status Pill */}
        <div className="flex items-center gap-2 bg-heritage-card px-4 py-2 rounded-xl border border-heritage-gold/30 shadow-sm text-xs font-semibold">
          <Cpu className="w-4 h-4 text-heritage-terracotta" />
          <span>Active Model: <strong className="text-heritage-indigo">{summary?.activeModelVersion}</strong></span>
          <span className={`w-2.5 h-2.5 rounded-full ${summary?.modelOperational ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
          <span className="text-heritage-slate/70">{summary?.modelOperational ? 'Operational' : 'Offline'}</span>
        </div>
      </div>

      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
          <div className="flex items-center justify-between text-heritage-slate/70">
            <span className="text-xs uppercase font-bold tracking-wider">Stored Artifacts</span>
            <Database className="w-5 h-5 text-heritage-terracotta" />
          </div>
          <div className="font-serif text-3xl font-bold text-heritage-indigo">{summary?.totalStoredArtifacts}</div>
          <div className="text-xs text-heritage-slate/60">Digital Heritage Records</div>
        </div>

        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
          <div className="flex items-center justify-between text-heritage-slate/70">
            <span className="text-xs uppercase font-bold tracking-wider">Completed Predictions</span>
            <Activity className="w-5 h-5 text-heritage-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-heritage-indigo">{summary?.totalCompletedPredictions}</div>
          <div className="text-xs text-heritage-slate/60">CNN Classifications</div>
        </div>

        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
          <div className="flex items-center justify-between text-heritage-slate/70">
            <span className="text-xs uppercase font-bold tracking-wider">Verified Records</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-emerald-700">{summary?.verifiedMetadataCount}</div>
          <div className="text-xs text-heritage-slate/60">Human Expert Reviewed</div>
        </div>

        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-2">
          <div className="flex items-center justify-between text-heritage-slate/70">
            <span className="text-xs uppercase font-bold tracking-wider">Low-Confidence Alerts</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-bold text-amber-600">{summary?.lowConfidenceCount}</div>
          <div className="text-xs text-heritage-slate/60">Needs Expert Verification</div>
        </div>

      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Distribution Chart */}
        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-4">
          <h3 className="font-serif font-bold text-heritage-indigo text-lg flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-heritage-terracotta" /> Pattern Category Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" stroke="#343844" fontSize={12} />
                <YAxis stroke="#343844" fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#B85C38" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Status Pie Chart */}
        <div className="bg-heritage-card p-6 rounded-2xl border border-heritage-gold/20 shadow-md space-y-4">
          <h3 className="font-serif font-bold text-heritage-indigo text-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-heritage-gold" /> Metadata Verification Ratio
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Verified', value: summary?.verifiedMetadataCount || 0 },
                    { name: 'Unverified', value: summary?.unverifiedMetadataCount || 0 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#059669" />
                  <Cell fill="#C7A45A" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Activity Table */}
      <div className="bg-heritage-card rounded-2xl p-6 border border-heritage-gold/20 shadow-md space-y-4">
        <h3 className="font-serif font-bold text-heritage-indigo text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-heritage-indigo" /> Recent Classification Activity
        </h3>

        {recentPredictions.length === 0 ? (
          <div className="p-8 text-center text-heritage-slate/60 text-sm">
            No classifications recorded yet. Use the AI Pattern Analyzer to run predictions.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-heritage-slate">
              <thead className="bg-heritage-ivory text-heritage-indigo uppercase text-xs font-semibold border-b border-heritage-gold/20">
                <tr>
                  <th className="p-3">Prediction ID</th>
                  <th className="p-3">Predicted Pattern</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Latency</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-heritage-gold/10">
                {recentPredictions.map((pred) => (
                  <tr key={pred.id} className="hover:bg-heritage-ivory/50 transition-colors">
                    <td className="p-3 font-mono text-xs">{pred.id.substring(0, 8)}...</td>
                    <td className="p-3 font-semibold text-heritage-indigo">{pred.predictedDisplayName}</td>
                    <td className="p-3">{(pred.confidence * 100).toFixed(1)}%</td>
                    <td className="p-3">{pred.inferenceLatencySec}s</td>
                    <td className="p-3">
                      {pred.lowConfidenceWarning ? (
                        <span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-800 font-medium">Review Needed</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 font-medium">High Confidence</span>
                      )}
                    </td>
                    <td className="p-3 text-xs text-heritage-slate/60">{new Date(pred.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
