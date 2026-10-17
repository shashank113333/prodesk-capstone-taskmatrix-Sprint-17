# 🚀 TaskMatrix — Sprint 17: Production Launch & Edge Deployment

![Sprint 17 Status](https://img.shields.io/badge/Sprint-17_Production_Launch-emerald?style=for-the-badge)
![Track](https://img.shields.io/badge/Track-A:_Frontend_Specialist-blue?style=for-the-badge)
![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge)
![WPO Score](https://img.shields.io/badge/Lighthouse_WPO-90%2B-purple?style=for-the-badge)

## 📌 Executive Summary
Sprint 17 represents the final production execution pipeline for **TaskMatrix** — an enterprise-grade Agile Project Management System. Operating under strict Track A Frontend Specialist guidelines, the codebase has undergone strict production compilation (`npm run build`), Web Performance Optimization (WPO), secure Edge environment variable migration, and verified 90+ Lighthouse Performance & Accessibility metrics.

---

## 🌐 Live Application & Links
- 🚀 **Live Website (Vercel)**: [https://prodesk-capstone-taskmatrix-sprint-rose.vercel.app](https://prodesk-capstone-taskmatrix-sprint-rose.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/shashank113333/prodesk-capstone-taskmatrix-Sprint-17](https://github.com/shashank113333/prodesk-capstone-taskmatrix-Sprint-17)
- 📝 **AI Compliance Log**: Refer to [`Prompts.md`](./Prompts.md) for architectural decision logs.

---

## 🔑 Evaluator & System Administrator Credentials

| Role Name | Agile Designation | Email Address | Default Password | Permissions & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **System Administrator** | Master System Admin | `shashankv@gmail.com` | `1234` | Full Admin Control: AI Subtask Generator, BaaS CRUD, Accounts DB Directory, Timed Account Suspensions, Role Editor |
| **Scrum Lead** | Project Lead / Scrum Master | `scrumlead@prodesk.io` | `1234` | Project Lead Control: AI Subtask Generator, CRUD Operations, Task Deletion with Confirmation Modal |
| **Developer** | Frontend Specialist | `developer@prodesk.io` | `1234` | Developer Access: AI Subtask Generator, Create/View/Edit tasks (Restricted from Delete & Accounts DB) |

---

## 🏗️ Technical Architecture & Production Stack

| Layer | Technology / Tool | Operational Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Server-driven edge routing, SSR, static page optimization |
| **AI Microservice** | Google Gemini 1.5 Flash API | Server-side LLM call via `/api/ai/generate-subtasks` with strict JSON schema |
| **Language** | TypeScript | Strict compilation without unused variables or type leaks |
| **Styling** | Tailwind CSS | Utility-first responsive dark mode design & mobile drawer UI |
| **State Management** | Zustand | Global auth & task state persistence with localStorage hydration |
| **Analytics Engine** | Recharts | Dynamic Bar and Distribution charts driven by `.reduce()` metrics |
| **Icons** | Lucide React | Lightweight tree-shaken UI icons |

---

## 🔑 Key Features & Deliverables (Sprint 17)

### ⚙️ 1. Production Compilation (Phase 1 - P0 Mandatory)
- Executed strict Next.js compiler (`npm run build`) with zero linting or TypeScript errors.
- Verified tree-shaking and dynamic import chunks (`next/dynamic` for Recharts engine).

### 🚀 2. Cloud Deployment & Secrets Management (Phase 2 - P1 Priority)
- Automated CI/CD deployment on Vercel with zero runtime build failures.
- Environment variable isolation (`GEMINI_API_KEY`) secured in Vercel Cloud Dashboard.

### ⚡ 3. The Lighthouse WPO Audit (Phase 3 - P2 Advanced)
- **Performance (90+)**: Optimized component hydration, zero DOM-clipping assets, and streamlined client bundle size.
- **Accessibility (90+)**: Semantic HTML landmarks, strict `aria-label` tags, and accessible contrast ratios.

---

## 🛠️ Local Development & Build Verification

```bash
# 1. Clone the repository
git clone https://github.com/shashank113333/prodesk-capstone-taskmatrix-Sprint-17.git

# 2. Navigate to project directory
cd prodesk-capstone-taskmatrix-Sprint-17

# 3. Install dependencies
npm install

# 4. Run strict production build
npm run build

# 5. Start production server locally
npm run start
```
