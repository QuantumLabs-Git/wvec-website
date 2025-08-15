import { NextResponse } from 'next/server'
import { createArticle } from '@/lib/supabase'

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const hasKey = !!(process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    console.log('Test article API - Supabase config:', {
      url: supabaseUrl ? 'SET' : 'NOT SET',
      hasKey
    })
    
    // Try to create a test article
    const testArticle = {
      title: 'Test Article from API',
      content: 'This is test content',
      excerpt: 'Test excerpt',
      category: 'general',
      author: 'System Test',
      is_published: false
    }
    
    const result = await createArticle(testArticle)
    
    return NextResponse.json({ 
      success: true,
      article: result,
      config: {
        supabaseConfigured: !!(supabaseUrl && hasKey)
      }
    })
  } catch (error: any) {
    console.error('Test article creation failed:', error)
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error',
      details: error?.details,
      hint: error?.hint,
      code: error?.code
    }, { status: 500 })
  }
}