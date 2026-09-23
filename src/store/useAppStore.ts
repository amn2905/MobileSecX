import { create } from 'zustand';
import {
  Application,
  Vulnerability,
  Scan,
  ScanLog,
  ApiEndpoint,
} from '../types';
import {
  mockApplications,
  mockVulnerabilities,
  mockScans,
  mockScanLogs,
  mockApiEndpoints,
} from '../data/mockData';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'critical' | 'warning' | 'info' | 'success';
}

interface AppState {
  // Navigation & UI state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  demoMode: boolean;
  toggleDemoMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Data state
  applications: Application[];
  vulnerabilities: Vulnerability[];
  scans: Scan[];
  apiEndpoints: ApiEndpoint[];
  notifications: AppNotification[];

  // Active Scan Simulation state
  activeScan: Scan | null;
  scanLogs: ScanLog[];
  isScanning: boolean;
  scanProgress: number;
  scanStage: string;
  scanIntervalId: number | null;

  // Actions
  addApplication: (app: Partial<Application>) => Application;
  deleteApplication: (id: string) => void;
  startScan: (appId: string, scanType?: Scan['scanType'], options?: Scan['options']) => string;
  stopScan: () => void;
  addScanLog: (log: ScanLog) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  resolveVulnerability: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  demoMode: true,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  applications: mockApplications,
  vulnerabilities: mockVulnerabilities,
  scans: mockScans,
  apiEndpoints: mockApiEndpoints,

  notifications: [
    {
      id: 'notif-1',
      title: 'Critical Vulnerability Found',
      message: 'Hardcoded API Key discovered in SecureBank (sk_live_9a7f...)',
      time: '12m ago',
      read: false,
      type: 'critical',
    },
    {
      id: 'notif-2',
      title: 'Scan Completed',
      message: 'Static Analysis for ShopEase finished with score 91/100',
      time: '1h ago',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-3',
      title: 'Device Emulator Ready',
      message: 'Pixel 7 Emulator (Android 14) connected with Frida server 16.2.1',
      time: '2h ago',
      read: true,
      type: 'info',
    },
  ],

  activeScan: mockScans[0], // default to active scan 124
  scanLogs: mockScanLogs,
  isScanning: true,
  scanProgress: 68,
  scanStage: 'API Analysis',
  scanIntervalId: null,

  addApplication: (appData) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      name: appData.name || 'CustomApp',
      packageName: appData.packageName || 'com.example.mobile.app',
      platform: appData.platform || 'Android',
      fileType: appData.fileType || 'APK',
      version: appData.version || 'v1.0.0',
      fileSize: appData.fileSize || '38.4 MB',
      sha256: appData.sha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      md5: appData.md5 || 'd41d8cd98f00b204e9800998ecf8427e',
      uploadDate: new Date().toISOString(),
      lastScanDate: 'Just now',
      securityScore: 80,
      riskLevel: 'MODERATE',
      vulnerabilitiesCount: {
        critical: 1,
        high: 2,
        medium: 3,
        low: 1,
        info: 2,
        total: 9,
      },
      status: 'Risk Detected',
      minSdk: 'API 26',
      targetSdk: 'API 34',
      mainActivity: 'com.example.mobile.MainActivity',
      permissions: ['android.permission.INTERNET', 'android.permission.ACCESS_NETWORK_STATE'],
      components: {
        activities: 8,
        services: 2,
        receivers: 1,
        providers: 1,
      },
      iconBg: 'from-cyan-600 to-blue-500',
      ...appData,
    };

    set((state) => ({
      applications: [newApp, ...state.applications],
    }));

    return newApp;
  },

  deleteApplication: (id) => {
    set((state) => ({
      applications: state.applications.filter((a) => a.id !== id),
    }));
  },

  startScan: (appId, scanType = 'Full Security Assessment', options) => {
    const existingApp = get().applications.find((a) => a.id === appId) || get().applications[0];
    const scanId = `SCAN-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newScan: Scan = {
      id: scanId,
      applicationId: existingApp.id,
      applicationName: `${existingApp.name}.${existingApp.fileType.toLowerCase()}`,
      platform: existingApp.platform,
      scanType,
      status: 'Running',
      progress: 5,
      currentStage: 'Application Parsing',
      startedAt: new Date().toLocaleTimeString(),
      securityScore: existingApp.securityScore,
      findingsCount: { ...existingApp.vulnerabilitiesCount },
      options: options || {
        manifestAnalysis: true,
        permissionsAnalysis: true,
        insecureStorage: true,
        authentication: true,
        networkSecurity: true,
        cryptographic: true,
        apiSecurity: true,
        codeAnalysis: true,
        thirdPartyLibs: true,
        hardcodedSecrets: true,
        certificateAnalysis: true,
      },
    };

    const initialLogs: ScanLog[] = [
      {
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        message: `Assessment started for ${newScan.applicationName} (${scanType})`,
        stage: 'File Upload',
      },
      {
        timestamp: new Date().toLocaleTimeString(),
        level: 'SUCCESS',
        message: `Package integrity verified: SHA-256 signature matches.`,
        stage: 'Application Parsing',
      },
    ];

    set((state) => ({
      scans: [newScan, ...state.scans],
      activeScan: newScan,
      scanLogs: initialLogs,
      isScanning: true,
      scanProgress: 5,
      scanStage: 'Application Parsing',
    }));

    // Start simulated progress steps
    const stages = [
      { name: 'Manifest Analysis', progress: 25, log: 'Extracted AndroidManifest.xml and parsed 18 declared components.' },
      { name: 'Permission Analysis', progress: 42, log: 'Permission matrix evaluated: Flagged CAMERA and READ_STORAGE as high risk.' },
      { name: 'Code Analysis', progress: 60, log: 'Decompiling bytecode classes.dex to Smali AST & regex scanning for hardcoded secrets...' },
      { name: 'API Analysis', progress: 75, log: 'Intercepted 8 REST endpoints. Verifying TLS certificates and CORS policies.' },
      { name: 'Dynamic Analysis', progress: 90, log: 'Instrumented Frida hook agent in Pixel 7 sandbox. Testing root bypass resistance.' },
      { name: 'Report Generation', progress: 100, log: 'Security assessment completed. OWASP MASVS score computed.' },
    ];

    let currentStep = 0;
    const interval = window.setInterval(() => {
      if (currentStep < stages.length) {
        const stage = stages[currentStep];
        set((state) => ({
          scanProgress: stage.progress,
          scanStage: stage.name,
          scanLogs: [
            ...state.scanLogs,
            {
              timestamp: new Date().toLocaleTimeString(),
              level: currentStep % 2 === 0 ? 'INFO' : 'SUCCESS',
              message: stage.log,
              stage: stage.name,
            },
          ],
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        set((state) => ({
          isScanning: false,
          activeScan: state.activeScan
            ? { ...state.activeScan, status: 'Completed', progress: 100, completedAt: 'Just now' }
            : null,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: 'Assessment Complete',
              message: `Scan ${scanId} for ${existingApp.name} completed successfully.`,
              time: 'Just now',
              read: false,
              type: 'success',
            },
            ...state.notifications,
          ],
        }));
      }
    }, 3500);

    return scanId;
  },

  stopScan: () => {
    set((state) => ({
      isScanning: false,
      activeScan: state.activeScan
        ? { ...state.activeScan, status: 'Paused' }
        : null,
      scanLogs: [
        ...state.scanLogs,
        {
          timestamp: new Date().toLocaleTimeString(),
          level: 'WARN',
          message: 'Security assessment paused by user intervention.',
        },
      ],
    }));
  },

  addScanLog: (log) => {
    set((state) => ({
      scanLogs: [...state.scanLogs, log],
    }));
  },

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  resolveVulnerability: (id) => {
    set((state) => ({
      vulnerabilities: state.vulnerabilities.map((v) =>
        v.id === id ? { ...v, status: 'RESOLVED' } : v
      ),
    }));
  },
}));
