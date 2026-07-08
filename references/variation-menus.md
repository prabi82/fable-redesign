# Variation Menus

Deterministic structure roll. Seed = sum of char codes in client name (case-sensitive).

For each axis: `pick = (seed + axisOffset) % N` where axisOffset prevents correlation:

| Axis | Offset | N |
|------|--------|---|
| hero | 0 | 7 |
| rhythm | 11 | 4 |
| nav | 23 | 3 |
| scene | 37 | 5 |
| type | 53 | 10 |
| color | 71 | 6 |
| texture | 89 | 6 |
| footer | 101 | 5 |
| cards | 113 | 6 |
| transition | 127 | 4 |

Or run: `node scripts/roll.mjs "Client Name"`

---

## Hero archetypes (N=7)

0. Full-bleed image/video, text overlaid low-left, no side column
1. Typography-only hero — no hero image; first image in section two
2. Split hero, text left / visual right (max once in last 3 projects)
3. Split hero mirrored — visual left, text right
4. Stacked editorial — kicker + headline full-width, wide short image band beneath
5. Off-grid collage — 2–3 overlapping images, headline cuts across
6. Data-panel hero — headline beside live panel (hours, rates, departures, menu)

## Section rhythm (N=4)

0. Story-first: heritage/about immediately after hero
1. Offer-first: services immediately after hero
2. Proof-first: credentials/testimonial band before anything else
3. Single-scroll narrative: alternating full-bleed chapters, no card lists

## Navigation (N=3)

0. Fullscreen overlay menu (hamburger) — must include labeled links, not dots-only
1. Visible inline nav with underline/slide hover, no hamburger on desktop
2. Sidebar rail — fixed vertical strip; if using dots, pair with hamburger + labels on mobile

## Signature scene (N=5)

0. Pinned crossfade chapter — see motion-recipes.md #0
1. Horizontal scroll gallery — see motion-recipes.md #1
2. Scroll-drawn line/path (route, timeline, process) — see motion-recipes.md #2
3. Sticky image scrollytelling — see motion-recipes.md #3
4. No pinned scene — exceptional hover/idle interaction instead — see motion-recipes.md #4

## Typography pairing (N=10)

Filter by industry pack first; use roll as tiebreaker.

0. Playfair Display + Source Sans 3
1. DM Serif Display + DM Sans
2. Fraunces + Work Sans
3. Syne + IBM Plex Sans
4. Libre Baskerville + Karla
5. Space Grotesk + Inter (body only — never Space Grotesk for body at small sizes)
6. Cormorant Garamond + Lato
7. Outfit + Source Serif 4
8. Archivo + Bitter
9. Instrument Serif + Instrument Sans

## Color treatment (N=6)

0. Monochrome scale — one hue, 9-step tint/shade ladder
1. Duotone — two related hues, photos graded to match
2. Accent-pop — neutral ground + single saturated accent
3. Tinted-neutral — warm or cool gray family throughout
4. Split-tone — light sections alternate with one dark chapter
5. Gradient-restrained — one subtle radial or linear, never rainbow

## Texture profile (N=6)

0. Film grain overlay at 2–4% opacity
1. Industry pattern (from industry pack motif library)
2. Graded duotone on all photos
3. Hairline grid (engineering/technical brands)
4. Paper/canvas texture (heritage/editorial brands)
5. Clean/none — rely on typography and whitespace

## Footer archetype (N=5)

0. Split footer — contact left, nav right, ornament center
1. Stacked editorial — large closing headline + minimal links
2. Map/coordinates block — locale-specific flourish
3. Dark inversion band — single accent CTA
4. Minimal single-line — logo, tagline, three links

## Card/list treatment (N=6)

0. Indexed list — oversized numbers, no cards
1. Asymmetric bento — varying grid spans
2. Horizontal scroll cards
3. Full-bleed alternating rows (image/text swap)
4. Accordion/expandable rows
5. Timeline vertical with hairline connector

## Section transition (N=4)

0. Hard cut with whitespace gap
1. Overlapping negative margin (image bleeds into next section)
2. Hairline rule + kicker bridge
3. Full-bleed color band swap

---

## Collision resolution

After rolling, compare each axis value against `registry.json` last 3 entries.
If collision on an axis: `(pick + 1) % N` and note `Override: {axis} collision with {client}` in BRIEF.md.
