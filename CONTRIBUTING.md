# Contributing / Developer setup

Thanks for contributing! A few notes to get you started developing locally.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm or pnpm

## Local secrets
- Do not commit local secrets or API keys. Add them to `.env.local` or your OS secret manager.
- We ignore `.vscode/settings.json`; use `.vscode/settings.example.json` as a template.

## Install

1. Install dependencies:

```powershell
npm install
```

2. Run development server:

```powershell
npm run dev
```

3. Build for static export (used for GitHub Pages):

```powershell
npm run build
```

## Contact form and email provider
The project uses an app-route POST handler at `src/app/api/contact/route.ts`. To send messages through a provider (SMTP / third-party), supply credentials via environment variables and update the route accordingly. Do not commit credentials.

## Notes about static export
This project targets a static export for GitHub Pages. Server Actions are not compatible with static export; we use client-side fetch to app-route endpoints instead.

## Adding tests
Small unit tests are welcome. If you add a test runner (Vitest/Jest), document how to run tests in this file.

## Accessibility
Follow existing patterns for accessible labels and icons. Use aria-labels and include icons in accessible names rather than relying on color alone.

### Avatar & control accessibility pattern

- Avatars: Prefer an explicit accessible name. Use a container with `role="img"` and an `aria-label` (for example: `aria-label="User avatar for Rajath Hegde"`). If you include a decorative icon inside, mark the icon `aria-hidden="true"` to avoid duplicate announcements. Avoid relying on color or emoji alone.

- Window header controls (traffic lights): If you use small colored indicators (close/minimize/maximize), ensure there is a non-color cue and keyboard focus. Either provide a visually-hidden description (e.g., `<span className="sr-only">Window controls: close, minimize, maximize</span>`) or make the indicators interactive buttons with `aria-label` and keyboard focus so screen-reader users can operate them.

Following these simple patterns helps make components usable by keyboard and screen-reader users while preserving the visual design.

Thanks — and happy hacking!
