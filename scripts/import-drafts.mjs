#!/usr/bin/env node
/**
 * Import les fichiers .md du dossier drafts/ comme brouillons dans la base de données.
 *
 * Usage :
 *   node scripts/import-drafts.mjs
 *   node scripts/import-drafts.mjs --url https://www.impotscouple.fr   (prod)
 *
 * Format des fichiers .md :
 *   ---
 *   slug: mon-article-2026          (obligatoire, unique, minuscules + tirets)
 *   title: Mon titre                (obligatoire)
 *   description: Résumé court       (obligatoire)
 *   category: Fiscalité             (optionnel, défaut : Fiscalité)
 *   author: ImpotsCouple            (optionnel, défaut : ImpotsCouple)
 *   ---
 *
 *   Contenu markdown ici...
 *
 * Après import, les fichiers traités sont déplacés dans drafts/imported/.
 * Utilisez ensuite le bouton "Générer le planning" dans l'admin pour planifier.
 */

import { readFileSync, readdirSync, mkdirSync, renameSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Lecture de .env.local ────────────────────────────────────────────────────

function readEnv() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) {
    console.error('❌  .env.local introuvable à la racine du projet.');
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const eq = line.indexOf('=');
    if (eq === -1 || line.startsWith('#')) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  }
  return env;
}

// ── Génération du token admin (même algo que le serveur) ─────────────────────

function generateToken(password) {
  return Buffer.from(`${password}:${Date.now()}`).toString('base64');
}

// ── Parser frontmatter YAML minimal ─────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const fm = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    fm[key] = value;
  }

  return { fm, content: match[2].trim() };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const urlFlag = args.indexOf('--url');
  const env = readEnv();

  const password = env.ADMIN_PASSWORD;
  if (!password) {
    console.error('❌  ADMIN_PASSWORD manquant dans .env.local');
    process.exit(1);
  }

  const defaultUrl = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const appUrl = (urlFlag !== -1 ? args[urlFlag + 1] : defaultUrl).replace(/\/$/, '');

  const draftsDir = join(ROOT, 'drafts');
  const importedDir = join(draftsDir, 'imported');
  mkdirSync(importedDir, { recursive: true });

  const files = readdirSync(draftsDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    console.log('Aucun fichier .md dans drafts/ — rien à importer.');
    return;
  }

  console.log(`Cible : ${appUrl}`);
  console.log(`${files.length} fichier(s) trouvé(s)\n`);

  const token = generateToken(password);
  const cookieHeader = `admin_token=${token}`;

  let success = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = join(draftsDir, file);
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(raw);

    if (!parsed) {
      console.log(`⚠️  ${file} : pas de bloc frontmatter --- ignoré`);
      skipped++;
      continue;
    }

    const { fm, content } = parsed;

    const missing = ['slug', 'title', 'description'].filter((k) => !fm[k]);
    if (missing.length > 0) {
      console.log(`⚠️  ${file} : champs manquants (${missing.join(', ')}) — ignoré`);
      skipped++;
      continue;
    }

    if (!content) {
      console.log(`⚠️  ${file} : contenu vide — ignoré`);
      skipped++;
      continue;
    }

    const slugOk = /^[a-z0-9-]+$/.test(fm.slug);
    if (!slugOk) {
      console.log(`⚠️  ${file} : slug "${fm.slug}" invalide (minuscules + tirets uniquement) — ignoré`);
      skipped++;
      continue;
    }

    try {
      const res = await fetch(`${appUrl}/api/admin/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
        body: JSON.stringify({
          slug: fm.slug,
          title: fm.title,
          description: fm.description,
          content,
          category: fm.category || 'Fiscalité',
          author: fm.author || 'ImpotsCouple',
          isDraft: true,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        console.log(`✅  ${file}  →  brouillon créé  (/${fm.slug})`);
        renameSync(filePath, join(importedDir, file));
        success++;
      } else if (res.status === 409) {
        console.log(`⏭️  ${file}  →  slug "${fm.slug}" déjà présent — ignoré`);
        skipped++;
      } else if (res.status === 401) {
        console.error('❌  Authentification refusée — vérifiez ADMIN_PASSWORD dans .env.local');
        process.exit(1);
      } else {
        console.log(`❌  ${file}  →  erreur ${res.status} : ${data.error ?? res.statusText}`);
        errors++;
      }
    } catch (err) {
      console.log(`❌  ${file}  →  erreur réseau : ${err.message}`);
      errors++;
    }
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`  ${success} importé(s)   ${skipped} ignoré(s)   ${errors} erreur(s)`);
  console.log('─────────────────────────────────────────');

  if (success > 0) {
    console.log('\nÉtape suivante → ouvrez l\'admin et cliquez sur "Générer le planning".');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
