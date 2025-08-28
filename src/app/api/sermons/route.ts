import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// GET - Fetch published sermons (no auth required)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'audio' or 'read'
    const year = searchParams.get('year')
    const speaker = searchParams.get('speaker')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50
    
    let query = supabase
      .from('sermons')
      .select('*')
      .eq('is_published', true)
      .order('date', { ascending: false })
    
    // Filter by sermon type if specified
    if (type === 'audio') {
      query = query.not('audio_url', 'is', null)
    } else if (type === 'read') {
      query = query.not('description', 'is', null)
    }
    
    // Filter by year if specified
    if (year) {
      const startDate = `${year}-01-01`
      const endDate = `${year}-12-31`
      query = query.gte('date', startDate).lte('date', endDate)
    }
    
    // Filter by speaker if specified
    if (speaker && speaker !== 'All') {
      query = query.eq('speaker', speaker)
    }
    
    // Apply limit
    query = query.limit(limit)
    
    const { data: sermons, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      // If table doesn't exist, return empty array
      if (error.message.includes('sermons')) {
        return NextResponse.json({ sermons: [] })
      }
      throw error
    }
    
    // Get unique speakers for filters
    const { data: allSermons } = await supabase
      .from('sermons')
      .select('speaker')
      .eq('is_published', true)
    
    const speakers = allSermons 
      ? Array.from(new Set(allSermons.map(s => s.speaker).filter(Boolean)))
      : []
    
    // Get available years for filters
    const { data: dateSermons } = await supabase
      .from('sermons')
      .select('date')
      .eq('is_published', true)
      .order('date', { ascending: false })
    
    const years = dateSermons
      ? Array.from(new Set(dateSermons.map(s => new Date(s.date).getFullYear())))
      : []
    
    return NextResponse.json({ 
      sermons: sermons || [],
      speakers,
      years
    })
  } catch (error) {
    console.error('Failed to fetch sermons:', error)
    return NextResponse.json(
      { sermons: [], speakers: [], years: [] },
      { status: 200 }
    )
  }
}