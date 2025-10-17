import { NextResponse } from 'next/server'
import { getEvents } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client for cleanup operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Use service key if available, otherwise use anon key for cleanup
const supabase = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

async function cleanupElapsedFeaturedEvents() {
  if (!supabase) return

  try {
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().slice(0, 5)

    // Get featured events that have elapsed
    const { data: elapsedEvents } = await supabase
      .from('events')
      .select('id')
      .eq('is_featured', true)
      .or(`date.lt.${todayStr},and(date.eq.${todayStr},time.lt.${currentTime})`)

    if (elapsedEvents && elapsedEvents.length > 0) {
      const ids = elapsedEvents.map(e => e.id)
      await supabase
        .from('events')
        .update({ is_featured: false })
        .in('id', ids)

      console.log(`Cleaned up ${ids.length} elapsed featured events`)
    }
  } catch (error) {
    console.error('Error cleaning up featured events:', error)
  }
}

export async function GET() {
  try {
    // Run cleanup first (non-blocking)
    cleanupElapsedFeaturedEvents()
    // Get all published events
    const events = await getEvents()

    if (!events || events.length === 0) {
      return NextResponse.json({ featuredEvent: null })
    }

    // Get current date and time for comparison
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().slice(0, 5)

    // Filter for featured events that haven't occurred yet
    const featuredEvents = events.filter((event: any) => {
      // Check if event is published and featured
      if (!event.is_published || !event.is_featured) return false

      // Check if event date is in the future
      if (event.date > todayStr) return true

      // If event is today, check if time hasn't passed
      if (event.date === todayStr && event.time > currentTime) return true

      return false
    })

    // If there are featured events, return the nearest one
    if (featuredEvents.length > 0) {
      // Sort by date and time to get the nearest upcoming event
      const sortedFeatured = featuredEvents.sort((a: any, b: any) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }
        return a.time.localeCompare(b.time)
      })

      return NextResponse.json({ featuredEvent: sortedFeatured[0] })
    }

    // If no featured events, get the next upcoming event
    const upcomingEvents = events.filter((event: any) => {
      if (!event.is_published) return false

      // Check if event date is in the future
      if (event.date > todayStr) return true

      // If event is today, check if time hasn't passed
      if (event.date === todayStr && event.time > currentTime) return true

      return false
    })

    if (upcomingEvents.length > 0) {
      // Sort by date and time to get the nearest upcoming event
      const sortedUpcoming = upcomingEvents.sort((a: any, b: any) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date)
        }
        return a.time.localeCompare(b.time)
      })

      return NextResponse.json({ featuredEvent: sortedUpcoming[0] })
    }

    return NextResponse.json({ featuredEvent: null })

  } catch (error) {
    console.error('Failed to fetch featured event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured event' },
      { status: 500 }
    )
  }
}