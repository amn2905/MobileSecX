import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Apple,
  Shield,
  Play,
  FileText,
  Code2,
  Copy,
  Check,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  History,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SeverityBadge } from '../components/common/SeverityBadge';

export const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { applications, scans, vulnerabilities, startScan } = useAppStore();

  const [copiedHash, setCopiedHash] = useState(false);

  const app = applications.find((a) => a.id === id) || applications[0];

  const appScans = scans.filter((s) => s.applicationId === app.id);
  const appVulns = vulnerabilities.filter((v) => v.applicationId === app.id || v.application === app.name);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(app.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleStartScan = () => {
    const scanId = startScan(app.id, 'Full Security Assessment');
    navigate(`/scans/${scanId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back Button & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#1E293B] font-semibold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/reverse-engineering?appId=${app.id}`)}
            className="skeuo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#334155]"
          >
            <Code2 className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Reverse Engineering</span>
          </button>
          <button
            onClick={handleStartScan}
            className="skeuo-btn-primary flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Start Assessment</span>
          </button>
        </div>
      </div>

      {/* Main Metadata Banner */}
      <div className="skeuo-raised p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FFFFFF] to-[#E2E7F0] border border-[#CBD5E1] shadow-[3px_3px_8px_rgba(166,176,195,0.4),-2px_-2px_6px_rgba(255,255,255,0.95)] flex items-center justify-center text-[#1D4ED8] font-black text-2xl flex-shrink-0">
              {app.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-extrabold text-[#1E293B] tracking-tight">
                  {app.name}
                </h1>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#E2E8F0] text-[#1D4ED8] border border-[#CBD5E1]">
                  {app.version}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold border ${
                    app.status === 'Completed'
                      ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                      : 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <span className="text-xs font-mono text-[#64748B] mt-1 block">
                {app.packageName}
              </span>

              {/* Hashes & File Details */}
              <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-[#64748B] flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#E8EDF4] px-2.5 py-1 rounded-lg border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB]">SHA-256:</span>
                  <span className="text-[#1E293B] font-bold truncate max-w-[200px] sm:max-w-[280px]">
                    {app.sha256}
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="ml-1 text-[#64748B] hover:text-[#1E293B]"
                    title="Copy full SHA-256 hash"
                  >
                    {copiedHash ? (
                      <Check className="w-3 h-3 text-[#16A34A]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <span className="bg-[#E8EDF4] px-2.5 py-1 rounded-lg border border-[#CBD5E1] text-[#334155] font-semibold">
                  Size: {app.fileSize}
                </span>
                <span className="bg-[#E8EDF4] px-2.5 py-1 rounded-lg border border-[#CBD5E1] text-[#334155] font-semibold">
                  Target: {app.targetSdk || 'API 34'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-[#E8EDF4] p-4 rounded-xl border border-[#CBD5E1] shadow-[inset_1.5px_1.5px_3px_rgba(160,170,185,0.3)] self-start lg:self-auto">
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-mono text-[#64748B] block font-bold">
                Security Score
              </span>
              <span
                className={`text-2xl font-mono font-black ${
                  app.securityScore >= 80
                    ? 'text-[#16A34A]'
                    : app.securityScore >= 65
                    ? 'text-[#D97706]'
                    : 'text-[#DC2626]'
                }`}
              >
                {app.securityScore}
              </span>
            </div>
            <div className="h-8 w-px bg-[#CBD5E1]" />
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-mono text-[#64748B] block font-bold">
                Critical
              </span>
              <span className="text-2xl font-mono font-black text-[#DC2626]">
                {app.vulnerabilitiesCount.critical}
              </span>
            </div>
            <div className="h-8 w-px bg-[#CBD5E1]" />
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-mono text-[#64748B] block font-bold">
                Total Flaws
              </span>
              <span className="text-2xl font-mono font-black text-[#1E293B]">
                {app.vulnerabilitiesCount.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Components & Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Architecture Breakdown */}
        <div className="skeuo-raised p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#66707D] font-bold">
                Structural Topology
              </span>
              <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
                Package Components
              </h3>
            </div>
            <Layers className="w-5 h-5 text-[#2563EB]" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.25)] text-center">
              <span className="text-xl font-mono font-extrabold text-[#2563EB] block">
                {app.components.activities}
              </span>
              <span className="text-xs text-[#64748B] mt-1 block font-medium">Activities</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.25)] text-center">
              <span className="text-xl font-mono font-extrabold text-[#4F46E5] block">
                {app.components.services}
              </span>
              <span className="text-xs text-[#64748B] mt-1 block font-medium">Services</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.25)] text-center">
              <span className="text-xl font-mono font-extrabold text-[#D97706] block">
                {app.components.receivers}
              </span>
              <span className="text-xs text-[#64748B] mt-1 block font-medium">Receivers</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.25)] text-center">
              <span className="text-xl font-mono font-extrabold text-[#16A34A] block">
                {app.components.providers}
              </span>
              <span className="text-xs text-[#64748B] mt-1 block font-medium">Content Providers</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] text-xs font-mono text-[#475569]">
            <span className="text-[#8E9AAB] block text-[10px] font-bold">Entry Point (Main Activity):</span>
            <span className="text-[#1D4ED8] font-bold break-all">{app.mainActivity || 'Not Specified'}</span>
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="skeuo-raised p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#66707D] font-bold">
                Security Privileges
              </span>
              <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
                Declared Permissions ({app.permissions.length})
              </h3>
            </div>
            <Lock className="w-5 h-5 text-[#D97706]" />
          </div>

          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
            {app.permissions.map((perm) => {
              const isDangerous =
                perm.includes('STORAGE') ||
                perm.includes('CAMERA') ||
                perm.includes('LOCATION') ||
                perm.includes('ALERT_WINDOW') ||
                perm.includes('Health');

              return (
                <div
                  key={perm}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border flex items-center gap-2 ${
                    isDangerous
                      ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5] shadow-[1px_1px_3px_rgba(220,38,38,0.15)] font-bold'
                      : 'bg-[#FAFBFD] text-[#334155] border-[#CBD5E1] shadow-[1px_1px_3px_rgba(166,176,195,0.2)]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDangerous ? 'bg-[#DC2626]' : 'bg-[#94A3B8]'
                    }`}
                  />
                  <span>{perm}</span>
                  {isDangerous && (
                    <span className="text-[9px] uppercase font-extrabold text-[#DC2626] tracking-wider">
                      DANGEROUS
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Linked Vulnerabilities List */}
      <div className="skeuo-raised p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#66707D] font-bold">
              Security Findings
            </span>
            <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
              Identified Vulnerabilities ({appVulns.length})
            </h3>
          </div>
          <button
            onClick={() => navigate(`/vulnerabilities?app=${encodeURIComponent(app.name)}`)}
            className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition"
          >
            View in Findings Matrix →
          </button>
        </div>

        {appVulns.length === 0 ? (
          <div className="text-center py-8 text-[#8E9AAB] text-xs font-medium">
            No vulnerabilities registered for this application.
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {appVulns.map((vuln) => (
              <div
                key={vuln.id}
                onClick={() => navigate(`/vulnerabilities/${vuln.id}`)}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#EDF2F8] px-2 rounded-xl transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <SeverityBadge severity={vuln.severity} size="sm" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1E293B] group-hover:text-[#2563EB] transition truncate">
                      {vuln.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#64748B] truncate block">
                      {vuln.affectedComponent} · {vuln.owaspId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono font-extrabold text-[#334155]">
                    CVSS {vuln.cvss}
                  </span>
                  <span className="text-xs font-bold text-[#64748B] group-hover:text-[#2563EB] transition">
                    Inspect →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
