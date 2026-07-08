# fable-redesign

Agent skill bundle for redesigning existing client websites into modern, award-tier web experiences — unique per industry, unique per client.

## What it does

- **Research-first:** extracts real brand from the client's live site
- **Industry-true:** 12 design packs with visual codes, palettes, typography, copy voice
- **Structurally unique:** deterministic variation engine (~10M combinations) + anti-sameness registry
- **Verifiable:** formal Phase 6 QA protocol from real project defect history

## Repository structure

```
fable-redesign/
├── SKILL.md                          # Lean router — start here
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

```
git clone https://github.com/prabi82/fable-redesign.git ~/.cursor/skills/fable-redesign
```

### Paperclip

Skills page → paste source:

```
https://github.com/prabi82/fable-redesign
```

Attach `fable-redesign` on your redesign agent's Skills tab.

### skills.sh

```
npx skills add prabi82/fable-redesign
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

MIT
