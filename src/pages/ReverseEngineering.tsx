import React, { useState } from 'react';
import {
  Code2,
  FileCode,
  FileText,
  Search,
  Smartphone,
  Folder,
  Box,
  Key,
} from 'lucide-react';
import { CodeViewer } from '../components/common/CodeViewer';

export const ReverseEngineering: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Manifest' | 'Classes' | 'Strings' | 'Resources' | 'Permissions' | 'Libraries'>('Manifest');

  const mockManifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.securebank.mobile.retail"
    android:versionCode="204"
    android:versionName="2.4.1">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CAMERA" />

    <application
        android:name=".SecureBankApp"
        android:allowBackup="true"
        android:debuggable="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:networkSecurityConfig="@xml/network_security_config"
        android:supportsRtl="true"
        android:theme="@style/Theme.SecureBank">

        <activity
            android:name=".ui.SplashActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity
            android:name=".ui.TransferFundsActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            <!-- [WARNING] Exported Activity without signature permission! -->
            <intent-filter>
                <action android:name="com.securebank.action.QUICK_TRANSFER" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <service
            android:name=".services.TransactionSyncService"
            android:exported="false" />

    </application>
</manifest>`;

  const mockApiClientJava = `package com.securebank.mobile.network;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import java.io.IOException;

public final class ApiClient {
    public static final String BASE_URL = "https://api.securebank-production.internal/v2";
    
    // [FINDING] Production secret discovered hardcoded in client binary
    public static final String API_SECRET_KEY = "sk_live_9a7f****************4e1b";
    public static final String GATEWAY_TOKEN = "gw_auth_tok_88291f09c2a381ef";

    public static OkHttpClient getClient() {
        return new OkHttpClient.Builder()
            .addInterceptor(chain -> {
                Request original = chain.request();
                Request request = original.newBuilder()
                    .header("X-Api-Key", API_SECRET_KEY)
                    .header("X-Client-Platform", "Android")
                    .method(original.method(), original.body())
                    .build();
                return chain.proceed(request);
            })
            .build();
    }
}`;

  const mockStringsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">SecureBank Mobile</string>
    <string name="auth_endpoint">https://auth.securebank.internal/oauth/token</string>
    <string name="default_jwt_issuer">https://idp.securebank.internal</string>
    <string name="firebase_database_url">https://securebank-telemetry-default-rtdb.firebaseio.com</string>
    <string name="google_api_key">AIzaSyB***********************k90</string>
    <string name="sentry_dsn">https://public@sentry.io/184920</string>
    <string name="analytics_tracker_id">UA-998124-01</string>
</resources>`;

  const nativeLibraries = [
    { name: 'libcrypto_jni.so', arch: 'arm64-v8a', size: '1.4 MB', symbols: '24 exported', status: 'Stripped' },
    { name: 'libssl_engine.so', arch: 'arm64-v8a', size: '2.1 MB', symbols: '38 exported', status: 'Stripped' },
    { name: 'libfrida_gadget.so', arch: 'arm64-v8a', size: '4.8 MB', symbols: '86 exported', status: 'Instrumented' },
    { name: 'libsqlite_compat.so', arch: 'arm64-v8a', size: '840 KB', symbols: '12 exported', status: 'Stripped' },
  ];

  const thirdPartySdks = [
    { name: 'OkHttp', version: '4.10.0', category: 'Networking', cves: 0, status: 'Safe' },
    { name: 'Retrofit', version: '2.9.0', category: 'REST Client', cves: 0, status: 'Safe' },
    { name: 'Firebase Core', version: '21.1.1', category: 'Analytics', cves: 0, status: 'Safe' },
    { name: 'BouncyCastle (bcprov-jdk15on)', version: '1.68', category: 'Cryptography', cves: 2, status: 'Vulnerable' },
    { name: 'Gson', version: '2.8.9', category: 'Serialization', cves: 1, status: 'Warning' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#2563EB] tracking-wider uppercase font-bold">
              Decompiler & Static Binary Analysis
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E293B] tracking-tight">
            Reverse Engineering Explorer
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Browse decompiled Java bytecode, extract AndroidManifest components, inspect strings & native libraries.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FAFBFD] p-2.5 rounded-xl border border-[#CBD5E1] shadow-[1.5px_1.5px_3px_rgba(166,176,195,0.2)] text-xs font-mono">
          <Smartphone className="w-3.5 h-3.5 text-[#2563EB]" />
          <span className="text-[#1E293B] font-bold">SecureBank_v2.4.1.apk</span>
        </div>
      </div>

      {/* Package Structure & Metadata Top Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">Activities</span>
          <span className="text-[#2563EB] font-black text-sm block mt-0.5">18 (1 Exported)</span>
        </div>
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">Services</span>
          <span className="text-[#1E293B] font-black text-sm block mt-0.5">6 Declared</span>
        </div>
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">Receivers</span>
          <span className="text-[#1E293B] font-black text-sm block mt-0.5">5 Declared</span>
        </div>
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">Providers</span>
          <span className="text-[#1E293B] font-black text-sm block mt-0.5">2 Content</span>
        </div>
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">Native (.so)</span>
          <span className="text-[#4F46E5] font-black text-sm block mt-0.5">4 Libraries</span>
        </div>
        <div className="skeuo-raised p-3 rounded-xl">
          <span className="text-[#64748B] text-[10px] block font-bold">3rd-Party SDKs</span>
          <span className="text-[#D97706] font-black text-sm block mt-0.5">5 Flagged</span>
        </div>
      </div>

      {/* Tactile Tabs Bar */}
      <div className="skeuo-segmented-container flex items-center gap-1.5 overflow-x-auto p-1">
        {[
          { id: 'Manifest', label: 'AndroidManifest.xml', icon: FileCode },
          { id: 'Classes', label: 'Decompiled Classes (AST)', icon: Code2 },
          { id: 'Strings', label: 'resources.arsc / strings.xml', icon: FileText },
          { id: 'Libraries', label: 'Native Libs & SDKs', icon: Box },
          { id: 'Permissions', label: 'Permissions Analysis', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
                isActive
                  ? 'skeuo-segmented-active'
                  : 'text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      {activeTab === 'Manifest' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] font-medium">
            <span>APK Manifest Path: /AndroidManifest.xml</span>
            <span className="text-[#DC2626] font-bold">1 Dangerous Exported Component Identified</span>
          </div>
          <CodeViewer code={mockManifestXml} language="xml" filename="AndroidManifest.xml" />
        </div>
      )}

      {activeTab === 'Classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* File Tree Left Column */}
          <div className="skeuo-recessed p-4 rounded-xl font-mono text-xs space-y-2">
            <span className="text-[10px] text-[#64748B] uppercase block font-bold">
              Package Explorer
            </span>
            <div className="space-y-1 text-[#334155]">
              <div className="flex items-center gap-1.5 text-[#2563EB] font-bold">
                <Folder className="w-3.5 h-3.5" />
                <span>com.securebank.mobile</span>
              </div>
              <div className="pl-4 space-y-1 text-[#475569]">
                <div className="flex items-center gap-1.5 text-[#1D4ED8] font-bold">
                  <Folder className="w-3.5 h-3.5" />
                  <span>network</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="bg-[#FAFBFD] text-[#2563EB] font-bold px-2 py-1 rounded-md border border-[#CBD5E1] shadow-[1px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer">
                    ApiClient.java
                  </div>
                  <div className="hover:text-[#1E293B] px-2 py-0.5 cursor-pointer">
                    AuthInterceptor.java
                  </div>
                  <div className="hover:text-[#1E293B] px-2 py-0.5 cursor-pointer">
                    SSLTrustPinning.java
                  </div>
                </div>

                <div className="flex items-center gap-1.5 hover:text-[#1E293B] cursor-pointer pt-1 font-medium">
                  <Folder className="w-3.5 h-3.5" />
                  <span>ui</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[#1E293B] cursor-pointer font-medium">
                  <Folder className="w-3.5 h-3.5" />
                  <span>data</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[#1E293B] cursor-pointer font-medium">
                  <Folder className="w-3.5 h-3.5" />
                  <span>crypto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Viewer Right Column */}
          <div className="lg:col-span-3">
            <CodeViewer
              code={mockApiClientJava}
              language="java"
              filename="com/securebank/mobile/network/ApiClient.java"
            />
          </div>
        </div>
      )}

      {activeTab === 'Strings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] font-medium">
            <span>Decompiled String Pool (Extracted from resources.arsc)</span>
            <span className="text-[#2563EB] font-bold">Entropy Filter: Secrets & Cloud URLs Detected</span>
          </div>
          <CodeViewer code={mockStringsXml} language="xml" filename="res/values/strings.xml" />
        </div>
      )}

      {activeTab === 'Libraries' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Native Libraries (.so) */}
          <div className="skeuo-raised p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#1E293B] uppercase font-mono tracking-wider">
              Native Shared Objects (lib/)
            </h3>
            <div className="divide-y divide-[#E2E8F0] font-mono text-xs">
              {nativeLibraries.map((lib) => (
                <div key={lib.name} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="text-[#1E293B] font-bold block">{lib.name}</span>
                    <span className="text-[10px] text-[#64748B]">
                      Arch: {lib.arch} · Size: {lib.size}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAFBFD] text-[#2563EB] border border-[#CBD5E1] shadow-[1px_1px_2px_rgba(0,0,0,0.05)] font-bold">
                    {lib.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Third-Party SDK Vulnerability Analysis */}
          <div className="skeuo-raised p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#1E293B] uppercase font-mono tracking-wider">
              Third-Party SDK Inventory & Supply Chain
            </h3>
            <div className="divide-y divide-[#E2E8F0] font-mono text-xs">
              {thirdPartySdks.map((sdk) => (
                <div key={sdk.name} className="py-3 flex items-center justify-between">
                  <div>
                    <span className="text-[#1E293B] font-bold block">{sdk.name} v{sdk.version}</span>
                    <span className="text-[10px] text-[#64748B]">Category: {sdk.category}</span>
                  </div>
                  <div className="text-right">
                    {sdk.cves > 0 ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] font-extrabold">
                        {sdk.cves} Known CVEs
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-bold">
                        Zero CVEs
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Permissions' && (
        <div className="skeuo-raised p-6 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-[#1E293B] uppercase font-mono tracking-wider">
            Static Permission Threat Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {[
              { perm: 'android.permission.INTERNET', risk: 'NORMAL', desc: 'Allows application to open network sockets.' },
              { perm: 'android.permission.ACCESS_NETWORK_STATE', risk: 'NORMAL', desc: 'Allows access to network connections information.' },
              { perm: 'android.permission.USE_BIOMETRIC', risk: 'SENSITIVE', desc: 'Permits use of biometric hardware (Fingerprint, Face).' },
              { perm: 'android.permission.READ_EXTERNAL_STORAGE', risk: 'DANGEROUS', desc: 'Grants access to files stored in external world-readable partitions.' },
              { perm: 'android.permission.WRITE_EXTERNAL_STORAGE', risk: 'DANGEROUS', desc: 'Allows persisting artifacts on external storage.' },
              { perm: 'android.permission.CAMERA', risk: 'DANGEROUS', desc: 'Allows access to device camera hardware for check scanning.' },
            ].map(({ perm, risk, desc }) => (
              <div
                key={perm}
                className="p-3.5 rounded-xl bg-[#FAFBFD] border border-[#CBD5E1] shadow-[2px_2px_5px_rgba(166,176,195,0.25)] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#1D4ED8] font-bold">{perm}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                      risk === 'DANGEROUS'
                        ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]'
                        : 'bg-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {risk}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] font-sans font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
