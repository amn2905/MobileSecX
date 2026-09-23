import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  accentColor?: 'cyan' | 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
  severityTag?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'blue',
  severityTag,
  onClick,
}) => {
  // Soft, physical icon button bevels
  const iconStyle = {
    blue: 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(29,78,216,0.15)]',
    cyan: 'bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] text-[#0284C7] border-[#BAE6FD] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(2,132,199,0.15)]',
    red: 'bg-gradient-to-b from-[#FEF2F2] to-[#FEE2E2] text-[#DC2626] border-[#FECACA] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(220,38,38,0.15)]',
    amber: 'bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] text-[#D97706] border-[#FDE68A] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(217,119,6,0.15)]',
    emerald: 'bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] text-[#16A34A] border-[#BBF7D0] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(22,163,74,0.15)]',
    purple: 'bg-gradient-to-b from-[#FAF5FF] to-[#F3E8FF] text-[#7E22CE] border-[#E9D5FF] shadow-[inset_0_1px_1px_#FFF,1.5px_1.5px_4px_rgba(126,34,206,0.15)]',
  }[accentColor] || 'bg-[#F1F5F9] text-[#334155] border-[#CBD5E1]';

  return (
    <div
      onClick={onClick}
      className={`skeuo-raised p-5 rounded-2xl transition-all duration-200 ${
        onClick ? 'cursor-pointer skeuo-raised-hover' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#66707D]">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#20242B] font-mono">
              {value}
            </span>
            {severityTag && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-gradient-to-b from-[#FEE2E2] to-[#FED7D7] text-[#991B1B] border border-[#FCA5A5] font-bold shadow-[1px_1px_2px_rgba(220,38,38,0.2)]">
                {severityTag}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${iconStyle} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center justify-between text-xs text-[#66707D] pt-2.5 border-t border-[#E1E6EE]">
          {subtitle && <span className="truncate pr-2 font-medium">{subtitle}</span>}
          {trend && (
            <span
              className={`font-mono text-[11px] font-bold flex items-center gap-1 ${
                trend.isNeutral
                  ? 'text-[#64748B]'
                  : trend.isPositive
                  ? 'text-[#16A34A]'
                  : 'text-[#DC2626]'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
