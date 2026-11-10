#!/usr/bin/env node
// UI guard: fails when patterns that read as generic AI UI, or that break the
// design system / WCAG contrast, grow beyond their cap. Same idea as eslint's
// --max-warnings: caps hold pre-existing debt; lower a cap when you remove
// occurrences (the script tells you), never raise it.
// Rules and rationale: .claude/skills/ui-ux-designer/SKILL.md, CLAUDE.md.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../src", import.meta.url));
const SKIP_DIRS = new Set(["generated"]);
const EXTENSIONS = new Set([".astro", ".tsx", ".ts", ".jsx", ".js"]);

/** @type {{ id: string, why: string, pattern: RegExp, max: number }[]} */
const RULES = [
  {
    id: "low-contrast-text",
    why: "brand tones as text fail WCAG AA: use text-ink / ink-muted / ink-subtle / brand-ink / yellow-ink",
    pattern:
      /(?<![\w-])text-(?:green-primary|green-secondary|green-light|grey-custom|yellow-primary|yellow-secondary)(?![\w-])/g,
    max: 0,
  },
  {
    id: "raw-grays",
    why: "raw Tailwind grays: use ink-* / ui-border / ui-bg tokens",
    pattern:
      /(?<![\w-])(?:text|bg|border|ring|divide|from|via|to|fill|stroke)-(?:gray|slate|zinc|neutral|stone)-\d/g,
    max: 0,
  },
  {
    id: "dark-variant",
    why: "the site has no dark mode",
    pattern: /(?<![\w-])dark:[a-z]/g,
    max: 0,
  },
  {
    id: "tiny-text",
    why: "text below 11px is unreadable on phones: use text-2xs or larger",
    pattern: /text-\[(?:\d|10)px\]/g,
    max: 0,
  },
  {
    id: "font-black",
    why: "IBM Plex ships up to 700: use font-bold",
    pattern: /(?<![\w-])font-(?:black|extrabold)(?![\w-])/g,
    max: 0,
  },
  {
    id: "gradient-text",
    why: "gradient text is a generic AI tell",
    pattern: /(?<![\w-])bg-clip-text(?![\w-])/g,
    max: 0,
  },
  {
    id: "glassmorphism",
    why: "backdrop blur over content: use solid surfaces",
    pattern: /(?<![\w-])backdrop-blur/g,
    max: 0,
  },
  {
    id: "decorative-gradient",
    why: "decorative gradients: solid tokens instead",
    pattern: /(?<![\w-])bg-(?:linear|gradient|radial|conic)-/g,
    max: 0,
  },
  {
    id: "hover-scale",
    why: "scale on hover/press: give feedback with color, border or shadow",
    pattern: /(?<![\w-])(?:hover|group-hover|active|focus):scale-/g,
    max: 0,
  },
  {
    id: "hover-translate",
    why: "lift-on-hover cards are a template tell",
    pattern: /(?<![\w-])(?:hover|group-hover):-?translate-y-/g,
    max: 0,
  },
  {
    id: "transition-all",
    why: "animate specific properties (transition-colors, -shadow, -transform)",
    pattern: /(?<![\w-])transition-all(?![\w-])/g,
    max: 0,
  },
  {
    id: "large-radius",
    why: "use rounded-clinical-sm|md|lg (rounded-full for pills/avatars)",
    pattern: /(?<![\w-])rounded-(?:[tblr]{1,2}-)?(?:xl|2xl|3xl|4xl|\[)/g,
    max: 0,
  },
  {
    id: "heavy-shadow",
    why: "shadow-lg and above only on overlays (modal, drawer, floating buttons)",
    pattern: /(?<![\w-])shadow-(?:lg|xl|2xl)(?![\w-])/g,
    max: 0,
  },
  {
    id: "bounce",
    why: "bouncing elements read as gimmicks",
    pattern: /(?<![\w-])animate-bounce(?![\w-])/g,
    max: 0,
  },
  {
    id: "dark-surface",
    why: "no black backgrounds: use light surfaces (bg-white, bg-ui-bg, brand fills/tints); bg-black/40 scrims behind overlays are allowed",
    pattern: /(?<![\w-])bg-black(?:-custom)?(?![\w-])(?!\/[1-4]\d(?!\d))/g,
    max: 0,
  },
  {
    id: "emoji",
    why: "emojis as icons or decoration: use astro-icon / lucide",
    pattern: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
    max: 0,
  },
];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(path);
    } else if (EXTENSIONS.has(extname(name))) {
      files.push(path);
    }
  }
};
walk(ROOT);

const results = RULES.map((rule) => ({ ...rule, count: 0, hits: [] }));
for (const file of files) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    // Escape hatch for "low-contrast-text" only, when the pair is AA in context
    // (brand tone on black-custom, or 24px+ text). The marker must say why:
    //   "text-yellow-primary", // ui-guard-ok: on black-custom 11.6:1
    const allowsBrandText = /ui-guard-ok:\s*\S/.test(line);
    for (const result of results) {
      if (allowsBrandText && result.id === "low-contrast-text") continue;
      const matches = line.match(result.pattern);
      if (!matches) continue;
      result.count += matches.length;
      result.hits.push(`${relative(process.cwd(), file)}:${index + 1}`);
    }
  });
}

let failed = false;
for (const { id, why, count, max, hits } of results) {
  if (count > max) {
    failed = true;
    console.error(`✖ ${id}: ${count} (max ${max}) — ${why}`);
    for (const hit of hits) console.error(`    ${hit}`);
  } else if (count < max) {
    console.log(`↓ ${id}: ${count} (max ${max}) — lower the cap to ${count} in scripts/check-ui.mjs`);
  }
}

if (failed) {
  console.error("\nUI guard failed. See .claude/skills/ui-ux-designer/SKILL.md");
  process.exit(1);
}
console.log(`UI guard passed (${files.length} files).`);
