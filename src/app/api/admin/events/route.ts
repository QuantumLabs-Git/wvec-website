import { NextRequest, NextResponse } from 'next/server'
import { getEvents, createEvent } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

// Middleware to verify admin token
const verifyAdmin = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key')
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = verifyAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('Fetching events from Supabase...')
    const events = await getEvents()
    console.log('Events fetched:', events?.length || 0)
    return NextResponse.json({ events })
  } catch (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const user = verifyAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const newEvent = await createEvent(body)
    return NextResponse.json({ event: newEvent })
  } catch (error: any) {
    console.error('Failed to create event:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create event',
        details: error?.message || 'Unknown error',
        hint: error?.hint
      },
      { status: 500 }
    )
  }
}