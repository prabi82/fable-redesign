---
name: fable-redesign
description: Analyze an existing client website or business profile and rebuild it as a modern, interactive, award-tier web experience. Use when asked to redesign, reimagine, or modernize a client's existing site. Works for any industry. Enforces research-first workflow, a derived (not templated) design direction, a real token-based design system, an editorial layout language, and a disciplined motion vocabulary — then verifies the result in a browser.
---

# Fable Redesign — from existing site to modern experience

You are not decorating a template. You are studying a real business and building the site
it deserves. Every decision must trace back to something true about the client: their
industry, their country, their customers, their history. If you cannot explain why a
color, typeface, or motif belongs to THIS client, remove it.

Work through the phases in order. Do not skip Phase 0 — the research is what separates
a redesign from a reskin.

## Repository layout

This skill is a bundle. Load reference files on demand — do not guess when a playbook exists.

| Path | When to load |
|------|--------------|
| `references/industries/{industry}.md` | Phase 0 — after identifying industry |
| `references/brand-extraction.md` | Phase 0 — brand color extraction |
| `references/brief-template.md` | Phase 0 — before coding |
| `references/variation-menus.md` | Phase 3 — structure roll |
| `references/copywriting.md` | Phase 3–5 — copy rewrite |
| `references/imagery.md` | Phase 3–5 — photo selection |
| `references/motion-recipes.md` | Phase 4 — signature scene implementation |
| `references/craft-details.md` | Phase 5 — micro-details (brand-gated) |
| `references/verification.md` | Phase 6 — mandatory QA |
| `references/production-nextjs.md` | When asked for production/Next.js scope |
| `references/prompts.md` | When invoking this skill on behalf of a user |
| `scripts/roll.mjs` | Phase 3 — deterministic structure roll |
| `scripts/extract-palette.mjs` | Phase 0 — logo color sampling |
| `registry.json` | Phase 3 — anti-sameness check vs last 3 projects |

Agents without script execution can compute rolls manually using `references/variation-menus.md`.

## Phase 0 — Research the client (mandatory, before any code)

1. Fetch the existing website. Read every page you can reach (home, about, services,
   contact). Extract company name, tagline, services, contact details, heritage claims,
   existing logo/colors/imagery.
2. **Extract the existing brand — not optional.** Follow `references/brand-extraction.md`.
   Run `node scripts/extract-palette.mjs <logo-url>` if possible. Record in brief:
   `Existing brand: {colors}, {light/dark}, {type feel}`.
3. Identify the industry. Load the matching pack from `references/industries/`. Map:
   hospitality/dining, logistics/shipping, audit/finance/legal, construction/engineering,
   healthcare/clinics, real-estate, education, retail/ecommerce, tech/saas,
   manufacturing/industrial, tourism/culture, personal-services.
4. Identify **locale**: country, language(s), script direction, local geography, RTL needs.
5. Identify **audience and the one action** that matters. The entire site funnels to it.
6. Write the brief using `references/brief-template.md` before any code.

## Phase 1 — The big idea

Pick ONE central concept that could only belong to this client. Use the industry pack's
concept examples as starting points, then diverge. If your concept works for any company
in any country, it is not a concept — return to Phase 0.

**Propose, then choose.** Write 2–3 candidate directions with different moods. Pick the
one that best fits the EXISTING brand and audience. State choice + reason in the brief.

**Anti-house-style rule (critical).** Do not default to dark + oversized serif + gold/brass
+ wide-tracked kickers unless the client's OWN brand is dark and luxurious. Test: place
your output next to your previous project — if a stranger would guess they share a brand,
start over from Phase 0 brand data.

Theme (light vs dark) is derived from the existing brand, not defaulted. See industry pack
for palette tendencies and banned aesthetics.

## Phase 2 — Design system (tokens first, no ad-hoc values)

Define CSS custom properties before building sections:

- **Color**: start from Phase 0 brand colors — refine, don't replace. One accent. Tinted
  neutrals only. Never default purple/indigo/cyan gradients.
- **Typography**: use pairings from the industry pack, filtered by the structure roll.
  Display at `clamp(3rem, 8vw, 7rem)+`, tight leading, wide-tracked labels.
- **Spacing**: 6–10rem section padding desktop. Max width ~1200–1440px.
- **Texture**: pick one profile from the structure roll (`references/variation-menus.md`).

## Phase 3 — Structure and layout language

**Anti-template rule (critical).** No standard skeleton. Structure is rolled per client.

1. Run `node scripts/roll.mjs "<Client Name>"` OR compute manually from
   `references/variation-menus.md`.
2. Open `registry.json`. Compare your roll against the **last 3 entries**. Re-roll any
   axis that collides (increment seed offset by 1 and recompute that axis only). Log
   overrides in the brief.
3. Record full roll in brief: `Structure roll: hero=, rhythm=, nav=, scene=, type=,
   color=, texture=, footer=, cards=, transition=`.
4. After shipping, append this project to `registry.json`.

**Also vary between projects** (never repeat your last choice): floating stat card, marquee
ticker, ghost numerals, count-up stats, dark CTA-with-form ending.

Layout rules:
- Asymmetry over symmetry. Three-equal-cards row is banned as primary pattern.
- One focal move per section. Real client content only — see `references/copywriting.md`.
- Images: see `references/imagery.md`. Never gray placeholder boxes.

## Phase 4 — Motion vocabulary

Implement 5–8 moves from the menu below. Signature scene implementation: see
`references/motion-recipes.md` for the rolled scene index.

1. Entrance: preloader or staged hero reveal (staggered 80–120ms).
2. Scroll reveals: IntersectionObserver, translate 16–32px + fade, `once: true`.
3. One signature scroll scene — content visible from first pinned frame; degrades below 768px
   and under reduced motion.
4. Living background: Ken Burns, marquee/ticker, or drifting pattern.
5. Hover states with intent. Buttons scale down 2–3% on press.
6. Sticky nav condenses after ~40px scroll.
7. Count-up stats on viewport entry.

Hard rules: respect `prefers-reduced-motion`; never hijack wheel; animate transform/opacity
only; every image URL has fallback; hydration-safe if SSR.

## Phase 5 — Craft details

Apply details from `references/craft-details.md` only when they fit the brand — never as
defaults. Footer archetype follows the structure roll. Bilingual/RTL: design for both scripts
if locale requires it.

## Banned (instant slop markers)

Purple/indigo/blue default gradients; three equal feature cards; Bootstrap-era icons in
colored circles; emoji as icons; lorem ipsum; pure #000/#fff backgrounds; centered-everything
symmetry; Inter for display type; stock handshake imagery; carousel dots; equal 1rem radius
on every element.

## Deliverable and stack

- **Prototype** (default): single self-contained `index.html` + `BRIEF.md`. No build step.
- **Production** (when asked): follow `references/production-nextjs.md`.
- Responsive at 375px, 768px, and 1440px.

## Phase 6 — Verify (do not declare done without this)

Follow `references/verification.md` completely. Screenshot at 375/768/1440. Console zero
errors. Log defects fixed in BRIEF.md. Score the final checklist:

- [ ] Brief exists; every major choice traces to it
- [ ] Palette derives from client's existing brand; light/dark justified
- [ ] Output would NOT be mistaken for previous project's brand
- [ ] Structure roll recorded; differs from last 3 registry entries (or overrides explained)
- [ ] One accent; tinted neutrals; no banned patterns
- [ ] Display type oversized; labels tracked wide
- [ ] One signature motion moment unique to this client
- [ ] Real client content and contact details; zero placeholder text
- [ ] Reduced-motion respected; console clean; responsive at 375/768/1440
- [ ] Navigation: every destination reachable via visible labeled control
