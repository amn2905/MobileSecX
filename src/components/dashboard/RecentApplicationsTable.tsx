import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Smartphone,
  Apple,
  ExternalLink,
  Play,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Application } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface RecentApplicationsTableProps {
  applications: Application[];
}

export const RecentApplicationsTable: React.FC<RecentApplicationsTableProps> = ({
  applications,
}) => {
  const navigate = useNavigate();
  const { startScan } = useAppStore();

  const handleQuickScan = (e: React.MouseEvent, app: Application) => {
    e.stopPropagation();
    const scanId = startScan(app.id, 'Full Security Assessment');
    navigate(`/scans/${scanId}`);
  };

  return (
    <div className="skeuo-raised rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center justify-between p-6 border-b border-[#D5DAE1] bg-gradient-to-b from-[#FAFBFD] to-[#F1F4F9]">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#66707D] font-bold">
            Target Inventory
          </span>
          <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
            Recent Applications
          </h3>
        </div>
        <Link
          to="/applications"
          className="flex items-center gap-1.5 text-xs text-[#2563EB] hover:text-[#1D4ED8] font-bold transition"
        >
          <span>View All ({applications.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table Data View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#E9EEF5] text-[#475569] font-mono uppercase border-b border-[#D5DAE1] text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-3.5">Application</th>
              <th className="px-4 py-3.5">Platform</th>
              <th className="px-4 py-3.5">Version</th>
              <th className="px-4 py-3.5">Last Scan</th>
              <th className="px-4 py-3.5">Security Score</th>
              <th className="px-4 py-3.5">Vulnerabilities</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] font-sans bg-[#FAFBFD]">
            {applications.slice(0, 5).map((app) => (
              <tr
                key={app.id}
                onClick={() => navigate(`/applications/${app.id}`)}
                className="hover:bg-[#EDF2F8] transition cursor-pointer group"
              >
                {/* Application Name & Package */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E2E7F0] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.3),-1px_-1px_3px_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1E40AF] font-bold text-xs flex-shrink-0">
                      {app.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-[#1E293B] group-hover:text-[#2563EB] transition block">
                        {app.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B] truncate max-w-[170px] block">
                        {app.packageName}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Platform */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5 font-mono">
                    {app.platform === 'Android' ? (
                      <Smartphone className="w-3.5 h-3.5 text-[#16A34A]" />
                    ) : (
                      <Apple className="w-3.5 h-3.5 text-[#475569]" />
                    )}
                    <span className="text-[#334155] font-semibold">{app.platform}</span>
                    <span className="text-[10px] px-1 py-0.2 rounded bg-[#E2E8F0] text-[#475569] border border-[#CBD5E1]">
                      {app.fileType}
                    </span>
                  </div>
                </td>

                {/* Version */}
                <td className="px-4 py-4 font-mono text-[#334155] font-medium">{app.version}</td>

                {/* Last Scan */}
                <td className="px-4 py-4 text-[#64748B] font-mono text-[11px]">
                  {app.lastScanDate}
                </td>

                {/* Security Score */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold text-sm ${
                        app.securityScore >= 80
                          ? 'text-[#16A34A]'
                          : app.securityScore >= 65
                          ? 'text-[#D97706]'
                          : 'text-[#DC2626]'
                      }`}
                    >
                      {app.securityScore}
                    </span>
                    <div className="w-16 h-2 bg-[#E2E8F0] rounded-full overflow-hidden border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.4)]">
                      <div
                        className={`h-full rounded-full ${
                          app.securityScore >= 80
                            ? 'bg-gradient-to-r from-[#22C55E] to-[#15803D]'
                            : app.securityScore >= 65
                            ? 'bg-gradient-to-r from-[#F59E0B] to-[#B45309]'
                            : 'bg-gradient-to-r from-[#EF4444] to-[#B91C1C]'
                        }`}
                        style={{ width: `${app.securityScore}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Vulnerabilities */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="px-1.5 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] text-[10px] font-bold">
                      {app.vulnerabilitiesCount.critical} Crit
                    </span>
                    <span className="text-[#64748B] text-xs">
                      {app.vulnerabilitiesCount.total} total
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono uppercase font-bold border ${
                      app.status === 'Completed'
                        ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC] shadow-[1px_1px_2px_rgba(22,163,74,0.15)]'
                        : app.status === 'Risk Detected'
                        ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] shadow-[1px_1px_2px_rgba(217,119,6,0.15)]'
                        : 'bg-[#DBEAFE] text-[#1E40AF] border-[#93C5FD] shadow-[1px_1px_2px_rgba(37,99,235,0.15)]'
                    }`}
                  >
                    {app.status === 'Completed' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {app.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/applications/${app.id}`);
                      }}
                      className="skeuo-btn p-1.5 rounded-lg text-[#475569] hover:text-[#1E293B]"
                      title="View Details"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleQuickScan(e, app)}
                      className="skeuo-btn p-1.5 rounded-lg text-[#2563EB] hover:text-[#1D4ED8]"
                      title="Trigger Scan"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reports?appId=${app.id}`);
                      }}
                      className="skeuo-btn p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B]"
                      title="Reports"
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
  );
};
