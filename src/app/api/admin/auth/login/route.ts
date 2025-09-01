import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Get user from database
const getUserByEmail = async (email: string) => {
  try {
    // First try to get from Supabase
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('id, email, password_hash, role, is_active')
      .eq('email', email)
      .single()

    if (user && user.is_active) {
      return {
        id: user.id,
        email: user.email,
        password: user.password_hash,
        role: user.role
      }
    }
  } catch (error) {
    console.log('Database not available, falling back to env vars')
  }

  // Fallback to environment variables for backward compatibility
  const approvedEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  
  if (!approvedEmails.includes(email)) {
    return null
  }

  // Check if user has a stored password (would be in database)
  const storedPasswords = global.adminPasswords || {}
  
  // For the default password, we'll use a pre-hashed version of "Password123"
  // This hash is for "Password123"
  const defaultPasswordHash = '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2'
  
  return {
    id: email,
    email,
    password: storedPasswords[email] || defaultPasswordHash,
    role: email === 'russell@tyrcars.co.uk' ? 'super_admin' : 'admin'
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get user from "database"
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Initialize global password storage (in production, use a database)
declare global {
  var adminPasswords: Record<string, string> | undefined
}

if (!global.adminPasswords) {
  global.adminPasswords = {}
}