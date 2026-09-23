import React from 'react';
import { RiskLevel } from '../../types';
import { RiskBadge } from './RiskBadge';
import { ProgressBar } from './ProgressBar';

interface SecurityScoreProps {
  score: number; // 0 to 100
  riskLevel: RiskLevel;
  breakdown?: {
    secureConfig: number;
    authentication: number;
    dataStorage: number;
    networkSecurity: number;
    apiSecurity: number;
    codeSecurity: number;
  };
  size?: 'sm' | 'md' | 'lg';
  showBreakdown?: boolean;
}

export const SecurityScore: React.FC<SecurityScoreProps> = ({
  score,
  riskLevel,
  breakdown = {
    secureConfig: 86,
    authentication: 91,
    dataStorage: 78,
    networkSecurity: 73,
    apiSecurity: 84,
    codeSecurity: 80,
  },
  size = 'lg',
  showBreakdown = true,
}) => {
  // SVG circular calculations
  const radius = size === 'lg' ? 68 : size === 'md' ? 52 : 36;
  const strokeWidth = size === 'lg' ? 10 : size === 'md' ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  // Colors based on score in light theme
  const getScoreColor = (val: number) => {
    if (val >= 85) return { stroke: '#16A34A', text: 'text-[#16A34A]', track: '#D1FAE5' };
    if (val >= 70) return { stroke: '#2563EB', text: 'text-[#2563EB]', track: '#DBEAFE' };
    if (val >= 50) return { stroke: '#D97706', text: 'text-[#D97706]', track: '#FEF3C7' };
    return { stroke: '#DC2626', text: 'text-[#DC2626]', track: '#FEE2E2' };
  };

  const { stroke, text, track } = getScoreColor(score);

  return (
    <div className="skeuo-raised p-6 rounded-2xl relative overflow-hidden">
      <div className="flex flex-col items-center sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E1E6EE]">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-xs font-mono uppercase tracking-widest text-[#66707D] font-bold">
              Instrument Dial
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">
            Security Score Index
          </h3>
          <p className="text-xs text-[#64748B] max-w-[240px] leading-relaxed">
            Composite forensic posture calculated across OWASP Mobile Application Security domains.
          </p>
          <div className="pt-2 flex items-center gap-2 justify-center sm:justify-start">
            <span className="text-xs text-[#64748B] font-medium">Risk Assessment:</span>
            <RiskBadge risk={riskLevel} size="sm" />
          </div>
        </div>

        {/* Physical Instrument Meter Gauge */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {/* Beveled outer dial shadow ring */}
          <div className="w-44 h-44 rounded-full bg-gradient-to-b from-[#F9FAFC] to-[#DFE5EE] border border-[#CCD4E0] shadow-[4px_4px_10px_rgba(160,170,185,0.4),-4px_-4px_10px_rgba(255,255,255,0.95)] flex items-center justify-center p-2">
            {/* Recessed dial face */}
            <div className="w-full h-full rounded-full bg-[#E5E9F0] border border-[#CAD2DF] shadow-[inset_2.5px_2.5px_6px_rgba(150,162,183,0.5),inset_-2.5px_-2.5px_6px_rgba(255,255,255,0.85)] flex items-center justify-center relative">
              <svg
                width={svgSize}
                height={svgSize}
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                className="transform -rotate-90"
              >
                {/* Background track circle */}
                <circle
                  cx={svgSize / 2}
                  cy={svgSize / 2}
                  r={radius}
                  stroke="#CBD5E1"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Animated Progress circle */}
                <circle
                  cx={svgSize / 2}
                  cy={svgSize / 2}
                  r={radius}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{
                    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </svg>

              {/* Centered Instrument Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                <span className={`font-mono font-black ${size === 'lg' ? 'text-3xl' : 'text-xl'} ${text}`}>
                  {score}
                </span>
                <span className="text-[10px] font-mono text-[#64748B] font-bold uppercase tracking-wider">
                  / 100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Domain Progress Bars */}
      {showBreakdown && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#334155]">
              Domain Posture Breakdown
            </span>
            <span className="text-[11px] text-[#2563EB] font-mono font-bold">
              OWASP MASVS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
            <ProgressBar
              label="Secure Configuration"
              value={breakdown.secureConfig}
              color="blue"
              size="sm"
            />
            <ProgressBar
              label="Authentication & Biometrics"
              value={breakdown.authentication}
              color="emerald"
              size="sm"
            />
            <ProgressBar
              label="Data Storage Security"
              value={breakdown.dataStorage}
              color="amber"
              size="sm"
            />
            <ProgressBar
              label="Network & TLS Security"
              value={breakdown.networkSecurity}
              color="blue"
              size="sm"
            />
            <ProgressBar
              label="API Security & Authz"
              value={breakdown.apiSecurity}
              color="cyan"
              size="sm"
            />
            <ProgressBar
              label="Code & Cryptography"
              value={breakdown.codeSecurity}
              color="purple"
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};
