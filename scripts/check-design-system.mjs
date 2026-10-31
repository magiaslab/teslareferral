// Controlla che docs/DESIGN-SYSTEM.md citi solo cose che esistono nel codice
// (Magias UI Protocol v0.3, regola G04). Nessuna dipendenza: `npm run check:ds`.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const doc = readFileSync(join(root, 'docs/DESIGN-SYSTEM.md'), 'utf8');
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
const errors = [];

// Token: prima colonna della tabella "Token" → --color-<nome> in @theme.
const tokenSection = doc.split('## Token')[1]?.split('\n## ')[0] ?? '';
for (const row of tokenSection.split('\n').filter((l) => l.startsWith('| `'))) {
  const names = row.split('|')[1].match(/`([^`]+)`/g) ?? [];
  for (const raw of names) {
    const name = raw.slice(1, -1).replace('*', '');
    if (!css.includes(`--color-${name}`)) errors.push(`token "${name}" non definito in global.css`);
  }
}

// Classi tipografiche e di utilità citate come `.nome`.
for (const [, cls] of doc.matchAll(/`\.([a-z][\w-]*)`/g)) {
  if (!css.includes(`.${cls}`)) errors.push(`classe ".${cls}" non trovata in global.css`);
}

// Componenti: nomi in grassetto nella sezione "Componenti" che hanno un file omonimo.
const components = new Set(readdirSync(join(root, 'src/components')).map((f) => f.replace('.astro', '')));
const compSection = doc.split('## Componenti')[1]?.split('\n## ')[0] ?? '';
for (const [, bold] of compSection.matchAll(/^- \*\*([^*]+)\*\*/gm)) {
  for (const name of bold.replace(/:$/, '').split('/').map((s) => s.trim())) {
    if (/^[A-Z][A-Za-z]+$/.test(name) && !components.has(name)) {
      errors.push(`componente "${name}" non esiste in src/components`);
    }
  }
}

// Percorsi di file e pagine citati.
for (const [, ref] of doc.matchAll(/`((?:src|docs|scripts|public)\/[^`\s]+|\/public\/[^`\s]+)`/g)) {
  if (!existsSync(join(root, ref.replace(/^\//, '')))) errors.push(`file "${ref}" non esiste`);
}
for (const [, route] of doc.matchAll(/`\/([a-z][a-z0-9-]*)`/g)) {
  if (!existsSync(join(root, `src/pages/${route}.astro`))) errors.push(`pagina "/${route}" non esiste`);
}

// Effetti di movimento (ML02): ogni data-m="x" citato esiste nel motore, ogni data-m usato
// nel codice è citato nel documento.
const engine = readFileSync(join(root, 'src/scripts/motion/scroll-motion.ts'), 'utf8');
const docEffects = new Set([...doc.matchAll(/`data-m="([a-z]+)"`/g)].map((m) => m[1]));
for (const name of docEffects) {
  if (!engine.includes(`declared('${name}')`)) errors.push(`effetto data-m="${name}" non implementato`);
}
const walk = (dir) =>
  readdirSync(join(root, dir), { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.astro') ? [join(dir, d.name)] : [],
  );
for (const file of walk('src')) {
  const src = readFileSync(join(root, file), 'utf8');
  for (const [, name] of src.matchAll(/data-m(?:=\{[^}]*'|=")([a-z]+)['"]/g)) {
    if (!docEffects.has(name)) errors.push(`effetto data-m="${name}" usato in ${file} ma non documentato`);
  }
}

if (errors.length) {
  console.error(`DESIGN-SYSTEM.md non allineato al codice:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('DESIGN-SYSTEM.md allineato al codice.');
