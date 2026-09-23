import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  Scan,
  ShieldAlert,
  Network,
  Activity,
  Code2,
  FileText,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useAppStore } from '../../store/useAppStore';

export const Sidebar: React.FC = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen,
    isScanning,
  } = useAppStore();

  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: Smartphone },
    {
      name: 'Security Scans',
      path: '/scans',
      icon: Scan,
      badge: isScanning ? 'RUNNING' : undefined,
    },
    {
      name: 'Vulnerabilities',
      path: '/vulnerabilities',
      icon: ShieldAlert,
      badge: '18 CRIT',
    },
    { name: 'API Security', path: '/api-security', icon: Network },
    { name: 'Dynamic Analysis', path: '/dynamic-analysis', icon: Activity },
    { name: 'Reverse Engineering', path: '/reverse-engineering', icon: Code2 },
    { name: 'OWASP Assessment', path: '/owasp', icon: Layers },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Scan History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0F172A]/20 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Light Skeuomorphic Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-[#F3F6FA] border-r border-[#D5DAE1] shadow-[4px_0_16px_rgba(166,176,195,0.25)] transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Logo with soft specular highlight */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#D5DAE1] bg-gradient-to-b from-[#FAFBFD] to-[#EFF3F8]">
          <Logo collapsed={sidebarCollapsed} />

          {/* Collapse Toggle Button (Desktop only) */}
          <button
            onClick={toggleSidebar}
            className="skeuo-btn hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-[#64748B] hover:text-[#1E293B]"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Tactile Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                title={sidebarCollapsed ? item.name : undefined}
                className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all duration-150 ${
                  isActive
                    ? 'bg-[#E2E8F1] border border-[#CBD5E1] text-[#1D4ED8] font-bold shadow-[inset_2px_2px_4px_rgba(150,162,183,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]'
                    : 'text-[#475569] font-medium hover:bg-[#FAFBFD] hover:text-[#1E293B] border border-transparent hover:border-[#D5DAE1] hover:shadow-[2px_2px_5px_rgba(166,176,195,0.25),-2px_-2px_5px_rgba(255,255,255,0.9)]'
                }`}
              >
                {/* Physical active indicator chip */}
                {isActive && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#2563EB] shadow-[0_0_4px_rgba(37,99,235,0.6)]" />
                )}

                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isActive ? 'text-[#1D4ED8] scale-105' : 'text-[#64748B] group-hover:text-[#1E293B]'
                  }`}
                />

                {!sidebarCollapsed && (
                  <span className="truncate flex-1 tracking-tight">{item.name}</span>
                )}

                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider border ${
                      item.badge === 'RUNNING'
                        ? 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] shadow-[inset_0_1px_1px_#FFF] animate-pulse'
                        : 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Tooltip */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1E293B] text-white text-xs font-medium rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Section: SYSTEM STATUS & User Profile */}
        <div className="p-3 border-t border-[#D5DAE1] bg-gradient-to-b from-[#EEF2F7] to-[#E5EAEF] space-y-3">
          {/* Physical System Status Recessed Module */}
          <div
            className={`p-2.5 rounded-xl bg-[#E2E7F0] border border-[#CBD5E1] shadow-[inset_1.5px_1.5px_3px_rgba(160,170,185,0.4),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] transition-all ${
              sidebarCollapsed ? 'flex justify-center' : ''
            }`}
            title="All Security Services Operational"
          >
            <div className="flex items-center gap-2.5">
              {/* Physical green LED indicator */}
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A] border border-[#15803D] shadow-[0_0_4px_rgba(22,163,74,0.6)]" />
              </span>
              {!sidebarCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-[#15803D] font-bold tracking-wide truncate">
                    SYSTEM OPERATIONAL
                  </span>
                  <span className="text-[9px] text-[#64748B] font-medium truncate">
                    Frida · MobSF · ADB Active
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Profile Card */}
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-[#FAFBFD] border border-[#D5DAE1] shadow-[2px_2px_5px_rgba(166,176,195,0.25),-2px_-2px_5px_rgba(255,255,255,0.9)] ${
              sidebarCollapsed ? 'justify-center p-1' : ''
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center font-bold text-xs text-white shadow-[1px_1px_3px_rgba(29,78,216,0.3)]">
                SA
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#16A34A] border border-white" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-[#1E293B] truncate">
                  SecOps Analyst
                </span>
                <span className="text-[10px] text-[#64748B] truncate font-mono">
                  analyst@mobilesecx.io
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
