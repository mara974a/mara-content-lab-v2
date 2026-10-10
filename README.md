# Mara Content Lab (v2)

Source-grounded editorial studio for independent B2B founders, operators, and consultants.

Mara helps high-ticket B2B practitioners turn one substantive source (talk, interview transcript, podcast episode, client strategy call, or long-form essay) into 1–2 authoritative, defensible LinkedIn posts and structured outline documents without generic AI fluff.

---

## The Core Offer

- **Service**: Source-to-Authority Sprint
- **Price**: $297 USD (Fixed engagement, no subscriptions)
- **Turnaround**: ~5 business days after source, scope, and payment are confirmed
- **Deliverables**:
  - 1 LinkedIn authority post (180–250 words, text-first)
  - 1 document-post outline with 4–6 structured sections
  - 3 future content angles extracted from the source
  - 3 hook variations tailored to the audience
  - 1 consolidated revision round
- **Review Model**: 100% human editorial review and delivery by Parth Tiwari

---

## Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Vanilla CSS design system (`app/globals.css`), zero heavy component framework overhead, `< 12KB` total CSS bundle
- **Database / Backend**: Supabase (PostgreSQL with Row Level Security)
- **Deployment**: Vercel-ready with edge caching and static pre-rendering

```
mara-content-lab-v2/
├── app/
│   ├── layout.tsx             # Global HTML shell, SEO metadata, and viewport
│   ├── globals.css            # Lightweight B2B design system & responsive rules
│   ├── page.tsx               # Main landing page (all 10 core sections)
│   ├── request/
│   │   └── page.tsx           # Dedicated /request page with 3-step form
│   ├── privacy/
│   │   └── page.tsx           # Transparent Privacy Policy
│   ├── terms/
│   │   └── page.tsx           # Clear Terms of Service & refund policy
│   ├── thank-you/
│   │   └── page.tsx           # Submission confirmation & next steps
│   └── api/
│       ├── request/route.ts   # Validated server endpoint for project requests
│       └── waitlist/route.ts  # Validated server endpoint for waitlist signups
├── components/
│   ├── Header.tsx             # Responsive sticky navigation & mobile drawer
│   ├── Footer.tsx             # Semantic footer with contact and legal links
│   ├── RequestForm.tsx        # Multi-step validated project request component
│   └── WaitlistForm.tsx       # Compact waitlist component with explicit consent
├── lib/
│   ├── types.ts               # Shared TypeScript interfaces
│   └── supabase.ts            # Supabase server client with graceful offline simulation
├── public/
│   └── media/
│       └── parth-headshot.jpg # Clean portrait of Parth Tiwari
└── supabase/
    └── migrations/
        └── 0001_init.sql      # Database schema (RLS locked down, updated_at trigger)
```

---

## Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of your site (e.g. `http://localhost:3000` or `https://maracontentlab.com`) |
| `SUPABASE_URL` | Your Supabase project URL (e.g. `https://xyzcompany.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only secret key used to bypass RLS and insert records securely |

*Note: If Supabase keys are not set, the app will run in local simulation mode and log submissions to the server console without throwing errors.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Paste and run the contents of [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql).
4. This creates:
   - `public.project_requests` (Stores full project submissions with status tracking and consent metadata)
   - `public.waitlist_entries` (Stores waitlist emails with unique index and consent records)
   - `Row Level Security (RLS)` enabled with no public access policies (read/write access is restricted strictly to the Next.js server via the service role key).

---

## Deployment (Cloudflare Pages via GitHub)

1. Push this repository to GitHub (`https://github.com/mara974a/mara-content-lab-v2`).
2. In your [Cloudflare Dashboard](https://dash.cloudflare.com):
   - Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Select your GitHub account and choose the repository `mara974a/mara-content-lab-v2`.
3. Configure the build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/` (leave empty)
4. Under **Environment variables**, optionally add:
   - `NOTIFY_EMAIL`: `mara974a@gmail.com`
   - `RESEND_API_KEY`: your Resend API key (from [resend.com](https://resend.com))
   - `SUPABASE_URL`: your Supabase project URL (from [supabase.com](https://supabase.com))
   - `SUPABASE_SERVICE_ROLE_KEY`: your Supabase service role secret key
5. Click **Save and Deploy**. Cloudflare Pages will build the static HTML into `out/` and automatically deploy the serverless edge handlers in `functions/` for `/api/request` and `/api/waitlist`.

