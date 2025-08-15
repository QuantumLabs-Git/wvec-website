import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/supabase'

export async function GET() {
  try {
    // Debug: Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const hasKey = !!(process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    console.log('Public events API - Supabase config:', {
      url: supabaseUrl ? 'SET' : 'NOT SET',
      hasKey
    })
    
    // Get published events from Supabase
    const events = await getEvents(true)
    
    // Sort by date (already sorted by Supabase, but ensure correct order)
    const sortedEvents = events.sort((a: any, b: any) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })
    
    return NextResponse.json({ 
      events: sortedEvents,
      debug: {
        supabaseConfigured: !!(supabaseUrl && hasKey),
        eventsCount: sortedEvents.length
      }
    })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}