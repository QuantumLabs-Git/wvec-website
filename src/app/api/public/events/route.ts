import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/db-memory'

export async function GET() {
  try {
    const events = getEvents()
    
    // Filter to only return published events
    const publishedEvents = events.filter((e: any) => e.isPublished)
    
    // Sort by date
    const sortedEvents = publishedEvents.sort((a: any, b: any) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })
    
    return NextResponse.json({ events: sortedEvents })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}