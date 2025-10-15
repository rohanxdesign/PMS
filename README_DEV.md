# 🚀 L0 Automation Tool – Developer Onboarding

---

## Project Summary
Full-stack internal OS for a marketing & sales consultancy. Centralizes CRM, Marketing, Design, Tech & HRMS with modular, role-based dashboards. See context & expectations below.

## Stack
- Front: Next.js (React, TypeScript, Tailwind, ShadCN/UI)
- Backend: Supabase Postgres + Edge Functions
- ORM: Prisma
- Eventing: Kafka
- Integrations: Email, WhatsApp, Google Drive, Calendar

---

## 1️⃣ Personas & Role Access
| Role           | Description    |
| :------------- |:--------------|
| Founders/Admins | Org-wide KPI & SLA oversight (all modules)
| Sales          | CRM, deals, KT handoff
| Marketing      | Campaigns, content, client health, analytics
| Design         | Deliverables, tasks, bandwidth
| Tech           | Tickets, dependencies, tech kanban

---

## 2️⃣ Core Modules (Folders & Pages)
- sales: `/sales/leads`, `/sales/deals`
- marketing: `/marketing/projects`, `/marketing/client/:id`, `/marketing/calendar`, `/marketing/board`, `/marketing/reports`
- design: `/design/my-week`, `/design/projects`, `/design/kanban`
- founders: `/founders/dashboard`, `/founders/reports`
- api: `/api/*` (Edge CRUD, events)
- components: Shared cards, kanban, calendars, modals, tables
- lib: Types, api, utils

---

## 3️⃣ Setup & Running Locally
1. Clone repo & `cd project0`
2. Setup Node 18+ & npm, then run:
   ```sh
   npm install
   cd apps/web && npm run dev # Frontend
   cd apps/worker && npx prisma generate  # Backend types
   # (optional: supabase CLI/dev server)
   ```
3. Fill in `.env` and `.env.example` as detailed below.

---

## 4️⃣ Configuration (.env)
- `DATABASE_URL`: (get from Supabase project settings)
- Any API keys/ids for email, WhatsApp, or other integrations.

---

## 5️⃣ UI/UX
**Figma Links:** Paste/share public export links for each main dashboard/page module. Cursor will use these to scaffold precise layouts.
* Recommended: My Projects (Marketing), Client Dashboard (Marketing), Content Calendar, My Week (Design), Kanban (Design), Founders Dashboard
* Paste public Figma frame links here: TODO

---

## 6️⃣ Data Model (Prisma/Supabase)
See `/apps/worker/prisma/schema.prisma` for full schema.

---

## 7️⃣ MVP Scope
- Sales CRM (Leads, Deals, Project handoff)
- Marketing (Projects, Dashboard, Content Calendar, Task Board)
- Design (My Week, Kanban)
- Founders (Org analytics, SLA reports, Utilization)

Tech/HRMS after MVP.

---

## 8️⃣ Event Topics
- `deal.won`, `deliverable.ready`, `task.overdue`, `project.completed`, etc (Kafka). See LLD/events.

---

## 9️⃣ API Endpoints
See LLD in docs. Major routes under `/api/*`. Edge Functions for all CRUD/events, RESTful, validated (Zod).

---

## 10️⃣ Contribution Etiquette
- New modules/components: Follow persona breakdown and Figma
- Use typesafe DTOs (packages/types, Zod)
- Commit style: `feat:`, `fix:`, `refactor:`, etc.

---

## 11️⃣ Action Items (for project owner)
- [ ] Paste Supabase `DATABASE_URL` in `/apps/worker/.env`
- [ ] Paste Figma frame public links in README above
- [ ] Set up integration API keys (email, WhatsApp, etc.) as `.env` vars
- [ ] (Recommended) Init Supabase CLI for local dev if doing DB work

---

## 12️⃣ Cursor Usage
- Paste/new Figma frame links for dashboard/route UI
- Use shared DTOs/types
- Ask Cursor to auto-propagate changes to API, model, and UI as needed

---

## 13️⃣ Further Reading
- Prisma/Next.js docs
- Supabase Edge Functions
- KafkaJS docs for event layer

---

Happy coding! 🎉
