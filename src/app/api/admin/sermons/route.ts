import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// GET - Fetch all sermons
export async function GET(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch sermons from Supabase
    const { data: sermons, error } = await supabase
      .from('sermons')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // If table doesn't exist, return empty array
      if (error.message.includes('sermons')) {
        return NextResponse.json({ sermons: [] })
      }
      throw error
    }

    return NextResponse.json({ sermons: sermons || [] })
  } catch (error) {
    console.error('Failed to fetch sermons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sermons' },
      { status: 500 }
    )
  }
}

// POST - Create new sermon
export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.speaker || !body.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert sermon into Supabase
    const { data, error } = await supabase
      .from('sermons')
      .insert({
        title: body.title,
        speaker: body.speaker,
        date: body.date,
        scripture: body.scripture || null,
        description: body.description || null,
        audio_url: body.audio_url || null,
        duration: body.duration || null,
        sermon_type: body.sermon_type || 'regular',
        is_published: body.is_published || false
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      // If table doesn't exist, provide helpful message
      if (error.message.includes('sermons')) {
        return NextResponse.json(
          { error: 'Sermons table not found. Please create it first using the instructions in SETUP_SERMONS_TABLE.md' },
          { status: 500 }
        )
      }
      throw error
    }

    return NextResponse.json({ sermon: data })
  } catch (error) {
    console.error('Failed to create sermon:', error)
    return NextResponse.json(
      { error: 'Failed to create sermon' },
      { status: 500 }
    )
  }
}