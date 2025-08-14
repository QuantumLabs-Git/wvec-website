import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/supabase'

export async function GET() {
  try {
    // Get published events from Supabase
    const events = await getEvents(true)
    
    // Sort by date (already sorted by Supabase, but ensure correct order)
    const sortedEvents = events.sort((a: any, b: any) => {
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