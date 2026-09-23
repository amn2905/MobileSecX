import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SeverityBadge } from '../components/common/SeverityBadge';

export const Vulnerabilities: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { vulnerabilities, applications } = useAppStore();

  const defaultSeverity = searchParams.get('severity') || 'ALL';
  const defaultApp = searchParams.get('app') || 'ALL';

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [severityFilter, setSeverityFilter] = useState<string>(defaultSeverity);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [appFilter, setAppFilter] = useState<string>(defaultApp);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [owaspFilter, setOwaspFilter] = useState<string>('ALL');

  // Categories list
  const categories = useMemo(() => {
    return Array.from(new Set(vulnerabilities.map((v) => v.category)));
  }, [vulnerabilities]);

  // OWASP categories list
  const owaspCategories = useMemo(() => {
    return Array.from(new Set(vulnerabilities.map((v) => v.owaspCategory)));
  }, [vulnerabilities]);

  // Filtered vulnerabilities
  const filteredVulns = useMemo(() => {
    return vulnerabilities.filter((v) => {
      const matchesSearch =
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.affectedComponent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.owaspId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter === 'ALL' || v.severity === severityFilter;
      const matchesCategory = categoryFilter === 'ALL' || v.category === categoryFilter;
      const matchesApp = appFilter === 'ALL' || v.application === appFilter;
      const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
      const matchesOwasp = owaspFilter === 'ALL' || v.owaspCategory === owaspFilter;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesCategory &&
        matchesApp &&
        matchesStatus &&
        matchesOwasp
      );
    });
  }, [
    vulnerabilities,
    searchTerm,
    severityFilter,
    categoryFilter,
    appFilter,
    statusFilter,
    owaspFilter,
  ]);

  const severityCounts = useMemo(() => {
    return {
      CRITICAL: vulnerabilities.filter((v) => v.severity === 'CRITICAL').length,
      HIGH: vulnerabilities.filter((v) => v.severity === 'HIGH').length,
      MEDIUM: vulnerabilities.filter((v) => v.severity === 'MEDIUM').length,
      LOW: vulnerabilities.filter((v) => v.severity === 'LOW').length,
    };
  }, [vulnerabilities]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Vulnerability Findings
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Security Findings Catalog ({filteredVulns.length})
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Triage, analyze technical evidence, and remediate identified mobile application flaws.
          </p>
        </div>

        {/* Tactile Severity Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSeverityFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              severityFilter === 'ALL'
                ? 'bg-gradient-to-b from-[#FAFBFD] to-[#E2E8F0] text-[#1E293B] border-[#94A3B8] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.4)]'
                : 'skeuo-btn text-[#64748B]'
            }`}
          >
            All ({vulnerabilities.length})
          </button>
          <button
            onClick={() => setSeverityFilter('CRITICAL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              severityFilter === 'CRITICAL'
                ? 'bg-gradient-to-b from-[#FEE2E2] to-[#FED7D7] text-[#991B1B] border-[#F87171] shadow-[inset_1px_1px_2px_rgba(220,38,38,0.25)]'
                : 'bg-[#FAFBFD] text-[#991B1B] border-[#FCA5A5] shadow-[1px_1px_3px_rgba(220,38,38,0.15)] hover:bg-[#FEE2E2]'
            }`}
          >
            {severityCounts.CRITICAL} Critical
          </button>
          <button
            onClick={() => setSeverityFilter('HIGH')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              severityFilter === 'HIGH'
                ? 'bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA] text-[#9A3412] border-[#FB923C] shadow-[inset_1px_1px_2px_rgba(234,88,12,0.25)]'
                : 'bg-[#FAFBFD] text-[#9A3412] border-[#FDBA74] shadow-[1px_1px_3px_rgba(234,88,12,0.15)] hover:bg-[#FFEDD5]'
            }`}
          >
            {severityCounts.HIGH} High
          </button>
          <button
            onClick={() => setSeverityFilter('MEDIUM')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
              severityFilter === 'MEDIUM'
                ? 'bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] text-[#92400E] border-[#FBBF24] shadow-[inset_1px_1px_2px_rgba(217,119,6,0.25)]'
                : 'bg-[#FAFBFD] text-[#92400E] border-[#FCD34D] shadow-[1px_1px_3px_rgba(217,119,6,0.15)] hover:bg-[#FEF3C7]'
            }`}
          >
            {severityCounts.MEDIUM} Medium
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="skeuo-raised p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search title, component, or OWASP ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="skeuo-input w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg placeholder-[#8E9AAB]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
          >
            <option value="ALL">Severity: All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Application Filter */}
          <select
            value={appFilter}
            onChange={(e) => setAppFilter(e.target.value)}
            className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
          >
            <option value="ALL">App: All Targets</option>
            {applications.map((app) => (
              <option key={app.id} value={app.name}>
                {app.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
          >
            <option value="ALL">Category: All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* OWASP Category Filter */}
          <select
            value={owaspFilter}
            onChange={(e) => setOwaspFilter(e.target.value)}
            className="skeuo-input text-xs font-mono rounded-lg py-1.5 px-2.5 text-[#334155]"
          >
            <option value="ALL">OWASP: All</option>
            {owaspCategories.map((oc) => (
              <option key={oc} value={oc}>
                {oc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tactile Findings Table */}
      <div className="skeuo-raised rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#E9EEF5] text-[#475569] font-mono uppercase border-b border-[#D5DAE1] text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Severity</th>
                <th className="px-4 py-3.5">Vulnerability Title</th>
                <th className="px-4 py-3.5">Application</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">CVSS</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Detected</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-sans bg-[#FAFBFD]">
              {filteredVulns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-[#8E9AAB] text-xs font-medium">
                    No vulnerabilities match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredVulns.map((vuln) => (
                  <tr
                    key={vuln.id}
                    onClick={() => navigate(`/vulnerabilities/${vuln.id}`)}
                    className="hover:bg-[#EDF2F8] transition cursor-pointer group"
                  >
                    {/* Severity */}
                    <td className="px-6 py-4">
                      <SeverityBadge severity={vuln.severity} size="sm" />
                    </td>

                    {/* Vulnerability Title & ID */}
                    <td className="px-4 py-4">
                      <div>
                        <span className="font-bold text-[#1E293B] group-hover:text-[#2563EB] transition block">
                          {vuln.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B] truncate max-w-[240px] block">
                          {vuln.affectedComponent}
                        </span>
                      </div>
                    </td>

                    {/* Application */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#1E293B] block">{vuln.application}</span>
                      <span className="text-[10px] font-mono text-[#2563EB] font-bold">{vuln.owaspId}</span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 text-[#475569] font-mono text-[11px] font-medium">
                      {vuln.category}
                    </td>

                    {/* CVSS */}
                    <td className="px-4 py-4 font-mono">
                      <span
                        className={`font-black px-2 py-0.5 rounded-md text-xs border ${
                          vuln.cvss >= 9.0
                            ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
                            : vuln.cvss >= 7.0
                            ? 'bg-[#FFEDD5] text-[#9A3412] border-[#FDBA74]'
                            : 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]'
                        }`}
                      >
                        {vuln.cvss}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 font-mono">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                          vuln.status === 'OPEN'
                            ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]'
                            : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                        }`}
                      >
                        {vuln.status}
                      </span>
                    </td>

                    {/* Detected Date */}
                    <td className="px-4 py-4 text-[#64748B] font-mono text-[11px]">
                      {vuln.detectedDate.split(' ')[0]}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/vulnerabilities/${vuln.id}`);
                        }}
                        className="skeuo-btn p-1.5 rounded-lg text-[#475569] hover:text-[#1E293B]"
                        title="View Technical Evidence"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
