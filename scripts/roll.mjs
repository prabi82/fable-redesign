#!/usr/bin/env node
/**
 * Deterministic structure roll for fable-redesign.
 * Usage: node scripts/roll.mjs "Client Name" [--append]
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const AXES = [
  { key: 'hero', offset: 0, n: 7, labels: [
    'full-bleed-low-left', 'typography-only', 'split-text-left',
    'split-visual-left', 'stacked-editorial', 'off-grid-collage', 'data-panel'
  ]},
  { key: 'rhythm', offset: 11, n: 4, labels: [
    'story-first', 'offer-first', 'proof-first', 'single-scroll-narrative'
  ]},
  { key: 'nav', offset: 23, n: 3, labels: [
    'overlay-menu', 'inline-nav', 'sidebar-rail'
  ]},
  { key: 'scene', offset: 37, n: 5, labels: [
    'pinned-crossfade', 'horizontal-gallery', 'scroll-drawn-path',
    'scrollytelling', 'hover-interaction'
  ]},
  { key: 'type', offset: 53, n: 10, labels: [
    'playfair-source', 'dm-serif-dm-sans', 'fraunces-work',
    'syne-plex', 'libre-karla', 'space-grotesk-inter',
    'cormorant-lato', 'outfit-source-serif', 'archivo-bitter', 'instrument-serif-sans'
  ]},
  { key: 'color', offset: 71, n: 6, labels: [
    'monochrome', 'duotone', 'accent-pop', 'tinted-neutral', 'split-tone', 'gradient-restrained'
  ]},
  { key: 'texture', offset: 89, n: 6, labels: [
    'film-grain', 'industry-pattern', 'graded-duotone', 'hairline-grid', 'paper', 'clean'
  ]},
  { key: 'footer', offset: 101, n: 5, labels: [
    'split-contact-nav', 'stacked-editorial', 'map-coordinates', 'dark-inversion', 'minimal'
  ]},
  { key: 'cards', offset: 113, n: 6, labels: [
    'indexed-list', 'asymmetric-bento', 'horizontal-scroll', 'alternating-rows', 'accordion', 'timeline'
  ]},
  { key: 'transition', offset: 127, n: 4, labels: [
    'whitespace-gap', 'overlap-bleed', 'hairline-bridge', 'color-band-swap'
  ]},
];

function seedFromName(name) {
  return [...name].reduce((sum, c) => sum + c.charCodeAt(0), 0);
}

function roll(seed, offset, n) {
  return ((seed + offset) % n + n) % n;
}

function loadRegistry() {
  try {
    const raw = readFileSync(join(ROOT, 'registry.json'), 'utf8');
    return JSON.parse(raw);
  } catch {
    return { version: 1, projects: [] };
  }
}

function getLastN(registry, n = 3) {
  return registry.projects.slice(-n);
}

function hasCollision(pick, key, recent) {
  return recent.some(p => p[key] === pick);
}

function resolveCollisions(seed, recent) {
  const result = {};
  const overrides = [];

  for (const axis of AXES) {
    let pick = roll(seed, axis.offset, axis.n);
    let attempts = 0;
    while (hasCollision(pick, axis.key, recent) && attempts < axis.n) {
      pick = (pick + 1) % axis.n;
      attempts++;
    }
    if (attempts > 0) {
      overrides.push(`${axis.key}: bumped +${attempts} (collision with recent project)`);
    }
    result[axis.key] = pick;
    result[`${axis.key}Label`] = axis.labels[pick];
  }

  return { result, overrides };
}

function main() {
  const args = process.argv.slice(2).filter(a => a !== '--append');
  const append = process.argv.includes('--append');
  const clientName = args.join(' ').trim();

  if (!clientName) {
    console.error('Usage: node scripts/roll.mjs "Client Name" [--append]');
    process.exit(1);
  }

  const seed = seedFromName(clientName);
  const registry = loadRegistry();
  const recent = getLastN(registry);
  const { result, overrides } = resolveCollisions(seed, recent);

  console.log(`Client: ${clientName}`);
  console.log(`Seed: ${seed}`);
  console.log('');
  console.log('Structure roll:');
  for (const axis of AXES) {
    console.log(`  ${axis.key}=${result[axis.key]} (${result[`${axis.key}Label`]})`);
  }
  console.log('');
  console.log('Brief line:');
  const briefLine = `Structure roll: hero=${result.hero}, rhythm=${result.rhythm}, nav=${result.nav}, scene=${result.scene}, type=${result.type}, color=${result.color}, texture=${result.texture}, footer=${result.footer}, cards=${result.cards}, transition=${result.transition}`;
  console.log(briefLine);

  if (overrides.length) {
    console.log('');
    console.log('Overrides:');
    overrides.forEach(o => console.log(`  - ${o}`));
  }

  if (recent.length) {
    console.log('');
    console.log('Compared against last projects:', recent.map(p => p.client).join(', '));
  }

  if (append) {
    registry.projects.push({
      client: clientName,
      date: new Date().toISOString().slice(0, 10),
      industry: 'pending',
      ...Object.fromEntries(AXES.map(a => [a.key, result[a.key]])),
      paletteFamily: 'pending',
      notes: overrides.join('; ') || '',
    });
    writeFileSync(join(ROOT, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');
    console.log('');
    console.log('Appended to registry.json');
  }
}

main();
