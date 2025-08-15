import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test connection and list tables
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .limit(1)
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const hasAnonKey = !!(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_KEY
    
    return NextResponse.json({
      status: 'Connection test',
      supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'NOT SET',
      hasAnonKey,
      hasServiceKey,
      eventsTableAccessible: !eventsError,
      eventsError: eventsError?.message,
      sampleEvent: events?.[0] || null,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'Error',
      error: error?.message || 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
}