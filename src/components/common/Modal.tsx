import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Soft translucent backdrop */}
      <div
        className="fixed inset-0 bg-[#0F172A]/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Floating Skeuomorphic Modal Dialog */}
      <div
        className={`relative w-full ${maxWidthClass} bg-gradient-to-b from-[#FAFBFD] to-[#F1F4F9] border border-[#CAD3DE] rounded-2xl shadow-[0_20px_45px_rgba(30,41,59,0.22),0_4px_12px_rgba(30,41,59,0.1)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Top Accent Bevel */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]" />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#E1E6EE] bg-[#FAFBFD]">
          <div>
            <h3 className="text-lg font-bold text-[#1E293B] tracking-tight">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs text-[#64748B] font-medium">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="skeuo-btn p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto bg-[#F7F9FC] text-[#20242B]">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-4 bg-[#EDF1F7] border-t border-[#D5DAE1]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
