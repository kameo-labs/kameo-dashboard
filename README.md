# Kameo Dashboard 📊

The "Cockpit" for artisans to manage their leads, configure their AI assistant, and view performance metrics. Built with **Next.js 15 (App Router)**, **Supabase Auth**, and **Shadcn/UI**.

## ✨ Features

- **Modern UI**: Clean, responsive layout with Sidebar and Glassmorphism details.
- **Real-time Stats**: Live view of captured leads, conversion rates, and credits.
- **AI Configuration**: Set hourly rates ("Taux horaire") and notification preferences.
- **Easy Integration**: Dedicated page to get the copy-paste widget code.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Use the same Supabase instance as `kameo-backend`.
- Create `.env.local` with:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
    ```

### Install Dependencies
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000).

## 📁 Key Structure

- `app/(dashboard)`: Protected routes (Dashboard, Settings, Install). Requires Auth.
- `app/login` & `app/onboarding`: Public auth flows.
- `components/ui`: Reusable Shadcn components (Card, Button, Input).
- `utils/supabase`: Server and Client-side Supabase helpers.

## 🛠 Tech Stack
- **Framework**: Next.js 15
- **Styling**: TailwindCSS v4
- **Components**: Radix UI + Shadcn
- **Icons**: Lucide React
