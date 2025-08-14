import { NextResponse } from 'next/server'

export async function GET() {
  // Only show in development or for debugging
  const adminEmails = process.env.ADMIN_EMAILS || 'NOT SET'
  const jwtSecretSet = process.env.JWT_SECRET ? 'SET' : 'NOT SET'
  const defaultPasswordSet = process.env.DEFAULT_ADMIN_PASSWORD ? 'SET' : 'NOT SET'
  
  // Parse admin emails to check format
  const emailsList = adminEmails.split(',').map(e => e.trim())
  
  return NextResponse.json({
    message: 'Environment check',
    adminEmails: adminEmails,
    emailsList: emailsList,
    emailsCount: emailsList.length,
    jwtSecretStatus: jwtSecretSet,
    defaultPasswordStatus: defaultPasswordSet,
    // Check if russell email is in the list
    russellIncluded: emailsList.includes('russell@tyrcars.co.uk'),
    // Show first few chars of each to debug spacing
    emailsDebug: emailsList.map(e => ({
      email: e,
      length: e.length,
      firstChar: e[0],
      lastChar: e[e.length - 1]
    }))
  })
}