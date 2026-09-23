# Contributing to MobileSecX

Thank you for your interest in contributing to **MobileSecX**! This document provides standards and workflows for developing and contributing to the framework.

---

## 1. Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ LTS recommended)
- **npm**: `v9.0.0` or higher
- **Git**

### Initial Setup
1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone <your-fork-url>
   cd MobileSecX
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Access the application in your browser at `http://localhost:5173/`.

---

## 2. Branch Naming Conventions

Use descriptive, prefixed branch names:

- `feature/<short-description>`: New workstation capabilities or pages (e.g., `feature/cve-lookup-panel`).
- `fix/<short-description>`: Bug fixes or visual defect corrections (e.g., `fix/scan-timer-cleanup`).
- `refactor/<short-description>`: Code restructuring without functional changes (e.g., `refactor/api-service-types`).
- `docs/<short-description>`: Documentation additions or updates (e.g., `docs/frida-architecture`).

---

## 3. Code Style & Standards

- **Language**: TypeScript with strict typing. Avoid `any` types wherever possible; use or extend domain types in `src/types/index.ts`.
- **UI & Styling**:
  - Follow the **Light Skeuomorphic** design tokens defined in `src/index.css`.
  - Use tactile raised cards (`skeuo-raised`), recessed panels (`skeuo-recessed`), and tactile buttons (`skeuo-btn`, `skeuo-btn-primary`).
  - Do NOT introduce dark mode surfaces, neon gradients, or generic flat admin templates.
- **Iconography**: Use icons exclusively from `lucide-react`. Maintain consistent stroke widths and sizing (`w-4 h-4` or `w-5 h-5`).
- **Component Organization**:
  - Keep components modular and single-purpose.
  - Reusable presentation primitives belong in `src/components/common/`.
  - Complex domain views belong in `src/pages/`.
- **State Management**:
  - Store application-wide state in the Zustand store (`src/store/useAppStore.ts`).
  - Use local component state (`useState`) only for transient UI states (e.g., modal visibility, active tab index).

---

## 4. Quality Assurance & Build Checks

Before submitting any changes, verify that your code adheres to linting and compilation requirements:

```bash
# 1. Run Oxlint static analysis
npm run lint

# 2. Run TypeScript compilation and production bundling
npm run build

# 3. Test production preview locally
npm run preview
```

Ensure `npm run build` exits with code `0` and zero TypeScript diagnostic errors.

---

## 5. Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
<type>(<scope>): <subject>

[optional body]
```

### Allowed Types
- `feat`: A new feature or user-facing capability.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (formatting, spacing).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `chore`: Changes to build scripts, dependencies, or auxiliary tools.

### Example
```text
feat(vulnerabilities): add CVSS v3.1 vector breakdown to finding dossier
```

---

## 6. Pull Request (PR) Expectations

1. **Rebase on Main**: Ensure your branch is rebased on the latest `main` branch before submitting.
2. **Clear Description**: Describe what problem the PR solves, the approach taken, and how it was tested.
3. **Include Screenshots**: For any UI or styling changes, provide clear light-theme screenshots of the affected views.
4. **No Unrelated Changes**: Keep PRs focused on a single logical change. Do not bundle unrelated refactorings or dependency updates.
