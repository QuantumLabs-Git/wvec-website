import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// PATCH - Update sermon
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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
    
    // Update sermon in Supabase
    const { data, error } = await supabase
      .from('sermons')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({ sermon: data })
  } catch (error) {
    console.error('Failed to update sermon:', error)
    return NextResponse.json(
      { error: 'Failed to update sermon' },
      { status: 500 }
    )
  }
}

// DELETE - Delete sermon
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
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

    // Delete sermon from Supabase
    const { error } = await supabase
      .from('sermons')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete sermon:', error)
    return NextResponse.json(
      { error: 'Failed to delete sermon' },
      { status: 500 }
    )
  }
}