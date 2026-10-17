# Sprint 17 AI Architecture, WPO & Deployment Rationale Log

## Author & Project Info
- **Project**: TaskMatrix — Enterprise Agile Management System
- **Sprint**: Sprint 17 (Deployment & Go Live — Production Launch & WPO)
- **Track**: Track A (Frontend Specialist)
- **Developer**: Shashank

---

## Sprint 17 Production Architecture & WPO Rationale

### 1. Strict Compiler Optimization & Edge Build Pipeline
- **Prompt Query**: "How to resolve strict compiler warnings and optimize Next.js 14 App Router for edge production deployment without build failure?"
- **Engineering Rationale**: Executed strict Next.js compilation (`npm run build`). Isolated edge-compatible API routes (`/api/ai/generate-subtasks`) and implemented tree-shaking on icons and chart dependencies (`next/dynamic` for Recharts) to keep route bundles below 102 kB.

### 2. Web Performance Optimization (WPO) & Lighthouse 90+ Target
- **Prompt Query**: "What architectural patterns ensure a 90+ Lighthouse score in both Performance and Accessibility for dynamic Next.js dashboards?"
- **Engineering Rationale**: 
  - Standardized semantic HTML landmarks (`<header>`, `<main>`, `<section>`).
  - Implemented accessible ARIA labels (`aria-label="Toggle Navigation Menu"`) and WCAG-compliant color contrast ratios across dark mode elements.
  - Mitigated DOM asset bloat by replacing static binary images with lightweight dynamic SVG and code-generated favicons (`src/app/icon.tsx`).

### 3. Edge Secrets Isolation & Cloud Environment Security
- **Prompt Query**: "How to guarantee zero leakage of generative AI credentials during cloud CI/CD deployment on Vercel?"
- **Engineering Rationale**: Strictly decoupled `GEMINI_API_KEY` from client bundles. All LLM operations execute through server-side route handlers on the Vercel Edge network, preventing client scraping.

---

## Sprint 16 AI Microservice Architecture & Prompts Log

### 1. System Prompt Strategy for Strict JSON Formatting
- **Prompt Query**: "How to enforce Google Gemini API to return strict parsable JSON for task sub-steps without markdown formatting wrappers?"
- **System Prompt Executed**:
  `"You are an AI Agile Assistant for TaskMatrix. Given a task title and description, generate 3 to 4 concise, actionable sub-steps for this task. You must respond ONLY with a valid, parsable JSON object matching this exact schema: { "subtasks": ["step 1", "step 2", "step 3"] }. Do not include markdown code block wrappers or backticks."`
- **Engineering Rationale**: Implemented server-side regex fallback parsing (`rawText.replace(/```json/g, "").replace(/```/g, "").trim()`) to handle LLM edge-case markdown wrapping and ensure 100% JSON safety.

### 2. Server-side API Isolation & Key Security (Track A Compliant)
- **Prompt Query**: "Why must AI SDK / Gemini API calls be isolated on Next.js server-side route handlers?"
- **Engineering Rationale**: Executing Gemini calls directly from React client exposes API keys in public JS bundles. Built `POST /api/ai/generate-subtasks` as a server-side route using `process.env.GEMINI_API_KEY` to protect billing credentials.

### 3. UX Loading Spinners & Toast Feedback Integration
- **Prompt Query**: "How to provide seamless micro-interaction feedback during asynchronous LLM generation?"
- **Engineering Rationale**: Added `isGeneratingAi` state driving an animated `<Loader2 className="animate-spin" />` spinner on the "Auto-generate Sub-tasks" button, along with non-blocking notice banners inside `TaskModal.tsx`.

---

## Sprint 15 Architecture & Engineering Log

### 1. Choice of Data Hydration and LocalStorage Persistence
- **Prompt Query**: "How to architect client-side CRUD state persistence in Zustand without hydration mismatch?"
- **Rationale**: Created `hydrateTasks` inside `useTaskStore.ts` to sync state with `localStorage` upon user authentication, seeding initial agile tasks if store is empty.

### 2. State Mutation Logic (Create, Update, Delete)
- **Prompt Query**: "Design pattern for modal-based Create and Edit actions, along with safety deletion mechanism."
- **Rationale**: 
  - `TaskModal.tsx` handles both payload injection (Create) and state mutation (Update).
  - `DeleteConfirmModal.tsx` provides a safety verification guard before permanently executing document destruction.

### 3. Data Analytics & Charting (.reduce Aggregation)
- **Prompt Query**: "How to parse raw task state into analytical metrics using JavaScript .reduce() and render with Recharts?"
- **Rationale**: Implemented `statusCounts` and `priorityCounts` aggregation utilities in `TaskAnalyticsChart.tsx` to dynamically drive Recharts BarChart and Donut distribution UI.