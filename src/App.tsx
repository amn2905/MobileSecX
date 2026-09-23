import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Applications } from './pages/Applications';
import { ApplicationDetails } from './pages/ApplicationDetails';
import { UploadApplication } from './pages/UploadApplication';
import { ActiveScan } from './pages/ActiveScan';
import { Vulnerabilities } from './pages/Vulnerabilities';
import { VulnerabilityDetails } from './pages/VulnerabilityDetails';
import { ApiSecurity } from './pages/ApiSecurity';
import { DynamicAnalysis } from './pages/DynamicAnalysis';
import { ReverseEngineering } from './pages/ReverseEngineering';
import { Reports } from './pages/Reports';
import { Owasp } from './pages/Owasp';
import { ScanHistory } from './pages/ScanHistory';
import { Settings } from './pages/Settings';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Applications */}
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetails />} />
          <Route path="/upload" element={<UploadApplication />} />

          {/* Security Scans */}
          <Route path="/scans" element={<ActiveScan />} />
          <Route path="/scans/:id" element={<ActiveScan />} />

          {/* Vulnerabilities */}
          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/vulnerabilities/:id" element={<VulnerabilityDetails />} />

          {/* Specialized Testing Engines */}
          <Route path="/api-security" element={<ApiSecurity />} />
          <Route path="/dynamic-analysis" element={<DynamicAnalysis />} />
          <Route path="/reverse-engineering" element={<ReverseEngineering />} />
          <Route path="/owasp" element={<Owasp />} />

          {/* Reports & History */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/history" element={<ScanHistory />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
