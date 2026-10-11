# Prompt Templates

Optimal invocation prompts for different platforms. Copy, fill placeholders, run.

---

## Cursor (recommended)

With both skills enabled (`fable-redesign` + optional `frontend-design`):

```
Read and follow the fable-redesign skill from start to finish. Where Phases 1–2 need visual direction, apply frontend-design principles without skipping fable-redesign’s industry pack, brand extraction, or anti-template rules.

Client: {Company Name}
Existing site: {URL}
Industry: {industry slug or "detect from site"}
Output folder: skill-tests/{slug}/

Requirements:
1. Phase 0: fetch site, extract brand (run extract-palette.mjs if possible)
2. Load references/industries/{industry}.md
3. Run: node scripts/roll.mjs "{Company Name}" — check registry.json collisions
4. Write BRIEF.md using references/brief-template.md before coding
5. Build index.html prototype (default scope)
6. Phase 6: follow references/verification.md — screenshot 375/768/1440
7. Append to registry.json when done

Report: brief summary, palette, structure roll, defects fixed.
Use a fresh chat — do not echo prior project aesthetics.
```

---

## Paperclip issue

**Title:** Redesign {Company Name} website prototype

**Description:**
```
Redesign {URL} using the fable-redesign skill (attached).

Deliverables:
- skill-tests/{slug}/index.html
- skill-tests/{slug}/BRIEF.md

Mandatory:
- Phases 0–6 in order
- Existing brand extraction recorded
- Structure roll from scripts/roll.mjs with registry collision check
- Labeled navigation on all breakpoints
- Browser verification before closing issue

Do NOT reuse aesthetics from Al Angham, Delta Shipping, or MHMY unless
the client's brand genuinely matches.
```

**Agent skills:** `fable-redesign`, `agent-browser` (for Phase 6). Optionally add Anthropic’s `frontend-design` (in `skills/frontend-design/` in this repo) for stronger visual-direction guidance during Phases 1–2; fable-redesign still owns phases, rolls, and verification.

---

## Generic agent (minimal)

```
You have the fable-redesign skill. Redesign {URL}.
Output standalone index.html + BRIEF.md.
Extract real brand. Roll unique structure. Verify in browser.
```

---

## Production scope add-on

Append to any template above:

```
Scope: production (Next.js App Router + Tailwind + i18n if bilingual)
Follow references/production-nextjs.md after prototype approval.
Create API routes with corresponding UI for any forms.
```

---

## Paperclip skill import

Company Skills → source field:

```
https://github.com/prabi82/fable-redesign
```

Attach to agent → Skills tab → enable `fable-redesign`.

---

## Testing a new industry pack

```
Test the fable-redesign skill on {URL} ({industry}).
Focus: validate references/industries/{industry}.md pack —
confirm palette, typography, and concept examples fit the client.
Record any pack gaps in BRIEF.md under "Pack feedback".
```

---

## Anti-echoing rule

**One fresh agent session per client.** Never chain multiple redesigns in the
same chat — the model will converge on house style despite skill rules.
