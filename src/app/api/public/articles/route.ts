import { NextResponse } from 'next/server'
import { getArticles } from '@/lib/supabase'

export async function GET() {
  try {
    // Get published articles from Supabase
    const articles = await getArticles(true)
    
    // Sort by date (newest first)
    const sortedArticles = articles.sort((a: any, b: any) => {
      const dateA = new Date(a.created_at)
      const dateB = new Date(b.created_at)
      return dateB.getTime() - dateA.getTime()
    })
    
    return NextResponse.json({ 
      articles: sortedArticles
    })
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}