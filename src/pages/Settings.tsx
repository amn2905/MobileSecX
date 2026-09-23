import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Sliders,
  Bell,
  Server,
  Wifi,
  Zap,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
} from 'lucide-react';
import { api } from '../services/api';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'General' | 'Security' | 'Scanning' | 'Notifications' | 'API' | 'Proxy' | 'Frida' | 'Storage'>('General');
  const [backendTestStatus, setBackendTestStatus] = useState<'idle' | 'testing' | 'online' | 'offline'>('idle');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states (with placeholders / fake credentials)
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api');
  const [proxyHost, setProxyHost] = useState('127.0.0.1');
  const [proxyPort, setProxyPort] = useState('8080');
  const [fridaHost, setFridaHost] = useState('127.0.0.1');
  const [fridaPort, setFridaPort] = useState('27042');

  const handleTestConnection = async () => {
    setBackendTestStatus('testing');
    const result = await api.checkBackendHealth();
    setBackendTestStatus(result.status);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const sections = [
    { id: 'General', label: 'General', icon: SettingsIcon },
    { id: 'Security', label: 'Security & Auth', icon: Shield },
    { id: 'Scanning', label: 'Scanning Profiles', icon: Sliders },
    { id: 'Notifications', label: 'Notifications', icon: Bell },
    { id: 'API', label: 'API Configuration', icon: Server },
    { id: 'Proxy', label: 'Proxy (Burp Suite)', icon: Wifi },
    { id: 'Frida', label: 'Frida Server', icon: Zap },
    { id: 'Storage', label: 'Storage & Artifacts', icon: HardDrive },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold text-blue-600 tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200">
              System Configuration
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1E293B] tracking-tight">
            Framework Settings
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Configure FastAPI backend endpoints, Burp Suite proxy routing, and Frida dynamic instrumentation hooks.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-mono font-bold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      {/* Main Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="skeuo-raised p-2 rounded-2xl border border-[#D5DAE1] space-y-1.5 h-fit bg-[#FAFBFD]">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                  isActive
                    ? 'skeuo-recessed text-blue-700 border border-blue-200 bg-[#EEF2F6]'
                    : 'text-[#475569] hover:text-[#1E293B] hover:bg-[#F1F5F9] border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-[#64748B]'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Form Area (Col 2-4) */}
        <div className="md:col-span-3">
          <form onSubmit={handleSave} className="skeuo-raised p-6 rounded-2xl border border-[#D5DAE1] space-y-6 bg-[#FAFBFD]">
            {activeSection === 'General' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  General System Preferences
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Organization / SOC Workspace
                    </label>
                    <input
                      type="text"
                      defaultValue="CyberSec Research Lab"
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Default Assessment Target Platform
                    </label>
                    <select className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs">
                      <option>Android (APK / AAB)</option>
                      <option>iOS (IPA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Timezone & Audit Clock
                    </label>
                    <input
                      type="text"
                      defaultValue="UTC (Coordinated Universal Time)"
                      disabled
                      className="skeuo-recessed w-full px-3.5 py-2.5 border border-[#D5DAE1] rounded-xl text-[#64748B] font-mono text-xs cursor-not-allowed bg-[#E9EEF5]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'API' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  FastAPI Backend Service Bridge
                </h3>
                <p className="text-xs text-[#64748B]">
                  Configure the URL for the external FastAPI microservice engine. If offline, the client automatically defaults to Demo Mode mock data.
                </p>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      FastAPI Base URL (VITE_API_BASE_URL)
                    </label>
                    <input
                      type="text"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="http://localhost:8000/api"
                      className="skeuo-input w-full px-3.5 py-2.5 text-blue-600 font-mono text-xs font-semibold"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={backendTestStatus === 'testing'}
                      className="skeuo-btn flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-[#1E293B]"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${
                          backendTestStatus === 'testing' ? 'animate-spin text-blue-600' : 'text-[#64748B]'
                        }`}
                      />
                      <span>Test Connection</span>
                    </button>

                    {backendTestStatus === 'online' && (
                      <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Connected to FastAPI (12ms)
                      </span>
                    )}

                    {backendTestStatus === 'offline' && (
                      <span className="text-xs font-mono font-bold text-amber-700 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> FastAPI Offline — Running in Demo Mode
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Proxy' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Burp Suite / OWASP ZAP Proxy Integration
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Proxy Host
                    </label>
                    <input
                      type="text"
                      value={proxyHost}
                      onChange={(e) => setProxyHost(e.target.value)}
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Proxy Port
                    </label>
                    <input
                      type="text"
                      value={proxyPort}
                      onChange={(e) => setProxyPort(e.target.value)}
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                </div>
                <div className="p-3.5 skeuo-recessed rounded-xl border border-[#D5DAE1] text-[11px] font-mono text-[#64748B] bg-[#EEF2F6]">
                  Root CA Certificate automatically generated for target Android emulators.
                </div>
              </div>
            )}

            {activeSection === 'Frida' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Frida Instrumentation Server
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Frida Daemon Host
                    </label>
                    <input
                      type="text"
                      value={fridaHost}
                      onChange={(e) => setFridaHost(e.target.value)}
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Frida Daemon Port
                    </label>
                    <input
                      type="text"
                      value={fridaPort}
                      onChange={(e) => setFridaPort(e.target.value)}
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Security' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Authentication & Role Policies
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      API Access Token (Placeholder)
                    </label>
                    <input
                      type="password"
                      defaultValue="msx_sec_token_993821038102931"
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 pt-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-[#CBD5E1] text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-[#334155] font-semibold">Enforce multi-factor verification for production reports</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Scanning' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Scan Engine Profiles & Throttling
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3.5 skeuo-recessed rounded-xl border border-[#D5DAE1] bg-[#EEF2F6]">
                    <div>
                      <span className="font-bold text-[#1E293B] block">Deep Bytecode Entropy Analysis</span>
                      <span className="text-[11px] text-[#64748B]">Scans compiled DEX for Shannon entropy spikes</span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-[#CBD5E1] text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3.5 skeuo-recessed rounded-xl border border-[#D5DAE1] bg-[#EEF2F6]">
                    <div>
                      <span className="font-bold text-[#1E293B] block">Auto-Decompile Smali to Java</span>
                      <span className="text-[11px] text-[#64748B]">Jadx AST reconstruction</span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-[#CBD5E1] text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Notifications' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Alert Channels & Webhooks
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#334155] font-bold mb-1.5">
                      Slack / Discord Security Webhook URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://hooks.slack.com/services/T000/B000/XXXX"
                      className="skeuo-input w-full px-3.5 py-2.5 text-[#1E293B] font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Storage' && (
              <div className="space-y-4">
                <h3 className="text-sm font-black text-[#1E293B] uppercase font-mono tracking-wider pb-2 border-b border-[#D5DAE1]">
                  Storage Management
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3.5 skeuo-recessed rounded-xl border border-[#D5DAE1] flex justify-between bg-[#EEF2F6]">
                    <span className="text-[#64748B] font-medium">Cached Decompiled APKs:</span>
                    <span className="text-[#1E293B] font-black">1.4 GB</span>
                  </div>
                  <div className="p-3.5 skeuo-recessed rounded-xl border border-[#D5DAE1] flex justify-between bg-[#EEF2F6]">
                    <span className="text-[#64748B] font-medium">Scan Artifact Logs:</span>
                    <span className="text-[#1E293B] font-black">340 MB</span>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-[#D5DAE1] flex justify-end">
              <button
                type="submit"
                className="skeuo-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
