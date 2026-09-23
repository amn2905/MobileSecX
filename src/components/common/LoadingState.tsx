import React from 'react';
import { Shield, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  submessage?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Initializing Forensic Telemetry...',
  submessage = 'Connecting to mobile analysis sandbox and loading vulnerability catalog',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-16 text-center ${className}`}
    >
      <div className="relative flex items-center justify-center mb-5">
        {/* Soft skeuomorphic pulsing bezel */}
        <div className="w-16 h-16 rounded-full bg-[#E2E8F0] shadow-[inset_2px_2px_4px_rgba(160,170,185,0.4),2px_2px_6px_rgba(255,255,255,0.9)] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#2563EB] border-r-transparent border-b-[#93C5FD] border-l-transparent animate-spin" />
        </div>
        <div className="absolute">
          <Shield className="w-5 h-5 text-[#2563EB]" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#1E293B] text-sm font-bold tracking-tight">
        <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
        <span>{message}</span>
      </div>

      {submessage && (
        <p className="mt-1 text-xs text-[#64748B] font-mono max-w-sm">
          {submessage}
        </p>
      )}
    </div>
  );
};
