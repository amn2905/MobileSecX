import React from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Layers,
  Sliders,
  Play,
  Activity,
  ShieldAlert,
  Search,
  Award,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

export const WorkflowGuide: React.FC = () => {
  const steps = [
    { title: 'Upload App', icon: Upload, path: '/upload', desc: 'APK / AAB / IPA' },
    { title: 'App Details', icon: Layers, path: '/applications', desc: 'Manifest & SDK' },
    { title: 'Configure', icon: Sliders, path: '/upload', desc: 'Engines & Rules' },
    { title: 'Active Scan', icon: Activity, path: '/scans', desc: 'Static & Dynamic' },
    { title: 'Findings', icon: ShieldAlert, path: '/vulnerabilities', desc: 'CVSS Triaging' },
    { title: 'OWASP Score', icon: Award, path: '/owasp', desc: 'MASVS Matrix' },
    { title: 'Export Report', icon: FileCheck, path: '/reports', desc: 'PDF & Audit' },
  ];

  return (
    <div className="skeuo-raised p-5 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-widest font-bold">
            Automated Pipeline
          </span>
          <h3 className="text-sm font-bold text-[#1E293B] tracking-tight">
            Security Testing Lifecycle
          </h3>
        </div>
        <span className="text-xs text-[#64748B] font-medium">
          Standardized forensic testing workflow
        </span>
      </div>

      {/* Workflow Steps Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Link
              key={step.title}
              to={step.path}
              className="relative p-3 rounded-xl bg-gradient-to-b from-[#FAFBFD] to-[#F1F4F9] border border-[#CAD2DE] shadow-[2.5px_2.5px_6px_rgba(166,176,195,0.35),-2px_-2px_5px_rgba(255,255,255,0.9)] hover:shadow-[3.5px_3.5px_8px_rgba(166,176,195,0.45),-3px_-3px_8px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition duration-150 group flex flex-col items-center text-center"
            >
              {/* Step Key Badge */}
              <span className="absolute top-1.5 left-2 text-[9px] font-mono font-bold text-[#8E9AAB] group-hover:text-[#2563EB]">
                0{idx + 1}
              </span>

              <div className="w-8 h-8 rounded-lg bg-[#E2E8F1] border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)] flex items-center justify-center text-[#475569] group-hover:text-[#2563EB] group-hover:bg-[#DBEAFE] mb-2 transition">
                <Icon className="w-4 h-4" />
              </div>

              <span className="text-xs font-bold text-[#1E293B] group-hover:text-[#2563EB] truncate w-full">
                {step.title}
              </span>
              <span className="text-[10px] text-[#64748B] font-mono mt-0.5 truncate w-full">
                {step.desc}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
