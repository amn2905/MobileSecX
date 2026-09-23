# MobileSecX Security Policy & Architecture

This document describes the security considerations, data handling policies, and protective measures governing the **MobileSecX** framework.

---

## 1. Authorized Testing & Ethical Use

MobileSecX is designed exclusively for authorized application security assessments, defensive research, compliance verification, and educational training.

- **Mandatory Authorization**: Users must obtain explicit, documented permission from the respective application owner before conducting static or dynamic security assessments.
- **Prohibited Conduct**: Assessing third-party production binaries without consent, extracting proprietary intellectual property maliciously, or intercepting communications outside of controlled sandboxes is strictly prohibited.

---

## 2. File Ingestion & Binary Upload Considerations

Handling untrusted mobile binaries (`.apk`, `.aab`, `.ipa`) presents inherent security risks to any assessment framework:

- **Client-Side Validation**:
  - File extension verification (`.apk`, `.aab`, `.ipa`).
  - Size limitation checks prior to processing.
  - Cryptographic checksum generation (SHA-256 and MD5) to verify binary integrity.
- **Backend Isolation (Planned Architecture)**:
  - Untrusted archive extraction (ZIP/APK unpackers) must be executed inside ephemeral, unprivileged sandbox containers.
  - Decompression bombs (Zip Bombs) must be mitigated by enforcing maximum decompressed size limits and strict file count quotas.
  - Uploaded files must be stored with randomized UUID filenames outside the web server document root.

---

## 3. Secrets & Sensitive Data Handling

- **Redacted Demonstration Data**:
  - All mock API tokens, private keys, and passwords provided in the codebase (e.g., `sk_live_9a7f...`, `msx_sec_token_...`) are synthetic test strings.
  - Sensitive evidence snippets displayed in the Vulnerability Details view are artificially redacted.
- **Environment Separation**:
  - No production credentials, private signing certificates, or production API tokens are bundled into client-side code.
  - Runtime configuration is managed strictly through Vite environment variables (`VITE_API_BASE_URL`).

---

## 4. Frontend Security & Content Sanitization

- **Cross-Site Scripting (XSS) Prevention**:
  - React’s built-in JSX data binding automatically escapes untrusted strings before rendering to the DOM.
  - Monospace code viewers (`CodeViewer.tsx`, `TerminalViewer.tsx`) render raw evidence as text nodes rather than parsing raw HTML (`dangerouslySetInnerHTML` is avoided).
- **Navigation & External Links**:
  - External documentation and CVE reference links enforce `rel="noopener noreferrer"` attributes to prevent tab-nabbing attacks.

---

## 5. API Security & Transport Layer

- **Transport Encryption**:
  - All communication with external backend APIs must occur over HTTPS (TLS 1.3 or 1.2).
- **CORS Policies**:
  - In production deployments, the backend API should enforce strict Cross-Origin Resource Sharing (CORS) whitelisting only authorized MobileSecX origin domains.
- **Timeout Restrictions**:
  - The frontend Axios client enforces an explicit 10,000ms timeout on all REST operations to prevent resource exhaustion from hanging connections.

---

## 6. Audit Logging & Telemetry

- **Operational Auditability**:
  - Scan history and differential logs maintain clear timestamps and scan identifiers (`SCAN-YYYY-XXXXX`) for regulatory traceability.
- **Log Hygiene**:
  - In production, log streams must sanitize and mask sensitive data such as user session cookies, Authorization headers, and plaintext credentials before broadcasting to client terminal interfaces.

---

## 7. Future Backend Authentication & Access Control (Planned)

When integrating a production backend:
- **Authentication**: JWT-based session tokens stored in secure, `HttpOnly`, `SameSite=Strict` cookies.
- **Role-Based Access Control (RBAC)**: Enforce role separation:
  - *Administrator*: Manage global settings, backend bridges, and user accounts.
  - *Security Analyst*: Upload binaries, configure and execute scans, triage findings.
  - *Auditor / Viewer*: Read-only access to assessment reports and OWASP compliance dashboards.

---

## 8. Threat Model Summary

| Threat Vector | Potential Impact | Defensive Mitigation |
| :--- | :--- | :--- |
| **Malicious APK Decompression** | Arbitrary file overwrite (Zip Slip), server CPU exhaustion. | Sanitize archive path traversal (`../`), enforce decompression quotas in backend worker sandbox. |
| **Tampered Scan Results** | Falsification of compliance audit reports. | Cryptographic hashing of target binaries, immutable audit log entries. |
| **Client-Side Data Leakage** | Exposure of proprietary source code. | Ephemeral browser storage; restrict cached decompiled artifacts to authorized analyst sessions. |
| **Dynamic Sandbox Escape** | Host system compromise via emulator vulnerability. | Run dynamic analysis emulators within isolated, non-routed virtual network bridges. |

---

## 9. Vulnerability Reporting

If you identify a security vulnerability within the MobileSecX framework, please report it responsibly by contacting the maintainers directly or opening a confidential security advisory on GitHub. Please do not report security flaws via public issue trackers.
