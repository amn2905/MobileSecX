import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Scan,
  ShieldAlert,
  AlertTriangle,
  Award,
  UploadCloud,
  Play,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { SecurityScore } from '../components/common/SecurityScore';
import { VulnerabilityDistributionChart } from '../components/dashboard/VulnerabilityDistributionChart';
import { VulnerabilityTrendChart } from '../components/dashboard/VulnerabilityTrendChart';
import { RecentApplicationsTable } from '../components/dashboard/RecentApplicationsTable';
import { WorkflowGuide } from '../components/dashboard/WorkflowGuide';
import { useAppStore } from '../store/useAppStore';
import { mockDashboardStats } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { applications } = useAppStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_4px_rgba(37,99,235,0.6)]" />
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Forensic Security Console
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Security Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl font-medium">
            Monitor mobile application assessments, security posture, and vulnerability findings across your mobile attack surface.
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/upload')}
            className="skeuo-btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Application</span>
          </button>
          <button
            onClick={() => navigate('/scans')}
            className="skeuo-btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-[#334155]"
          >
            <Play className="w-4 h-4 text-[#2563EB]" />
            <span>Active Pipeline</span>
          </button>
        </div>
      </div>

      {/* 5 Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Applications Tested"
          value={mockDashboardStats.applicationsTested}
          subtitle="Android & iOS binaries"
          icon={Smartphone}
          accentColor="blue"
          trend={{ value: '+12% this mo', isPositive: true }}
          onClick={() => navigate('/applications')}
        />
        <StatCard
          title="Total Scans"
          value={mockDashboardStats.totalScans}
          subtitle="Static, dynamic, API"
          icon={Scan}
          accentColor="cyan"
          trend={{ value: '+24 this wk', isPositive: true }}
          onClick={() => navigate('/history')}
        />
        <StatCard
          title="Vulnerabilities Found"
          value={mockDashboardStats.vulnerabilitiesFound}
          subtitle="Active finding catalog"
          icon={ShieldAlert}
          accentColor="amber"
          trend={{ value: '-8% resolved', isPositive: true }}
          onClick={() => navigate('/vulnerabilities')}
        />
        <StatCard
          title="Critical Findings"
          value={mockDashboardStats.criticalFindings}
          subtitle="Immediate action required"
          icon={AlertTriangle}
          accentColor="red"
          severityTag="CRITICAL"
          trend={{ value: '+2 new today', isPositive: false }}
          onClick={() => navigate('/vulnerabilities?severity=CRITICAL')}
        />
        <StatCard
          title="Security Score"
          value={`${mockDashboardStats.securityScore}/100`}
          subtitle="Risk Level: MODERATE"
          icon={Award}
          accentColor="emerald"
          trend={{ value: '+4 pts gain', isPositive: true }}
          onClick={() => navigate('/owasp')}
        />
      </div>

      {/* Security Assessment Workflow Banner */}
      <WorkflowGuide />

      {/* Middle Section: Security Score & Vulnerability Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Security Score Component (Col 1-2) */}
        <div className="lg:col-span-2">
          <SecurityScore
            score={mockDashboardStats.securityScore}
            riskLevel={mockDashboardStats.riskLevel}
            breakdown={mockDashboardStats.breakdown}
          />
        </div>

        {/* Severity Spectrum Donut (Col 3) */}
        <div className="lg:col-span-1">
          <VulnerabilityDistributionChart />
        </div>
      </div>

      {/* Bottom Section: Vulnerability Timeline & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <VulnerabilityTrendChart />
        </div>
        <div className="lg:col-span-2">
          <RecentApplicationsTable applications={applications} />
        </div>
      </div>
    </div>
  );
};
