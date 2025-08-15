import { Calendar, User, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticles, getArticle } from '@/lib/supabase'
import { MotionDiv } from '@/components/MotionWrapper'
import ShareButton from '@/components/ShareButton'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getArticleBySlug(slug: string) {
  try {
    // First try to get by slug
    const articles = await getArticles(true)
    let article = articles.find((a: any) => a.slug === slug)
    
    // If not found by slug, try by ID
    if (!article) {
      article = await getArticle(slug)
      // Check if it's published
      if (article && !article.is_published) {
        return null
      }
    }
    
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back Link */}
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>

            {/* Article Header */}
            <h1 className="text-3xl md:text-4xl font-serif text-charcoal mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-charcoal/60">
              {article.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              )}
              {article.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              )}
              {/* Reading time estimate */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(article.content.split(' ').length / 200)} min read</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {article.category && (
                <span className="inline-block px-3 py-1 bg-sage/20 text-charcoal rounded-full text-sm">
                  {article.category}
                </span>
              )}
              {article.tags?.map((tag: string) => (
                <span key={tag} className="inline-block px-3 py-1 bg-champagne/30 text-charcoal rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="glass-effect rounded-xl p-8 mb-12">
              {/* Show excerpt if available */}
              {article.excerpt && (
                <div className="text-lg text-charcoal/70 mb-8 font-medium border-l-4 border-steel-blue pl-4">
                  {article.excerpt}
                </div>
              )}
              
              {/* Show featured image if available */}
              {article.featured_image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src={article.featured_image} 
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              {/* Article content */}
              <div className="article-content text-charcoal/80 leading-relaxed">
                {article.content.split('\n\n').map((paragraph: string, index: number) => {
                  // Check for headers
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold text-charcoal mb-4 mt-6">{paragraph.slice(3)}</h2>
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold text-charcoal mb-3 mt-4">{paragraph.slice(4)}</h3>
                  }
                  // Check for lists
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const items = paragraph.split('\n')
                    return (
                      <ul key={index} className="list-disc list-inside mb-4 space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="ml-4">{item.slice(2)}</li>
                        ))}
                      </ul>
                    )
                  }
                  // Check for quotes
                  if (paragraph.startsWith('> ')) {
                    return (
                      <blockquote key={index} className="border-l-4 border-steel-blue pl-4 italic text-charcoal/70 mb-4">
                        {paragraph.slice(2)}
                      </blockquote>
                    )
                  }
                  // Regular paragraph
                  return <p key={index} className="mb-4">{paragraph}</p>
                })}
              </div>
            </div>

            {/* Share buttons */}
            <div className="text-center py-8">
              <p className="text-charcoal/60 mb-4">Share this article</p>
              <div className="flex justify-center gap-4">
                <ShareButton title={article.title} text={article.excerpt} />
                <Link
                  href="/articles"
                  className="px-4 py-2 border border-steel-blue text-steel-blue rounded-lg hover:bg-steel-blue hover:text-white smooth-transition"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const articles = await getArticles(true) // Get published articles
    return articles.map((article: any) => ({
      slug: article.slug || article.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}