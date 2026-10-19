import en from "../src/locales/en.js";
import fa from "../src/locales/fa.js";
import ps from "../src/locales/ps.js";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (path.endsWith(".jsx")) files.push(path);
  }
})("src");

const keys = new Set(Object.keys(en));
const problems = [];

// 1. The three dictionaries must expose identical key sets.
for (const [name, dict] of [["en", en], ["fa", fa], ["ps", ps]]) {
  const missing = [...keys].filter((k) => !(k in dict));
  const extra = Object.keys(dict).filter((k) => !keys.has(k));
  if (missing.length) problems.push(`${name}.js missing ${missing.length} key(s): ${missing.slice(0, 5).join(" | ")}`);
  if (extra.length) problems.push(`${name}.js has ${extra.length} unknown key(s): ${extra.slice(0, 5).join(" | ")}`);
}

// 2. Every t("...") literal used in components must exist in the dictionaries.
// 3. Any other user-facing English literal (JSX text, alt, aria-label) must be wrapped in t().
const keyProps = new Set(["label", "placeholder", "title", "text", "eyebrow", "description"]);
const usedKeys = new Set();
const untranslated = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");

  for (const m of source.matchAll(/\bt\(\s*("([^"\\]|\\.)*?"|'([^'\\]|\\.)*?'|`([^`\\]|\\.)*?`)\s*\)/g)) {
    usedKeys.add(m[1].slice(1, -1));
  }

  for (const m of source.matchAll(/(?:^|[\s>])(alt|aria-label|aria-placeholder)="([^"{]+)"/g)) {
    if (/[A-Za-z]{3,}/.test(m[2])) untranslated.push(`${file}: ${m[1]}="${m[2]}"`);
  }

  for (const m of source.matchAll(/>\s*([^<>{}\n][^<>{}\n]*?)\s*</g)) {
    const text = m[1].trim();
    if (!/[A-Za-z]{3,}/.test(text)) continue;
    if (/^(Dr\. Khalid|Khan Zadran)$/.test(text)) continue; // hero name kept as two typographic lines in English
    untranslated.push(`${file}: JSX text "${text}"`);
  }
}

for (const key of usedKeys) {
  if (!keys.has(key)) problems.push(`t("${key}") has no dictionary entry`);
}

// 4. Props that are passed to translating components must still be real keys.
for (const file of files) {
  const source = readFileSync(file, "utf8");
  for (const m of source.matchAll(/(\w+)="([^"{]+)"/g)) {
    if (!keyProps.has(m[1])) continue;
    if (!/[A-Za-z]{3,}/.test(m[2])) continue;
    if (!keys.has(m[2])) problems.push(`${file}: ${m[1]}="${m[2]}" is not a translation key`);
  }
}

const all = [...problems, ...untranslated];
if (all.length) {
  console.error(`i18n check FAILED (${all.length} issue(s)):`);
  all.forEach((p) => console.error("  - " + p));
  process.exit(1);
}
console.log(`i18n check passed: ${keys.size} keys in en/fa/ps, ${usedKeys.size} distinct keys referenced, ${files.length} files scanned.`);
