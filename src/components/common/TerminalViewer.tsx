import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Search, Trash2, ArrowDownCircle } from 'lucide-react';
import { ScanLog } from '../../types';

interface TerminalViewerProps {
  logs: ScanLog[];
  title?: string;
  maxHeight?: string;
  autoScroll?: boolean;
  onClear?: () => void;
  className?: string;
}

export const TerminalViewer: React.FC<TerminalViewerProps> = ({
  logs,
  title = 'Live Forensic Pipeline Stream',
  maxHeight = '360px',
  autoScroll = true,
  onClear,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [isAutoScroll, setIsAutoScroll] = useState(autoScroll);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isAutoScroll]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.stage && log.stage.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelStyle = (level: ScanLog['level']) => {
    switch (level) {
      case 'ERROR':
        return 'text-[#DC2626] font-bold';
      case 'WARN':
        return 'text-[#D97706] font-semibold';
      case 'SUCCESS':
        return 'text-[#16A34A] font-semibold';
      case 'DEBUG':
        return 'text-[#2563EB]';
      default:
        return 'text-[#20242B]';
    }
  };

  return (
    <div className={`skeuo-recessed-deep rounded-2xl overflow-hidden ${className}`}>
      {/* Terminal Beveled Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#D2D9E4] border-b border-[#CBD3DF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
        <div className="flex items-center gap-2">
          {/* Subtle hardware bezel buttons */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] border border-[#DC2626] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.15)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-[#D97706] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.15)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-[#059669] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.15)]" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-xs font-mono font-bold text-[#1E293B]">{title}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FAFBFD] text-[#475569] border border-[#CAD2DF] shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.05)]">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Filter log output..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="skeuo-input pl-7 pr-2 py-1 text-[11px] font-mono rounded-md w-36 sm:w-48 text-[#20242B] placeholder-[#8E9AAB]"
            />
          </div>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="skeuo-input text-[11px] font-mono rounded-md py-1 px-2 text-[#334155]"
          >
            <option value="ALL">ALL LEVELS</option>
            <option value="ERROR">ERROR</option>
            <option value="WARN">WARN</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="INFO">INFO</option>
          </select>

          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`p-1 rounded-md border transition ${
              isAutoScroll
                ? 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD] shadow-[inset_0_1px_1px_#FFF]'
                : 'skeuo-btn text-[#64748B]'
            }`}
            title={isAutoScroll ? 'Auto-scroll Enabled' : 'Auto-scroll Paused'}
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
          </button>

          {onClear && (
            <button
              onClick={onClear}
              className="skeuo-btn p-1 rounded-md text-[#64748B] hover:text-[#DC2626]"
              title="Clear terminal logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Light Terminal Log Console */}
      <div
        ref={scrollRef}
        className="p-4 font-mono text-xs overflow-y-auto space-y-1.5 bg-[#E4E9F2] selection:bg-blue-200 selection:text-blue-900"
        style={{ maxHeight }}
      >
        {filteredLogs.length === 0 ? (
          <div className="text-[#8E9AAB] italic py-6 text-center">
            No log events matching active filters.
          </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 leading-relaxed hover:bg-[#D7DFEC]/60 px-1 py-0.5 rounded transition-colors"
            >
              <span className="text-[#64748B] select-none text-[11px] flex-shrink-0 font-medium">
                [{log.timestamp}]
              </span>

              <span
                className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-sm flex-shrink-0 select-none border shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.05)] ${
                  log.level === 'ERROR'
                    ? 'bg-gradient-to-b from-[#FEE2E2] to-[#FED7D7] text-[#991B1B] border-[#FCA5A5]'
                    : log.level === 'WARN'
                    ? 'bg-gradient-to-b from-[#FEF3C7] to-[#FDE68A] text-[#92400E] border-[#FCD34D]'
                    : log.level === 'SUCCESS'
                    ? 'bg-gradient-to-b from-[#DCFCE7] to-[#BBF7D0] text-[#166534] border-[#86EFAC]'
                    : 'bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] text-[#475569] border-[#CBD5E1]'
                }`}
              >
                {log.level}
              </span>

              {log.stage && (
                <span className="text-[#2563EB] font-bold text-[11px] flex-shrink-0">
                  [{log.stage}]
                </span>
              )}

              <span className={`break-all ${getLevelStyle(log.level)}`}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
