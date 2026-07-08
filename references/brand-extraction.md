# Brand Extraction Protocol

Phase 0 mandatory step. The redesign must be recognizably the SAME BRAND, dramatically better executed.

## 1. Find the logo

Search the client's HTML for:
- `<link rel="icon">` or `<link rel="apple-touch-icon">`
- Header `<img>` with logo, brand, or site title class
- WordPress: `wp-content/uploads` paths
- SVG inline in header

Download the highest-resolution version available.

## 2. Sample colors

**Automated (preferred):**
```bash
node scripts/extract-palette.mjs "https://client.com/logo.png"
```

**Manual fallback:**
1. Open logo in any image editor or browser devtools color picker
2. Record 2–4 dominant hex values (ignore pure white/black backgrounds)
3. Note whether the existing site background is light or dark
4. Note typography feel: serif institutional, sans corporate, mixed bilingual, etc.

## 3. Audit the live site

| Signal | Record |
|--------|--------|
| Background tone | light / dark / hybrid |
| Primary brand hue | hex from logo |
| Secondary/accent | hex from buttons, links, headers |
| Typography | display + body faces if identifiable |
| Imagery style | stock photos, illustrations, none, dated |
| Layout density | sparse corporate / dense brochure / broken |

## 4. Build token starting point

From primary hue, derive a 9-step scale. Refine — do not replace:

```css
:root {
  --brand-1: /* lightest tint for backgrounds */;
  --brand-5: /* primary brand color */;
  --brand-9: /* darkest shade for text on light bg */;
  --accent: /* ONE saturated accent — often existing link/button color */;
  --bg: /* tinted neutral, never pure #fff or #000 */;
  --ink: /* tinted dark, never pure #000 */;
}
```

WCAG minimum: body text 4.5:1 against background. Large display text 3:1.

## 5. Record in brief

```
Existing brand: #003466, #5192CA, #001878, light, sans-corporate institutional
```

Only depart from existing brand if user explicitly requests rebrand or supplies new assets.

## 6. Anti-patterns

- Do NOT import a palette from a previous project
- Do NOT default to dark + gold because it "feels premium"
- Do NOT use purple/indigo gradients when brand is blue corporate
- Do NOT ignore an existing light site and force dark mode
