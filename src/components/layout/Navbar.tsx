import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  Activity,
  Upload,
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    sidebarCollapsed,
    setMobileMenuOpen,
    isScanning,
    activeScan,
    scanProgress,
    demoMode,
    toggleDemoMode,
    notifications,
    markNotificationRead,
    clearNotifications,
    searchQuery,
    setSearchQuery,
  } = useAppStore();

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/vulnerabilities?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Determine current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Security Overview';
    if (path.startsWith('/applications/')) return 'Application Forensics';
    if (path.startsWith('/applications')) return 'Application Targets';
    if (path.startsWith('/upload')) return 'Add Application';
    if (path.startsWith('/scans')) return 'Security Scanner Pipeline';
    if (path.startsWith('/vulnerabilities/')) return 'Finding Inspection';
    if (path.startsWith('/vulnerabilities')) return 'Vulnerability Findings';
    if (path.startsWith('/api-security')) return 'API Security Testing';
    if (path.startsWith('/dynamic-analysis')) return 'Dynamic Instrumentation';
    if (path.startsWith('/reverse-engineering')) return 'Reverse Engineering';
    if (path.startsWith('/owasp')) return 'OWASP Mobile Top 10';
    if (path.startsWith('/reports')) return 'Security Reports';
    if (path.startsWith('/history')) return 'Scan Audit History';
    if (path.startsWith('/settings')) return 'Framework Settings';
    return 'Security Workstation';
  };

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-6 bg-gradient-to-b from-[#FAFBFD] to-[#EFF2F7] border-b border-[#D5DAE1] shadow-[0_2px_8px_rgba(166,176,195,0.2)] transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}
    >
      {/* Left: Mobile Menu & Current Page Title */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="skeuo-btn p-2 rounded-lg lg:hidden text-[#475569]"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Page Title */}
        <div className="hidden sm:block">
          <h2 className="text-sm font-extrabold text-[#1E293B] tracking-tight whitespace-nowrap">
            {getPageTitle()}
          </h2>
        </div>

        {/* Global Recessed Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm ml-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search CVEs, packages, APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="skeuo-input w-full pl-8 pr-12 py-1.5 text-xs font-mono rounded-xl placeholder-[#8E9AAB]"
          />
          <kbd className="hidden md:inline-block absolute right-2.5 top-2 px-1.5 py-0.2 text-[9px] font-mono font-bold text-[#64748B] bg-[#FAFBFD] border border-[#CBD5E1] rounded shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.06)]">
            ↵
          </kbd>
        </form>
      </div>

      {/* Right Controls: Scan Status, Demo Toggle, Upload, Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Scan Status Tactile Pill */}
        {isScanning && activeScan ? (
          <Link
            to="/scans"
            className="skeuo-raised-sm flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#93C5FD] bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#1D4ED8] hover:shadow-[3px_3px_8px_rgba(59,130,246,0.25)] transition group"
            title="Scan in progress"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="font-bold hidden md:inline">Scanning:</span>
              <span className="text-[#1E293B] font-semibold truncate max-w-[90px] sm:max-w-[120px]">
                {activeScan.applicationName}
              </span>
              <span className="text-[#2563EB] font-bold">({scanProgress}%)</span>
            </div>
          </Link>
        ) : (
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#E2E8F0] border border-[#CBD5E1] text-[11px] font-mono text-[#64748B] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]" />
            <span>IDLE · Ready</span>
          </div>
        )}

        {/* Physical Demo Mode Toggle Switch */}
        <button
          onClick={toggleDemoMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition border ${
            demoMode
              ? 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(37,99,235,0.2)]'
              : 'skeuo-btn text-[#64748B]'
          }`}
          title="Click to toggle Demo Mode"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              demoMode ? 'bg-[#2563EB] shadow-[0_0_4px_rgba(37,99,235,0.8)]' : 'bg-[#94A3B8]'
            }`}
          />
          <span className="hidden sm:inline">DEMO MODE</span>
        </button>

        {/* Tactile Quick Upload Button */}
        <Link
          to="/upload"
          className="skeuo-btn-primary hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload</span>
        </Link>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="skeuo-btn relative p-2 rounded-xl text-[#64748B] hover:text-[#1E293B]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[9px] font-extrabold text-white font-mono shadow-[0_1px_2px_rgba(220,38,38,0.4)]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-gradient-to-b from-[#FAFBFD] to-[#F1F4F9] border border-[#CBD5E1] shadow-[0_12px_32px_rgba(30,41,59,0.18)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between p-3.5 bg-[#EDF2F7] border-b border-[#D5DAE1]">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-xs font-bold text-[#1E293B]">Security Alerts</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAFBFD] text-[#334155] border border-[#CBD5E1] font-semibold">
                    {unreadCount} new
                  </span>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-[11px] text-[#64748B] hover:text-[#2563EB] font-mono transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#E2E8F0] p-1 bg-[#F7F9FC]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[#8E9AAB]">
                    No active notifications.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 rounded-xl cursor-pointer transition flex items-start gap-3 ${
                        notif.read
                          ? 'opacity-60 hover:opacity-100 hover:bg-[#E2E8F0]/50'
                          : 'bg-[#FAFBFD] border border-[#D5DAE1] shadow-[1px_1px_3px_rgba(166,176,195,0.2)] hover:shadow-md'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {notif.type === 'critical' ? (
                          <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                        ) : notif.type === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                        ) : (
                          <Activity className="w-4 h-4 text-[#2563EB]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1E293B] truncate">
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-[#8E9AAB] font-mono">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
