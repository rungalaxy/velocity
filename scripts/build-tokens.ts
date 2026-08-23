#!/usr/bin/env tsx
/**
 * build-tokens.ts
 *
 * Reads JSON design token files and generates src/styles/tokens.css
 * with a Tailwind v4 @theme block. Supports light and dark mode via
 * data-theme attribute.
 *
 * Token references like {color.gray.950} are resolved to var(--color-gray-950).
 *
 * Usage:
 *   npm run build:tokens
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Types ─────────────────────────────────────────────────────────────────────

type RawToken = { $value: string; $type?: string };
type RawTokenTree = { [key: string]: RawTokenTree | RawToken };

// ── Load & flatten token files ────────────────────────────────────────────────

function loadJson(relativePath: string): RawTokenTree {
  const raw = readFileSync(resolve(ROOT, relativePath), 'utf-8');
  return JSON.parse(raw) as RawTokenTree;
}

function flattenTokens(node: RawTokenTree, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === 'object' && '$value' in value) {
      result[path] = String((value as RawToken).$value);
    } else if (value !== null && typeof value === 'object') {
      Object.assign(result, flattenTokens(value as RawTokenTree, path));
    }
  }

  return result;
}

const CORE_FILES = [
  'src/tokens/core/color.json',
  'src/tokens/core/typography.json',
];

const SEMANTIC_SHARED = 'src/tokens/semantic/semantic-shared.json';
const SEMANTIC_TYPO = 'src/tokens/semantic/semantic-typography.json';
const SEMANTIC_LIGHT = 'src/tokens/semantic/semantic-light.json';
const SEMANTIC_DARK = 'src/tokens/semantic/semantic-dark.json';

const coreTokens = CORE_FILES.reduce<Record<string, string>>((acc, file) => {
  return { ...acc, ...flattenTokens(loadJson(file)) };
}, {});

const sharedTokens = flattenTokens(loadJson(SEMANTIC_SHARED));
const typoTokens = flattenTokens(loadJson(SEMANTIC_TYPO));
const lightTokens = flattenTokens(loadJson(SEMANTIC_LIGHT));
const darkTokens = flattenTokens(loadJson(SEMANTIC_DARK));

// ── Reference resolver ────────────────────────────────────────────────────────

// Resolve {token.path} to theme var names (must match CORE_MAPPINGS prefixes).
function resolveValue(value: string): string {
  return value.replace(/\{([^}]+)\}/g, (_, ref: string) => {
    if (ref.startsWith('color.')) {
      return `var(--${ref.replace(/\./g, '-')})`;
    }
    const lh = ref.match(/^font\.lineHeight\.(.+)$/);
    if (lh) return `var(--leading-${lh[1].replace(/\./g, '-')})`;
    const tr = ref.match(/^font\.letterSpacing\.(.+)$/);
    if (tr) return `var(--tracking-${tr[1].replace(/\./g, '-')})`;
    const wt = ref.match(/^font\.weight\.(.+)$/);
    if (wt) return `var(--font-weight-${wt[1].replace(/\./g, '-')})`;
    const sz = ref.match(/^font\.size\.(.+)$/);
    if (sz) return `var(--font-size-${sz[1].replace(/\./g, '-')})`;
    const fam = ref.match(/^font\.family\.(.+)$/);
    if (fam) return `var(--font-${fam[1].replace(/\./g, '-')})`;
    return `var(--${ref.replace(/\./g, '-')})`;
  });
}

// ── Category mapping ──────────────────────────────────────────────────────────

interface Mapping {
  tokenPath: string;
  cssPrefix: string;
  label: string;
}

const CORE_MAPPINGS: Mapping[] = [
  { tokenPath: 'color', cssPrefix: 'color', label: 'Core — Colors' },
  { tokenPath: 'font.family', cssPrefix: 'font', label: 'Core — Font families' },
  { tokenPath: 'font.size', cssPrefix: 'font-size', label: 'Core — Font sizes' },
  { tokenPath: 'font.lineHeight', cssPrefix: 'leading', label: 'Core — Line heights' },
  { tokenPath: 'font.weight', cssPrefix: 'font-weight', label: 'Core — Font weights' },
  { tokenPath: 'font.letterSpacing', cssPrefix: 'tracking', label: 'Core — Letter spacing' },
];


const SEMANTIC_MAPPINGS: Mapping[] = [
  { tokenPath: 'velocity.background', cssPrefix: 'color-background', label: 'Semantic — Background' },
  { tokenPath: 'velocity.surface', cssPrefix: 'color-surface', label: 'Semantic — Surface' },
  { tokenPath: 'velocity.content', cssPrefix: 'color-content', label: 'Semantic — Content' },
  { tokenPath: 'velocity.border', cssPrefix: 'color-border', label: 'Semantic — Border' },
  { tokenPath: 'velocity.accent', cssPrefix: 'color-accent', label: 'Semantic — Accent' },
  { tokenPath: 'velocity.brand', cssPrefix: 'color-brand', label: 'Semantic — Brand' },
  { tokenPath: 'velocity.state', cssPrefix: 'color-state', label: 'Semantic — State' },
  { tokenPath: 'velocity.feedback', cssPrefix: 'color-feedback', label: 'Semantic — Feedback' },
  { tokenPath: 'velocity.elevation', cssPrefix: 'shadow', label: 'Semantic — Elevation' },
  { tokenPath: 'velocity.motion.duration', cssPrefix: 'duration', label: 'Semantic — Duration' },
  { tokenPath: 'velocity.motion.easing', cssPrefix: 'ease', label: 'Semantic — Easing' },
];

const DEFAULT_BRAND = 'velocity';
const EXTRA_BRANDS = ['runticket'] as const;

/** Per-brand font family overrides applied on `[data-brand="…"]`. */
const BRAND_FONT_OVERRIDES: Record<
  string,
  { heading: string; stack: string }
> = {
  runticket: {
    // Inter everywhere (including headings / font-stack)
    heading: 'var(--font-sans)',
    stack: 'var(--font-sans)',
  },
};

function buildBrandFontOverrides(brand: string): string {
  const fonts = BRAND_FONT_OVERRIDES[brand];
  if (!fonts) return '';
  return [
    `  --font-heading: ${fonts.heading};`,
    `  --font-stack: ${fonts.stack};`,
  ].join('\n');
}

function buildSemanticMappings(brand: string): Mapping[] {
  return SEMANTIC_MAPPINGS.map(({ tokenPath, cssPrefix, label }) => ({
    tokenPath: tokenPath.replace(/^velocity\b/, brand),
    cssPrefix,
    label,
  }));
}

// ── Build variable block from tokens + mappings ───────────────────────────────

function buildVariableBlock(
  tokens: Record<string, string>,
  mappings: Mapping[],
  indent = '  '
): string {
  const sections: string[] = [];

  for (const { tokenPath, cssPrefix, label } of mappings) {
    const prefix = tokenPath + '.';
    const entries = Object.entries(tokens).filter(
      ([path]) => path === tokenPath || path.startsWith(prefix)
    );
    if (entries.length === 0) continue;

    const lines = entries.map(([path, value]) => {
      const suffix = path.startsWith(prefix) ? path.slice(prefix.length) : '';
      const varName = suffix
        ? `--${cssPrefix}-${suffix.replace(/\./g, '-')}`
        : `--${cssPrefix}`;
      return `${indent}${varName}: ${resolveValue(value)};`;
    });
    sections.push(`${indent}/* ${label} */\n${lines.join('\n')}`);
  }

  return sections.join('\n\n');
}

// ── Semantic typography → --typography-* + @utility text-* ────────────────────

const TYPO_PREFIX = 'velocity.typography.';

const TYPO_CSS_PROP: Record<string, string> = {
  fontFamily: 'font-family',
  fontSize: 'font-size',
  lineHeight: 'line-height',
  fontWeight: 'font-weight',
  letterSpacing: 'letter-spacing',
};

/** Order of properties inside generated `text-*` utilities */
const TYPO_UTILITY_ORDER = [
  'fontFamily',
  'fontSize',
  'lineHeight',
  'fontWeight',
  'letterSpacing',
] as const;

function collectTypographyRoles(tokens: Record<string, string>): Map<string, Record<string, string>> {
  const roles = new Map<string, Record<string, string>>();
  for (const [path, raw] of Object.entries(tokens)) {
    if (!path.startsWith(TYPO_PREFIX)) continue;
    const rest = path.slice(TYPO_PREFIX.length);
    const firstDot = rest.indexOf('.');
    if (firstDot === -1) continue;
    const role = rest.slice(0, firstDot);
    const prop = rest.slice(firstDot + 1);
    if (!roles.has(role)) roles.set(role, {});
    roles.get(role)![prop] = resolveValue(String(raw));
  }
  return roles;
}

function buildTypographyThemeSection(tokens: Record<string, string>): string {
  const roles = collectTypographyRoles(tokens);
  const lines: string[] = [];
  const sorted = [...roles.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [role, props] of sorted) {
    const safeRole = role.replace(/\./g, '-');
    for (const [propKey, value] of Object.entries(props)) {
      const cssKey = TYPO_CSS_PROP[propKey];
      if (!cssKey) continue;
      lines.push(`  --typography-${safeRole}-${cssKey}: ${value};`);
    }
  }
  if (lines.length === 0) return '';
  return `  /* Semantic — Typography (primitives for text-* utilities) */\n${lines.join('\n')}`;
}

function buildTypographyUtilities(tokens: Record<string, string>): string {
  const roles = collectTypographyRoles(tokens);
  const sorted = [...roles.entries()].sort(([a], [b]) => a.localeCompare(b));
  const blocks: string[] = [];
  for (const [role, props] of sorted) {
    const safeRole = role.replace(/\./g, '-');
    const lines: string[] = [];
    for (const propKey of TYPO_UTILITY_ORDER) {
      const cssKey = TYPO_CSS_PROP[propKey];
      if (!cssKey || props[propKey] === undefined) continue;
      lines.push(`  ${cssKey}: var(--typography-${safeRole}-${cssKey});`);
    }
    blocks.push(`@utility text-${safeRole} {\n${lines.join('\n')}\n}`);
  }
  return blocks.join('\n\n');
}

// ── Build @theme block (core + shared + light default) ──────────────────────────

function buildThemeBlock(): string {
  const allDefault = { ...coreTokens, ...sharedTokens, ...typoTokens, ...lightTokens };
  const coreAndShared = buildVariableBlock(allDefault, CORE_MAPPINGS);
  const semantic = buildVariableBlock(allDefault, buildSemanticMappings(DEFAULT_BRAND));
  const typography = buildTypographyThemeSection(allDefault);

  return [
    coreAndShared,
    semantic,
    typography,
  ]
    .filter(Boolean)
    .join('\n\n');
}

// ── Build [data-theme="dark"] overrides ────────────────────────────────────────

function buildDarkOverrides(brand = DEFAULT_BRAND): string {
  const semantic = buildVariableBlock(
    darkTokens,
    buildSemanticMappings(brand),
    '  ',
  );
  if (brand === DEFAULT_BRAND) return semantic;
  const fonts = buildBrandFontOverrides(brand);
  return [semantic, fonts].filter(Boolean).join('\n\n');
}

function buildBrandLightOverrides(brand: string): string {
  const semantic = buildVariableBlock(
    lightTokens,
    buildSemanticMappings(brand),
    '  ',
  );
  const fonts = buildBrandFontOverrides(brand);
  return [semantic, fonts].filter(Boolean).join('\n\n');
}

// ── Compose CSS ───────────────────────────────────────────────────────────────

const css = `/* =============================================================================
 * tokens.css — AUTO-GENERATED by scripts/build-tokens.ts
 * Do not edit manually. Run \`npm run build:tokens\` to regenerate.
 *
 * Themes: light (default), dark (via data-theme="dark" on html/body)
 * Brands: default velocity (+ optional per-brand overrides via data-brand)
 * ============================================================================= */

@import "tailwindcss";

@theme {
${buildThemeBlock()}

  /* Component — Button shadows */
  --shadow-button-primary: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-success:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-warning:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-danger:   0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
  --shadow-button-neutral:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(0,0,0,0.2);
}

${buildTypographyUtilities({ ...coreTokens, ...sharedTokens, ...typoTokens, ...lightTokens })}

/* Dark theme overrides */
[data-theme="dark"] {
${buildDarkOverrides(DEFAULT_BRAND)}
}
${
  EXTRA_BRANDS.length === 0
    ? ''
    : `
/* Brand overrides (light) */
${EXTRA_BRANDS.map((brand) => `[data-brand="${brand}"] {\n${buildBrandLightOverrides(brand)}\n}`).join('\n\n')}

/* Brand overrides (dark) */
${EXTRA_BRANDS.map((brand) => `[data-brand="${brand}"][data-theme="dark"], [data-theme="dark"][data-brand="${brand}"] {\n${buildDarkOverrides(brand)}\n}`).join('\n\n')}
`
}`;

// ── Write output ──────────────────────────────────────────────────────────────

const outPath = resolve(ROOT, 'src/styles/tokens.css');
mkdirSync(resolve(ROOT, 'src/styles'), { recursive: true });
writeFileSync(outPath, css, 'utf-8');

const tokenCount = Object.keys({ ...coreTokens, ...sharedTokens, ...typoTokens, ...lightTokens }).length;
console.log(`✓ Generated ${outPath}`);
console.log(`  ${tokenCount} tokens (light default + dark overrides)`);