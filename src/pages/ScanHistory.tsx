import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  GitCompare,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Smartphone,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Scan } from '../types';
import { Modal } from '../components/common/Modal';

export const ScanHistory: React.FC = () => {
  const navigate = useNavigate();
  const { scans } = useAppStore();

  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedScan1, setSelectedScan1] = useState<Scan>(scans[0]);
  const [selectedScan2, setSelectedScan2] = useState<Scan>(scans[scans.length - 1] || scans[0]);

  const handleOpenCompare = (scan: Scan) => {
    setSelectedScan1(scan);
    const otherScan = scans.find((s) => s.id !== scan.id) || scans[0];
    setSelectedScan2(otherScan);
    setCompareModalOpen(true);
  };

  const scoreDiff = (selectedScan1?.securityScore || 0) - (selectedScan2?.securityScore || 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-blue-600 tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200">
              Audit Logs & Traceability
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1E293B] tracking-tight">
            Security Scan History
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Historical assessment logs, differential comparisons, and compliance tracking over time.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedScan1(scans[0]);
            setSelectedScan2(scans[scans.length - 1] || scans[0]);
            setCompareModalOpen(true);
          }}
          className="skeuo-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#1E293B] self-start sm:self-auto"
        >
          <GitCompare className="w-4 h-4 text-blue-600" />
          <span>Compare Scans</span>
        </button>
      </div>

      {/* Scans Table */}
      <div className="skeuo-raised rounded-2xl border border-[#D5DAE1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#E9EEF5] text-[#475569] font-mono uppercase text-[10px] border-b border-[#D5DAE1]">
              <tr>
                <th className="px-6 py-3.5 font-bold tracking-wider">Scan ID</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Application</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Date</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Scan Type</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Duration</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Findings</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Security Score</th>
                <th className="px-4 py-3.5 font-bold tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right font-bold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-sans">
              {scans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => navigate(`/scans/${scan.id}`)}
                  className="hover:bg-[#F1F5F9]/80 transition cursor-pointer group"
                >
                  <td className="px-6 py-4 font-mono font-bold text-blue-600 group-hover:underline">
                    {scan.id}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-[#1E293B] group-hover:text-blue-600 transition block">
                      {scan.applicationName}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B]">
                      {scan.platform}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono text-[#64748B] text-[11px]">
                    {scan.startedAt}
                  </td>
                  <td className="px-4 py-4 font-mono text-[#334155] font-medium">
                    {scan.scanType}
                  </td>
                  <td className="px-4 py-4 font-mono text-[#64748B] text-[11px]">
                    {scan.duration || 'Running'}
                  </td>
                  <td className="px-4 py-4 font-mono">
                    <span className="text-rose-600 font-bold">
                      {scan.findingsCount.critical} Crit
                    </span>
                    <span className="text-[#64748B] ml-1">
                      / {scan.findingsCount.high + scan.findingsCount.medium} others
                    </span>
                  </td>
                  <td className="px-4 py-4 font-mono font-black text-emerald-600">
                    {scan.securityScore}/100
                  </td>
                  <td className="px-4 py-4 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border shadow-xs ${
                        scan.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-blue-50 text-blue-700 border-blue-300 animate-pulse'
                      }`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-end gap-2"
                    >
                      <button
                        onClick={() => navigate(`/scans/${scan.id}`)}
                        className="skeuo-btn p-1.5 rounded-lg text-[#64748B] hover:text-blue-600 transition"
                        title="View Scan"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenCompare(scan)}
                        className="skeuo-btn p-1.5 rounded-lg text-blue-600 hover:text-blue-800 transition"
                        title="Compare with another scan"
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/reports?scanId=${scan.id}`)}
                        className="skeuo-btn p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B] transition"
                        title="View Report"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Differential Scan Comparison Modal */}
      {compareModalOpen && selectedScan1 && selectedScan2 && (
        <Modal
          isOpen={true}
          onClose={() => setCompareModalOpen(false)}
          title={`Scan Diff: ${selectedScan1.id} vs ${selectedScan2.id}`}
          subtitle="Differential vulnerability triaging and score progression"
          maxWidth="3xl"
        >
          <div className="space-y-6">
            {/* Header Comparison Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="skeuo-recessed p-4 rounded-xl border border-[#D5DAE1] space-y-2 bg-[#EEF2F6]">
                <span className="text-[10px] font-mono text-blue-600 uppercase font-black tracking-wider">
                  Target Scan A (Current)
                </span>
                <h4 className="text-sm font-bold text-[#1E293B]">{selectedScan1.id}</h4>
                <div className="text-xs font-mono text-[#64748B]">
                  App: <span className="text-[#1E293B] font-semibold">{selectedScan1.applicationName}</span>
                </div>
                <div className="text-xl font-mono font-black text-emerald-600">
                  Score: {selectedScan1.securityScore} / 100
                </div>
              </div>

              <div className="skeuo-recessed p-4 rounded-xl border border-[#D5DAE1] space-y-2 bg-[#EEF2F6]">
                <span className="text-[10px] font-mono text-[#64748B] uppercase font-black tracking-wider">
                  Baseline Scan B (Previous)
                </span>
                <h4 className="text-sm font-bold text-[#1E293B]">{selectedScan2.id}</h4>
                <div className="text-xs font-mono text-[#64748B]">
                  App: <span className="text-[#1E293B] font-semibold">{selectedScan2.applicationName}</span>
                </div>
                <div className="text-xl font-mono font-black text-[#475569]">
                  Score: {selectedScan2.securityScore} / 100
                </div>
              </div>
            </div>

            {/* Score Delta Banner */}
            <div className="skeuo-raised p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center justify-between font-mono text-xs">
              <span className="text-[#334155] font-semibold">Security Score Change:</span>
              <div className="flex items-center gap-2 font-bold text-sm">
                {scoreDiff >= 0 ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-black">
                    <TrendingUp className="w-4 h-4" /> +{scoreDiff} Points Improvement
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1 font-black">
                    <TrendingDown className="w-4 h-4" /> {scoreDiff} Points Regression
                  </span>
                )}
              </div>
            </div>

            {/* Differential Status Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
              <div className="skeuo-raised p-3 bg-rose-50/60 border border-rose-200 rounded-xl">
                <span className="text-2xl font-black text-rose-600 block">+1</span>
                <span className="text-[#64748B] text-[11px] font-medium mt-1 block">New Flaws Detected</span>
              </div>
              <div className="skeuo-raised p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <span className="text-2xl font-black text-emerald-600 block">-2</span>
                <span className="text-[#64748B] text-[11px] font-medium mt-1 block">Resolved Flaws</span>
              </div>
              <div className="skeuo-raised p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
                <span className="text-2xl font-black text-amber-600 block">4</span>
                <span className="text-[#64748B] text-[11px] font-medium mt-1 block">Persistent Flaws</span>
              </div>
            </div>

            {/* Vulnerability Diff List */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#475569] font-bold block">
                Differential Finding Log
              </span>
              <div className="divide-y divide-[#D5DAE1] font-mono text-xs border border-[#D5DAE1] rounded-xl overflow-hidden skeuo-recessed bg-[#FAFBFD]">
                <div className="p-3 bg-rose-50/70 flex items-center justify-between">
                  <span className="text-rose-700 font-bold">[NEW] Hardcoded API Secret Key</span>
                  <span className="text-[10px] text-[#64748B] font-mono">ApiClient.java</span>
                </div>
                <div className="p-3 bg-emerald-50/70 flex items-center justify-between">
                  <span className="text-emerald-700 font-bold">[RESOLVED] Cleartext HTTP Traffic</span>
                  <span className="text-[10px] text-[#64748B] font-mono">network_security_config.xml</span>
                </div>
                <div className="p-3 bg-amber-50/70 flex items-center justify-between">
                  <span className="text-amber-800 font-bold">[PERSISTENT] Insecure SharedPreferences</span>
                  <span className="text-[10px] text-[#64748B] font-mono">SessionManager.java</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
