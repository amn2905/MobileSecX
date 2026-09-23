import React, { useState } from 'react';
import {
  Smartphone,
  Activity,
  CheckCircle2,
  Terminal,
  Zap,
  Lock,
  Wifi,
  ShieldAlert,
} from 'lucide-react';
import { mockRuntimeEvents } from '../data/mockData';
import { RuntimeEvent } from '../types';

export const DynamicAnalysis: React.FC = () => {
  const [events] = useState<RuntimeEvent[]>(mockRuntimeEvents);
  const [activeHooks, setActiveHooks] = useState({
    sslBypass: true,
    rootBypass: true,
    cryptoHook: true,
    keystoreDump: false,
  });
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const toggleHook = (key: keyof typeof activeHooks) => {
    setActiveHooks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredEvents = events.filter(
    (e) => typeFilter === 'ALL' || e.type === typeFilter
  );

  const getSeverityBadge = (sev: RuntimeEvent['severity']) => {
    switch (sev) {
      case 'ALERT':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5] font-bold shadow-[1px_1px_2px_rgba(220,38,38,0.2)]';
      case 'WARN':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold shadow-[1px_1px_2px_rgba(217,119,6,0.2)]';
      default:
        return 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] font-semibold shadow-[1px_1px_2px_rgba(37,99,235,0.2)]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Dynamic Instrumentation Engine
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Dynamic Runtime Analysis
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Hook native JVM/ART methods, intercept memory operations, and inspect runtime security events via Frida.
          </p>
        </div>

        {/* Live Frida Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border border-[#93C5FD] text-[#1E40AF] text-xs font-mono font-bold shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(37,99,235,0.2)]">
          <Zap className="w-4 h-4 text-[#2563EB]" />
          <span>Frida Agent v16.2.1 Injected</span>
        </div>
      </div>

      {/* Target Device & Instrumentation Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Device Info */}
        <div className="skeuo-raised p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Device / Emulator</span>
          <div className="flex items-center gap-2 mt-1">
            <Smartphone className="w-4 h-4 text-[#2563EB]" />
            <h4 className="font-extrabold text-[#1E293B] text-xs sm:text-sm">Pixel 7 Emulator</h4>
          </div>
          <span className="text-[11px] font-mono text-[#475569] block font-medium">Android 14 (API 34)</span>
        </div>

        {/* ADB Connection */}
        <div className="skeuo-raised p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">ADB Bridge</span>
          <div className="flex items-center gap-2 mt-1">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <h4 className="font-extrabold text-[#16A34A] text-xs sm:text-sm">Connected</h4>
          </div>
          <span className="text-[11px] font-mono text-[#475569] block font-medium">emulator-5554</span>
        </div>

        {/* Proxy */}
        <div className="skeuo-raised p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Proxy Interceptor</span>
          <div className="flex items-center gap-2 mt-1">
            <Wifi className="w-4 h-4 text-[#2563EB]" />
            <h4 className="font-extrabold text-[#1E293B] text-xs sm:text-sm">Burp Suite</h4>
          </div>
          <span className="text-[11px] font-mono text-[#475569] block font-medium">127.0.0.1:8080</span>
        </div>

        {/* SSL Pinning */}
        <div className="skeuo-raised p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">SSL Pinning</span>
          <div className="flex items-center gap-2 mt-1">
            <Lock className="w-4 h-4 text-[#D97706]" />
            <h4 className="font-extrabold text-[#D97706] text-xs sm:text-sm">Detected</h4>
          </div>
          <span className="text-[11px] font-mono text-[#475569] block font-medium">TrustKit Hook active</span>
        </div>

        {/* Root Detection */}
        <div className="skeuo-raised p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Root Detection</span>
          <div className="flex items-center gap-2 mt-1">
            <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
            <h4 className="font-extrabold text-[#DC2626] text-xs sm:text-sm">Detected</h4>
          </div>
          <span className="text-[11px] font-mono text-[#475569] block font-medium">su check bypassed</span>
        </div>
      </div>

      {/* Frida Instrumentation Tactile Toggles */}
      <div className="skeuo-raised p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#2563EB]" />
          <span className="text-xs font-mono font-bold text-[#1E293B] uppercase">
            Active Frida Scripts:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'sslBypass', label: 'Bypass SSL Pinning' },
            { key: 'rootBypass', label: 'Bypass Root Detection' },
            { key: 'cryptoHook', label: 'Hook Cipher Ciphers' },
            { key: 'keystoreDump', label: 'Dump Android Keystore' },
          ].map(({ key, label }) => {
            const active = (activeHooks as any)[key];
            return (
              <button
                key={key}
                onClick={() => toggleHook(key as any)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition border ${
                  active
                    ? 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_3px_rgba(37,99,235,0.2)]'
                    : 'skeuo-btn text-[#64748B]'
                }`}
              >
                {active ? '●' : '○'} {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Intercepted Runtime Events Monitoring Console */}
      <div className="skeuo-recessed-deep rounded-2xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#D2D9E4] border-b border-[#CBD3DF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#1E293B] uppercase">
              Intercepted Runtime Event Stream
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAFBFD] text-[#475569] border border-[#CBD5E1]">
              {filteredEvents.length} events
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="skeuo-input text-xs font-mono rounded-lg text-[#334155] py-1 px-2.5"
            >
              <option value="ALL">All Event Types</option>
              <option value="Network Request">Network Request</option>
              <option value="File Access">File Access</option>
              <option value="Database Access">Database Access</option>
              <option value="Clipboard Access">Clipboard Access</option>
              <option value="Process Execution">Process Execution</option>
              <option value="Cryptographic Operation">Cryptographic Operation</option>
            </select>
          </div>
        </div>

        {/* Stream Table */}
        <div className="divide-y divide-[#D7DFEC] max-h-[460px] overflow-y-auto font-mono text-xs bg-[#E4E9F2]">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-3.5 hover:bg-[#D7DFEC]/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-[#64748B] select-none text-[11px] flex-shrink-0 mt-0.5 font-medium">
                  [{evt.timestamp}]
                </span>

                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded-sm border flex-shrink-0 ${getSeverityBadge(
                    evt.severity
                  )}`}
                >
                  {evt.severity}
                </span>

                <span className="text-[#2563EB] text-xs font-bold flex-shrink-0">
                  {evt.type}:
                </span>

                <span className="text-[#20242B] break-all text-xs font-semibold">{evt.details}</span>
              </div>

              <span className="text-[10px] text-[#64748B] flex-shrink-0 sm:text-right font-medium">
                Hook: {evt.interceptedBy}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
