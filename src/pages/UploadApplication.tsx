import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Smartphone,
  Apple,
  Sliders,
  Play,
  ArrowRight,
  Hash,
  CheckCircle2,
  Lock,
  Layers,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Application } from '../types';

export const UploadApplication: React.FC = () => {
  const navigate = useNavigate();
  const { addApplication, startScan } = useAppStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedMetadata, setParsedMetadata] = useState<Partial<Application> | null>(null);

  // Scan configuration state
  const [scanType, setScanType] = useState<'Static Analysis' | 'Dynamic Analysis' | 'API Security' | 'Full Security Assessment'>('Full Security Assessment');
  const [options, setOptions] = useState({
    manifestAnalysis: true,
    permissionsAnalysis: true,
    insecureStorage: true,
    authentication: true,
    networkSecurity: true,
    cryptographic: true,
    apiSecurity: true,
    codeAnalysis: true,
    thirdPartyLibs: true,
    hardcodedSecrets: true,
    certificateAnalysis: true,
    fridaInstrumentation: true,
    proxyConfig: true,
    sslPinning: true,
    rootDetection: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);

    const isIos = file.name.endsWith('.ipa');
    const isAab = file.name.endsWith('.aab');
    const cleanName = file.name.replace(/\.(apk|aab|ipa)$/i, '');

    setTimeout(() => {
      const mockMeta: Partial<Application> = {
        name: cleanName,
        packageName: isIos
          ? `org.${cleanName.toLowerCase()}.ios`
          : `com.${cleanName.toLowerCase()}.app`,
        platform: isIos ? 'iOS' : 'Android',
        fileType: isIos ? 'IPA' : isAab ? 'AAB' : 'APK',
        version: 'v2.1.0',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
        md5: '7d56ee6463901b0b548b8ca8131343b6',
        minSdk: isIos ? 'iOS 15.0' : 'API 26 (Android 8.0)',
        targetSdk: isIos ? 'iOS 17.0' : 'API 34 (Android 14)',
        permissions: [
          'android.permission.INTERNET',
          'android.permission.ACCESS_NETWORK_STATE',
          'android.permission.CAMERA',
          'android.permission.READ_EXTERNAL_STORAGE',
        ],
        components: {
          activities: 14,
          services: 4,
          receivers: 3,
          providers: 1,
        },
      };

      setParsedMetadata(mockMeta);
      setIsProcessing(false);
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleToggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLaunchAnalysis = () => {
    if (!parsedMetadata) return;
    const newApp = addApplication(parsedMetadata);
    const scanId = startScan(newApp.id, scanType, options);
    navigate(`/scans/${scanId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Step Progress Wizard */}
      <div className="skeuo-raised p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
              step >= 1
                ? 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_2px_4px_rgba(29,78,216,0.3)]'
                : 'bg-[#E2E8F0] text-[#64748B]'
            }`}
          >
            01
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
              Upload Application
            </h4>
            <span className="text-[10px] text-[#64748B]">Binary parsing & SHA-256 validation</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-[#8E9AAB] hidden sm:block" />

        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center ${
              step === 2
                ? 'bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_2px_4px_rgba(29,78,216,0.3)]'
                : 'bg-[#E2E8F0] text-[#64748B]'
            }`}
          >
            02
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
              Configure Assessment
            </h4>
            <span className="text-[10px] text-[#64748B]">Static, dynamic & API rules</span>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
              Add Mobile Application
            </h1>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Upload an Android APK / AAB package or iOS IPA archive for automated vulnerability assessment.
            </p>
          </div>

          {/* Recessed Drag & Drop Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`skeuo-recessed relative rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 border-2 border-dashed ${
              dragActive
                ? 'border-[#2563EB] bg-[#DBEAFE]/40 scale-[1.01]'
                : 'border-[#CAD2DE] hover:border-[#3B82F6] hover:bg-[#EDF2F8]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".apk,.aab,.ipa"
              onChange={handleChange}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FAFBFD] to-[#E2E8F0] border border-[#CBD5E1] shadow-[2.5px_2.5px_6px_rgba(166,176,195,0.35),-2px_-2px_5px_rgba(255,255,255,0.95)] flex items-center justify-center text-[#2563EB] mx-auto mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
              Drag & drop application here
            </h3>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              or <span className="text-[#2563EB] font-bold underline underline-offset-2">Browse Files</span> from your computer
            </p>

            {/* Constraints & Supported Formats */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-[#D5DAE1] text-[11px] font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Android: <strong className="text-[#1E293B]">APK, AAB</strong></span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Apple className="w-3.5 h-3.5 text-[#475569]" />
                <span>iOS: <strong className="text-[#1E293B]">IPA</strong></span>
              </span>
              <span>·</span>
              <span>Max size: <strong className="text-[#1E293B]">500 MB</strong></span>
              <span>·</span>
              <span className="text-[#2563EB] font-bold">SHA-256 verification</span>
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="skeuo-recessed p-6 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-2 text-[#2563EB] font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
                <span>Extracting binary headers, parsing AndroidManifest.xml & computing cryptographic hashes...</span>
              </div>
            </div>
          )}

          {/* Parsed Metadata Card */}
          {parsedMetadata && !isProcessing && (
            <div className="skeuo-raised p-6 rounded-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#E1E6EE]">
                <div className="flex items-center gap-2 text-[#166534] text-xs font-bold font-mono uppercase">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Binary Validated & Parsed Successfully</span>
                </div>
                <span className="text-[11px] font-mono text-[#64748B] font-semibold">
                  Ready for Assessment
                </span>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">Application Name</span>
                  <span className="text-[#1E293B] font-black text-sm mt-0.5 block">{parsedMetadata.name}</span>
                </div>
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">Package / Bundle ID</span>
                  <span className="text-[#334155] font-bold truncate block mt-0.5">{parsedMetadata.packageName}</span>
                </div>
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">Platform & Format</span>
                  <span className="text-[#2563EB] font-bold mt-0.5 block">
                    {parsedMetadata.platform} ({parsedMetadata.fileType})
                  </span>
                </div>
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">Declared Version</span>
                  <span className="text-[#334155] font-semibold mt-0.5 block">{parsedMetadata.version}</span>
                </div>
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">File Size</span>
                  <span className="text-[#334155] font-semibold mt-0.5 block">{parsedMetadata.fileSize}</span>
                </div>
                <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] shadow-[inset_1px_1px_2px_rgba(160,170,185,0.25)]">
                  <span className="text-[#8E9AAB] text-[10px] block font-bold">Target SDK</span>
                  <span className="text-[#334155] font-semibold mt-0.5 block">{parsedMetadata.targetSdk}</span>
                </div>
              </div>

              {/* SHA-256 Hash Display */}
              <div className="p-3 bg-[#E8EDF4] rounded-xl border border-[#CBD5E1] text-xs font-mono flex items-center justify-between gap-2 shadow-[inset_1px_1px_2px_rgba(160,170,185,0.3)]">
                <div className="flex items-center gap-2 min-w-0">
                  <Hash className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span className="text-[#64748B] font-bold">SHA-256:</span>
                  <span className="text-[#1E293B] font-semibold truncate">{parsedMetadata.sha256}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-bold">
                  VERIFIED
                </span>
              </div>

              {/* Next Step Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="skeuo-btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold"
                >
                  <span>Configure Security Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Step 2: Configure Security Assessment */
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
                Assessment Configuration
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
              Configure Security Assessment
            </h1>
            <p className="text-xs text-[#64748B] mt-1 font-medium">
              Select testing engines, OWASP rule profiles, and dynamic instrumentation parameters for {parsedMetadata?.name}.
            </p>
          </div>

          {/* Scan Type Selector */}
          <div className="skeuo-raised p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
              Assessment Scope
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: 'Full Security Assessment',
                  title: 'Full Assessment',
                  desc: 'Comprehensive static, dynamic, API & secrets audit.',
                },
                {
                  id: 'Static Analysis',
                  title: 'Static Analysis',
                  desc: 'Manifest, decompiled code, storage & permissions.',
                },
                {
                  id: 'Dynamic Analysis',
                  title: 'Dynamic Analysis',
                  desc: 'Frida hooks, root detection, and SSL bypass.',
                },
                {
                  id: 'API Security',
                  title: 'API Security',
                  desc: 'Endpoint discovery, auth checks & parameter fuzzing.',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setScanType(item.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    scanType === item.id
                      ? 'bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] border-[#93C5FD] text-[#1E40AF] shadow-[inset_0_1px_1px_#FFF,2px_2px_6px_rgba(37,99,235,0.2)]'
                      : 'bg-[#FAFBFD] border-[#CBD5E1] text-[#64748B] hover:border-[#94A3B8] shadow-[1.5px_1.5px_4px_rgba(166,176,195,0.2)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#1E293B]">{item.title}</span>
                    <input
                      type="radio"
                      checked={scanType === item.id}
                      onChange={() => setScanType(item.id as any)}
                      className="text-[#2563EB] focus:ring-0"
                    />
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Static Analysis Modules */}
          <div className="skeuo-raised p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
              Static Analysis Engines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { key: 'manifestAnalysis', label: 'Manifest Analysis' },
                { key: 'permissionsAnalysis', label: 'Permissions Analysis' },
                { key: 'insecureStorage', label: 'Insecure Storage Detection' },
                { key: 'authentication', label: 'Authentication Analysis' },
                { key: 'networkSecurity', label: 'Network Security' },
                { key: 'cryptographic', label: 'Cryptographic Analysis' },
                { key: 'apiSecurity', label: 'API Security Testing' },
                { key: 'codeAnalysis', label: 'Bytecode & Smali Analysis' },
                { key: 'thirdPartyLibs', label: 'Third-party Libraries / CVEs' },
                { key: 'hardcodedSecrets', label: 'Hardcoded Secrets & Keys' },
                { key: 'certificateAnalysis', label: 'Certificate & Keystore Analysis' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] hover:border-[#94A3B8] shadow-[1.5px_1.5px_3px_rgba(166,176,195,0.2)] cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={(options as any)[key]}
                    onChange={() => handleToggleOption(key as any)}
                    className="w-4 h-4 rounded text-[#2563EB] focus:ring-0 border-[#CBD5E1]"
                  />
                  <span className="text-[#334155] font-semibold">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Dynamic Options */}
          <div className="skeuo-raised p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
                Advanced Dynamic & Instrumentation Options
              </h3>
              <span className="text-[10px] font-mono text-[#1D4ED8] bg-[#DBEAFE] px-2 py-0.5 rounded-md border border-[#93C5FD] font-bold">
                Frida 16.2.1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  key: 'fridaInstrumentation',
                  label: 'Frida Dynamic Instrumentation',
                  desc: 'Hook native APIs, runtime crypto, and IPC handlers.',
                },
                {
                  key: 'proxyConfig',
                  label: 'Burp Suite / Proxy Routing',
                  desc: 'Reroute emulator network traffic through interception proxy.',
                },
                {
                  key: 'sslPinning',
                  label: 'SSL Pinning Detection & Bypass',
                  desc: 'Audit OkHttp, TrustKit, and NetworkSecurityConfig pin-sets.',
                },
                {
                  key: 'rootDetection',
                  label: 'Root & Jailbreak Resilience Analysis',
                  desc: 'Probe app reaction to su binaries, test-keys, and Magisk hide.',
                },
              ].map(({ key, label, desc }) => (
                <label
                  key={key}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] hover:border-[#94A3B8] shadow-[1.5px_1.5px_3px_rgba(166,176,195,0.2)] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={(options as any)[key]}
                    onChange={() => handleToggleOption(key as any)}
                    className="w-4 h-4 mt-0.5 rounded text-[#2563EB] focus:ring-0 border-[#CBD5E1]"
                  />
                  <div>
                    <span className="text-xs text-[#1E293B] font-bold block">{label}</span>
                    <span className="text-[11px] text-[#64748B] block mt-0.5 leading-relaxed font-medium">{desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Back & Start Scan Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(1)}
              className="skeuo-btn px-5 py-2.5 rounded-xl text-xs font-semibold text-[#475569]"
            >
              Back to Upload
            </button>

            <button
              onClick={handleLaunchAnalysis}
              className="skeuo-btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold"
            >
              <Play className="w-4 h-4" />
              <span>Start Security Analysis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
