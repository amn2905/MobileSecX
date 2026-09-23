import React, { useState } from 'react';
import {
  Download,
  Eye,
  FileCheck,
  Sparkles,
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { mockReports } from '../data/mockData';
import { SecurityReport } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';

export const Reports: React.FC = () => {
  const [reports] = useState<SecurityReport[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleGeneratePdf = (rep: SecurityReport) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSuccessToast(`PDF Generated for ${rep.type} (${rep.application})`);
      setTimeout(() => setSuccessToast(null), 3500);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Reporting & Audit Export
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Security Assessment Reports
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Generate executive briefings, technical vulnerability exports, and OWASP MASVS compliance certificates.
          </p>
        </div>

        <button
          onClick={() => handleGeneratePdf(reports[0])}
          disabled={isGenerating}
          className="skeuo-btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs self-start sm:self-auto disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Generating PDF Document...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate New Report</span>
            </>
          )}
        </button>
      </div>

      {/* Success Notification Toast */}
      {successToast && (
        <div className="p-4 rounded-xl bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-xs font-mono font-bold flex items-center gap-2.5 shadow-[2px_2px_6px_rgba(22,163,74,0.15)] animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* 4 Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="skeuo-raised p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#FAFBFD] to-[#E2E8F0] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.3)] flex items-center justify-center text-[#2563EB]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B] tracking-tight">{rep.type}</h3>
                    <span className="text-[11px] font-mono text-[#64748B] block mt-0.5">
                      Target: <strong className="text-[#1E293B]">{rep.application}</strong>
                    </span>
                  </div>
                </div>
                <RiskBadge risk={rep.riskLevel} size="sm" />
              </div>

              {/* Report Stats */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)] font-mono text-xs my-4">
                <div>
                  <span className="text-[#64748B] text-[10px] block font-bold">Scan ID</span>
                  <span className="text-[#1E293B] font-bold truncate block mt-0.5">{rep.scanId}</span>
                </div>
                <div>
                  <span className="text-[#64748B] text-[10px] block font-bold">Generated</span>
                  <span className="text-[#334155] block mt-0.5 font-medium">{rep.generatedDate}</span>
                </div>
                <div>
                  <span className="text-[#64748B] text-[10px] block font-bold">Security Score</span>
                  <span className="text-[#2563EB] font-black block mt-0.5">
                    {rep.securityScore}/100
                  </span>
                </div>
              </div>

              {/* Findings Summary Pills */}
              <div className="flex items-center gap-2 text-[10px] font-mono mb-4">
                <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] font-bold">
                  {rep.findingsCount.critical} Critical
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74] font-bold">
                  {rep.findingsCount.high} High
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] font-bold">
                  {rep.findingsCount.medium} Med
                </span>
                <span className="text-[#64748B] ml-auto font-medium">{rep.downloadSize}</span>
              </div>
            </div>

            {/* Tactile Card Buttons with Pressed States */}
            <div className="pt-4 border-t border-[#E1E6EE] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedReport(rep)}
                className="skeuo-btn flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs text-[#334155]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Report</span>
              </button>

              <button
                onClick={() => handleGeneratePdf(rep)}
                className="skeuo-btn flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs text-[#2563EB]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReport(null)}
          title={`${selectedReport.type}`}
          subtitle={`Generated on ${selectedReport.generatedDate} · ID: ${selectedReport.id}`}
          maxWidth="3xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-mono text-[#64748B] font-medium">
                Official Report Document ({selectedReport.downloadSize})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="skeuo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    handleGeneratePdf(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="skeuo-btn-primary flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-6 text-[#20242B]">
            {/* Header Section */}
            <div className="p-4 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#64748B] font-bold">TARGET APPLICATION</span>
                <h4 className="text-lg font-black text-[#1E293B] mt-0.5">{selectedReport.application}</h4>
                <span className="text-xs font-mono text-[#2563EB] font-bold">{selectedReport.scanId}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#64748B] font-bold">SECURITY SCORE</span>
                <div className="text-2xl font-mono font-black text-[#16A34A] mt-0.5">
                  {selectedReport.securityScore} / 100
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[#2563EB]">
                1. Executive Summary
              </h4>
              <p className="text-xs leading-relaxed text-[#334155] font-medium">
                A security assessment was performed against {selectedReport.application} utilizing automated static bytecode decompilation, heuristic secrets detection, dynamic instrumentation with Frida 16.2.1, and live API interception. The application demonstrates a{' '}
                <strong className="text-[#D97706] font-bold">{selectedReport.riskLevel} risk level</strong>, identifying vulnerabilities that require remediation prior to production certification.
              </p>
            </div>

            {/* Findings Breakdown Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[#2563EB]">
                2. Key Vulnerability Findings
              </h4>
              <div className="border border-[#CBD5E1] rounded-xl overflow-hidden font-mono text-xs shadow-[1px_1px_3px_rgba(166,176,195,0.2)]">
                <table className="w-full text-left">
                  <thead className="bg-[#E9EEF5] text-[#475569] text-[10px] uppercase font-bold">
                    <tr>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">OWASP MASVS</th>
                      <th className="p-3">CVSS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] bg-[#FAFBFD]">
                    <tr>
                      <td className="p-3 text-[#DC2626] font-bold">CRITICAL</td>
                      <td className="p-3 text-[#1E293B] font-bold">Hardcoded Production API Secret</td>
                      <td className="p-3 text-[#64748B]">M1 Improper Credential</td>
                      <td className="p-3 text-[#DC2626] font-bold">9.1</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#EA580C] font-bold">HIGH</td>
                      <td className="p-3 text-[#1E293B] font-bold">Plaintext SharedPreferences Storage</td>
                      <td className="p-3 text-[#64748B]">M9 Insecure Storage</td>
                      <td className="p-3 text-[#EA580C] font-bold">7.5</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-[#EA580C] font-bold">HIGH</td>
                      <td className="p-3 text-[#1E293B] font-bold">Unprotected Exported Activity</td>
                      <td className="p-3 text-[#64748B]">M8 Security Misconfig</td>
                      <td className="p-3 text-[#EA580C] font-bold">7.2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
