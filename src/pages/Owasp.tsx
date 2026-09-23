import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { mockOwaspCategories } from '../data/mockData';
import { OwaspCategory } from '../types';
import { ProgressBar } from '../components/common/ProgressBar';

export const Owasp: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<OwaspCategory>(mockOwaspCategories[0]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredCategories = mockOwaspCategories.filter(
    (c) => statusFilter === 'ALL' || c.status === statusFilter
  );

  const getStatusBadge = (status: OwaspCategory['status']) => {
    switch (status) {
      case 'Passed':
        return {
          bg: 'bg-gradient-to-b from-[#FAFBFD] to-[#F0FDF4] text-[#166534] border-[#86EFAC] shadow-[1px_1px_3px_rgba(22,163,74,0.15)]',
          icon: CheckCircle2,
        };
      case 'Warning':
        return {
          bg: 'bg-gradient-to-b from-[#FAFBFD] to-[#FFFBEB] text-[#92400E] border-[#FCD34D] shadow-[1px_1px_3px_rgba(217,119,6,0.15)]',
          icon: AlertTriangle,
        };
      case 'Failed':
        return {
          bg: 'bg-gradient-to-b from-[#FAFBFD] to-[#FEF2F2] text-[#991B1B] border-[#FCA5A5] shadow-[1px_1px_3px_rgba(220,38,38,0.15)]',
          icon: XCircle,
        };
      default:
        return {
          bg: 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]',
          icon: HelpCircle,
        };
    }
  };

  const stats = {
    passed: mockOwaspCategories.filter((c) => c.status === 'Passed').length,
    warning: mockOwaspCategories.filter((c) => c.status === 'Warning').length,
    failed: mockOwaspCategories.filter((c) => c.status === 'Failed').length,
    coverage: Math.round(
      mockOwaspCategories.reduce((acc, c) => acc + c.coverage, 0) / mockOwaspCategories.length
    ),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Compliance & Benchmark
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            OWASP Mobile Top 10 (MASVS)
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Systematic vulnerability coverage against the OWASP Mobile Application Security Standard.
          </p>
        </div>

        {/* Global Compliance Score */}
        <div className="skeuo-raised p-3 rounded-2xl flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right font-mono">
            <span className="text-xl font-black text-[#2563EB]">{stats.coverage}%</span>
            <span className="block text-[10px] text-[#64748B] uppercase font-bold">Test Coverage</span>
          </div>
          <div className="h-8 w-px bg-[#CBD5E1]" />
          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="text-[#166534]">{stats.passed} Passed</span>
            <span>·</span>
            <span className="text-[#D97706]">{stats.warning} Warn</span>
            <span>·</span>
            <span className="text-[#DC2626]">{stats.failed} Failed</span>
          </div>
        </div>
      </div>

      {/* Tactile Filter Bar */}
      <div className="skeuo-segmented-container flex items-center gap-1.5 overflow-x-auto p-1">
        {['ALL', 'Failed', 'Warning', 'Passed', 'Not Tested'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
              statusFilter === st
                ? 'skeuo-segmented-active'
                : 'text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Main Grid: Categories List & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dimensional Category Cards List (Col 1-2) */}
        <div className="lg:col-span-2 space-y-3">
          {filteredCategories.map((cat) => {
            const { bg, icon: Icon } = getStatusBadge(cat.status);
            const isSelected = selectedCategory.id === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`skeuo-raised p-4 rounded-xl transition cursor-pointer group ${
                  isSelected
                    ? 'border-[#3B82F6] shadow-[0_0_0_2px_rgba(59,130,246,0.3)] bg-gradient-to-r from-[#EFF6FF] to-[#FAFBFD]'
                    : 'skeuo-raised-hover'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 ${bg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-[#2563EB]">
                          {cat.id}
                        </span>
                        <h3 className="font-bold text-[#1E293B] text-xs sm:text-sm group-hover:text-[#2563EB] transition">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2 font-medium">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${bg}`}
                    >
                      {cat.status}
                    </span>
                    <div className="text-right">
                      <span className="text-[#1E293B] font-black">{cat.findings}</span>
                      <span className="text-[#64748B] text-[10px] block font-bold">Flaws</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8E9AAB] group-hover:text-[#2563EB] transition" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 pt-3 border-t border-[#E1E6EE]">
                  <ProgressBar
                    label="Test Verification Coverage"
                    value={cat.coverage}
                    color={cat.status === 'Failed' ? 'red' : cat.status === 'Warning' ? 'amber' : 'emerald'}
                    size="sm"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Deep Dive Panel (Col 3) */}
        <div className="skeuo-raised p-6 rounded-2xl space-y-4">
          <div className="pb-3 border-b border-[#E1E6EE]">
            <span className="text-xs font-mono text-[#2563EB] uppercase tracking-wider block font-bold">
              OWASP Requirement
            </span>
            <h3 className="text-base font-bold text-[#1E293B] tracking-tight mt-0.5">
              {selectedCategory.title}
            </h3>
            <span className="text-[11px] font-mono text-[#64748B] mt-0.5 block font-semibold">
              Benchmark Standard: {selectedCategory.code}
            </span>
          </div>

          <p className="text-xs text-[#334155] leading-relaxed font-medium">
            {selectedCategory.description}
          </p>

          <div className="grid grid-cols-2 gap-3 p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)] font-mono text-xs">
            <div>
              <span className="text-[#64748B] text-[10px] block font-bold">Tests Passed</span>
              <span className="text-[#16A34A] font-black mt-0.5 block">
                {selectedCategory.passedCount} / {selectedCategory.testsCount}
              </span>
            </div>
            <div>
              <span className="text-[#64748B] text-[10px] block font-bold">Findings Count</span>
              <span className="text-[#DC2626] font-black mt-0.5 block">
                {selectedCategory.findings} Vulnerabilities
              </span>
            </div>
          </div>

          {/* Test Vectors List */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-[#66707D] font-bold block">
              Standard Verification Tests
            </span>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { name: 'MASTG-TEST-0001: Storage Encryption', pass: true },
                { name: 'MASTG-TEST-0002: Hardcoded Secrets', pass: false },
                { name: 'MASTG-TEST-0003: Logcat Leakage', pass: false },
                { name: 'MASTG-TEST-0004: Keystore Binding', pass: true },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBFD] border border-[#CBD5E1] shadow-[1px_1px_2px_rgba(166,176,195,0.15)]"
                >
                  <span className="text-[#334155] text-[11px] truncate font-medium">{t.name}</span>
                  {t.pass ? (
                    <span className="text-[#16A34A] text-[10px] font-extrabold">PASS</span>
                  ) : (
                    <span className="text-[#DC2626] text-[10px] font-extrabold">FAIL</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate(`/vulnerabilities?owasp=${encodeURIComponent(selectedCategory.title)}`)}
            className="skeuo-btn w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs text-[#2563EB]"
          >
            <span>Filter Findings by {selectedCategory.id}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
