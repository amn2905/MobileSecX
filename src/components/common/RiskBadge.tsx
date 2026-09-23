import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  risk: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, size = 'md' }) => {
  const styles = {
    CRITICAL: {
      bg: 'bg-gradient-to-b from-[#FEE2E2] to-[#FED7D7] text-[#991B1B] border-[#FCA5A5] shadow-[1.5px_1.5px_3px_rgba(239,68,68,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      label: 'CRITICAL RISK',
    },
    HIGH: {
      bg: 'bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA] text-[#9A3412] border-[#FDBA74] shadow-[1.5px_1.5px_3px_rgba(249,115,22,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      label: 'HIGH RISK',
    },
    MODERATE: {
      bg: 'bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] text-[#92400E] border-[#FCD34D] shadow-[1.5px_1.5px_3px_rgba(245,158,11,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      label: 'MODERATE RISK',
    },
    LOW: {
      bg: 'bg-gradient-to-b from-[#DCFCE7] to-[#BBF7D0] text-[#166534] border-[#86EFAC] shadow-[1.5px_1.5px_3px_rgba(22,163,74,0.18),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      label: 'LOW RISK',
    },
  }[risk] || {
    bg: 'bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] text-[#334155] border-[#CBD5E1]',
    label: risk,
  };

  const sizeClass = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-bold',
    lg: 'text-sm px-3.5 py-1.5 font-extrabold',
  }[size];

  return (
    <span
      className={`inline-flex items-center tracking-wide font-mono rounded-md border ${styles.bg} ${sizeClass}`}
    >
      {styles.label}
    </span>
  );
};
