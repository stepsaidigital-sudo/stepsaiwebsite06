// Checks draft subpage copy in content/**.json against the house rules taken
// from the SEO specialist's homepage copy. Exits 1 on any violation.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'content');
const testimonials = JSON.parse(readFileSync(join(root, 'app', 'testimonials.json'), 'utf8'));

// Word stems, so inflections such as "transforms", "unlocking" or
// "supercharged" and spaced or hyphenated forms are caught too.
const banned = ['seamless', 'powerful', 'unlock', 'ai[- ]powered', 'cutting[- ]edge', 'supercharg', 'transform', 'frictionless', 'robust', 'leverag', 'omni[- ]?channel', 'next[- ]generation', 'game[- ]changing'];
const rules = [
  [/—/, 'em dash'],
  [/!/, 'exclamation mark'],
  [/\b(salesforce|stripe)\b/i, 'unsupported integration'],
  [/1 credit\s*=\s*1/i, 'credit equals reply claim'],
  [new RegExp(`\\b(${banned.join('|')})\\w*`, 'i'), 'banned word'],
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.json')) files.push(path);
  }
})(contentDir);

const problems = [];
const strip = text => text.replace(/^[“"]|[”"]$/g, '');
function visit(value, path, file) {
  if (typeof value === 'string') {
    for (const [pattern, why] of rules) if (pattern.test(value)) problems.push(`${file} ${path}: ${why}: ${value}`);
    return;
  }
  if (Array.isArray(value)) return value.forEach((v, i) => visit(v, `${path}[${i}]`, file));
  if (value && typeof value === 'object') {
    if (typeof value.excerpt === 'string' && typeof value.attribution === 'string') {
      const source = testimonials.find(t => t.attribution === value.attribution);
      if (!source) problems.push(`${file} ${path}: unknown testimonial attribution: ${value.attribution}`);
      else if (!strip(source.quote).includes(strip(value.excerpt))) problems.push(`${file} ${path}: excerpt is not an exact part of the supplied quote`);
    }
    for (const [k, v] of Object.entries(value)) visit(v, path ? `${path}.${k}` : k, file);
  }
}

// JSON imports widen string literals, so the type check cannot see these.
const kinds = ['feature', 'channel', 'usecase', 'industry', 'hub', 'pricing', 'content'];
for (const file of files) {
  const data = JSON.parse(readFileSync(file, 'utf8'));
  const name = relative(root, file);
  if (data.status !== 'draft' || data.source !== 'draft, pending specialist copy') problems.push(`${name}: status/source must mark the file as a draft`);
  if (!kinds.includes(data.kind)) problems.push(`${name}: unknown kind: ${data.kind}`);
  visit(data, '', name);
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\nFAIL: ${problems.length} copy rule violation(s) in ${files.length} file(s).`);
  process.exit(1);
}
console.log(`PASS: ${files.length} draft copy file(s) follow the copy rules.`);
