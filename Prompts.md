# Sprint 16 AI Architecture Prompts & Rationale Log

## Author & Project Info
- **Project**: TaskMatrix — Enterprise Agile Management System
- **Sprint**: Sprint 16 (The AI Injection & Polish — Commercial-grade Finish)
- **Track**: Track A (Frontend Specialist)
- **Developer**: Shashank

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