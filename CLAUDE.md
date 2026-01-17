# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tetritime is an elementary school after-school program scheduling tool for working parents. It helps manage children's weekly schedules while detecting time conflicts. The tagline is "시간표를 테트리스처럼 맞춰요" (Schedule your timetable like Tetris).

**Status**: PoC (Proof of Concept) phase

## Tech Stack

- **Framework**: React Router 7 with SSR
- **Runtime**: Cloudflare Workers
- **Styling**: Tailwind CSS 4
- **Build**: Vite + Turborepo
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm

## Commands

```bash
# Root level (turborepo)
pnpm dev         # Start dev server (http://localhost:5173)
pnpm build       # Production build
pnpm typecheck   # Full TypeScript checking

# From apps/web/
npm run deploy   # Build and deploy to Cloudflare Workers
npm run preview  # Build and preview production locally
```

## Architecture

```
tetritime/
├── apps/web/                    # Main React Router 7 + Cloudflare SSR app
│   ├── app/
│   │   ├── components/          # React components
│   │   │   └── WeeklyTimetable.tsx  # Main scheduling component
│   │   ├── routes/              # Route handlers (file-based routing)
│   │   ├── entry.server.tsx     # SSR entry point
│   │   ├── root.tsx             # Root layout
│   │   └── app.css              # Tailwind CSS with @theme
│   ├── workers/app.ts           # Cloudflare Workers handler
│   └── wrangler.jsonc           # Workers config
└── .craftify/guides/            # Development setup guides
```

### Key Patterns

- **SSR**: React Router 7 streaming rendering via Cloudflare Workers
- **Path aliases**: `~/*` maps to `./app/*`
- **Multi-tsconfig**: Base, Cloudflare-specific, and Node configs
- **Route config**: Defined in `app/routes/routes.ts`

### Data Structure

Programs are currently static data in `WeeklyTimetable.tsx` with:
- 8 categories: art, sports, science, music, language, thinking, life, computer
- Time slots with 70-80 minute durations
- Conflict detection between selected programs

## Development & Deployment Flow

```
1. 로컬 개발     →  2. 내부 테스트      →  3. 프로덕션 배포
   pnpm dev           docker compose        wrangler deploy
   localhost:5173     *.home.codepoet.site  tetritime.codepoet.site
```

### 1. 로컬 개발
```bash
pnpm dev -- --host    # http://localhost:5173 (네트워크 접근 허용)
```

### 2. 내부 테스트 (Docker)
```bash
# Linux 서버에서
git pull
docker compose up -d --build
# 접속: http://tetritime.home.codepoet.site
```

### 3. 프로덕션 배포
```bash
cd apps/web
npm run cf-deploy     # Cloudflare Workers 배포
```

## Development Notes

- UI language is Korean
- No testing framework configured yet
- No ESLint/Prettier configured yet
- Environment variables: `.dev.vars` (local) or Cloudflare dashboard (production)
