export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
export type ScanStatus = 'Running' | 'Completed' | 'Failed' | 'Paused';
export type PlatformType = 'Android' | 'iOS';

export interface Application {
  id: string;
  name: string;
  packageName: string;
  platform: PlatformType;
  fileType: 'APK' | 'AAB' | 'IPA';
  version: string;
  fileSize: string;
  sha256: string;
  md5: string;
  uploadDate: string;
  lastScanDate: string;
  securityScore: number;
  riskLevel: RiskLevel;
  vulnerabilitiesCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
  };
  status: 'Completed' | 'Risk Detected' | 'Scanning' | 'Pending';
  minSdk?: string;
  targetSdk?: string;
  mainActivity?: string;
  permissions: string[];
  components: {
    activities: number;
    services: number;
    receivers: number;
    providers: number;
  };
  iconBg?: string;
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  cvss: number;
  cvssVector: string;
  application: string;
  applicationId: string;
  category: string;
  owaspCategory: string;
  owaspId: string;
  status: 'OPEN' | 'RESOLVED' | 'FALSE_POSITIVE' | 'IN_REVIEW';
  detectedDate: string;
  description: string;
  technicalEvidence: string;
  affectedComponent: string;
  detectionMethod: string;
  proofOfConcept: string;
  risk: string;
  impact: string;
  remediation: string;
  references: string[];
}

export interface Scan {
  id: string;
  applicationId: string;
  applicationName: string;
  platform: PlatformType;
  scanType: 'Static Analysis' | 'Dynamic Analysis' | 'API Security' | 'Full Security Assessment';
  status: ScanStatus;
  progress: number;
  currentStage: string;
  startedAt: string;
  completedAt?: string;
  duration?: string;
  securityScore: number;
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  options?: {
    manifestAnalysis?: boolean;
    permissionsAnalysis?: boolean;
    insecureStorage?: boolean;
    authentication?: boolean;
    networkSecurity?: boolean;
    cryptographic?: boolean;
    apiSecurity?: boolean;
    codeAnalysis?: boolean;
    thirdPartyLibs?: boolean;
    hardcodedSecrets?: boolean;
    certificateAnalysis?: boolean;
    fridaInstrumentation?: boolean;
    proxyConfig?: boolean;
    sslPinning?: boolean;
    rootDetection?: boolean;
  };
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  application: string;
  status: number;
  authentication: 'None' | 'Bearer Token' | 'API Key' | 'Basic Auth' | 'OAuth 2.0';
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  responseTime: string;
  checks: {
    authentication: boolean;
    authorization: boolean;
    rateLimiting: boolean;
    inputValidation: boolean;
    tls: boolean;
    sensitiveDataExposure: boolean;
    cors: boolean;
    jwtSecurity: boolean;
  };
  parameters?: string[];
  findingsCount: number;
  payloadSnippet?: string;
  responseSnippet?: string;
}

export interface OwaspCategory {
  id: string;
  code: string;
  title: string;
  description: string;
  status: 'Passed' | 'Warning' | 'Failed' | 'Not Tested';
  findings: number;
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  coverage: number;
  testsCount: number;
  passedCount: number;
}

export interface ScanLog {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  stage?: string;
}

export interface RuntimeEvent {
  id: string;
  timestamp: string;
  type: 'Network Request' | 'File Access' | 'Database Access' | 'Clipboard Access' | 'Process Execution' | 'Cryptographic Operation';
  details: string;
  severity: 'INFO' | 'WARN' | 'ALERT';
  interceptedBy: string;
}

export interface SecurityScoreBreakdown {
  overall: number;
  riskLevel: RiskLevel;
  categories: {
    secureConfig: number;
    authentication: number;
    dataStorage: number;
    networkSecurity: number;
    apiSecurity: number;
    codeSecurity: number;
  };
}

export interface SecurityReport {
  id: string;
  type: 'Security Assessment Report' | 'Executive Report' | 'Technical Report' | 'OWASP Compliance Report';
  application: string;
  applicationId: string;
  scanId: string;
  generatedDate: string;
  riskLevel: RiskLevel;
  securityScore: number;
  findingsCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  downloadSize: string;
}
