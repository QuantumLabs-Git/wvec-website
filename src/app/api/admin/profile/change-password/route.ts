import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    let decoded: { id: string; email: string }

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback-secret-key'
      ) as { id: string; email: string }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current and new passwords are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Get current password hash (in production, from database)
    const storedPasswords = global.adminPasswords || {}
    const defaultHash = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'Password123', 10)
    const currentHash = storedPasswords[decoded.email] || defaultHash

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, currentHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Store new password (in production, save to database)
    if (!global.adminPasswords) {
      global.adminPasswords = {}
    }
    global.adminPasswords[decoded.email] = newPasswordHash

    return NextResponse.json({
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}