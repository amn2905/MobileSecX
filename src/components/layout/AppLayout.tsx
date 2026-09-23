import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAppStore } from '../../store/useAppStore';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-[#EEF1F5] text-[#20242B] flex flex-col font-sans">
      {/* Light Skeuomorphic Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Raised Navbar */}
        <Navbar />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Clean Skeuomorphic Footer */}
        <footer className="px-6 py-4 border-t border-[#D5DAE1] bg-[#E8EDF4] text-[11px] font-mono text-[#66707D] flex flex-col sm:flex-row items-center justify-between gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            <span className="font-semibold text-[#334155]">MobileSecX Workstation — Mobile Security Testing Framework</span>
          </div>
          <div className="flex items-center gap-4 text-[#64748B]">
            <span>OWASP MASVS v2.0 Benchmark</span>
            <span>·</span>
            <span>FastAPI Bridge Ready</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
