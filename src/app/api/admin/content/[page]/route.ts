import { NextRequest, NextResponse } from 'next/server'
import { getPageContent, updatePageContent } from '@/lib/db'
import jwt from 'jsonwebtoken'

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const user = verifyAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  try {
    const content = getPageContent(page)
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Failed to fetch page content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page content' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const user = verifyAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { page } = await params

  try {
    const body = await request.json()
    const updatedContent = updatePageContent(page, body.content)
    return NextResponse.json({ content: updatedContent })
  } catch (error) {
    console.error('Failed to update page content:', error)
    return NextResponse.json(
      { error: 'Failed to update page content' },
      { status: 500 }
    )
  }
}