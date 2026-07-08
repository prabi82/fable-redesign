# Motion Recipes

Vanilla JS/CSS implementations for each signature scene. Match rolled scene index from structure roll.

**Global easing:** `cubic-bezier(0.32, 0.72, 0, 1)`
**Global duration:** 700ms for UI, 800ms+ for scroll reveals

Always include reduced-motion and mobile degradation.

---

## #0 — Pinned crossfade chapter

Content visible from frame 1. Native scroll + sticky — never hijack wheel.

```html
<section class="pin-scene" id="pin-scene">
  <div class="pin-sticky">
    <div class="pin-beat active" data-beat="0">
      <h2>Beat one headline</h2>
      <p>Content immediately visible.</p>
    </div>
    <div class="pin-beat" data-beat="1">...</div>
    <div class="pin-beat" data-beat="2">...</div>
  </div>
</section>
```

```css
.pin-scene { height: 300vh; position: relative; }
.pin-sticky {
  position: sticky; top: 0; height: 100vh;
  display: grid; place-items: center;
}
.pin-beat {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  opacity: 0; transition: opacity 0.6s var(--ease);
  padding: 2rem;
}
.pin-beat.active { opacity: 1; }
@media (max-width: 767px) {
  .pin-scene { height: auto; }
  .pin-sticky { position: relative; height: auto; }
  .pin-beat { position: relative; opacity: 1; margin-bottom: 3rem; }
}
@media (prefers-reduced-motion: reduce) {
  .pin-scene { height: auto; }
  .pin-sticky { position: relative; height: auto; }
  .pin-beat { position: relative; opacity: 1; }
}
```

```javascript
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;
  const scene = document.getElementById('pin-scene');
  const beats = [...scene.querySelectorAll('.pin-beat')];
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    const progress = 1 - entry.intersectionRatio;
    const idx = Math.min(beats.length - 1, Math.floor(progress * beats.length * 2));
    beats.forEach((b, i) => b.classList.toggle('active', i === idx));
  }, { threshold: Array.from({length: 20}, (_, i) => i / 20) });
  observer.observe(scene.querySelector('.pin-sticky'));
})();
```

---

## #1 — Horizontal scroll gallery

```html
<section class="h-gallery-wrap">
  <div class="h-gallery" role="region" aria-label="Gallery">
    <article class="h-slide">...</article>
    <article class="h-slide">...</article>
  </div>
</section>
```

```css
.h-gallery-wrap { padding: 4rem 0; overflow: hidden; }
.h-gallery {
  display: flex; gap: 1.5rem;
  overflow-x: auto; scroll-snap-type: x mandatory;
  padding: 0 5vw; -webkit-overflow-scrolling: touch;
}
.h-slide {
  flex: 0 0 min(85vw, 480px); scroll-snap-align: start;
}
.h-gallery::-webkit-scrollbar { height: 4px; }
```

Mobile: works natively. Desktop: optional scroll-hint arrow. No wheel hijacking.

---

## #2 — Scroll-drawn line/path

SVG path stroke animated via `stroke-dashoffset` tied to IntersectionObserver progress.

```html
<section class="path-scene">
  <svg viewBox="0 0 400 800" class="path-svg" aria-hidden="true">
    <path id="route" d="M50,50 Q200,200 350,400 T50,750" fill="none"
          stroke="var(--accent)" stroke-width="2"
          stroke-dasharray="1000" stroke-dashoffset="1000"/>
  </svg>
  <ol class="path-steps">...</ol>
</section>
```

```javascript
const path = document.getElementById('route');
const len = path.getTotalLength();
path.style.strokeDasharray = len;
path.style.strokeDashoffset = len;
const obs = new IntersectionObserver(([e]) => {
  const ratio = 1 - e.intersectionRatio;
  path.style.strokeDashoffset = len * Math.max(0, 1 - ratio * 1.5);
}, { threshold: Array.from({length: 30}, (_, i) => i / 30) });
obs.observe(document.querySelector('.path-scene'));
```

Industry use: shipping routes, process timelines, project phases.

---

## #3 — Sticky scrollytelling

Image swaps as text blocks scroll past. First image visible immediately.

```html
<section class="scrolly">
  <div class="scrolly-visual">
    <img src="img-a.jpg" class="scrolly-img active" alt="">
    <img src="img-b.jpg" class="scrolly-img" alt="">
  </div>
  <div class="scrolly-steps">
    <div class="scrolly-step" data-img="0">...</div>
    <div class="scrolly-step" data-img="1">...</div>
  </div>
</section>
```

```css
.scrolly { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.scrolly-visual { position: sticky; top: 10vh; height: 80vh; }
.scrolly-img { position: absolute; inset: 0; object-fit: cover;
  opacity: 0; transition: opacity 0.5s var(--ease); }
.scrolly-img.active { opacity: 1; }
@media (max-width: 767px) {
  .scrolly { grid-template-columns: 1fr; }
  .scrolly-visual { position: relative; height: 50vh; }
}
```

```javascript
const steps = document.querySelectorAll('.scrolly-step');
const imgs = document.querySelectorAll('.scrolly-img');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = e.target.dataset.img;
      imgs.forEach((img, i) => img.classList.toggle('active', i == idx));
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
steps.forEach(s => io.observe(s));
```

---

## #4 — Hover/idle interaction (no pin)

When scene roll = 4, invest in one exceptional micro-interaction:

**Magnetic button:**
```javascript
btn.addEventListener('mousemove', e => {
  const r = btn.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width/2) * 0.15;
  const y = (e.clientY - r.top - r.height/2) * 0.15;
  btn.style.transform = `translate(${x}px,${y}px)`;
});
btn.addEventListener('mouseleave', () => btn.style.transform = '');
```

**Live clock/ticker:** Update DOM every 60s with local timezone (Muscat, etc.)

**Cursor spotlight:** Fixed radial gradient follows pointer on hero only.

Pick ONE. Execute well. Disable under reduced-motion.

---

## Shared utilities

### Scroll reveal (IntersectionObserver)

```javascript
document.querySelectorAll('[data-reveal]').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.8s var(--ease), transform 0.8s var(--ease)';
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      e.target._io.disconnect();
    }
  }).observe(el);
});
```

### Count-up stats

```javascript
function countUp(el, target, duration = 1200) {
  const start = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = Math.round(target * p);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```

## Performance guardrails

- Animate **transform** and **opacity** only
- No `window.addEventListener('scroll')` — IntersectionObserver only
- `backdrop-blur` on fixed nav/overlays only
- `will-change: transform` only during active animation
- Grain/noise: `position: fixed; pointer-events: none; z-index: 50`
