# Production Conversion — Prototype to Next.js

When the user asks for production scope, migrate the approved `index.html` prototype
into Next.js App Router + Tailwind. Reference implementation: Al Angham redesign.

## Stack

- Next.js App Router (latest stable)
- Tailwind CSS v4 with tokens in `globals.css`
- next-intl for bilingual (en/ar) if locale requires
- Standalone output for Docker deployment

## Migration steps

### 1. Extract design tokens

From prototype CSS variables → `src/app/globals.css`:

```css
@theme {
  --color-brand-1: ...;
  --color-brand-5: ...;
  --color-accent: ...;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Sans 3', sans-serif;
}
```

### 2. Componentize sections

One React component per prototype section:

```
src/components/sections/
  HeroSection.tsx
  ServicesSection.tsx
  HeritageSection.tsx
  CtaSection.tsx
```

Each section receives content from JSON or CMS — no hardcoded lorem.

### 3. Motion hydration safety

```tsx
'use client';
import { useMotionReady } from '@/hooks/useMotionReady';

export function Reveal({ children }) {
  const ready = useMotionReady();
  return (
    <div className={ready ? 'reveal-active' : 'reveal-initial'}>
      {children}
    </div>
  );
}
```

Never branch markup on `window` during SSR first render.

### 4. i18n (bilingual)

```
messages/en.json
messages/ar.json
src/app/[locale]/layout.tsx
src/middleware.ts  — locale detection + redirect
```

RTL: `dir={locale === 'ar' ? 'rtl' : 'ltr'}` on `<html>`.

### 5. Content layer

JSON files for static content phase:

```
content/site.json
content/services.json
```

Replace with CMS (Sanity, Payload) when client needs editing.

### 6. Forms + API routes

Every API route gets a corresponding page/UI:

```
src/app/api/book/route.ts     → booking form component
src/app/api/reserve/route.ts  → reservation form component
```

Email via environment variables — never commit secrets.

### 7. Docker deployment

```dockerfile
FROM node:20-alpine AS builder
# ... build with output: 'standalone' in next.config.ts

FROM node:20-alpine AS runner
COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports: ["3030:3000"]
    env_file: .env
```

### 8. Verify production build

- [ ] `npm run build` clean
- [ ] Lighthouse mobile ≥ 90 performance target
- [ ] All locales render correctly
- [ ] Forms submit and email
- [ ] Docker container starts and serves

## File checklist

| File | Purpose |
|------|---------|
| `next.config.ts` | `output: 'standalone'`, images config |
| `src/app/globals.css` | Design tokens |
| `src/middleware.ts` | Locale routing |
| `messages/*.json` | Translations |
| `content/*.json` | Static content |
| `Dockerfile` | Production container |
| `.env.example` | Documented env vars |

## Do not migrate blindly

- Re-evaluate motion for SSR — simplify pinned scenes if hydration risky
- Replace vanilla scroll JS with React-friendly IntersectionObserver hooks
- Audit image domains in `next.config.ts` remotePatterns
