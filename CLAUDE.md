# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prabodhika is a Next.js study platform for Indian college students — featuring a content hub (PDFs, notes, links), community Q&A with threaded discussions, and a personal dashboard. Authentication supports credentials (email/password), Google, and GitHub.

## Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`
- **Auth**: NextAuth.js v4 (credentials + OAuth)
- **Database**: MySQL via `mysql2/promise` connection pool
- **Email**: External PHP service at `https://mail.protoolvault.in/send-verification.php`
- **Fonts**: Google Fonts (Yeseva One for display, Outfit for body)

## Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Route Groups (App Router)

- `app/(public)/` — Public marketing pages (homepage, about)
- `app/(auth)/` — Auth pages (login, register, verify-email, forgot-password, reset-password)
- `app/(protected)/` — Protected routes requiring full authentication (home, upload)
- `app/api/` — API routes

### Route Protection Flow

The protected layout (`app/(protected)/layout.tsx`) enforces a 3-step gate:

1. **No session** → redirect to `/login`
2. **Email not verified** → redirect to `/verify-email`
3. **Profile not completed** → redirect to `/complete-profile`

Users complete their profile via a 3-step wizard (university → college → course + year) at `app/complete-profile/CompleteProfileClient.tsx`.

### Key Files

- `lib/auth.ts` — NextAuth configuration, JWT/session callbacks, OAuth providers
- `lib/db.ts` — MySQL connection pool (`mysql2/promise`)
- `lib/requireProfile.ts` — Client-side hook for profile completion enforcement
- `app/providers.tsx` — Wraps app in `SessionProvider`
- `app/theme-provider.tsx` — Dark/light theme via Tailwind `dark` class + localStorage

### Authentication Flow

**Credentials**: Email/password → bcrypt hash comparison → JWT issued
**OAuth (Google/GitHub)**: OAuth flow → auto-creates user if new → JWT issued
**Session callback** (`lib/auth.ts:105-123`): On every session access, fresh user data is fetched from DB to sync `email_verified`, `profile_completed`, and academic profile fields.

### Database Schema (users table key fields)

```
id, name, email, password, provider, provider_id,
verification_code, email_verified (bool),
university_id, college_id, course_id, year,
profile_completed (bool)
```

### API Routes

- `api/auth/*` — NextAuth handler, register, verify-email, forgot-password, reset-password, resend-verification
- `api/universities`, `api/colleges`, `api/courses`, `api/subjects` — Academic data lookups
- `api/user/complete-profile` — Updates user's university/college/course/year
- `api/content/create`, `api/content/check-duplicate` — Content management
- `api/upload-file` — File uploads

### SearchSelect Component

Used across profile completion and content creation (`components/SearchSelect.tsx`). Accepts `api` for search, `createApi` for creating new entries, `extraData` for additional payload fields, and `onSelect` callback.

## Environment Variables

```env
# Database
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

# NextAuth
NEXTAUTH_SECRET, NEXTAUTH_URL

# OAuth
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
GITHUB_ID, GITHUB_SECRET

# Email service
MAIL_API_KEY
```

## Design System

Custom theme via Tailwind `@theme` directive in component-scoped `<style>` blocks:
- `--color-saffron: #E8600A` — Primary brand color
- `--color-amber-warm: #F59E0B` — Secondary/gradient
- `--color-indigo-deep: #1E1B4B` — Text on light
- `--color-cream: #FFFBF5` — Light background
- `--color-warm-bg: #FEF3E8` — Input backgrounds
- Dark mode flips these values (defined in `.dark` class blocks)
