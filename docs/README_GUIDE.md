# MobileSecX Developer Guide

This document provides a practical technical guide for developers contributing to, extending, or maintaining the **MobileSecX** codebase.

---

## 1. Project Architecture Overview

MobileSecX is structured as a client-side Single Page Application (SPA) built with **React 19**, **TypeScript**, and **Vite**.

```text
src/
├── components/          # Visual presentation building blocks
│   ├── common/          # Atomic tactile & skeuomorphic UI controls
│   ├── dashboard/       # Domain-specific dashboard charts & tables
│   └── layout/          # Application shell, sidebar, and navbar
├── data/                # In-memory mock datasets used for Demo Mode
├── pages/               # Top-level view controllers corresponding to routes
├── services/            # Axios HTTP client & backend abstraction layer
├── store/               # Zustand global store & simulation state machines
└── types/               # Canonical TypeScript interfaces for domain entities
```

---

## 2. Core Modules & Responsibilities

### Presentation Layer (`src/pages/`)
Each page component encapsulates a distinct cybersecurity workstation function:
- **`Dashboard.tsx`**: High-level posture metrics, Recharts risk distributions, and recent applications.
- **`Applications.tsx` & `ApplicationDetails.tsx`**: Target inventory, checksums, Android manifest component inspection.
- **`UploadApplication.tsx`**: Ingestion zone with client-side format validation and assessment parameter configuration.
- **`ActiveScan.tsx`**: Scan pipeline orchestration monitor with terminal log stream.
- **`Vulnerabilities.tsx` & `VulnerabilityDetails.tsx`**: Findings triaging table, CVSS scoring breakdown, technical evidence console, and remediation steps.
- **`ApiSecurity.tsx`**: Extracted mobile REST endpoints, authorization status, and security compliance matrices.
- **`DynamicAnalysis.tsx`**: Sandbox emulator bridge, Frida dynamic instrumentation toggles, and runtime telemetry.
- **`ReverseEngineering.tsx`**: Virtual file explorer for decompiled APK structure, Smali bytecode, and manifest XML.
- **`Owasp.tsx`**: OWASP Mobile Top 10 (MASVS) compliance evaluation matrix.
- **`ScanHistory.tsx`**: Scan timeline and differential scan comparison modal.
- **`Settings.tsx`**: Framework settings (FastAPI endpoint, Burp Suite proxy host/port, Frida port).

### Global State Management (`src/store/useAppStore.ts`)
The application uses **Zustand** to manage state across views without prop-drilling:
- **Application Inventory**: `applications: Application[]`, with `addApplication()` and `deleteApplication()`.
- **Vulnerabilities**: `vulnerabilities: Vulnerability[]`, with `resolveVulnerability()`.
- **Scan Simulation Engine**: Manages `isScanning`, `scanProgress`, `scanStage`, and `scanLogs`. When a scan is triggered, a timer ticks through discrete analysis stages and appends formatted log events.
- **UI State**: `sidebarCollapsed`, `mobileMenuOpen`, `demoMode`, and `searchQuery`.

### Service Layer (`src/services/api.ts`)
Abstracts backend communication using an Axios instance configured with `VITE_API_BASE_URL`:
- Each service method (e.g., `getApplications()`, `startScan()`) attempts an HTTP call to the backend.
- If the request fails (or if the backend is offline), the service transparently falls back to simulated responses from `src/data/mockData.ts` after a realistic delay (200–800ms).

---

## 3. Practical Developer Workflows

### How to Add a New Page / Route

1. **Create the Page Component**:
   Add a new TypeScript React component under `src/pages/`, for example `src/pages/NetworkAnalysis.tsx`:
   ```tsx
   import React from 'react';

   export const NetworkAnalysis: React.FC = () => {
     return (
       <div className="space-y-6">
         <h1 className="text-2xl font-black text-[#1E293B]">Network Traffic Analysis</h1>
         <div className="skeuo-raised p-6 rounded-2xl border border-[#D5DAE1]">
           {/* Component content */}
         </div>
       </div>
     );
   };
   ```

2. **Register the Route in `src/App.tsx`**:
   Import your component and add a `<Route>` inside the `<AppLayout />` parent:
   ```tsx
   import { NetworkAnalysis } from './pages/NetworkAnalysis';

   // Inside <Routes> -> <Route element={<AppLayout />}>:
   <Route path="/network-analysis" element={<NetworkAnalysis />} />
   ```

3. **Add Navigation Item in `src/components/layout/Sidebar.tsx`**:
   Add an entry to the `navItems` array with an appropriate Lucide icon:
   ```tsx
   { name: 'Network Analysis', path: '/network-analysis', icon: Radio },
   ```

---

### How to Add a New Vulnerability Type

1. **Update Domain Types** (if introducing new categories):
   Open `src/types/index.ts` and inspect the `Vulnerability` interface.
2. **Add Vulnerability Record in `src/data/mockData.ts`**:
   Append a new object to `mockVulnerabilities`:
   ```ts
   {
     id: 'VULN-2026-009',
     title: 'Insecure Biometric Authentication Implementation',
     severity: 'HIGH',
     cvss: 7.4,
     cvssVector: 'CVSS:3.1/AV:P/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N',
     application: 'SecureBank.apk',
     applicationId: 'app-1',
     category: 'Authentication',
     owaspCategory: 'M3: Insecure Authentication/Authorization',
     owaspId: 'M3',
     status: 'OPEN',
     detectedDate: '2026-09-23 11:45',
     description: 'Biometric prompt callback does not validate CryptoObject signatures server-side.',
     technicalEvidence: 'BiometricPrompt.AuthenticationCallback onAuthenticationSucceeded ignores cipher initialization.',
     affectedComponent: 'com.securebank.auth.BiometricAuthManager',
     detectionMethod: 'Static Bytecode AST Pattern Matching',
     proofOfConcept: 'Hook onAuthenticationSucceeded via Frida to return true unconditionally.',
     risk: 'Physical adversary can bypass fingerprint verification on compromised devices.',
     impact: 'Unauthorized access to user transaction accounts.',
     remediation: 'Require cryptographic key confirmation backed by Android Keystore CryptoObject.',
     references: ['https://developer.android.com/training/sign-in/biometric-auth'],
   }
   ```

---

### How to Add New Mock Data

All initial datasets reside in `src/data/mockData.ts`:
- **`mockApplications`**: Target APK/AAB/IPA packages with package names, component counts, and SDK versions.
- **`mockScans`**: Historical and running assessment logs.
- **`mockApiEndpoints`**: Discovered REST routes with risk scores and parameters.
- **`mockOwaspCategories`**: M1 to M10 category mappings and compliance scores.
- **`mockReports`**: Printable assessment summaries.

Ensure any newly added mock records comply with the TypeScript types defined in `src/types/index.ts`.

---

### How to Connect a Real Backend

To connect a live FastAPI or Node.js backend:

1. **Configure the Environment Variable**:
   Set `VITE_API_BASE_URL` in `.env.local`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

2. **Verify Backend Health Endpoint**:
   Ensure your backend exposes `GET /api/health` returning:
   ```json
   { "status": "online" }
   ```
   Navigate to **Settings → API Configuration** and click **Test Connection** to confirm connectivity.

3. **Implement REST Endpoints**:
   Implement the endpoints defined in `src/services/api.ts` (e.g., `/applications`, `/scans/start`, `/vulnerabilities`). The Axios client will automatically use real response data instead of falling back to mock data.

---

### How to Extend Analysis Engines in Scan Pipeline

The scan simulation pipeline is located in `src/store/useAppStore.ts` inside `startScan()`:
- `stages`: Array of pipeline steps (`Manifest Analysis`, `Permission Analysis`, `Code Analysis`, `API Analysis`, `Dynamic Analysis`, `Report Generation`).
- To add a new stage (e.g., `Third-Party Library CVE Lookup`), add an entry to the `stages` array with target progress percentage and representative log messages.
- When wiring to a real backend, replace the `window.setInterval()` timer with a WebSocket connection or Server-Sent Events (SSE) stream listening on `/api/scans/:id/stream`.
