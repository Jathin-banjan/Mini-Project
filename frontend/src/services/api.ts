import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('heritage_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper Types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  institution?: string;
  roles: string[];
}

export interface Probability {
  classKey: string;
  displayName: string;
  confidence: number;
}

export interface PredictionResponse {
  id: string;
  imageId: string;
  imageUrl: string;
  predictedClass: string;
  predictedDisplayName: string;
  confidence: number;
  lowConfidenceWarning: boolean;
  modelVersion: string;
  inferenceLatencySec: number;
  gradcamImageUrl?: string;
  probabilities: Probability[];
  createdAt: string;
}

export interface Artifact {
  id: string;
  title: string;
  culturalCategory: string;
  verifiedCategory?: string;
  region?: string;
  artifactType?: string;
  description?: string;
  creatorAttribution?: string;
  sourceLicense?: string;
  creationPeriod?: string;
  reviewStatus: string;
  mainImage?: {
    id: string;
    originalFilename: string;
    storageUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ResearchSummary {
  totalStoredArtifacts: number;
  totalCompletedPredictions: number;
  categoryDistribution: Record<string, number>;
  verifiedMetadataCount: number;
  unverifiedMetadataCount: number;
  lowConfidenceCount: number;
  activeModelVersion: string;
  modelOperational: boolean;
}

// API Methods
export const authApi = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const predictionApi = {
  classifyImage: async (file: File, includeGradcam: boolean = false) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<PredictionResponse>(
      `/predictions?includeGradcam=${includeGradcam}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return response.data;
  },
  getPredictions: async (page = 0, size = 10) => {
    const response = await api.get(`/predictions?page=${page}&size=${size}`);
    return response.data;
  },
  submitReview: async (predictionId: string, reviewData: { reviewedClass: string; notes?: string }) => {
    const response = await api.post(`/predictions/${predictionId}/review`, reviewData);
    return response.data;
  },
};

export const artifactApi = {
  getArtifacts: async (params?: { category?: string; region?: string; search?: string; page?: number; size?: number }) => {
    const response = await api.get('/artifacts', { params });
    return response.data;
  },
  getArtifactById: async (id: string) => {
    const response = await api.get<Artifact>(`/artifacts/${id}`);
    return response.data;
  },
  createArtifact: async (data: any) => {
    const response = await api.post<Artifact>('/artifacts', data);
    return response.data;
  },
  updateArtifact: async (id: string, data: any) => {
    const response = await api.put<Artifact>(`/artifacts/${id}`, data);
    return response.data;
  },
  deleteArtifact: async (id: string) => {
    const response = await api.delete(`/artifacts/${id}`);
    return response.data;
  },
  exportCsvUrl: () => `${API_BASE_URL}/artifacts/export/csv`,
};

export const researchApi = {
  getSummary: async () => {
    const response = await api.get<ResearchSummary>('/research/summary');
    return response.data;
  },
  getEvaluations: async () => {
    const response = await api.get('/research/evaluations');
    return response.data;
  },
  getModelInfo: async () => {
    const response = await api.get('/research/models');
    return response.data;
  },
};

export const adminApi = {
  getDatasets: async () => {
    const response = await api.get('/admin/datasets');
    return response.data;
  },
  createDataset: async (data: any) => {
    const response = await api.post('/admin/datasets', data);
    return response.data;
  },
  getAuditLogs: async (page = 0, size = 20) => {
    const response = await api.get(`/admin/audit-logs?page=${page}&size=${size}`);
    return response.data;
  },
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
};
