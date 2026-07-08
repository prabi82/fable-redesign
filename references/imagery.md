# Imagery Playbook

Never use gray placeholder boxes. Every image must load, match the industry, and feel like one shoot.

## Priority order

1. **Client's own assets** — scrape from existing site (`wp-content/uploads`, `/assets/`, CDN paths)
2. **Curated picsum IDs** — stable, previewed images (below)
3. **Unsplash Source** — `https://images.unsplash.com/photo-{id}?w=1600&q=80`
4. **Never** — `picsum.photos/seed/{word}` without previewing (returns random unrelated images)

## Mandatory treatment

Apply consistent grading so mixed sources look unified:

```css
.photo-grade {
  filter: contrast(1.05) saturate(0.9);
  /* Or duotone via mix-blend-mode + background accent */
}
img { object-fit: cover; background: var(--brand-3); }
img[data-fallback] { /* set via onerror */ }
```

Fallback pattern:

```html
<img src="PRIMARY_URL" alt="..." 
     onerror="this.src='FALLBACK_URL';this.onerror=null;"
     style="background:var(--brand-2)">
```

## Curated picsum IDs by industry

Preview each at `https://picsum.photos/id/{ID}/800/600` before use.

### hospitality-dining
- 292, 312, 326, 431, 488 — food, dining, warm interiors
- Unsplash: restaurant interior, plated dish, kitchen

### logistics-shipping
- 1050, 1051, 1059 — industrial, containers, ports
- Unsplash: cargo ship, container yard, crane, port aerial

### audit-finance-legal
- 145, 148, 149 — office, architecture, professional
- Avoid: handshake stock, gold luxury, celebration imagery
- Unsplash: modern office glass, city skyline corporate, documents abstract

### construction-engineering
- 1059, 1060, 1062 — construction, steel, infrastructure
- Unsplash: blueprint, hard hat, building site, bridge

### healthcare-clinics
- 846, 849, 865 — clean, clinical, calm
- Unsplash: medical professional, clinic interior, wellness

### real-estate
- 1067, 1068, 1074 — architecture, interior, exterior
- Unsplash: luxury home, apartment, city penthouse

### education
- 305, 307, 399 — campus, library, learning
- Unsplash: classroom, students, books

### retail-ecommerce
- 225, 267, 369 — product, storefront, lifestyle
- Unsplash: product flat lay, boutique, shopping

### tech-saas
- 180, 326, 367 — abstract, workspace, minimal
- Avoid: purple AI glow, floating blobs
- Unsplash: minimal desk, code screen, abstract gradient restrained

### manufacturing-industrial
- 1050, 1059, 1060 — factory, machinery, industrial
- Unsplash: manufacturing floor, CNC, warehouse

### tourism-culture
- 1015, 1018, 1025 — landscape, culture, travel
- Unsplash: destination landmark, local culture, adventure

### personal-services
- 837, 849, 978 — spa, fitness, salon contexts
- Unsplash: gym, salon interior, wellness treatment

## Scraping client assets

1. Fetch homepage HTML
2. Regex: `src="([^"]+\.(jpg|jpeg|png|webp|svg))"`
3. Resolve relative URLs against site origin
4. Prefer largest dimensions in `srcset`
5. Download to `assets/` folder in output if building offline prototype

## Image sizing

| Context | Dimensions | Notes |
|---------|------------|-------|
| Hero full-bleed | 1920×1080 or 1600×900 | WebP preferred |
| Section feature | 1200×800 | |
| Card thumbnail | 600×400 | |
| Avatar/logo | max 200px width | SVG preferred for logos |

## QA before ship

- [ ] Every image URL opened and verified relevant
- [ ] Fallback color on every container
- [ ] onerror handler on every remote img
- [ ] Consistent grading filter applied
- [ ] Alt text describes content, not "image" or "photo"
