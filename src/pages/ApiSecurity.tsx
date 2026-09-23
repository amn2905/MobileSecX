import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Search,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ApiEndpoint } from '../types';

export const ApiSecurity: React.FC = () => {
  const { apiEndpoints } = useAppStore();
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(apiEndpoints[0]);
  const [methodFilter, setMethodFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredEndpoints = apiEndpoints.filter((ep) => {
    const matchesMethod = methodFilter === 'ALL' || ep.method === methodFilter;
    const matchesSearch = ep.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  const getMethodBadge = (method: ApiEndpoint['method']) => {
    switch (method) {
      case 'GET':
        return 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD]';
      case 'POST':
        return 'bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] text-[#15803D] border-[#86EFAC]';
      case 'PUT':
        return 'bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] text-[#B45309] border-[#FCD34D]';
      case 'DELETE':
        return 'bg-gradient-to-b from-[#FEF2F2] to-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]';
      default:
        return 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]';
    }
  };

  const getRiskBadge = (risk: ApiEndpoint['risk']) => {
    switch (risk) {
      case 'CRITICAL':
        return 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5] font-bold';
      case 'HIGH':
        return 'bg-[#FFEDD5] text-[#9A3412] border-[#FDBA74] font-bold';
      case 'MEDIUM':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] font-bold';
      case 'LOW':
        return 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC] font-bold';
      default:
        return 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Transport & Endpoint Forensics
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            API Security Testing
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Inspect discovered mobile API endpoints, authenticate headers, rate-limiting, and BOLA/IDOR risks.
          </p>
        </div>

        {/* Physical-style Risk Meter */}
        <div className="skeuo-raised p-3 rounded-2xl flex items-center gap-4 self-start sm:self-auto">
          <div className="text-right font-mono">
            <span className="text-xl font-black text-[#D97706]">76 / 100</span>
            <span className="block text-[10px] text-[#64748B] uppercase font-bold">API Risk Index</span>
          </div>
          <div className="h-8 w-px bg-[#CBD5E1]" />
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-black shadow-[1px_1px_2px_rgba(217,119,6,0.15)]">
            MODERATE RISK
          </span>
        </div>
      </div>

      {/* Security Checks Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Authentication', passed: true },
          { label: 'Authorization', passed: false },
          { label: 'Rate Limiting', passed: false },
          { label: 'Input Validation', passed: true },
          { label: 'TLS 1.3 Strict', passed: true },
          { label: 'PII Exposure', passed: false },
          { label: 'CORS Policy', passed: true },
          { label: 'JWT Security', passed: true },
        ].map((check) => (
          <div
            key={check.label}
            className={`p-3 rounded-xl border text-center font-mono ${
              check.passed
                ? 'bg-gradient-to-b from-[#FAFBFD] to-[#F0FDF4] border-[#86EFAC] text-[#166534] shadow-[1.5px_1.5px_3px_rgba(22,163,74,0.15)]'
                : 'bg-gradient-to-b from-[#FAFBFD] to-[#FEF2F2] border-[#FCA5A5] text-[#991B1B] shadow-[1.5px_1.5px_3px_rgba(220,38,38,0.15)]'
            }`}
          >
            <div className="flex justify-center mb-1">
              {check.passed ? (
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              ) : (
                <XCircle className="w-4 h-4 text-[#DC2626]" />
              )}
            </div>
            <span className="text-[10px] block leading-tight font-extrabold">{check.label}</span>
            <span className="text-[9px] mt-0.5 block opacity-80 font-sans font-medium">
              {check.passed ? 'Protected' : 'Risk Flagged'}
            </span>
          </div>
        ))}
      </div>

      {/* Search & Method Filter Bar */}
      <div className="skeuo-raised p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search API endpoints (e.g. /api/users)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skeuo-input w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg placeholder-[#8E9AAB]"
          />
        </div>

        <div className="skeuo-segmented-container flex items-center self-start sm:self-auto">
          {['ALL', 'GET', 'POST', 'PUT', 'DELETE'].map((m) => (
            <button
              key={m}
              onClick={() => setMethodFilter(m)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                methodFilter === m
                  ? 'skeuo-segmented-active'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Endpoints Table & Interactive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints Table (Col 1-2) */}
        <div className="skeuo-raised rounded-2xl overflow-hidden lg:col-span-2">
          <div className="p-4 bg-[#E9EEF5] border-b border-[#D5DAE1] flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#475569] font-bold">
              Discovered Endpoints ({filteredEndpoints.length})
            </span>
            <span className="text-[11px] font-mono text-[#2563EB] font-bold">Live Interception & Static URLs</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EDF2F8] text-[#475569] font-mono uppercase text-[10px] border-b border-[#D5DAE1]">
                <tr>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Endpoint</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Auth</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] font-sans bg-[#FAFBFD]">
                {filteredEndpoints.map((ep) => {
                  const isSelected = selectedEndpoint.id === ep.id;
                  return (
                    <tr
                      key={ep.id}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`cursor-pointer transition ${
                        isSelected
                          ? 'bg-[#EBF2FC] border-l-3 border-[#2563EB]'
                          : 'hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <td className="px-4 py-3.5 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getMethodBadge(
                            ep.method
                          )}`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-[#1E293B]">
                        {ep.endpoint}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[#16A34A] font-extrabold">
                        {ep.status}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[#64748B] text-[11px]">
                        {ep.authentication}
                      </td>
                      <td className="px-4 py-3.5 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] border ${getRiskBadge(
                            ep.risk
                          )}`}
                        >
                          {ep.risk}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[#64748B] text-[11px]">
                        {ep.responseTime}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Endpoint Inspector Panel (Col 3) */}
        <div className="skeuo-raised p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E1E6EE]">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#2563EB] block font-bold">
                Inspector
              </span>
              <h3 className="text-sm font-bold text-[#1E293B] tracking-tight">Endpoint Security</h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${getMethodBadge(
                selectedEndpoint.method
              )}`}
            >
              {selectedEndpoint.method}
            </span>
          </div>

          <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)] font-mono text-xs text-[#1D4ED8] font-bold break-all">
            {selectedEndpoint.endpoint}
          </div>

          {/* Checks Matrix */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-[#66707D] block font-bold">
              Control Verification Matrix
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              {Object.entries(selectedEndpoint.checks).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBFD] border border-[#CBD5E1] shadow-[1px_1px_2px_rgba(166,176,195,0.15)]"
                >
                  <span className="capitalize text-[#334155] text-[11px] font-semibold">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  {val ? (
                    <span className="text-[#16A34A] flex items-center gap-1 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> PASS
                    </span>
                  ) : (
                    <span className="text-[#DC2626] flex items-center gap-1 text-[10px] font-black">
                      <XCircle className="w-3 h-3" /> FAIL
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sample Request Payload */}
          {selectedEndpoint.payloadSnippet && (
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-[#66707D] block font-bold">
                Sample Captured Request
              </span>
              <pre className="p-3 bg-[#E4E9F2] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_3px_rgba(160,170,185,0.3)] text-[11px] font-mono text-[#1E293B] overflow-x-auto leading-relaxed font-semibold">
                {selectedEndpoint.payloadSnippet}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
