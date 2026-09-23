import {
  Application,
  Vulnerability,
  Scan,
  ApiEndpoint,
  OwaspCategory,
  ScanLog,
  RuntimeEvent,
  SecurityScoreBreakdown,
  SecurityReport,
} from '../types';

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    name: 'SecureBank',
    packageName: 'com.securebank.mobile.retail',
    platform: 'Android',
    fileType: 'APK',
    version: 'v2.4.1',
    fileSize: '42.6 MB',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    md5: '7d56ee6463901b0b548b8ca8131343b6',
    uploadDate: '2026-03-20T10:14:00Z',
    lastScanDate: '2 hours ago',
    securityScore: 78,
    riskLevel: 'MODERATE',
    vulnerabilitiesCount: {
      critical: 2,
      high: 4,
      medium: 4,
      low: 2,
      info: 5,
      total: 17,
    },
    status: 'Risk Detected',
    minSdk: 'API 26 (Android 8.0)',
    targetSdk: 'API 34 (Android 14)',
    mainActivity: 'com.securebank.mobile.ui.SplashActivity',
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.USE_BIOMETRIC',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.CAMERA',
      'android.permission.RECEIVE_BOOT_COMPLETED',
    ],
    components: {
      activities: 18,
      services: 6,
      receivers: 5,
      providers: 2,
    },
    iconBg: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'app-2',
    name: 'ShopEase',
    packageName: 'com.shopease.ecommerce.app',
    platform: 'Android',
    fileType: 'APK',
    version: 'v4.1.0',
    fileSize: '68.2 MB',
    sha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    md5: '5d41402abc4b2a76b9719d911017c592',
    uploadDate: '2026-03-22T08:30:00Z',
    lastScanDate: 'Yesterday',
    securityScore: 91,
    riskLevel: 'LOW',
    vulnerabilitiesCount: {
      critical: 0,
      high: 1,
      medium: 2,
      low: 1,
      info: 3,
      total: 7,
    },
    status: 'Completed',
    minSdk: 'API 28 (Android 9.0)',
    targetSdk: 'API 34 (Android 14)',
    mainActivity: 'com.shopease.ui.HomeActivity',
    permissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.POST_NOTIFICATIONS',
    ],
    components: {
      activities: 12,
      services: 3,
      receivers: 2,
      providers: 1,
    },
    iconBg: 'from-emerald-600 to-teal-500',
  },
  {
    id: 'app-3',
    name: 'HealthConnect',
    packageName: 'org.healthconnect.patient.ios',
    platform: 'iOS',
    fileType: 'IPA',
    version: 'v1.8.2',
    fileSize: '89.4 MB',
    sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945',
    md5: '098f6bcd4621d373cade4e832627b4f6',
    uploadDate: '2026-03-19T14:22:00Z',
    lastScanDate: '3 days ago',
    securityScore: 64,
    riskLevel: 'HIGH',
    vulnerabilitiesCount: {
      critical: 4,
      high: 8,
      medium: 10,
      low: 5,
      info: 8,
      total: 35,
    },
    status: 'Risk Detected',
    minSdk: 'iOS 15.0',
    targetSdk: 'iOS 17.4',
    mainActivity: 'HealthConnect.AppDelegate',
    permissions: [
      'NSHealthShareUsageDescription',
      'NSHealthUpdateUsageDescription',
      'NSCameraUsageDescription',
      'NSFaceIDUsageDescription',
      'NSLocationWhenInUseUsageDescription',
    ],
    components: {
      activities: 24,
      services: 8,
      receivers: 4,
      providers: 3,
    },
    iconBg: 'from-rose-600 to-pink-500',
  },
  {
    id: 'app-4',
    name: 'FinTrack',
    packageName: 'com.fintrack.portfolio.pro',
    platform: 'Android',
    fileType: 'AAB',
    version: 'v3.0.5',
    fileSize: '34.1 MB',
    sha256: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    md5: 'ad0234829205b9033196ba818f7a872b',
    uploadDate: '2026-03-18T16:45:00Z',
    lastScanDate: '5 days ago',
    securityScore: 85,
    riskLevel: 'LOW',
    vulnerabilitiesCount: {
      critical: 0,
      high: 2,
      medium: 3,
      low: 2,
      info: 4,
      total: 11,
    },
    status: 'Completed',
    minSdk: 'API 29 (Android 10)',
    targetSdk: 'API 34 (Android 14)',
    mainActivity: 'com.fintrack.DashboardActivity',
    permissions: [
      'android.permission.INTERNET',
      'android.permission.USE_BIOMETRIC',
    ],
    components: {
      activities: 14,
      services: 4,
      receivers: 2,
      providers: 1,
    },
    iconBg: 'from-indigo-600 to-violet-500',
  },
  {
    id: 'app-5',
    name: 'CryptoVault',
    packageName: 'io.cryptovault.web3.wallet',
    platform: 'Android',
    fileType: 'APK',
    version: 'v1.1.0',
    fileSize: '51.3 MB',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    md5: 'd41d8cd98f00b204e9800998ecf8427e',
    uploadDate: '2026-03-23T11:00:00Z',
    lastScanDate: '1 hour ago',
    securityScore: 52,
    riskLevel: 'CRITICAL',
    vulnerabilitiesCount: {
      critical: 5,
      high: 9,
      medium: 12,
      low: 8,
      info: 6,
      total: 40,
    },
    status: 'Risk Detected',
    minSdk: 'API 26 (Android 8.0)',
    targetSdk: 'API 33 (Android 13)',
    mainActivity: 'io.cryptovault.WalletInitActivity',
    permissions: [
      'android.permission.INTERNET',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.CAMERA',
      'android.permission.SYSTEM_ALERT_WINDOW',
    ],
    components: {
      activities: 20,
      services: 7,
      receivers: 6,
      providers: 2,
    },
    iconBg: 'from-amber-600 to-orange-500',
  },
];

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: 'VULN-2026-001',
    title: 'Hardcoded API Key',
    severity: 'CRITICAL',
    cvss: 9.1,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'Hardcoded Secrets',
    owaspCategory: 'M1 Improper Credential Usage',
    owaspId: 'MSTG-STORAGE-2',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:15',
    description:
      'A production cloud API authentication secret key was identified hardcoded directly into the decompiled client application source code. Attackers extracting this key can make unauthorized API requests impersonating backend services.',
    technicalEvidence: `// Decompiled from com.securebank.mobile.network.ApiClient.class
package com.securebank.mobile.network;

public final class ApiClient {
    public static final String BASE_URL = "https://api.securebank-production.internal/v2";
    // [FINDING] Critical Hardcoded production secret discovered in client binary
    public static final String API_SECRET_KEY = "sk_live_9a7f****************4e1b";
    public static final String GATEWAY_TOKEN = "gw_auth_tok_88291f09c2a381ef";

    public static OkHttpClient getClient() {
        return new OkHttpClient.Builder()
            .addInterceptor(chain -> chain.proceed(
                chain.request().newBuilder()
                    .addHeader("X-Api-Key", API_SECRET_KEY)
                    .build()
            )).build();
    }
}`,
    affectedComponent: 'com.securebank.mobile.network.ApiClient.kt:L14',
    detectionMethod: 'Static AST & Entropy Analysis (Regex: Bearer/API Key Patterns)',
    proofOfConcept: `curl -X POST https://api.securebank-production.internal/v2/admin/accounts/summary \\
  -H "X-Api-Key: sk_live_9a7f****************4e1b" \\
  -H "Content-Type: application/json"`,
    risk: 'CRITICAL - Exposes root API endpoints and tenant backend services to unauthenticated client actors without rate limiting or identity attribution.',
    impact: 'Full compromise of payment gateway integration and potential exfiltration of sensitive account records.',
    remediation:
      'Immediately revoke the compromised API secret from your identity provider and KMS. Implement token exchange via an authenticated Backend-For-Frontend (BFF) proxy utilizing short-lived OAuth 2.0 PKCE tokens stored securely in Android Keystore / iOS Keychain.',
    references: [
      'https://mas.owasp.org/checklists/MASVS-CRYPTO/',
      'https://cwe.mitre.org/data/definitions/798.html',
      'https://cwe.mitre.org/data/definitions/200.html',
    ],
  },
  {
    id: 'VULN-2026-002',
    title: 'Insecure Data Storage in SharedPreferences',
    severity: 'HIGH',
    cvss: 7.5,
    cvssVector: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'Storage Security',
    owaspCategory: 'M9 Insecure Data Storage',
    owaspId: 'MSTG-STORAGE-1',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:09',
    description:
      'Application persists unencrypted session tokens, user emails, and transaction caches in world-readable private SharedPreferences XML files, leaving them exposed on rooted devices or via backup exploits.',
    technicalEvidence: `<!-- Path: /data/data/com.securebank.mobile.retail/shared_prefs/user_session.xml -->
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="auth_token">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiQWxpY2UgU21pdGgiLCJyb2xlIjoiY3VzdG9tZXIifQ...</string>
    <string name="user_email">alice.smith@example-bank.com</string>
    <string name="account_balance">$14,250.00</string>
    <boolean name="biometric_enrolled" value="true" />
</map>`,
    affectedComponent: 'com.securebank.mobile.data.SessionManager.java',
    detectionMethod: 'Static Data Flow Taint Analysis & Dynamic Storage Monitor',
    proofOfConcept: 'adb shell run-as com.securebank.mobile.retail cat /data/data/com.securebank.mobile.retail/shared_prefs/user_session.xml',
    risk: 'Physical device access, malicious backup extraction, or local privilege escalation allows complete account session hijacking.',
    impact: 'Attacker obtains persistent user credentials and private banking details without triggering biometric prompts.',
    remediation:
      'Migrate all sensitive SharedPreferences to Android EncryptedSharedPreferences with MasterKey hardware backing: EncryptedSharedPreferences.create(context, "secure_session", masterKey, PrefKeyEncryptionScheme.AES256_SIV, PrefValueEncryptionScheme.AES256_GCM).',
    references: [
      'https://developer.android.com/topic/security/data',
      'https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0001/',
    ],
  },
  {
    id: 'VULN-2026-003',
    title: 'Improper Certificate Validation (TrustAllCerts)',
    severity: 'CRITICAL',
    cvss: 8.8,
    cvssVector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N',
    application: 'HealthConnect',
    applicationId: 'app-3',
    category: 'Network Security',
    owaspCategory: 'M5 Insecure Communication',
    owaspId: 'MSTG-NETWORK-3',
    status: 'OPEN',
    detectedDate: '2026-03-21 09:15:42',
    description:
      'Custom X509TrustManager implementation contains an empty checkServerTrusted() stub, accepting self-signed or invalid SSL/TLS certificates and leaving the app vulnerable to Man-In-The-Middle (MITM) attacks.',
    technicalEvidence: `// Security risk: accepting all TLS certificates blindly
public class PermissiveTrustManager implements X509TrustManager {
    @Override
    public void checkClientTrusted(X509Certificate[] chain, String authType) {}

    @Override
    public void checkServerTrusted(X509Certificate[] chain, String authType) {
        // [VULNERABILITY] Explicit bypass of TLS certificate validation chain
        // Does not throw CertificateException
    }

    @Override
    public X509Certificate[] getAcceptedIssuers() {
        return new X509Certificate[0];
    }
}`,
    affectedComponent: 'org.healthconnect.net.PermissiveTrustManager.swift',
    detectionMethod: 'Frida SSL Hooking & Static AST Matcher',
    proofOfConcept: 'mitmproxy -p 8080 --listen-host 0.0.0.0 --insecure to capture raw health telemetry payloads.',
    risk: 'Any rogue Wi-Fi access point or network proxy can intercept, decrypt, and manipulate all transit health data in cleartext.',
    impact: 'Loss of HIPAA compliance, medical record exfiltration, and active request forgery.',
    remediation:
      'Delete the custom trust manager. Leverage platform default TrustManagers and enforce certificate pinning using Network Security Config with pin-set hashes.',
    references: [
      'https://mas.owasp.org/MASTG/tests/android/MASVS-NETWORK/MASTG-TEST-0020/',
      'https://cwe.mitre.org/data/definitions/295.html',
    ],
  },
  {
    id: 'VULN-2026-004',
    title: 'Exported Activity Without Permission Protection',
    severity: 'HIGH',
    cvss: 7.2,
    cvssVector: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'Platform Misconfiguration',
    owaspCategory: 'M8 Security Misconfiguration',
    owaspId: 'MSTG-PLATFORM-1',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:04',
    description:
      'Activity `com.securebank.mobile.TransferFundsActivity` is declared with `android:exported="true"` in AndroidManifest.xml without signature-level permissions or intent validation.',
    technicalEvidence: `<!-- AndroidManifest.xml: Line 68 -->
<activity
    android:name="com.securebank.mobile.TransferFundsActivity"
    android:exported="true"
    android:screenOrientation="portrait">
    <!-- Missing android:permission="com.securebank.SIGNATURE_PERMISSION" -->
    <intent-filter>
        <action android:name="com.securebank.action.QUICK_TRANSFER" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>`,
    affectedComponent: 'AndroidManifest.xml:L68',
    detectionMethod: 'Static Manifest XML Security Parser',
    proofOfConcept: 'adb shell am start -n com.securebank.mobile.retail/com.securebank.mobile.TransferFundsActivity --es recipient "attacker_account" --ef amount 5000.00',
    risk: 'Any malicious non-privileged app on the user device can invoke the money transfer screen bypassing preliminary 2FA and biometric locks.',
    impact: 'Unauthorized fund transfer initiation and UI spoofing.',
    remediation:
      'Set android:exported="false" if the activity is only internal, or protect it with android:permission with protectionLevel="signature".',
    references: [
      'https://developer.android.com/guide/topics/manifest/activity-element#exported',
      'https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0028/',
    ],
  },
  {
    id: 'VULN-2026-005',
    title: 'Insecure API Endpoint Exposing PII',
    severity: 'HIGH',
    cvss: 8.1,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'API Security',
    owaspCategory: 'M4 Insufficient Input/Output Validation',
    owaspId: 'MSTG-NETWORK-1',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:24',
    description:
      'The API endpoint `/api/v2/users/{id}/financial-profile` allows unauthenticated access when invoked with guessable numeric user IDs (IDOR/BOLA vulnerability).',
    technicalEvidence: `GET /api/v2/users/10492/financial-profile HTTP/1.1
Host: api.securebank-production.internal
User-Agent: MobileSecX-Fuzzer/2.4
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 482

{
  "user_id": 10492,
  "ssn_last4": "8814",
  "credit_limit": 25000,
  "current_debt": 3120.45,
  "credit_score": 792,
  "primary_email": "target_customer@domain.com"
}`,
    affectedComponent: 'REST Endpoint /api/v2/users/{id}/financial-profile',
    detectionMethod: 'API Security Testing & Authorization Matrix Fuzzer',
    proofOfConcept: 'Burp Suite Repeater request omitting Authorization header returns status 200 with sensitive payload.',
    risk: 'Mass scraping of customer financial credit records without credentials.',
    impact: 'Violation of GDPR/GLBA regulations and severe reputational damage.',
    remediation:
      'Enforce object-level access controls (BOLA prevention) verifying that the JWT caller identity matches the requested subject ID on every endpoint request.',
    references: [
      'https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/',
      'https://mas.owasp.org/checklists/MASVS-STORAGE/',
    ],
  },
  {
    id: 'VULN-2026-006',
    title: 'Weak Cryptographic Algorithm (DES / MD5 in Local Cache)',
    severity: 'MEDIUM',
    cvss: 5.9,
    cvssVector: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'Cryptographic Flaws',
    owaspCategory: 'M10 Insufficient Cryptography',
    owaspId: 'MSTG-CRYPTO-1',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:18',
    description:
      'App uses legacy DES cipher and MD5 hashing for caching card numbers in SQLite local cache database.',
    technicalEvidence: `// Cryptographic instantiation in DatabaseHelper.java
Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
MessageDigest md = MessageDigest.getInstance("MD5");
byte[] hash = md.digest(panNumber.getBytes());`,
    affectedComponent: 'com.securebank.mobile.db.DatabaseHelper.java:L142',
    detectionMethod: 'Static Bytecode Cryptographic Analyzer',
    proofOfConcept: 'Brute-forcing offline DES encrypted database blocks in under 12 minutes using Hashcat.',
    risk: 'Legacy ciphers are easily crackable with commodity hardware.',
    impact: 'Exposes stored payment instruments to local device attackers.',
    remediation:
      'Replace DES and MD5 with AES-256-GCM authenticated encryption and SHA-256 / Argon2id for hashing.',
    references: [
      'https://mas.owasp.org/MASTG/tests/android/MASVS-CRYPTO/MASTG-TEST-0012/',
      'https://cwe.mitre.org/data/definitions/327.html',
    ],
  },
  {
    id: 'VULN-2026-007',
    title: 'Debuggable Application Flag Enabled',
    severity: 'HIGH',
    cvss: 7.4,
    cvssVector: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    application: 'CryptoVault',
    applicationId: 'app-5',
    category: 'Build Configuration',
    owaspCategory: 'M8 Security Misconfiguration',
    owaspId: 'MSTG-RESILIENCE-1',
    status: 'OPEN',
    detectedDate: '2026-03-23 11:02:10',
    description:
      'The package manifest explicitly enables `android:debuggable="true"`, allowing any attacker with USB debugging enabled to attach jdb/gdb breakpoints and inspect live memory.',
    technicalEvidence: `<!-- AndroidManifest.xml -->
<application
    android:name=".CryptoVaultApp"
    android:allowBackup="true"
    android:debuggable="true"
    android:icon="@mipmap/ic_launcher">`,
    affectedComponent: 'AndroidManifest.xml:L12',
    detectionMethod: 'Manifest Scanner (AAPT2 Dump Badging)',
    proofOfConcept: 'adb jdwp; jdb -attach localhost:8600 to extract live private key seed bytes from RAM.',
    risk: 'Full interactive memory dumping and dynamic execution hijack.',
    impact: 'Exfiltration of cryptocurrency wallet private keys and mnemonic phrases.',
    remediation:
      'Ensure android:debuggable is false in release build variants in app/build.gradle: buildTypes { release { debuggable false } }.',
    references: [
      'https://developer.android.com/guide/topics/manifest/application-element#debug',
      'https://mas.owasp.org/MASTG/tests/android/MASVS-RESILIENCE/MASTG-TEST-0036/',
    ],
  },
  {
    id: 'VULN-2026-008',
    title: 'Insecure WebView Configuration (JavaScript Bridge)',
    severity: 'HIGH',
    cvss: 7.8,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:N',
    application: 'ShopEase',
    applicationId: 'app-2',
    category: 'Code Analysis',
    owaspCategory: 'M8 Security Misconfiguration',
    owaspId: 'MSTG-PLATFORM-2',
    status: 'OPEN',
    detectedDate: '2026-03-22 08:35:12',
    description:
      'WebView exposes native Android Java bridge interface while allowing external URL navigation and cross-origin file loading.',
    technicalEvidence: `// In PromoWebViewActivity.kt
val webView: WebView = findViewById(R.id.webView)
webView.settings.javaScriptEnabled = true
webView.settings.allowFileAccess = true
webView.settings.allowUniversalAccessFromFileURLs = true
webView.addJavascriptInterface(NativeBridge(this), "AndroidNative")`,
    affectedComponent: 'com.shopease.ui.PromoWebViewActivity.kt:L54',
    detectionMethod: 'Static Dataflow Analyzer',
    proofOfConcept: '<script>AndroidNative.executeNativeAction("exfiltrate_session");</script>',
    risk: 'Cross-site scripting in third-party promo pages leads directly to native device compromise.',
    impact: 'Execution of privileged Android commands from arbitrary web pages.',
    remediation:
      'Disable allowUniversalAccessFromFileURLs and restrict JavaScript bridge bindings to strictly verified first-party domain white-lists.',
    references: [
      'https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0027/',
    ],
  },
  {
    id: 'VULN-2026-009',
    title: 'Sensitive Information in System Logs (Logcat Leakage)',
    severity: 'LOW',
    cvss: 3.7,
    cvssVector: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N',
    application: 'SecureBank',
    applicationId: 'app-1',
    category: 'Information Disclosure',
    owaspCategory: 'M9 Insecure Data Storage',
    owaspId: 'MSTG-STORAGE-3',
    status: 'OPEN',
    detectedDate: '2026-03-23 14:21:28',
    description:
      'Application prints authorization bearer tokens and customer names to android.util.Log in release builds.',
    technicalEvidence: `[14:21:28.102] Logcat output:
D/AUTH_SERVICE: Login successful for user: alice.smith@example-bank.com
D/HTTP_CLIENT: Request header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
D/ACCOUNT_SYNC: Fetched balance for account 4902-****-****-1102: $14,250.00`,
    affectedComponent: 'com.securebank.mobile.network.AuthInterceptor.java:L87',
    detectionMethod: 'Dynamic Logcat Stream Monitor',
    proofOfConcept: 'adb logcat -s AUTH_SERVICE HTTP_CLIENT ACCOUNT_SYNC',
    risk: 'Other co-installed apps with READ_LOGS or desktop ADB access can capture user credentials.',
    impact: 'Privilege escalation and credential theft.',
    remediation:
      'Strip all android.util.Log calls in ProGuard/R8 release rules: -assumenosideeffects class android.util.Log { public static *** d(...); public static *** v(...); }.',
    references: [
      'https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0003/',
    ],
  },
  {
    id: 'VULN-2026-010',
    title: 'Missing Root Detection and Anti-Frida Instrumentation',
    severity: 'MEDIUM',
    cvss: 5.5,
    cvssVector: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
    application: 'HealthConnect',
    applicationId: 'app-3',
    category: 'Binary Protection',
    owaspCategory: 'M7 Insufficient Binary Protections',
    owaspId: 'MSTG-RESILIENCE-2',
    status: 'OPEN',
    detectedDate: '2026-03-21 09:20:00',
    description:
      'Application does not implement jailbreak/root verification checks or dynamic hook detection (Frida, Substrate, Xposed).',
    technicalEvidence: `Frida agent injection test:
Spawned PID 18492 (org.healthconnect.patient)
Injected frida-gadget-16.2.1.dylib successfully.
[HealthConnect Hook]: Keystore read intercepted without application termination or anomaly event.`,
    affectedComponent: 'HealthConnect Binary Runtime Protection',
    detectionMethod: 'Dynamic Instrumentation Probe (Frida 16.2.1)',
    proofOfConcept: 'frida -U -n HealthConnect -l bypass.js executed without alert or crash.',
    risk: 'Tampering with runtime logic and bypassing security checks.',
    impact: 'Enables reverse engineers to freely hook crypto functions and inspect data in memory.',
    remediation:
      'Implement defense-in-depth runtime app self-protection (RASP) checking for su binaries, test-keys, ptrace debugging, and hook signatures.',
    references: [
      'https://mas.owasp.org/MASTG/tests/android/MASVS-RESILIENCE/MASTG-TEST-0038/',
    ],
  },
];

export const mockScans: Scan[] = [
  {
    id: 'SCAN-2026-00124',
    applicationId: 'app-1',
    applicationName: 'SecureBank.apk',
    platform: 'Android',
    scanType: 'Full Security Assessment',
    status: 'Running',
    progress: 68,
    currentStage: 'API Analysis',
    startedAt: '2026-03-23 14:20:55',
    securityScore: 78,
    findingsCount: {
      critical: 2,
      high: 4,
      medium: 4,
      low: 2,
      info: 5,
    },
    options: {
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
    },
  },
  {
    id: 'SCAN-2026-00123',
    applicationId: 'app-2',
    applicationName: 'ShopEase.apk',
    platform: 'Android',
    scanType: 'Static Analysis',
    status: 'Completed',
    progress: 100,
    currentStage: 'Report Generation',
    startedAt: '2026-03-22 08:30:10',
    completedAt: '2026-03-22 08:35:45',
    duration: '5m 35s',
    securityScore: 91,
    findingsCount: {
      critical: 0,
      high: 1,
      medium: 2,
      low: 1,
      info: 3,
    },
  },
  {
    id: 'SCAN-2026-00120',
    applicationId: 'app-3',
    applicationName: 'HealthConnect.ipa',
    platform: 'iOS',
    scanType: 'Full Security Assessment',
    status: 'Completed',
    progress: 100,
    currentStage: 'Report Generation',
    startedAt: '2026-03-19 14:22:00',
    completedAt: '2026-03-19 14:34:12',
    duration: '12m 12s',
    securityScore: 64,
    findingsCount: {
      critical: 4,
      high: 8,
      medium: 10,
      low: 5,
      info: 8,
    },
  },
  {
    id: 'SCAN-2026-00118',
    applicationId: 'app-1',
    applicationName: 'SecureBank_v2.3.9.apk',
    platform: 'Android',
    scanType: 'Full Security Assessment',
    status: 'Completed',
    progress: 100,
    currentStage: 'Report Generation',
    startedAt: '2026-03-09 11:10:00',
    completedAt: '2026-03-09 11:21:40',
    duration: '11m 40s',
    securityScore: 71,
    findingsCount: {
      critical: 3,
      high: 6,
      medium: 5,
      low: 3,
      info: 4,
    },
  },
];

export const mockOwaspCategories: OwaspCategory[] = [
  {
    id: 'M1',
    code: 'MASVS-AUTH',
    title: 'M1: Improper Credential Usage',
    description: 'Hardcoded credentials, improper authentication workflows, cleartext tokens, and unencrypted session keys.',
    status: 'Failed',
    findings: 3,
    risk: 'CRITICAL',
    coverage: 92,
    testsCount: 14,
    passedCount: 11,
  },
  {
    id: 'M2',
    code: 'MASVS-CODE',
    title: 'M2: Inadequate Supply Chain Security',
    description: 'Vulnerable third-party SDKs, unverified package dependencies, and compromised build pipelines.',
    status: 'Warning',
    findings: 2,
    risk: 'HIGH',
    coverage: 85,
    testsCount: 10,
    passedCount: 8,
  },
  {
    id: 'M3',
    code: 'MASVS-AUTH',
    title: 'M3: Insecure Authentication/Authorization',
    description: 'Client-side biometric bypass, missing backend authorization, and weak session timeouts.',
    status: 'Warning',
    findings: 1,
    risk: 'MEDIUM',
    coverage: 88,
    testsCount: 12,
    passedCount: 11,
  },
  {
    id: 'M4',
    code: 'MASVS-INPUT',
    title: 'M4: Insufficient Input/Output Validation',
    description: 'Improper parameter sanitation leading to SQL injection, XSS in WebViews, and IPC command injection.',
    status: 'Warning',
    findings: 2,
    risk: 'HIGH',
    coverage: 78,
    testsCount: 11,
    passedCount: 9,
  },
  {
    id: 'M5',
    code: 'MASVS-NETWORK',
    title: 'M5: Insecure Communication',
    description: 'Lack of TLS certificate pinning, permissive TrustManagers, and unencrypted HTTP communication.',
    status: 'Failed',
    findings: 2,
    risk: 'CRITICAL',
    coverage: 95,
    testsCount: 15,
    passedCount: 13,
  },
  {
    id: 'M6',
    code: 'MASVS-PRIVACY',
    title: 'M6: Inadequate Privacy Controls',
    description: 'Over-privileged permissions, background location scraping, and clipboard snooping.',
    status: 'Passed',
    findings: 0,
    risk: 'LOW',
    coverage: 90,
    testsCount: 9,
    passedCount: 9,
  },
  {
    id: 'M7',
    code: 'MASVS-RESILIENCE',
    title: 'M7: Insufficient Binary Protections',
    description: 'Absence of root/jailbreak detection, missing obfuscation (ProGuard/DexGuard), and no anti-Frida hooks.',
    status: 'Warning',
    findings: 2,
    risk: 'MEDIUM',
    coverage: 82,
    testsCount: 12,
    passedCount: 10,
  },
  {
    id: 'M8',
    code: 'MASVS-PLATFORM',
    title: 'M8: Security Misconfiguration',
    description: 'Exported activities/services, debuggable build flag, backup enabled, and lax WebView settings.',
    status: 'Failed',
    findings: 4,
    risk: 'HIGH',
    coverage: 96,
    testsCount: 18,
    passedCount: 14,
  },
  {
    id: 'M9',
    code: 'MASVS-STORAGE',
    title: 'M9: Insecure Data Storage',
    description: 'Plaintext SharedPreferences, unprotected SQLite databases, sensitive logs, and external storage exposure.',
    status: 'Failed',
    findings: 3,
    risk: 'CRITICAL',
    coverage: 94,
    testsCount: 16,
    passedCount: 13,
  },
  {
    id: 'M10',
    code: 'MASVS-CRYPTO',
    title: 'M10: Insufficient Cryptography',
    description: 'Usage of broken ciphers (DES, RC4), weak PRNG seeds, hardcoded symmetric encryption keys.',
    status: 'Passed',
    findings: 0,
    risk: 'LOW',
    coverage: 91,
    testsCount: 13,
    passedCount: 13,
  },
];

export const mockApiEndpoints: ApiEndpoint[] = [
  {
    id: 'api-1',
    method: 'GET',
    endpoint: '/api/v2/users',
    application: 'SecureBank',
    status: 200,
    authentication: 'Bearer Token',
    risk: 'MEDIUM',
    responseTime: '142ms',
    checks: {
      authentication: true,
      authorization: false,
      rateLimiting: false,
      inputValidation: true,
      tls: true,
      sensitiveDataExposure: true,
      cors: true,
      jwtSecurity: true,
    },
    parameters: ['page', 'limit', 'role'],
    findingsCount: 2,
    payloadSnippet: 'GET /api/v2/users?page=1&limit=25 HTTP/1.1\nHost: api.securebank.com\nAuthorization: Bearer <JWT_TOKEN>',
    responseSnippet: 'HTTP/1.1 200 OK\nContent-Type: application/json\n[{"id": 1, "username": "admin", "email": "admin@bank.com"}]',
  },
  {
    id: 'api-2',
    method: 'POST',
    endpoint: '/api/v2/login',
    application: 'SecureBank',
    status: 200,
    authentication: 'None',
    risk: 'LOW',
    responseTime: '210ms',
    checks: {
      authentication: true,
      authorization: true,
      rateLimiting: true,
      inputValidation: true,
      tls: true,
      sensitiveDataExposure: false,
      cors: true,
      jwtSecurity: true,
    },
    parameters: ['username', 'password', 'device_fingerprint'],
    findingsCount: 0,
    payloadSnippet: 'POST /api/v2/login HTTP/1.1\n{"username":"user@domain.com","password":"***"}',
    responseSnippet: 'HTTP/1.1 200 OK\n{"status":"success","token":"eyJhbGciOi..."}',
  },
  {
    id: 'api-3',
    method: 'GET',
    endpoint: '/api/v2/profile',
    application: 'SecureBank',
    status: 200,
    authentication: 'Bearer Token',
    risk: 'SAFE',
    responseTime: '88ms',
    checks: {
      authentication: true,
      authorization: true,
      rateLimiting: true,
      inputValidation: true,
      tls: true,
      sensitiveDataExposure: false,
      cors: true,
      jwtSecurity: true,
    },
    parameters: ['include_metadata'],
    findingsCount: 0,
  },
  {
    id: 'api-4',
    method: 'POST',
    endpoint: '/api/v2/transfer',
    application: 'SecureBank',
    status: 201,
    authentication: 'OAuth 2.0',
    risk: 'HIGH',
    responseTime: '380ms',
    checks: {
      authentication: true,
      authorization: true,
      rateLimiting: false,
      inputValidation: false,
      tls: true,
      sensitiveDataExposure: false,
      cors: true,
      jwtSecurity: true,
    },
    parameters: ['destination_iban', 'amount', 'currency', 'otp_code'],
    findingsCount: 3,
    payloadSnippet: 'POST /api/v2/transfer HTTP/1.1\n{"destination_iban":"DE8937...","amount":1500.00,"otp_code":"9821"}',
    responseSnippet: 'HTTP/1.1 201 Created\n{"transaction_id":"TX-998231","status":"COMPLETED"}',
  },
  {
    id: 'api-5',
    method: 'GET',
    endpoint: '/api/v2/config',
    application: 'SecureBank',
    status: 200,
    authentication: 'None',
    risk: 'CRITICAL',
    responseTime: '64ms',
    checks: {
      authentication: false,
      authorization: false,
      rateLimiting: false,
      inputValidation: true,
      tls: true,
      sensitiveDataExposure: true,
      cors: false,
      jwtSecurity: false,
    },
    parameters: [],
    findingsCount: 4,
    payloadSnippet: 'GET /api/v2/config HTTP/1.1\nHost: api.securebank.com',
    responseSnippet: 'HTTP/1.1 200 OK\n{"internal_gateway":"10.0.4.12","debug_mode":true,"feature_flags":{"bypass_kyc":true}}',
  },
];

export const mockDashboardStats = {
  applicationsTested: 48,
  totalScans: 126,
  vulnerabilitiesFound: 327,
  criticalFindings: 18,
  securityScore: 82,
  riskLevel: 'MODERATE' as const,
  breakdown: {
    secureConfig: 86,
    authentication: 91,
    dataStorage: 78,
    networkSecurity: 73,
    apiSecurity: 84,
    codeSecurity: 80,
  },
};

export const mockVulnerabilitySeverityData = [
  { name: 'Critical', count: 18, color: '#ef4444' },
  { name: 'High', count: 42, color: '#f97316' },
  { name: 'Medium', count: 98, color: '#f59e0b' },
  { name: 'Low', count: 74, color: '#10b981' },
  { name: 'Informational', count: 95, color: '#06b6d4' },
];

export const mockTimelineData = {
  '7d': [
    { date: 'Day 1', critical: 1, high: 3, medium: 8, low: 5 },
    { date: 'Day 2', critical: 2, high: 5, medium: 7, low: 6 },
    { date: 'Day 3', critical: 0, high: 2, medium: 9, low: 4 },
    { date: 'Day 4', critical: 3, high: 6, medium: 11, low: 8 },
    { date: 'Day 5', critical: 1, high: 4, medium: 6, low: 7 },
    { date: 'Day 6', critical: 2, high: 3, medium: 10, low: 5 },
    { date: 'Day 7', critical: 2, high: 4, medium: 4, low: 2 },
  ],
  '30d': [
    { date: 'Week 1', critical: 6, high: 14, medium: 28, low: 20 },
    { date: 'Week 2', critical: 4, high: 11, medium: 24, low: 18 },
    { date: 'Week 3', critical: 5, high: 9, medium: 26, low: 19 },
    { date: 'Week 4', critical: 3, high: 8, medium: 20, low: 17 },
  ],
  '90d': [
    { date: 'Jan', critical: 8, high: 16, medium: 34, low: 26 },
    { date: 'Feb', critical: 6, high: 14, medium: 32, low: 24 },
    { date: 'Mar', critical: 4, high: 12, medium: 32, low: 24 },
  ],
};

export const mockScanLogs: ScanLog[] = [
  { timestamp: '14:21:02', level: 'INFO', message: 'Application artifact loaded: SecureBank_v2.4.1.apk (42.6 MB)', stage: 'File Upload' },
  { timestamp: '14:21:03', level: 'SUCCESS', message: 'SHA-256 verification hash verified: 9f86d081884c7d659a2f...', stage: 'Application Parsing' },
  { timestamp: '14:21:04', level: 'INFO', message: 'AndroidManifest.xml successfully extracted and parsed', stage: 'Manifest Analysis' },
  { timestamp: '14:21:06', level: 'WARN', message: 'Found 1 exported Activity without android:permission (TransferFundsActivity)', stage: 'Manifest Analysis' },
  { timestamp: '14:21:08', level: 'SUCCESS', message: 'Permission analysis completed: 7 requested, 3 dangerous permissions flagged', stage: 'Permission Analysis' },
  { timestamp: '14:21:12', level: 'INFO', message: 'Decompiling bytecode classes.dex to Smali and intermediate Java AST...', stage: 'Code Analysis' },
  { timestamp: '14:21:15', level: 'ERROR', message: '[CRITICAL FINDING] Hardcoded secret pattern detected in com.securebank.mobile.network.ApiClient', stage: 'Code Analysis' },
  { timestamp: '14:21:18', level: 'WARN', message: 'Weak cryptographic algorithm (DES/CBC) detected in DatabaseHelper.java', stage: 'Code Analysis' },
  { timestamp: '14:21:21', level: 'INFO', message: 'API endpoint discovery started: scanning URL string literals and Retrofit interfaces', stage: 'API Analysis' },
  { timestamp: '14:21:24', level: 'WARN', message: 'Discovered unauthenticated financial profile endpoint: /api/v2/users/{id}/financial-profile', stage: 'API Analysis' },
  { timestamp: '14:21:28', level: 'INFO', message: 'Preparing Frida dynamic instrumentation agent and emulator bridge...', stage: 'Dynamic Analysis' },
];

export const mockRuntimeEvents: RuntimeEvent[] = [
  {
    id: 'evt-1',
    timestamp: '14:22:01.320',
    type: 'Network Request',
    details: 'HTTPS POST https://api.securebank-production.internal/v2/auth/login [TLS 1.3]',
    severity: 'INFO',
    interceptedBy: 'Burp Proxy Hook',
  },
  {
    id: 'evt-2',
    timestamp: '14:22:02.115',
    type: 'File Access',
    details: 'OPEN /data/user/0/com.securebank.mobile.retail/shared_prefs/user_session.xml [MODE_PRIVATE]',
    severity: 'WARN',
    interceptedBy: 'Frida io.open Hook',
  },
  {
    id: 'evt-3',
    timestamp: '14:22:03.450',
    type: 'Cryptographic Operation',
    details: 'Cipher.init(ENCRYPT_MODE, DES/CBC/PKCS5Padding) with hardcoded IV',
    severity: 'ALERT',
    interceptedBy: 'Frida javax.crypto Hook',
  },
  {
    id: 'evt-4',
    timestamp: '14:22:05.180',
    type: 'Database Access',
    details: 'SQLite query: SELECT card_pan, exp_date FROM local_payment_cache WHERE id=1',
    severity: 'WARN',
    interceptedBy: 'Frida SQLiteDatabase Hook',
  },
  {
    id: 'evt-5',
    timestamp: '14:22:07.900',
    type: 'Clipboard Access',
    details: 'ClipboardManager.getPrimaryClip() invoked by background service',
    severity: 'ALERT',
    interceptedBy: 'Frida Clipboard Hook',
  },
  {
    id: 'evt-6',
    timestamp: '14:22:09.210',
    type: 'Process Execution',
    details: 'Runtime.getRuntime().exec("which su") check attempted by SecurityCheckTask',
    severity: 'INFO',
    interceptedBy: 'Frida Process Hook',
  },
];

export const mockReports: SecurityReport[] = [
  {
    id: 'REP-2026-001',
    type: 'Security Assessment Report',
    application: 'SecureBank',
    applicationId: 'app-1',
    scanId: 'SCAN-2026-00124',
    generatedDate: '2026-03-23',
    riskLevel: 'MODERATE',
    securityScore: 78,
    findingsCount: { critical: 2, high: 4, medium: 4, low: 2 },
    downloadSize: '3.8 MB',
  },
  {
    id: 'REP-2026-002',
    type: 'Executive Report',
    application: 'SecureBank',
    applicationId: 'app-1',
    scanId: 'SCAN-2026-00124',
    generatedDate: '2026-03-23',
    riskLevel: 'MODERATE',
    securityScore: 78,
    findingsCount: { critical: 2, high: 4, medium: 4, low: 2 },
    downloadSize: '1.2 MB',
  },
  {
    id: 'REP-2026-003',
    type: 'OWASP Compliance Report',
    application: 'HealthConnect',
    applicationId: 'app-3',
    scanId: 'SCAN-2026-00120',
    generatedDate: '2026-03-19',
    riskLevel: 'HIGH',
    securityScore: 64,
    findingsCount: { critical: 4, high: 8, medium: 10, low: 5 },
    downloadSize: '4.6 MB',
  },
  {
    id: 'REP-2026-004',
    type: 'Technical Report',
    application: 'ShopEase',
    applicationId: 'app-2',
    scanId: 'SCAN-2026-00123',
    generatedDate: '2026-03-22',
    riskLevel: 'LOW',
    securityScore: 91,
    findingsCount: { critical: 0, high: 1, medium: 2, low: 1 },
    downloadSize: '2.4 MB',
  },
];
