# fable-redesign

Agent skill for redesigning existing client websites into modern, award-tier web experiences.

## What it does

`fable-redesign` teaches an AI agent to:

1. **Research** the client's real site and extract their existing brand
2. **Derive** a unique design direction (not a template)
3. **Roll** structural variation per client (hero, nav, rhythm, signature scene)
4. **Build** a token-based design system and editorial layout
5. **Verify** the result in a browser before declaring done

Works for any industry. Enforces anti-template and anti-house-style rules so each output looks like the client, not like your last project.

## Install

### Cursor

Copy or symlink into your skills folder:

```
~/.cursor/skills/fable-redesign/
```

Or clone this repo and point Cursor at it.

### Paperclip

In the company **Skills** page, paste the source URL:

```
https://github.com/prabi82/fable-redesign
```

Then attach `fable-redesign` to your redesign agent on the **Skills** tab.

### skills.sh

```
npx skills add prabi82/fable-redesign
```

## Usage

Assign a task that matches the skill routing:

```
Redesign https://example.com using the fable-redesign skill.
Output: skill-tests/example/
Deliver: index.html + BRIEF.md
Follow Phases 0–6. Browser-verify before done.
```

## Structure

```
fable-redesign/
├── SKILL.md    # Main skill instructions (required)
└── README.md   # This file
```

## License

MIT
