import React from 'react';
import { LucideIcon, ShieldAlert } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShieldAlert,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`skeuo-raised flex flex-col items-center justify-center text-center p-12 rounded-2xl ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] shadow-[inset_0_1px_1px_#FFF,2px_2px_6px_rgba(37,99,235,0.15)] flex items-center justify-center text-[#2563EB] mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-bold text-[#1E293B] tracking-tight">{title}</h4>
      <p className="mt-1.5 text-xs text-[#64748B] max-w-sm leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="skeuo-btn-primary mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
