import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  showSubtitle?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  collapsed = false,
  showSubtitle = true,
  className = '',
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 22 : size === 'lg' ? 36 : 28;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Skeuomorphic Physical Emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#E2E7F0] border border-[#CAD2DE] shadow-[2.5px_2.5px_6px_rgba(166,176,195,0.4),-2.5px_-2.5px_6px_rgba(255,255,255,0.95)] flex items-center justify-center transition-all duration-200 group-hover:shadow-[3px_3px_8px_rgba(166,176,195,0.5),-3px_-3px_8px_rgba(255,255,255,1)]">
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Shield with subtle blue gradient stroke */}
            <path
              d="M16 3L6 7V15C6 21.6 10.3 27.7 16 29C21.7 27.7 26 21.6 26 15V7L16 3Z"
              stroke="#1E40AF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(37, 99, 235, 0.06)"
            />
            {/* Mobile Device Inner Frame */}
            <rect
              x="11.5"
              y="9"
              width="9"
              height="14"
              rx="1.5"
              stroke="#2563EB"
              strokeWidth="1.6"
              fill="#FFFFFF"
            />
            {/* Screen sensor & Home button */}
            <circle cx="16" cy="11" r="0.7" fill="#64748B" />
            <circle cx="16" cy="20.5" r="0.9" fill="#2563EB" />
            {/* Circuit Traces */}
            <path
              d="M13.5 15H18.5M16 13V17"
              stroke="#2563EB"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl tracking-tight text-[#1E293B]">
              MobileSec<span className="text-[#2563EB]">X</span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded-md bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
              v2.4
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] text-[#64748B] font-semibold tracking-tight truncate max-w-[190px]">
              Mobile Application Security
            </span>
          )}
        </div>
      )}
    </div>
  );
};
