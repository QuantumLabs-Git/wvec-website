import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Use service key if available, otherwise use anon key
const supabase = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : createClient(supabaseUrl, supabaseAnonKey)

export async function POST() {
  try {
    // Get current date and time
    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    const currentTime = now.toTimeString().slice(0, 5)

    // First, get all featured events
    const { data: featuredEvents, error: fetchError } = await supabase
      .from('events')
      .select('id, date, time, title')
      .eq('is_featured', true)

    if (fetchError) {
      console.error('Error fetching featured events:', fetchError)
      return NextResponse.json(
        { error: 'Failed to fetch featured events' },
        { status: 500 }
      )
    }

    if (!featuredEvents || featuredEvents.length === 0) {
      return NextResponse.json({
        message: 'No featured events to clean up',
        cleanedCount: 0
      })
    }

    // Filter for events that have already elapsed
    const elapsedEventIds = featuredEvents
      .filter(event => {
        // Event is in the past
        if (event.date < todayStr) return true

        // Event is today but time has passed
        if (event.date === todayStr && event.time < currentTime) return true

        return false
      })
      .map(event => event.id)

    if (elapsedEventIds.length === 0) {
      return NextResponse.json({
        message: 'No elapsed featured events to clean up',
        cleanedCount: 0
      })
    }

    // Update elapsed events to remove featured status
    const { error: updateError } = await supabase
      .from('events')
      .update({ is_featured: false })
      .in('id', elapsedEventIds)

    if (updateError) {
      console.error('Error updating featured events:', updateError)
      return NextResponse.json(
        { error: 'Failed to update featured events' },
        { status: 500 }
      )
    }

    console.log(`Cleaned up ${elapsedEventIds.length} elapsed featured events`)

    return NextResponse.json({
      message: `Successfully cleaned up ${elapsedEventIds.length} elapsed featured events`,
      cleanedCount: elapsedEventIds.length,
      cleanedEventIds: elapsedEventIds
    })

  } catch (error) {
    console.error('Unexpected error in cleanup:', error)
    return NextResponse.json(
      { error: 'Failed to clean up featured events' },
      { status: 500 }
    )
  }
}

// GET endpoint for manual testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to clean up elapsed featured events',
    info: 'This endpoint removes the featured flag from events that have already occurred'
  })
}