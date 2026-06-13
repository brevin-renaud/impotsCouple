import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db/prisma'
import { isAuthenticated } from '@/lib/admin/auth'

// Returns an array of `count` upcoming Wednesday (3) and Saturday (6) dates at 10:00
function nextWedSatSlots(from: Date, count: number): Date[] {
  const slots: Date[] = []
  const cursor = new Date(from)
  cursor.setHours(10, 0, 0, 0)
  cursor.setDate(cursor.getDate() + 1) // start the day after `from`

  while (slots.length < count) {
    const day = cursor.getDay()
    if (day === 3 || day === 6) {
      slots.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return slots
}

export async function POST() {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const drafts = await prisma.article.findMany({
    where: { isDraft: true },
    orderBy: { createdAt: 'asc' },
    select: { id: true, title: true, slug: true },
  })

  if (drafts.length === 0) {
    return NextResponse.json({ scheduled: [] })
  }

  // Start slots after the latest already-scheduled article to avoid date conflicts
  const latestScheduled = await prisma.article.findFirst({
    where: { isDraft: false, scheduledPublishAt: { not: null } },
    orderBy: { scheduledPublishAt: 'desc' },
    select: { scheduledPublishAt: true },
  })

  const startFrom = latestScheduled?.scheduledPublishAt ?? new Date()
  const slots = nextWedSatSlots(startFrom, drafts.length)

  const scheduled = await prisma.$transaction(
    drafts.map((draft, i) =>
      prisma.article.update({
        where: { id: draft.id },
        data: {
          isDraft: false,
          scheduledPublishAt: slots[i],
          publishedAt: slots[i],
        },
        select: { id: true, title: true, slug: true, scheduledPublishAt: true },
      })
    )
  )

  revalidatePath('/blog')
  revalidatePath('/admin/articles')

  return NextResponse.json({ scheduled })
}
