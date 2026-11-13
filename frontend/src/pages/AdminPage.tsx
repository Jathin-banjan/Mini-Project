import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ShieldCheck, Database, History, Users, PlusCircle, CheckCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [datasets, setDatasets] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // New Dataset Modal Form
  const [showDatasetModal, setShowDatasetModal] = useState<boolean>(false);
  const [datasetName, setDatasetName] = useState('');
  const [version, setVersion] = useState('');
  const [description, setDescription] = useState('');
  const [sampleCount, setSampleCount] = useState<number>(100);
  const [licenseInfo, setLicenseInfo] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [dsData, logData, userData] = await Promise.all([
        adminApi.getDatasets(),
        adminApi.getAuditLogs(0, 15),
        adminApi.getUsers()
      ]);
      setDatasets(dsData || []);
      setAuditLogs(logData.content || []);
      setUsers(userData || []);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateDataset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createDataset({
        datasetName,
        version,
        description,
        sampleCount,
        licenseInfo
      });
      setShowDatasetModal(false);
      fetchAdminData();
    } catch (err: any) {
      alert("Failed to register dataset: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading administrative & dataset management records..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-heritage-gold/30 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-indigo text-heritage-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrator Control Panel
          </div>
          <h1 className="font-serif text-3xl font-bold text-heritage-indigo">Dataset Registration & Audit System</h1>
        </div>
      </div>

      {/* Dataset Management */}
      <div className="bg-heritage-card rounded-2xl p-6 border border-heritage-gold/20 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-heritage-indigo flex items-center gap-2">
            <Database className="w-5 h-5 text-heritage-terracotta" /> Registered Training Datasets
          </h2>
          <button
            onClick={() => setShowDatasetModal(true)}
            className="px-4 py-2 rounded-xl bg-heritage-terracotta text-heritage-ivory text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Register New Dataset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-heritage-slate">
            <thead className="bg-heritage-ivory text-heritage-indigo uppercase text-xs font-semibold border-b border-heritage-gold/20">
              <tr>
                <th className="p-3">Dataset Name</th>
                <th className="p-3">Version</th>
                <th className="p-3">Samples</th>
                <th className="p-3">License</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-gold/10">
              {datasets.map((ds) => (
                <tr key={ds.id}>
                  <td className="p-3 font-semibold text-heritage-indigo">{ds.datasetName}</td>
                  <td className="p-3 text-xs">{ds.version}</td>
                  <td className="p-3 font-mono text-xs">{ds.sampleCount}</td>
                  <td className="p-3 text-xs">{ds.licenseInfo || '—'}</td>
                  <td className="p-3 text-xs text-heritage-slate/70">{ds.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Audit Logs */}
      <div className="bg-heritage-card rounded-2xl p-6 border border-heritage-gold/20 shadow-md space-y-4">
        <h2 className="font-serif text-xl font-bold text-heritage-indigo flex items-center gap-2">
          <History className="w-5 h-5 text-heritage-gold" /> System Audit Trail
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-heritage-slate">
            <thead className="bg-heritage-ivory text-heritage-indigo uppercase text-xs font-semibold border-b border-heritage-gold/20">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-gold/10">
              {auditLogs.map((log) => (
                <tr key={log.id} className="text-xs">
                  <td className="p-3 font-mono text-heritage-slate/60">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 font-semibold text-heritage-indigo">{log.username || 'System'}</td>
                  <td className="p-3 font-bold text-heritage-terracotta">{log.action}</td>
                  <td className="p-3 uppercase text-[10px] font-bold text-heritage-gold">{log.entityType}</td>
                  <td className="p-3 text-heritage-slate/80">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Dataset Modal */}
      {showDatasetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleCreateDataset} className="bg-heritage-card max-w-lg w-full rounded-2xl p-6 border border-heritage-gold/40 shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-heritage-indigo">Register Dataset Metadata</h3>
            
            <div className="space-y-3 text-sm text-heritage-slate">
              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Dataset Name</label>
                <input
                  type="text"
                  required
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Version</label>
                <input
                  type="text"
                  required
                  placeholder="v1.0"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Sample Image Count</label>
                <input
                  type="number"
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">License</label>
                <input
                  type="text"
                  placeholder="CC-BY-4.0"
                  value={licenseInfo}
                  onChange={(e) => setLicenseInfo(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-heritage-gold/30 bg-heritage-ivory"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDatasetModal(false)}
                className="px-4 py-2 rounded-lg bg-heritage-slate/10 text-heritage-slate text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-heritage-terracotta text-heritage-ivory text-xs font-semibold shadow-sm hover:bg-heritage-gold transition-colors"
              >
                Save Dataset
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
