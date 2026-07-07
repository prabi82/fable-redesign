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

## Phase 0 — Research the client (mandatory, before any code)

1. Fetch the existing website. Read every page you can reach (home, about, services,
   contact). Extract:
   - Exact company name, tagline, legal entity, parent group
   - Every service/product with its real description
   - Contact details, locations, working hours
   - Claims of heritage ("est. 1985", "part of X group") — these are gold for storytelling
   - Existing logo, colors, and imagery (note what is worth keeping vs discarding)
2. **Extract the existing brand — this is not optional.** Find the logo URL in the HTML
   (`<link rel="icon">`, `wp-content/uploads`, header `<img>`). Download it and identify
   its dominant colors (eyeball the hex values or sample programmatically). Note the
   current site's background tone (light or dark), accent usage, and typography feel.
   Record the findings in the brief as `Existing brand: {colors}, {light/dark}, {type feel}`.
   The redesign must be recognizably the SAME BRAND, dramatically better executed — a
   client should say "that's us, elevated", never "whose site is this?". Only depart from
   the existing brand identity if the user explicitly requests a rebrand or supplies new
   branding.
3. Identify the industry and write down its **visual codes**: shipping = containers,
   cranes, sea charts, port coordinates; law = archives, seals, serif gravitas;
   hospitality = warmth, food texture, ornament. You will subvert or elevate these
   codes, never ignore them.
4. Identify the **locale**: country, language(s), script direction. A company in Oman,
   Japan, or Brazil should not get the same site. Local geography (coordinates, port
   names, city skylines), local pattern traditions, and bilingual needs (RTL!) are
   design material.
5. Identify the **audience and the one action** that matters: request a quote, book a
   table, call the office. The entire site funnels to this action.
6. Write a 3–5 line design brief before coding: client, audience, action, the "big
   idea", the existing-brand extraction line, and the mood in three adjectives. Keep it
   visible while you work.

## Phase 1 — The big idea

Pick ONE central concept that could only belong to this client, and let it drive
typography, motifs, motion, and copy. Examples of the caliber expected:

- A shipping agency → the site reads like a **voyage manifest**: monospace coordinates,
  route lines that draw on scroll, section numbers as port codes, a ticker of vessel names.
- A heritage restaurant → an **editorial chapter book**: oversized serif, calligraphic
  accents from the local script, images clipped in architectural arch frames.
- An engineering firm → a **technical drawing**: hairline grids, dimension annotations,
  blueprint-style section markers.

If your concept would work equally well for any company in any country, it is not a
concept — go back to your research.

**Propose, then choose.** Before committing, write down 2–3 candidate directions with
different moods (e.g. for a shipping firm: "corporate-precise light theme with navy +
signal orange", "nautical-chart dark theme", "brutalist cargo-manifest monochrome").
Pick the one that best fits the EXISTING brand extracted in Phase 0 and the audience.
State the choice and the reason in one line in the brief.

**Anti-house-style rule (critical).** Do not default to a favorite aesthetic. The
combination "dark moody background + oversized serif with one italic accent word in
gold/brass + wide-tracked uppercase kickers" is a known house-style fingerprint — if
your design converges on it, that is only acceptable when the client's OWN brand is
dark and luxurious (heritage hospitality, jewelry, fine dining). A corporate shipping
line with a blue logo and a light website must produce a fundamentally different-looking
result than a royal restaurant. Test: place your output next to your previous project —
if a stranger would guess they share a brand, start over from the Phase 0 brand data.

Theme decision (light vs dark) is derived, not defaulted:
- Existing site light + corporate/institutional audience → light or hybrid theme
- Existing brand colors → your palette's starting point (elevate/refine the hues,
  don't replace them)
- Dark themes are the exception that must be justified by the brand's world, not
  the default for "premium feel"

## Phase 2 — Design system (tokens first, no ad-hoc values)

Define CSS custom properties (or Tailwind theme tokens) before building sections:

- **Color**: one background family, one ink family, ONE accent. **Start from the brand
  colors extracted in Phase 0** — refine them (deepen a flat corporate blue into a rich
  navy scale, warm up a tired red) rather than inventing an unrelated palette. Never
  default purple/indigo/cyan gradients. Dark themes use tinted darks (`#0a0e12`-ish or
  OKLCH equivalents), never pure `#000`. Light themes use warm/cool tinted whites, never
  pure `#fff`. Keep every gray in the same temperature family.
- **Typography**: pair one display face with real character (serif for heritage/luxury,
  grotesque for industrial/technical) with a quiet body face. Load from Google Fonts or
  Fontshare. Display sizes must be genuinely large: hero lines at `clamp(3rem, 8vw, 7rem)`
  or larger, tight line-height (0.95–1.05), negative tracking. Small labels get uppercase
  + wide tracking (0.15–0.3em). Use tabular numerals for any data.
- **Spacing**: sections breathe — 6–10rem vertical padding on desktop. Max content width
  ~1200–1440px. Whitespace is a feature; density is a failure mode on marketing pages.
- **Texture**: at least one layer of atmosphere — film grain/noise overlay at 2–4%
  opacity, a subtle pattern derived from the industry or locale, or graded imagery
  (consistent duotone/contrast treatment on every photo so mixed sources look like one
  shoot).

## Phase 3 — Structure and layout language

**Anti-template rule (critical).** There is no standard skeleton. If two sites you
generate share the same section anatomy — e.g. "preloader → split hero with floating
stat card → marquee ticker → heritage block with ghost numeral → indexed service list →
pinned scene → count-up stats → dark CTA with form" — you have built a template, which
is exactly what this skill exists to prevent. Structure must be rolled per client, not
reused.

**Variation seed (mandatory).** Derive a deterministic seed from the client name:
sum the character codes of the name, or use its length. Use `seed % N` against each
menu below to pick your starting option, then override only when the choice genuinely
fights the client's content (say why in the brief). Record the picks in the brief as
`Structure roll: hero={x}, rhythm={y}, nav={z}, scene={w}`.

**Hero archetypes (pick via seed, N=7):**
0. Full-bleed image/video with text overlaid low-left, no side column
1. Typography-only hero — oversized display lines, no hero image at all; first image
   appears in section two
2. Split hero, text left / visual right (classic — allowed at most once in a row)
3. Split hero mirrored — visual LEFT, text right
4. Stacked editorial — kicker + massive headline full-width, then a wide short image
   band beneath
5. Off-grid collage — 2–3 overlapping images at different scales with the headline
   cutting across them
6. Data-panel hero — headline beside a live-feeling panel (hours, rates, departures,
   menu of the day) instead of a photo

**Section rhythm (pick via seed, N=4):**
0. Story-first: heritage/about immediately after hero, services later
1. Offer-first: services immediately after hero, story near the footer
2. Proof-first: numbers/credentials/testimonial band before anything else
3. Single-scroll narrative: alternating full-bleed chapters, no card lists anywhere

**Navigation (pick via seed, N=3):**
0. Fullscreen overlay menu (hamburger)
1. Visible inline nav links with an underline/slide hover, no hamburger on desktop
2. Sidebar rail — fixed vertical nav strip with rotated wordmark or section dots

**Signature scene (pick via seed, N=5):**
0. Pinned crossfade chapter
1. Horizontal scroll gallery
2. Scroll-drawn line/path (route, timeline, process)
3. Sticky image that swaps as text scrolls past (scrollytelling)
4. No pinned scene — invest instead in one exceptional hover/idle interaction
   (e.g. cursor-following spotlight, magnetic buttons, live clock/ticker)

**Also vary between projects** (no seed needed, just never repeat your last choice):
the floating stat/badge card on the hero image, the marquee ticker strip, ghost
numerals behind headings, count-up stat rows, and the dark full-width CTA-with-form
ending. Each of these is fine once; appearing in every output makes them tells.

Layout rules:

- Asymmetry over symmetry. Offset columns, staggered baselines, text overlapping images.
  The three-equal-cards row is banned as a primary pattern.
- Give each section ONE clear focal move (an oversized number, a full-bleed image, a
  pinned figure) instead of uniform medium-weight blocks.
- Fill negative space deliberately: ghost numerals, oversized index numbers (01/04),
  faint script/watermark words, coordinate strings. Empty ≠ elegant when it reads as
  unfinished; anchored emptiness is the goal.
- Real content only. Use the client's actual copy (tightened and elevated — rewrite
  flabby corporate prose into short, confident editorial lines). Real contact details.
  Images: prefer the client's own; otherwise use `https://picsum.photos/seed/{word}/1600/1200`
  or Unsplash source URLs that match the industry — never gray placeholder boxes.

## Phase 4 — Motion vocabulary (the difference between a page and an experience)

Implement a coherent set from this menu — pick 5–8, execute them well, keep easing
consistent (one signature cubic-bezier such as `cubic-bezier(0.32, 0.72, 0, 1)`):

1. **Entrance**: brief preloader or staged hero reveal (mask-reveal headline lines rising
   from clipped containers, staggered 80–120ms).
2. **Scroll reveals**: elements translate up 16–32px + fade as they enter viewport
   (IntersectionObserver; `once: true`). Never animate everything — anchor images and
   headlines, let small text just appear.
3. **One signature scroll scene**: a pinned chapter that crossfades beats, a horizontal
   gallery, or a route line that draws with scroll progress. ONE, done well. The scene
   must show meaningful content from the first pinned frame (no viewport-height of empty
   background before the first beat appears), and it must degrade to a plain stacked
   section below 768px and under reduced motion.
4. **Living background**: slow Ken Burns on hero imagery, a marquee/ticker of relevant
   strings (vessel names, dishes, ports), or a drifting pattern.
5. **Hover states with intent**: links slide/underline with the signature ease; cards
   lift subtly; image hovers reveal a related preview. Buttons scale down 2–3% on press.
6. **Page/anchor transitions**: smooth-scroll with eased anchor navigation; sticky nav
   that condenses (blur + background) after ~40px of scroll.
7. **Numbers that count up** when stats enter the viewport.

Hard rules:

- Respect `prefers-reduced-motion: reduce` — render final states, disable pins/parallax.
- If SSR is involved, motion must be hydration-safe: never branch markup on
  `window`/matchMedia during first render; gate animation with a post-mount flag.
- Nothing may block reading. Total entrance under ~1.2s; scroll scenes must never trap
  the user.
- **Never hijack the wheel.** Build pinned scenes with native scroll + `position: sticky`
  (or a library that preserves native scrolling). Custom `wheel`-event handlers that
  re-implement scrolling break direction reversal, trackpads, and accessibility.
- **Every image URL must have a fallback.** Set a CSS background color/gradient on image
  containers and add `onerror` handling (or test the URL) so a failed remote image never
  shows broken-image alt text over the design. Prefer `https://picsum.photos/seed/{word}/W/H`
  over hotlinking arbitrary sites.

## Phase 5 — Craft details that get noticed

- A styled scrollbar-adjacent detail: custom selection color (`::selection`), a fixed
  hairline progress bar, or a floating "back to top" that appears late.
- Footer is a designed section, not an afterthought: logo, contact, hours, secondary nav,
  a closing flourish (ornament rule, coordinates, tagline).
- Navigation: fullscreen overlay menu with staggered links beats a cramped inline list,
  even on desktop, when the site has ≤7 destinations.
- Micro-copy in the brand voice everywhere: button labels ("Request a quote", not
  "Submit"), section kickers, form success states.
- If the locale is bilingual (e.g., Arabic + English), design the type system for both
  scripts and mirror layouts under RTL — or at minimum leave visible affordance for it.

## Banned (instant slop markers)

- Purple/indigo/blue default gradients; three equal feature cards; Bootstrap-era icons
  in colored circles; emoji as icons; lorem ipsum; pure black/white backgrounds;
  centered-everything symmetry; `Inter` for display type; stock "handshake/office people"
  imagery; carousel dots for testimonials; equal 1rem border-radius on every element.

## Deliverable and stack

- **Prototype scope** (default when unspecified): a single self-contained `index.html`
  (embedded CSS + vanilla JS, CDN fonts allowed). Everything works offline except
  fonts/images. No build step.
- **Production scope** (when asked): Next.js App Router + Tailwind, tokens in
  `globals.css`, componentized sections, i18n if bilingual.
- Either way the page must be responsive at 375px, 768px, and 1440px.

## Phase 6 — Verify (do not declare done without this)

1. Open the result in a browser. Screenshot at desktop width. Actually look at it.
2. Check: does the hero make an impression in 2 seconds? Is there one clear CTA? Does
   scroll feel alive? Any layout overflow at 375px?
3. Open DevTools console — zero errors.
4. Score yourself against the checklist below; fix anything under "yes".

Final checklist (all must be yes):

- [ ] Design brief exists and every major choice traces to it
- [ ] Palette derives from the client's existing brand colors (Phase 0 extraction),
      and the light/dark decision is justified by the brand — not a house default
- [ ] Output would NOT be mistaken for your previous project's brand
- [ ] Structure roll recorded in the brief; hero archetype, section rhythm, nav
      pattern, and signature scene differ from your previous project's picks
- [ ] One accent color; tinted neutrals; no banned patterns anywhere
- [ ] Display type is oversized with tight leading; labels tracked wide
- [ ] At least one signature scroll/motion moment unique to this client
- [ ] Real client content and contact details; zero placeholder text
- [ ] Reduced-motion respected; console clean; responsive at 375/768/1440
