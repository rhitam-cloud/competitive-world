# Competitive World 🎯
### Premier Competitive Examination Mock Test Platform (SSC CGL & SSC CHSL)

A modern, responsive, full-stack examination preparation web platform designed specifically for Indian competitive exams. Built from scratch with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase PostgreSQL.

---

## 🌟 Key Features

### 1. Public Examination Catalog
- **SSC CGL & SSC CHSL**: Dedicated exam hubs with syllabus distribution and tier coverage.
- **Search & Filtering**: Search by keyword/topic, filter by exam category or free status.
- **Exam Details & Pre-Test Instructions**: TCS/SSC standard exam guidelines, duration rules, and candidate declaration.

### 2. Examination Console (TCS iON Pattern)
- **Live Countdown Timer**: Real-time timer with amber warnings (< 10m) and critical alerts (< 5m). Auto-submits on expiration.
- **Interactive Question Palette**: Color-coded states for Answered (Green), Not Answered (Red), Marked for Review (Purple), Answered & Marked for Review, and Not Visited (Gray).
- **Exam Security**: Answer keys and explanations are **never** delivered to the student during active attempts.
- **Session Resilience**: Test progress and answers auto-save to browser storage so accidental refreshes or network hiccups do not lose candidate answers.
- **Configurable Negative Marking**: Default **+2.0 marks** for correct responses, **-0.5 marks** for incorrect responses, and **0 marks** for unanswered questions.

### 3. Instant Authoritative Results & Explanations
- **Server-Side Scoring**: Evaluates candidate answers authoritatively on the server.
- **Comprehensive Scorecard**: Total marks scored, max marks, percentage, net penalty, and overall accuracy.
- **Section-wise Performance**: Detailed breakdown across all 4 subjects:
  1. *General Intelligence & Reasoning*
  2. *Quantitative Aptitude*
  3. *English Language & Comprehension*
  4. *General Awareness*
- **Question-by-Question Solution Review**: Filter by Correct, Incorrect, or Skipped with verified step-by-step explanations.

### 4. Instructor & Admin Portal (Password-Protected)
- **Admin Password Gate**: All `/admin/*` routes are protected by a master administrator password (`ADMIN_PASSWORD`).
- **One-Click Console Lock**: Lock the admin console anytime to return to the security gate.
- **Dashboard Metrics**: Real-time stats on registered students, tests, questions, and average scores.
- **Question Bank Manager**: Add single questions, edit, delete, and search across subjects and difficulty tiers.
- **Bulk CSV Question Import**: Upload questions via standard CSV format with live syntax validation and row error reporting.
- **Mock Test Builder**: Create tests, configure duration, set positive/negative marks, and assign questions.
- **Audit Logs**: View all student submissions and scores.

### 5. Future Monetization Architecture
- Built-in `isFree` test entitlement layer.
- Pluggable payment provider interface ready for Razorpay / Stripe integration without modifying the test engine.

---

## 💻 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Validation**: [Zod](https://zod.dev/) & React Hook Form
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started on Windows

### Prerequisites
1. **Node.js (LTS version 18.x or 20.x)**:
   - Check if Node.js is installed in Command Prompt or PowerShell:
     ```powershell
     node -v
     npm -v
     ```
   - If not installed, install via Windows Package Manager:
     ```powershell
     winget install OpenJS.NodeJS.LTS
     ```
     Or download the installer from [https://nodejs.org/](https://nodejs.org/).

---

### Step 1: Open the Project Directory

Open Windows PowerShell or Command Prompt:
```powershell
cd C:\Users\Rhitam\.gemini\antigravity\scratch\examprep-online
```

---

### Step 2: Install Dependencies

```powershell
npm install
```

---

### Step 3: Run the Development Server

Competitive World includes an **Instant Demonstration Mode**!
Even before you configure Supabase, the application runs out of the box with the 24 pre-seeded competitive exam questions, simulated test engine, and interactive login personas.

```powershell
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### Step 4: Run the Scoring QA Test Suite

To verify server-side score calculation, negative marks (-0.5), accuracy formulas, and blank question handling:

```powershell
npm run test:scoring
```

You will see:
```text
=================================================
Starting QA Test Suite: Authoritative Exam Scoring
=================================================
✔ Test 1 Passed: 100% correct answers (+8.0 marks, 100% accuracy)
✔ Test 2 Passed: All unanswered questions (0 marks, 0 penalties)
✔ Test 3 Passed: Negative marking applied cleanly (-2.0 marks)
✔ Test 4 Passed: Mixed attempt (+3.5 marks, 66.7% accuracy)
=================================================
All 4 QA Scoring Suite tests passed successfully!
=================================================
```

---

## 🗄️ Supabase PostgreSQL Setup (Optional - For Production)

When you are ready to connect a live Supabase PostgreSQL database:

1. Create a free project at [https://supabase.com/](https://supabase.com/).
2. In your Supabase Dashboard, click on **SQL Editor** on the left menu.
3. Open `supabase/migrations/20261029000000_initial_schema.sql` in this repo, copy its contents, and run it in the SQL Editor.
4. Next, copy the contents of `supabase/seed.sql` and run it in the SQL Editor to populate all 24 questions, subjects, and mock tests.
5. In your Supabase Dashboard, navigate to **Project Settings** -> **API**.
6. Copy your **Project URL** and **anon public key**.
7. Create/edit `.env.local` in this project folder:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
8. Restart your Next.js server (`npm run dev`). The platform will automatically connect to your live PostgreSQL database!

---

## 🔒 Admin Password Protection

The entire Admin Portal (`/admin`, `/admin/exams`, `/admin/tests`, `/admin/questions`, `/admin/import`, `/admin/attempts`) is locked behind master password authentication:

- **Default Master Password**: `admin123`
- **To change the password**: Edit `ADMIN_PASSWORD` in `.env.local`:
  ```env
  ADMIN_PASSWORD=YourCustomSecretPassword2026!
  ```
- **Locking Console**: Click the **"Lock Console"** button in the admin navigation bar anytime to immediately terminate your admin session and return to the password gate.

---

## 🔐 Creating an Administrator Account (Supabase)

In Supabase SQL Editor:
```sql
-- After a user registers, promote them to administrator:
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@domain.com';
```

*(In local demonstration mode, simply log in with `admin@competitiveworld.in` on the Sign-In page to immediately access all administrator features!)*

---

## 📁 Project Structure

```text
examprep-online/
├── app/
│   ├── page.tsx                             # Home page (Hero, exams, benefits, FAQs)
│   ├── layout.tsx                           # Root layout with navbar and footer
│   ├── globals.css                          # Tailwind CSS styles and palette tokens
│   ├── exams/
│   │   ├── page.tsx                         # Exam listings & catalog
│   │   └── client-filter.tsx                # Interactive category & free/pro filter
│   ├── tests/
│   │   ├── [testId]/
│   │   │   ├── page.tsx                     # Test instructions, syllabus & start gate
│   │   │   ├── start-action.tsx             # Candidate declaration & start action
│   │   │   ├── attempt/
│   │   │   │   └── page.tsx                 # Real TCS-style examination engine
│   │   │   └── results/[attemptId]/
│   │   │       ├── page.tsx                 # Detailed scorecard & results
│   │   │       └── results-review-client.tsx# Filterable question solutions & explanations
│   ├── dashboard/
│   │   └── page.tsx                         # Student dashboard (attempts, stats, trends)
│   ├── auth/
│   │   ├── login/page.tsx                   # Student & Admin login (with 1-click demos)
│   │   ├── register/page.tsx                # Candidate registration
│   │   └── forgot-password/page.tsx         # Password reset flow
│   ├── admin/
│   │   ├── page.tsx                         # Admin overview & stats
│   │   ├── exams/page.tsx                   # Exam categories manager
│   │   ├── tests/page.tsx                   # Mock test creation & duration/marking builder
│   │   ├── questions/page.tsx               # Question bank search, filter & create
│   │   ├── import/page.tsx                  # Bulk CSV import with validator & preview
│   │   └── attempts/page.tsx                # Student submissions audit log
│   └── api/
│       └── tests/[testId]/
│           ├── questions/route.ts           # Secure question delivery (sanitizes answers)
│           └── submit/route.ts              # Authoritative server-side evaluation & scoring
├── components/
│   ├── ui/                                  # Reusable UI primitives (button, card, dialog...)
│   ├── layout/
│   │   ├── Navbar.tsx                       # Main top navigation
│   │   ├── Footer.tsx                       # EdTech footer & legal disclaimer
│   │   └── ModeBanner.tsx                   # Platform readiness & demo mode banner
│   ├── exam/
│   │   ├── ExamHeader.tsx                   # Countdown timer & section tabs
│   │   ├── QuestionCard.tsx                 # Active question MCQ card (A/B/C/D)
│   │   ├── QuestionPalette.tsx              # Colored status grid & candidate box
│   │   └── SubmitConfirmModal.tsx           # Pre-submission confirmation modal
│   └── admin/
│       └── AdminNav.tsx                     # Sub-navigation for admin portal
├── lib/
│   ├── utils.ts                             # Styling & formatting utilities
│   ├── auth/session.ts                      # Session & role helper
│   ├── db/
│   │   ├── mock-data.ts                     # 24 original competitive exam questions & mocks
│   │   └── repository.ts                    # Unified repository (PostgreSQL / Local runtime)
│   ├── services/
│   │   ├── scoring.ts                       # Server-side scoring engine (+2 / -0.5 / 0)
│   │   └── entitlements.ts                  # Monetization readiness & pricing plans
│   └── supabase/
│       ├── client.ts                        # Browser Supabase client
│       └── server.ts                        # Server Supabase client
├── scripts/
│   └── test-scoring.mjs                     # Automated scoring validation test suite
├── supabase/
│   ├── migrations/
│   │   └── 20261029000000_initial_schema.sql# PostgreSQL DDL with Row Level Security
│   └── seed.sql                             # 24 Verified questions & tests seed data
├── types/
│   ├── index.ts                             # Complete TypeScript interfaces
│   └── monetization.ts                      # Future subscription & payment interfaces
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## 🚢 Deploying to Vercel

1. Push your code to GitHub:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of ExamPrep Online"
   git branch -M main
   git remote add origin https://github.com/your-username/examprep-online.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New" -> "Project"**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Click **Deploy**. Vercel will build and deploy your application to a production URL with automatic HTTPS!

---

## ⚖️ Educational Disclaimer
Competitive World is an independent educational training service and is not affiliated with, endorsed by, or connected to the Staff Selection Commission (SSC) or the Government of India. All demonstration questions are original practice material designed for competitive examination preparation.
