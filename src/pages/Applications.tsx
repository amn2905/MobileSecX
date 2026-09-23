import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Apple,
  Search,
  Filter,
  Plus,
  Play,
  FileText,
  ExternalLink,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Grid,
  List,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Application } from '../types';

export const Applications: React.FC = () => {
  const navigate = useNavigate();
  const { applications, startScan, deleteApplication } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'ALL' | 'Android' | 'iOS'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'ALL' || app.platform === platformFilter;
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleStartScan = (app: Application) => {
    const scanId = startScan(app.id, 'Full Security Assessment');
    navigate(`/scans/${scanId}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Target Inventory
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Mobile Applications ({applications.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Manage your Android (APK, AAB) and iOS (IPA) application testing targets.
          </p>
        </div>

        <button
          onClick={() => navigate('/upload')}
          className="skeuo-btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="skeuo-raised p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search by name, package, bundle ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skeuo-input w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg placeholder-[#8E9AAB]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value as any)}
              className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
            >
              <option value="ALL">All Platforms</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Risk Detected">Risk Detected</option>
            </select>
          </div>

          {/* Grid / Table Toggle */}
          <div className="skeuo-segmented-container flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'grid'
                  ? 'skeuo-segmented-active'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'table'
                  ? 'skeuo-segmented-active'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Applications Display */}
      {filteredApps.length === 0 ? (
        <div className="skeuo-raised text-center p-12 rounded-2xl">
          <Smartphone className="w-10 h-10 text-[#8E9AAB] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#1E293B]">No Applications Found</h3>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            No applications match your search criteria. Try modifying your filters or upload a new binary.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="skeuo-btn-primary mt-4 px-4 py-2 rounded-xl text-xs"
          >
            Upload New App
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate(`/applications/${app.id}`)}
              className="skeuo-raised p-5 rounded-2xl skeuo-raised-hover cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Platform */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E2E7F0] border border-[#CBD5E1] shadow-[2.5px_2.5px_6px_rgba(166,176,195,0.35),-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] flex items-center justify-center text-[#1D4ED8] font-bold text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                      {app.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E293B] text-base group-hover:text-[#2563EB] transition">
                        {app.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#64748B] block truncate max-w-[170px]">
                        {app.packageName}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold border ${
                      app.status === 'Completed'
                        ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC] shadow-[1px_1px_2px_rgba(22,163,74,0.15)]'
                        : 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D] shadow-[1px_1px_2px_rgba(217,119,6,0.15)]'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Metadata Details */}
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)] text-[11px] font-mono mb-4">
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Platform</span>
                    <span className="text-[#1E293B] font-bold flex items-center gap-1 mt-0.5">
                      {app.platform === 'Android' ? (
                        <Smartphone className="w-3 h-3 text-[#16A34A]" />
                      ) : (
                        <Apple className="w-3 h-3 text-[#475569]" />
                      )}
                      {app.platform} ({app.fileType})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[10px]">Version</span>
                    <span className="text-[#1E293B] font-bold mt-0.5 block">
                      {app.version} · {app.fileSize}
                    </span>
                  </div>
                </div>

                {/* Security Score Meter */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#475569] font-semibold">Security Score</span>
                    <span
                      className={`font-mono font-bold ${
                        app.securityScore >= 80
                          ? 'text-[#16A34A]'
                          : app.securityScore >= 65
                          ? 'text-[#D97706]'
                          : 'text-[#DC2626]'
                      }`}
                    >
                      {app.securityScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.4)]">
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

                {/* Vulnerability Badges */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono mb-4">
                  <span className="px-2 py-0.5 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] font-bold">
                    {app.vulnerabilitiesCount.critical} Critical
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74] font-bold">
                    {app.vulnerabilitiesCount.high} High
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#E2E8F0] text-[#475569] border border-[#CBD5E1] ml-auto font-medium">
                    {app.vulnerabilitiesCount.total} Flaws
                  </span>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="pt-3 border-t border-[#E1E6EE] flex items-center justify-between gap-2"
              >
                <button
                  onClick={() => handleStartScan(app)}
                  className="skeuo-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs text-[#1D4ED8]"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Scan</span>
                </button>

                <button
                  onClick={() => navigate(`/reports?appId=${app.id}`)}
                  className="skeuo-btn p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B]"
                  title="View Security Reports"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteApplication(app.id)}
                  className="skeuo-btn p-1.5 rounded-lg text-[#8E9AAB] hover:text-[#DC2626]"
                  title="Delete Application"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="skeuo-raised rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#E9EEF5] text-[#475569] font-mono uppercase border-b border-[#D5DAE1] text-[10px]">
              <tr>
                <th className="px-6 py-3.5">Application</th>
                <th className="px-4 py-3.5">Platform</th>
                <th className="px-4 py-3.5">Version</th>
                <th className="px-4 py-3.5">Security Score</th>
                <th className="px-4 py-3.5">Vulnerabilities</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-sans bg-[#FAFBFD]">
              {filteredApps.map((app) => (
                <tr
                  key={app.id}
                  onClick={() => navigate(`/applications/${app.id}`)}
                  className="hover:bg-[#EDF2F8] transition cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#FFFFFF] to-[#E2E7F0] border border-[#CBD5E1] shadow-[1.5px_1.5px_3px_rgba(166,176,195,0.3)] flex items-center justify-center text-[#1D4ED8] font-bold text-xs flex-shrink-0">
                        {app.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-[#1E293B] block">{app.name}</span>
                        <span className="text-[10px] font-mono text-[#64748B] truncate max-w-[200px] block">
                          {app.packageName}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-[#334155]">
                    {app.platform} ({app.fileType})
                  </td>
                  <td className="px-4 py-4 font-mono text-[#334155]">{app.version}</td>
                  <td className="px-4 py-4 font-mono font-bold text-[#2563EB]">
                    {app.securityScore}/100
                  </td>
                  <td className="px-4 py-4 font-mono">
                    <span className="text-[#DC2626] font-bold">{app.vulnerabilitiesCount.critical} Crit</span>
                    <span className="text-[#64748B] ml-1">/ {app.vulnerabilitiesCount.total} total</span>
                  </td>
                  <td className="px-4 py-4 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                        app.status === 'Completed'
                          ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                          : 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-end gap-2"
                    >
                      <button
                        onClick={() => handleStartScan(app)}
                        className="skeuo-btn p-1.5 rounded-lg text-[#2563EB]"
                        title="Scan"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/applications/${app.id}`)}
                        className="skeuo-btn p-1.5 rounded-lg text-[#475569]"
                        title="Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
