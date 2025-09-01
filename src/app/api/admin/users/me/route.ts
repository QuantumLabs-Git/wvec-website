import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

// GET - Get current user info
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

    // Fetch user from database
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, email, full_name, role, is_active')
      .eq('email', decoded.email)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      // If table doesn't exist or user not found, check old system
      if (error.message.includes('admin_users')) {
        // Check if user is in environment variables (old system)
        const approvedEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
        
        if (approvedEmails.includes(decoded.email)) {
          // Return a mock user for backward compatibility
          return NextResponse.json({
            user: {
              id: decoded.email,
              email: decoded.email,
              full_name: decoded.email.split('@')[0],
              role: decoded.email === 'russell@tyrcars.co.uk' ? 'super_admin' : 'admin',
              is_active: true
            }
          })
        }
      }
      throw error
    }

    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'User not found or inactive' }, { status: 401 })
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}