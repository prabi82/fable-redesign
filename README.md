# fable-redesign

Agent skill bundle for redesigning existing client websites into modern, award-tier web experiences — unique per industry, unique per client.

This repository ships **two** agent skills:

| Skill | Location | Role |
|-------|----------|------|
| **fable-redesign** | repo root (`SKILL.md`) | Full redesign workflow: research, industry packs, structure roll, motion, Phase 6 QA |
| **frontend-design** | `skills/frontend-design/` | Anthropic’s visual-design guidance for distinctive, non-templated UI (see [source & license](#third-party-frontend-design)) |

Use **fable-redesign** as the primary skill for client redesigns. Attach **frontend-design** on the same agent when you want extra design-studio direction on typography, layout, and aesthetic choices — it aligns with fable-redesign’s anti-template rules and is especially useful in Phases 1–2 (concept and design system) without replacing the phased playbook or verification protocol.

## What it does

- **Research-first:** extracts real brand from the client's live site
- **Industry-true:** 12 design packs with visual codes, palettes, typography, copy voice
- **Structurally unique:** deterministic variation engine (~10M combinations) + anti-sameness registry
- **Verifiable:** formal Phase 6 QA protocol from real project defect history

## Repository structure

```
fable-redesign/
├── SKILL.md                          # fable-redesign — lean router, start here
├── skills.sh.json                    # skills.sh repository page grouping
├── skills/
│   └── frontend-design/
│       ├── SKILL.md                  # Anthropic frontend-design (verbatim)
│       └── LICENSE.txt               # Apache 2.0 — see Third-party section
├── registry.json                     # Cross-project anti-sameness memory
├── scripts/
│   ├── roll.mjs                      # Deterministic structure roll
│   └── extract-palette.mjs           # Logo color sampling
└── references/
    ├── variation-menus.md            # Full roll axes and labels
    ├── brand-extraction.md           # Phase 0 brand protocol
    ├── brief-template.md             # BRIEF.md template
    ├── verification.md               # Phase 6 QA checklist
    ├── imagery.md                    # Curated images + fallbacks
    ├── motion-recipes.md             # 5 signature scene implementations
    ├── copywriting.md                # Editorial copy rewrite guide
    ├── craft-details.md              # Premium micro-details (brand-gated)
    ├── production-nextjs.md          # Prototype → Next.js migration
    ├── prompts.md                    # Invocation templates
    └── industries/
        ├── hospitality-dining.md
        ├── logistics-shipping.md
        ├── audit-finance-legal.md
        ├── construction-engineering.md
        ├── healthcare-clinics.md
        ├── real-estate.md
        ├── education.md
        ├── retail-ecommerce.md
        ├── tech-saas.md
        ├── manufacturing-industrial.md
        ├── tourism-culture.md
        └── personal-services.md
```

## Install

### Cursor

**fable-redesign** (primary):

```
git clone https://github.com/prabi82/fable-redesign.git ~/.cursor/skills/fable-redesign
```

**frontend-design** (optional, from the same clone):

```
ln -s ~/.cursor/skills/fable-redesign/skills/frontend-design ~/.cursor/skills/frontend-design
```

Enable both skills on the agent when you want the redesign workflow plus Anthropic’s frontend aesthetic guidance.

### Paperclip

Skills page → paste source:

```
https://github.com/prabi82/fable-redesign
```

Attach `fable-redesign` on your redesign agent's Skills tab.

### skills.sh

```
# List both skills (root SKILL.md does not enumerate nested skills by default)
npx skills add prabi82/fable-redesign --full-depth --list

# Install the redesign workflow
npx skills add prabi82/fable-redesign --skill fable-redesign

# Install bundled frontend-design (use --full-depth or the direct path)
npx skills add prabi82/fable-redesign --full-depth --skill frontend-design
# npx skills add https://github.com/prabi82/fable-redesign/tree/main/skills/frontend-design

# Install both
npx skills add prabi82/fable-redesign --full-depth --all
```

## Quick start

```bash
# 1. Roll structure for a client
node scripts/roll.mjs "Delta Shipping"

# 2. Extract brand colors from logo
node scripts/extract-palette.mjs "https://example.com/logo.png"

# 3. After completing a project, append to registry
node scripts/roll.mjs "Delta Shipping" --append
```

Then invoke with a prompt from `references/prompts.md`.

## Scripts

| Script | Purpose |
|--------|---------|
| `roll.mjs "Client Name"` | Print deterministic structure roll + collision check |
| `roll.mjs "Client Name" --append` | Roll + append to registry.json |
| `extract-palette.mjs <url\|path>` | Sample dominant colors from logo |

Optional: `npm install sharp` in repo root for accurate palette extraction.

## License

**fable-redesign** (repo root, `references/`, `scripts/`, `registry.json`): MIT

### Third-party: frontend-design

The skill in `skills/frontend-design/` is copied verbatim from [Anthropic’s skills repository](https://github.com/anthropics/skills/tree/main/skills/frontend-design) ([`SKILL.md`](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)). License terms are in `skills/frontend-design/LICENSE.txt` (Apache License 2.0). Attribution and copyright notices in that file are preserved unchanged.
