import { NextResponse } from 'next/server'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db/prisma'
import { isAuthenticated } from '@/lib/admin/auth'

interface ImportedArticle {
  slug: string
  title: string
}

interface ImportError {
  file: string
  reason: string
}

function parseFrontmatter(raw: string): { fm: Record<string, string>; content: string } | null {
  const match = raw.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null

  const fm: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    fm[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
  }
  return { fm, content: match[2].trim() }
}

export async function POST() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const draftsDir = join(process.cwd(), 'drafts')

  let files: string[]
  try {
    files = (await readdir(draftsDir)).filter((f) => f.endsWith('.md')).sort()
  } catch {
    return NextResponse.json(
      { imported: [], skipped: [], errors: [], empty: true },
    )
  }

  if (files.length === 0) {
    return NextResponse.json({ imported: [], skipped: [], errors: [], empty: true })
  }

  const imported: ImportedArticle[] = []
  const skipped: string[] = []
  const errors: ImportError[] = []

  for (const file of files) {
    const raw = await readFile(join(draftsDir, file), 'utf-8')
    const parsed = parseFrontmatter(raw)

    if (!parsed) {
      errors.push({ file, reason: 'Bloc frontmatter --- absent' })
      continue
    }

    const { fm, content } = parsed
    const missing = ['slug', 'title', 'description'].filter((k) => !fm[k])
    if (missing.length > 0) {
      errors.push({ file, reason: `Champs manquants : ${missing.join(', ')}` })
      continue
    }

    if (!content) {
      errors.push({ file, reason: 'Contenu vide' })
      continue
    }

    if (!/^[a-z0-9-]+$/.test(fm.slug)) {
      errors.push({ file, reason: `Slug invalide "${fm.slug}" — minuscules + tirets uniquement` })
      continue
    }

    try {
      await prisma.article.create({
        data: {
          slug: fm.slug,
          title: fm.title,
          description: fm.description,
          content,
          category: fm.category || 'Fiscalité',
          author: fm.author || 'ImpotsCouple',
          isDraft: true,
        },
      })
      imported.push({ slug: fm.slug, title: fm.title })
    } catch (err: unknown) {
      // P2002 = unique constraint violation → slug already exists
      if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'P2002') {
        skipped.push(fm.slug)
      } else {
        errors.push({ file, reason: 'Erreur base de données' })
      }
    }
  }

  if (imported.length > 0) {
    revalidatePath('/admin/articles')
  }

  return NextResponse.json({ imported, skipped, errors, empty: false })
}
