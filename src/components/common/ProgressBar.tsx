import React from 'react';

interface ProgressBarProps {
  label?: string;
  value: number; // 0 to 100
  color?: 'cyan' | 'emerald' | 'amber' | 'red' | 'blue' | 'purple';
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  sublabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  color = 'blue',
  showPercentage = true,
  size = 'md',
  className = '',
  sublabel,
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  // Dimensional gradients with physical bevel
  const colorStyles = {
    blue: 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(37,99,235,0.3)]',
    cyan: 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(2,132,199,0.3)]',
    emerald: 'bg-gradient-to-r from-[#22C55E] to-[#15803D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(22,163,74,0.3)]',
    amber: 'bg-gradient-to-r from-[#F59E0B] to-[#B45309] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(217,119,6,0.3)]',
    red: 'bg-gradient-to-r from-[#EF4444] to-[#B91C1C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(220,38,38,0.3)]',
    purple: 'bg-gradient-to-r from-[#A855F7] to-[#7E22CE] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_1px_2px_rgba(126,34,206,0.3)]',
  }[color];

  const heightClasses = {
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-[#334155] font-semibold">{label}</span>
            {sublabel && <span className="text-[#64748B] text-[11px]">({sublabel})</span>}
          </div>
          {showPercentage && (
            <span className="text-[#1E293B] font-mono font-bold">
              {clampedValue}%
            </span>
          )}
        </div>
      )}
      {/* Recessed Track */}
      <div className={`w-full bg-[#E2E6EE] rounded-full overflow-hidden border border-[#CBD2DE] shadow-[inset_1.5px_1.5px_3px_rgba(160,170,185,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] ${heightClasses}`}>
        <div
          className={`${heightClasses} rounded-full transition-all duration-700 ease-out ${colorStyles}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
