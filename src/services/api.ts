import axios from 'axios';
import {
  Application,
  Scan,
  Vulnerability,
  ApiEndpoint,
  OwaspCategory,
  SecurityReport,
} from '../types';
import {
  mockApplications,
  mockScans,
  mockVulnerabilities,
  mockApiEndpoints,
  mockOwaspCategories,
  mockReports,
} from '../data/mockData';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Helper for simulated delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * MobileSecX API Service
 * Handles communication with the FastAPI backend, with automated fallback to mock data
 * when the backend is unreachable or when running in client-side Demo mode.
 */
export const api = {
  // Applications
  async getApplications(): Promise<Application[]> {
    try {
      const response = await apiClient.get<Application[]>('/applications');
      return response.data;
    } catch {
      await delay(300);
      return mockApplications;
    }
  },

  async getApplicationById(id: string): Promise<Application | undefined> {
    try {
      const response = await apiClient.get<Application>(`/applications/${id}`);
      return response.data;
    } catch {
      await delay(200);
      return mockApplications.find((app) => app.id === id);
    }
  },

  async uploadApplication(formData: FormData): Promise<{ application: Application }> {
    try {
      const response = await apiClient.post<{ application: Application }>(
        '/applications/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data;
    } catch {
      await delay(800);
      const fileName = (formData.get('file') as File)?.name || 'CustomUploadedApp.apk';
      const isIos = fileName.endsWith('.ipa');
      const mockApp: Application = {
        id: `app-${Date.now()}`,
        name: fileName.replace(/\.(apk|aab|ipa)$/i, ''),
        packageName: isIos ? 'org.uploaded.ios.app' : 'com.uploaded.mobile.app',
        platform: isIos ? 'iOS' : 'Android',
        fileType: isIos ? 'IPA' : fileName.endsWith('.aab') ? 'AAB' : 'APK',
        version: 'v1.0.0',
        fileSize: '45.2 MB',
        sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        md5: '9e107d9d372bb6826bd81d3542a419d6',
        uploadDate: new Date().toISOString(),
        lastScanDate: 'Just now',
        securityScore: 82,
        riskLevel: 'MODERATE',
        vulnerabilitiesCount: {
          critical: 1,
          high: 2,
          medium: 3,
          low: 2,
          info: 4,
          total: 12,
        },
        status: 'Completed',
        minSdk: isIos ? 'iOS 15.0' : 'API 26 (Android 8.0)',
        targetSdk: isIos ? 'iOS 17.0' : 'API 34 (Android 14)',
        mainActivity: isIos ? 'App.MainDelegate' : 'com.uploaded.mobile.MainActivity',
        permissions: [
          'android.permission.INTERNET',
          'android.permission.ACCESS_NETWORK_STATE',
          'android.permission.CAMERA',
        ],
        components: {
          activities: 12,
          services: 4,
          receivers: 2,
          providers: 1,
        },
        iconBg: 'from-cyan-600 to-indigo-600',
      };
      return { application: mockApp };
    }
  },

  // Scans
  async getScans(): Promise<Scan[]> {
    try {
      const response = await apiClient.get<Scan[]>('/scans');
      return response.data;
    } catch {
      await delay(300);
      return mockScans;
    }
  },

  async getScanById(id: string): Promise<Scan | undefined> {
    try {
      const response = await apiClient.get<Scan>(`/scans/${id}`);
      return response.data;
    } catch {
      await delay(200);
      return mockScans.find((s) => s.id === id);
    }
  },

  async startScan(payload: {
    applicationId: string;
    scanType: string;
    options: Record<string, boolean>;
  }): Promise<{ scanId: string }> {
    try {
      const response = await apiClient.post<{ scanId: string }>('/scans/start', payload);
      return response.data;
    } catch {
      await delay(400);
      return { scanId: `SCAN-2026-${Math.floor(10000 + Math.random() * 90000)}` };
    }
  },

  async getScanStatus(scanId: string): Promise<Scan | undefined> {
    try {
      const response = await apiClient.get<Scan>(`/scans/${scanId}/status`);
      return response.data;
    } catch {
      await delay(200);
      return mockScans.find((s) => s.id === scanId) || mockScans[0];
    }
  },

  // Vulnerabilities
  async getVulnerabilities(): Promise<Vulnerability[]> {
    try {
      const response = await apiClient.get<Vulnerability[]>('/vulnerabilities');
      return response.data;
    } catch {
      await delay(300);
      return mockVulnerabilities;
    }
  },

  async getVulnerabilityById(id: string): Promise<Vulnerability | undefined> {
    try {
      const response = await apiClient.get<Vulnerability>(`/vulnerabilities/${id}`);
      return response.data;
    } catch {
      await delay(200);
      return mockVulnerabilities.find((v) => v.id === id);
    }
  },

  // API Endpoints
  async getApiEndpoints(): Promise<ApiEndpoint[]> {
    try {
      const response = await apiClient.get<ApiEndpoint[]>('/api-endpoints');
      return response.data;
    } catch {
      await delay(300);
      return mockApiEndpoints;
    }
  },

  // OWASP
  async getOwaspCategories(): Promise<OwaspCategory[]> {
    try {
      const response = await apiClient.get<OwaspCategory[]>('/owasp');
      return response.data;
    } catch {
      await delay(300);
      return mockOwaspCategories;
    }
  },

  // Reports
  async getReports(): Promise<SecurityReport[]> {
    try {
      const response = await apiClient.get<SecurityReport[]>('/reports');
      return response.data;
    } catch {
      await delay(300);
      return mockReports;
    }
  },

  async generateReport(payload: { scanId: string; type: string }): Promise<{ reportUrl: string }> {
    try {
      const response = await apiClient.post<{ reportUrl: string }>('/reports/generate', payload);
      return response.data;
    } catch {
      await delay(1200);
      return { reportUrl: `#mock-report-download-${payload.scanId}` };
    }
  },

  // Health check / Backend connection test
  async checkBackendHealth(): Promise<{ status: 'online' | 'offline'; latencyMs: number }> {
    const startTime = performance.now();
    try {
      await apiClient.get('/health', { timeout: 3000 });
      return { status: 'online', latencyMs: Math.round(performance.now() - startTime) };
    } catch {
      return { status: 'offline', latencyMs: 0 };
    }
  },
};
