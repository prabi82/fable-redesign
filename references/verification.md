# Phase 6 — Verification Protocol

Do not declare done without completing every section. Log results in BRIEF.md.

## 1. Screenshot matrix

Capture at three widths. Actually look at each screenshot — do not auto-pass.

### 375px (mobile)

- [ ] Hero readable without horizontal scroll
- [ ] Headline not clipped or wrapping into 6+ lines of tiny text
- [ ] Primary CTA visible above fold or within first screen
- [ ] Navigation reachable — hamburger or visible links with **text labels**
- [ ] No pinned scene trapping scroll; degrades to stacked layout
- [ ] Touch targets ≥ 44px
- [ ] No text overlapping images illegibly

### 768px (tablet)

- [ ] Layout transition sensible — no orphaned half-columns
- [ ] Images maintain aspect ratio; no broken containers
- [ ] Nav pattern works at this breakpoint

### 1440px (desktop)

- [ ] Hero makes impression in 2 seconds
- [ ] One clear primary CTA
- [ ] Whitespace intentional, not empty
- [ ] Signature motion scene shows content from first pinned frame
- [ ] Footer complete with real contact details

## 2. Navigation reachability test

**Critical — known failure from MHMY project.**

Every destination in the site map must be reachable via a **visible, labeled** control:

| Destination | Control type | Label visible | Works |
|-------------|--------------|---------------|-------|
| Home | | | |
| Services | | | |
| About | | | |
| Contact | | | |
| {other} | | | |

Rules:
- Sidebar rail with dots-only = FAIL unless paired with hamburger + labeled overlay
- Overlay menu must open on click, close on Escape, trap focus optionally
- Mobile: topbar or hamburger must be visible

## 3. Pinned scene first-frame test

For rolled signature scenes 0–3:

- [ ] Meaningful content visible immediately when section pins — no full viewport of empty background
- [ ] Progress indicator or section label visible
- [ ] User can scroll through without getting stuck
- [ ] Below 768px: plain stacked section, no pin
- [ ] `prefers-reduced-motion`: final state rendered, no pin

## 4. Image audit

**Critical — picsum.photos/seed/ returns random unrelated images.**

For every remote image:
- [ ] URL loads (open in browser or fetch HEAD)
- [ ] Image matches industry context
- [ ] Container has CSS fallback background color/gradient
- [ ] `onerror` handler or `<picture>` fallback present
- [ ] No broken-image icon visible over design

Prefer curated picsum IDs from `references/imagery.md` over `/seed/` URLs.

## 5. Console and performance

- [ ] DevTools console: zero errors, zero failed network for critical assets
- [ ] No `wheel` event scroll hijacking
- [ ] Animations use transform/opacity only (no layout-thrashing width/height/top/left)
- [ ] `backdrop-blur` only on fixed/sticky elements, not scrolling containers

## 6. Reduced motion pass

Enable `prefers-reduced-motion: reduce` in DevTools or OS settings:

- [ ] All content visible without waiting for animations
- [ ] Pinned scenes disabled; stacked fallback shown
- [ ] Preloader skipped or instant

## 7. Content audit

- [ ] Zero lorem ipsum
- [ ] Real company name, services, contact details throughout
- [ ] Phone/email/address match Phase 0 research
- [ ] Button labels are action-specific ("Request a quote", not "Submit")

## 8. Defect log format

Record in BRIEF.md:

```
| # | Defect | Severity | Fix |
|---|--------|----------|-----|
| 1 | Sidebar nav dots-only, no labels | critical | Added hamburger + fullscreen overlay with labeled links |
| 2 | picsum seed returned unrelated image | medium | Switched to curated ID 1050 |
```

Fix all critical and medium defects before closing the task.

## 9. Final sign-off

All items in SKILL.md final checklist must be yes. Append project to `registry.json`:

```bash
node scripts/roll.mjs "Client Name" --append
```

Or manually add entry with industry, paletteFamily, and roll values.
