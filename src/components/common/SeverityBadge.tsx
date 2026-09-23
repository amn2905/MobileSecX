import React from 'react';
import { Severity } from '../../types';

interface SeverityBadgeProps {
  severity: Severity;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = 'md',
  showDot = true,
}) => {
  // Soft skeuomorphic badges with physical depth & calm pastel backgrounds
  const styles = {
    CRITICAL: {
      bg: 'bg-gradient-to-b from-[#FEE2E2] to-[#FED7D7]',
      text: 'text-[#991B1B]',
      border: 'border-[#FCA5A5]',
      shadow: 'shadow-[1.5px_1.5px_3px_rgba(239,68,68,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      dot: 'bg-[#DC2626]',
    },
    HIGH: {
      bg: 'bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA]',
      text: 'text-[#9A3412]',
      border: 'border-[#FDBA74]',
      shadow: 'shadow-[1.5px_1.5px_3px_rgba(249,115,22,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      dot: 'bg-[#EA580C]',
    },
    MEDIUM: {
      bg: 'bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A]',
      text: 'text-[#92400E]',
      border: 'border-[#FCD34D]',
      shadow: 'shadow-[1.5px_1.5px_3px_rgba(245,158,11,0.2),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      dot: 'bg-[#D97706]',
    },
    LOW: {
      bg: 'bg-gradient-to-b from-[#DCFCE7] to-[#BBF7D0]',
      text: 'text-[#166534]',
      border: 'border-[#86EFAC]',
      shadow: 'shadow-[1.5px_1.5px_3px_rgba(22,163,74,0.18),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      dot: 'bg-[#16A34A]',
    },
    INFO: {
      bg: 'bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD]',
      text: 'text-[#075985]',
      border: 'border-[#7DD3FC]',
      shadow: 'shadow-[1.5px_1.5px_3px_rgba(2,132,199,0.18),-1px_-1px_3px_rgba(255,255,255,0.9)]',
      dot: 'bg-[#0284C7]',
    },
  }[severity] || {
    bg: 'bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0]',
    text: 'text-[#334155]',
    border: 'border-[#CBD5E1]',
    shadow: 'shadow-[1px_1px_2px_rgba(150,160,175,0.2)]',
    dot: 'bg-[#64748B]',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5 font-bold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-extrabold',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-mono uppercase tracking-wider rounded-md border ${styles.bg} ${styles.text} ${styles.border} ${styles.shadow} ${sizeClasses}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      )}
      {severity}
    </span>
  );
};
