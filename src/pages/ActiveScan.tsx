import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Pause,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TerminalViewer } from '../components/common/TerminalViewer';
import { ProgressBar } from '../components/common/ProgressBar';

export const ActiveScan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    activeScan,
    scanLogs,
    isScanning,
    scanProgress,
    scanStage,
    stopScan,
    startScan,
  } = useAppStore();

  const scan = activeScan || {
    id: id || 'SCAN-2026-00124',
    applicationId: 'app-1',
    applicationName: 'SecureBank.apk',
    platform: 'Android' as const,
    scanType: 'Full Security Assessment' as const,
    status: isScanning ? 'Running' : 'Completed',
    progress: scanProgress,
    currentStage: scanStage,
    startedAt: '14:20:55',
    securityScore: 78,
    findingsCount: {
      critical: 2,
      high: 4,
      medium: 4,
      low: 2,
      info: 5,
    },
  };

  const pipelineStages = [
    { name: 'File Upload', id: 'upload', threshold: 10 },
    { name: 'Application Parsing', id: 'parsing', threshold: 20 },
    { name: 'Manifest Analysis', id: 'manifest', threshold: 35 },
    { name: 'Permission Analysis', id: 'permissions', threshold: 50 },
    { name: 'Code Analysis', id: 'code', threshold: 65 },
    { name: 'API Analysis', id: 'api', threshold: 80 },
    { name: 'Dynamic Analysis', id: 'dynamic', threshold: 95 },
    { name: 'Report Generation', id: 'report', threshold: 100 },
  ];

  const getStageStatus = (stageThreshold: number, stageName: string) => {
    if (scanProgress >= stageThreshold) return 'completed';
    if (scanStage === stageName || (scanProgress >= stageThreshold - 15 && scanProgress < stageThreshold)) {
      return 'active';
    }
    return 'pending';
  };

  const handleRestart = () => {
    startScan(scan.applicationId, scan.scanType);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isScanning ? 'bg-[#2563EB] animate-ping' : 'bg-[#16A34A]'
              }`}
            />
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              {isScanning ? 'Real-Time Pipeline Execution' : 'Scan Finished'}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Security Assessment: {scan.applicationName}
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-mono font-medium">
            Scan ID: <span className="text-[#1E293B] font-bold">{scan.id}</span> · Scope:{' '}
            <span className="text-[#2563EB] font-bold">{scan.scanType}</span>
          </p>
        </div>

        {/* Scan Actions */}
        <div className="flex items-center gap-2">
          {isScanning ? (
            <button
              onClick={stopScan}
              className="skeuo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#D97706]"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Scan</span>
            </button>
          ) : (
            <button
              onClick={handleRestart}
              className="skeuo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#2563EB]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Scan</span>
            </button>
          )}

          <button
            onClick={() => navigate('/vulnerabilities')}
            className="skeuo-btn-primary flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>View Findings</span>
          </button>
        </div>
      </div>

      {/* Real-time Progress Bar & Metric Stats */}
      <div className="skeuo-raised p-6 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#64748B] font-bold">Current Phase</span>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">{scanStage}</h3>
              {isScanning && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#DBEAFE] text-[#1D4ED8] border border-[#93C5FD] font-bold animate-pulse">
                  EXECUTING
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right font-mono">
              <span className="text-3xl font-black text-[#2563EB]">{scanProgress}%</span>
              <span className="block text-[10px] text-[#64748B] uppercase font-bold">Progress</span>
            </div>
            <div className="h-10 w-px bg-[#CBD5E1]" />
            <div className="text-right font-mono">
              <span className="text-3xl font-black text-[#DC2626]">
                {scan.findingsCount.critical}
              </span>
              <span className="block text-[10px] text-[#64748B] uppercase font-bold">Critical Flaws</span>
            </div>
          </div>
        </div>

        {/* Global Dimensional Progress Bar */}
        <ProgressBar value={scanProgress} color="blue" size="lg" showPercentage={false} />

        {/* Raised Pipeline Modules + Recessed Status Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 pt-2">
          {pipelineStages.map((stage) => {
            const status = getStageStatus(stage.threshold, stage.name);
            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                  status === 'completed'
                    ? 'bg-gradient-to-b from-[#FAFBFD] to-[#F0FDF4] border-[#86EFAC] text-[#166534] shadow-[2px_2px_5px_rgba(22,163,74,0.15)]'
                    : status === 'active'
                    ? 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border-[#60A5FA] text-[#1E40AF] shadow-[inset_0_1px_1px_#FFF,2px_2px_6px_rgba(37,99,235,0.25)]'
                    : 'bg-[#E5E9F0] border-[#CBD5E1] text-[#8E9AAB] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)]'
                }`}
              >
                <div className="mb-1.5">
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  ) : status === 'active' ? (
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
                    </span>
                  ) : (
                    <span className="w-3 h-3 rounded-full border-2 border-[#CBD5E1] block" />
                  )}
                </div>
                <span className="text-[11px] font-bold leading-tight truncate w-full">
                  {stage.name}
                </span>
                <span className="text-[9px] font-mono mt-0.5 opacity-80 font-semibold">
                  {status === 'completed' ? 'Done' : status === 'active' ? 'Running' : 'Queued'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Live Log Streaming on Light Recessed Background */}
      <TerminalViewer
        logs={scanLogs}
        title={`Live Security Scanner Stream · ${scan.applicationName}`}
        maxHeight="420px"
      />

      {/* Post-Scan Quick Summary Banner when Completed */}
      {scanProgress >= 100 && (
        <div className="skeuo-raised p-6 rounded-2xl border border-[#86EFAC] bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] shadow-[inset_0_1px_1px_#FFF] flex items-center justify-center text-[#16A34A] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#166534]">Security Assessment Completed</h3>
              <p className="text-xs text-[#334155] mt-0.5 font-medium">
                Computed Security Score: <strong>{scan.securityScore}/100</strong>. Identified{' '}
                <strong className="text-[#DC2626]">{scan.findingsCount.critical} critical</strong> vulnerabilities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate('/vulnerabilities')}
              className="skeuo-btn-primary flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs"
            >
              Review Vulnerabilities
            </button>
            <button
              onClick={() => navigate(`/reports?scanId=${scan.id}`)}
              className="skeuo-btn flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs text-[#334155]"
            >
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
