import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// In production, store these in a database
const getUserByEmail = async (email: string) => {
  const approvedEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  
  if (!approvedEmails.includes(email)) {
    return null
  }

  // For demo purposes, we'll use a default password
  // In production, this should be stored in a database
  const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'Password123', 10)
  
  // Check if user has a stored password (would be in database)
  const storedPasswords = global.adminPasswords || {}
  
  return {
    id: email,
    email,
    password: storedPasswords[email] || hashedPassword
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
        email: user.email 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email
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