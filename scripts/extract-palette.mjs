#!/usr/bin/env node
/**
 * Sample dominant colors from a logo/image URL.
 * Usage: node scripts/extract-palette.mjs <image-url-or-path>
 *
 * No external dependencies — reads PNG/JPEG dimensions and samples
 * a simplified palette from raw bytes. For production use, install sharp:
 *   npm install sharp
 * and re-run for higher accuracy.
 */

import { readFileSync, existsSync } from 'fs';

const SAMPLE_COUNT = 5;

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function quantize(value, steps = 32) {
  return Math.round(value / steps) * steps;
}

function extractFromBuffer(buf) {
  const colors = new Map();
  const len = buf.length;
  // Sample every Nth byte triplet (rough heuristic for RGB-ish regions in compressed data)
  const step = Math.max(3, Math.floor(len / 8000));
  for (let i = 0; i < len - 2; i += step) {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    // Skip near-white/near-black noise from compression artifacts
    if (r > 250 && g > 250 && b > 250) continue;
    if (r < 5 && g < 5 && b < 5) continue;
    const key = `${quantize(r)},${quantize(g)},${quantize(b)}`;
    colors.set(key, (colors.get(key) || 0) + 1);
  }
  const sorted = [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, SAMPLE_COUNT);
  return sorted.map(([key]) => {
    const [r, g, b] = key.split(',').map(Number);
    return { r, g, b, hex: rgbToHex(r, g, b), lum: luminance(r, g, b) };
  });
}

async function fetchUrl(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, source: url };
}

async function loadInput(input) {
  if (existsSync(input)) {
    return { buf: readFileSync(input), source: input };
  }
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return fetchUrl(input);
  }
  throw new Error(`Not found: ${input}`);
}

function suggestTheme(colors) {
  const avgLum = colors.reduce((s, c) => s + c.lum, 0) / colors.length;
  return avgLum > 140 ? 'light' : avgLum < 80 ? 'dark' : 'hybrid';
}

function buildScale(primary) {
  const scales = [];
  for (let i = 1; i <= 9; i++) {
    const factor = 1 - (i - 1) * 0.1;
    scales.push({
      step: i,
      hex: rgbToHex(
        Math.round(primary.r * factor),
        Math.round(primary.g * factor),
        Math.round(primary.b * factor)
      ),
    });
  }
  return scales;
}

async function trySharp(buf) {
  try {
    const sharp = (await import('sharp')).default;
    const { data, info } = await sharp(buf).resize(64, 64, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true });
    const colors = new Map();
    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = info.channels > 3 ? data[i + 3] : 255;
      if (a < 128) continue;
      if (r > 250 && g > 250 && b > 250) continue;
      const key = `${quantize(r)},${quantize(g)},${quantize(b)}`;
      colors.set(key, (colors.get(key) || 0) + 1);
    }
    const sorted = [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, SAMPLE_COUNT);
    return sorted.map(([key]) => {
      const [r, g, b] = key.split(',').map(Number);
      return { r, g, b, hex: rgbToHex(r, g, b), lum: luminance(r, g, b) };
    });
  } catch {
    return null;
  }
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node scripts/extract-palette.mjs <image-url-or-path>');
    process.exit(1);
  }

  const { buf, source } = await loadInput(input);
  let colors = await trySharp(buf);
  let method = 'sharp';

  if (!colors || colors.length === 0) {
    colors = extractFromBuffer(buf);
    method = 'heuristic (install sharp for accuracy)';
  }

  const primary = colors[0];
  const theme = suggestTheme(colors);
  const scale = buildScale(primary);

  console.log(`Source: ${source}`);
  console.log(`Method: ${method}`);
  console.log('');
  console.log('Dominant colors:');
  colors.forEach((c, i) => console.log(`  ${i + 1}. ${c.hex} (lum ${Math.round(c.lum)})`));
  console.log('');
  console.log(`Suggested theme: ${theme}`);
  console.log('');
  console.log('Primary scale (refine manually):');
  scale.forEach(s => console.log(`  --brand-${s.step}: ${s.hex}`));
  console.log('');
  console.log('Brief line:');
  console.log(`Existing brand: ${colors.slice(0, 3).map(c => c.hex).join(', ')}, ${theme}, type feel TBD from site audit`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
