import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// GET - Fetch all admin users (super admin only)
export async function GET(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is super admin
    const { data: currentUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', decoded.email)
      .single()

    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch all admin users
    const { data: users, error } = await supabase
      .from('admin_users')
      .select('id, email, full_name, role, is_active, last_login, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      // If table doesn't exist, return empty array
      if (error.message.includes('admin_users')) {
        return NextResponse.json({ users: [] })
      }
      throw error
    }

    return NextResponse.json({ users: users || [] })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new admin user (super admin only)
export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is super admin
    const { data: currentUser } = await supabase
      .from('admin_users')
      .select('id, role')
      .eq('email', decoded.email)
      .single()

    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.email || !body.password || !body.full_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(body.password, 10)

    // Insert new admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: body.email,
        password_hash: passwordHash,
        full_name: body.full_name,
        role: body.role || 'admin',
        is_active: true,
        created_by: currentUser.id
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      if (error.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        )
      }
      // If table doesn't exist, provide helpful message
      if (error.message.includes('admin_users')) {
        return NextResponse.json(
          { error: 'Admin users table not found. Please create it first using the SQL script.' },
          { status: 500 }
        )
      }
      throw error
    }

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}