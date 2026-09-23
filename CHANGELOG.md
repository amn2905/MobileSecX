# Changelog

All notable changes to the **MobileSecX** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Current Project Scope
Initial development and architecture phase of the **MobileSecX** Mobile Application Security Testing Framework frontend workstation. The application provides an interactive single-page cybersecurity analysis environment built with React 19, TypeScript, Vite, and Tailwind CSS.

### Added
- **Light Skeuomorphic Interface**: Custom-engineered tactile workstation design system featuring raised cards, recessed panels, dimensional instrument gauges, and physical-control buttons.
- **Executive Security Dashboard**:
  - Global Security Posture gauge with domain breakdown (Storage, Authentication, Network, API, Code).
  - Vulnerability distribution charts by severity (Recharts).
  - 7, 30, and 90-day vulnerability resolution trend analytics.
  - Recent applications inventory table and guided assessment onboarding steps.
- **Application Management**:
  - Centralized target inventory supporting Android (`.apk`, `.aab`) and iOS (`.ipa`) files.
  - Package inspection view with cryptographic hashes (SHA-256, MD5), SDK version targets, and component counters (Activities, Services, Receivers, Providers).
- **Target Ingestion & Scan Configuration**:
  - Drag-and-drop file upload zone with file-type and integrity checks.
  - Granular security scan profile selection (Full Assessment, Static Analysis, Dynamic Analysis, API Security).
  - Feature toggles for manifest analysis, permission auditing, insecure storage, hardcoded secrets, cryptographic analysis, and Frida hooks.
- **Active Scanner & Live Console**:
  - Multi-stage pipeline monitor tracking parsing, code analysis, dynamic analysis, and report generation.
  - Real-time simulated terminal log output styled with light, high-contrast monospace typography.
- **Vulnerability Triaging**:
  - Findings table with multi-parameter filtering (Severity, Status, Category) and search.
  - Detailed vulnerability dossiers with CVSS v3.1 scoring vector, technical proof-of-concept evidence consoles, affected components, and remediation guidance.
- **Specialized Security Testing Modules**:
  - **API Security**: Discovered REST endpoints table, authentication analysis, TLS certificate status, and parameter inspection.
  - **Dynamic Analysis**: Android emulator bridge status, Frida dynamic hooks (SSL pinning bypass, root detection), and runtime event telemetry.
  - **Reverse Engineering**: Decompiled archive tree explorer with virtual viewers for `AndroidManifest.xml`, Java classes, and Smali bytecode.
  - **OWASP Assessment**: Direct compliance mapping against the OWASP Mobile Top 10 (MASVS M1 through M10).
  - **Scan History**: Historical audit logs with a side-by-side differential comparison modal tracking score progression and flaw changes.
  - **Security Reports**: Multi-format report cards and modal preview engine.
- **State & Service Architecture**:
  - Centralized Zustand store (`useAppStore`) managing target applications, scan state machines, notifications, and filters.
  - Resilient Axios API service (`src/services/api.ts`) interfacing with `VITE_API_BASE_URL` with automated fallback to mock data during offline or demo execution.
  - Preloaded realistic mock datasets (`src/data/mockData.ts`) covering banking, healthcare, and retail mobile apps.
- **Developer Documentation**:
  - Comprehensive `README.md` with system workflows, architecture diagrams, and usage guidelines.
  - `docs/README_GUIDE.md` developer guide detailing component workflows and extension procedures.
  - `docs/ARCHITECTURE.md` architecture specification with component diagrams and data flow.
  - `docs/SECURITY.md` security policy, file upload safety, and threat model.
  - `CONTRIBUTING.md` contribution guidelines and coding standards.
