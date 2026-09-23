import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
  maxHeight?: string;
  highlightLines?: number[];
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = 'java',
  filename,
  maxHeight = '420px',
  highlightLines = [],
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`skeuo-recessed-deep rounded-xl overflow-hidden ${className}`}>
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#D2D9E4] border-b border-[#CBD3DF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-xs font-mono text-[#1E293B] font-bold">
            {filename || `evidence.${language}`}
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FAFBFD] text-[#475569] border border-[#CBD5E1] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.05)]">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="skeuo-btn flex items-center gap-1.5 text-xs text-[#334155] px-2.5 py-1 rounded-md"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="text-[#16A34A] font-mono text-[11px] font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="font-mono text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with Line Numbers */}
      <div
        className="overflow-x-auto p-4 text-xs font-mono leading-relaxed bg-[#E3E8F0]"
        style={{ maxHeight }}
      >
        <pre className="table w-full">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const isFinding = line.includes('[FINDING]') || line.includes('[VULNERABILITY]');
            const isHighlighted = highlightLines.includes(lineNum) || isFinding;

            return (
              <div
                key={index}
                className={`table-row transition-colors ${
                  isFinding
                    ? 'bg-[#FEE2E2]/70 text-[#991B1B] font-bold border-l-3 border-[#DC2626]'
                    : isHighlighted
                    ? 'bg-[#DBEAFE]/70 text-[#1E40AF]'
                    : 'hover:bg-[#CBD5E1]/40 text-[#20242B]'
                }`}
              >
                <span className="table-cell pr-4 text-right select-none text-[#8E9AAB] font-mono w-10">
                  {lineNum}
                </span>
                <span className="table-cell whitespace-pre font-mono">
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};
