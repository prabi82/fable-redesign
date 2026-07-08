# Craft Details Library

Premium micro-details that elevate a site — **only when they fit the brand**.
Each detail is a tell if reused across every project. Gate by industry pack + brand audit.

## When to apply

| Detail | Good fit | Poor fit |
|--------|----------|----------|
| Double-bezel cards | Heritage hospitality, luxury real estate | Corporate audit, logistics |
| Island floating nav | Creative agency, hospitality | Institutional finance |
| Ghost numerals | Editorial, heritage, construction | Clinical healthcare |
| Marquee ticker | Logistics, trading, news-heavy | Legal, medical |
| Magnetic buttons | Tech, creative, fitness | Audit, government |

---

## Double-bezel (nested card)

Physical machined hardware feel. Outer shell + inner core with concentric radii.

```html
<div class="bezel-outer">
  <div class="bezel-inner">Content</div>
</div>
```

```css
.bezel-outer {
  padding: 6px; border-radius: 2rem;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
}
.bezel-inner {
  border-radius: calc(2rem - 6px);
  background: var(--bg);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.15);
  overflow: hidden;
}
```

## Island floating nav

Nav as detached glass pill, not edge-glued bar.

```css
.nav-island {
  position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%);
  width: max-content; padding: 0.5rem 1.5rem;
  border-radius: 999px;
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(0,0,0,0.06);
  z-index: 100;
}
```

## Button-in-button (trailing icon)

Arrow nested in its own circle inside the pill button.

```html
<button class="btn-pill">
  <span>Request a quote</span>
  <span class="btn-icon-circle">↗</span>
</button>
```

## Eyebrow tags

Microscopic pill before major headings.

```css
.eyebrow {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 999px;
  border: 1px solid var(--accent);
  margin-bottom: 1rem;
}
```

## Ghost numerals

Oversized faint numbers behind headings.

```css
.ghost-num {
  position: absolute;
  font-size: clamp(8rem, 20vw, 16rem);
  font-weight: 700;
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
```

## Custom selection + progress

```css
::selection { background: var(--accent); color: var(--bg); }
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 2px;
  background: var(--accent); transform-origin: left;
  z-index: 200;
}
```

## Hamburger morph

Lines rotate to X with shared transition — not instant swap.

```css
.hamburger span { transition: transform 0.4s var(--ease), opacity 0.3s; }
.hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
```

## Anti-tell rule

Before applying any craft detail, ask:
1. Does the client's existing brand support this level of ornament?
2. Did the last 3 registry projects use this same detail?
3. Can I explain why THIS client needs it?

If any answer is no, skip it.
