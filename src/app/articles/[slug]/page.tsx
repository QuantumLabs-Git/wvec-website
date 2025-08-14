import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { migratedArticles } from '@/lib/content-migration'

interface PageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: PageProps) {
  // Find the article by matching the href
  const article = migratedArticles.find(a => 
    a.href === `/articles/${params.slug}` || 
    a.id === params.slug
  )

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
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
              {article.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('en-GB')}</span>
                </div>
              )}
              {article.series && (
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-steel-blue">{article.series}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <span className="inline-block px-3 py-1 bg-sage/20 text-charcoal rounded-full text-sm">
                {article.category}
              </span>
              {article.series && (
                <span className="inline-block px-3 py-1 bg-champagne/30 text-charcoal rounded-full text-sm">
                  {article.series}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Content Notice */}
            <div className="glass-effect rounded-xl p-8 mb-12">
              <h2 className="text-xl font-semibold text-charcoal mb-4">
                Content Migration Notice
              </h2>
              <p className="text-charcoal/70 mb-4">
                This article was originally published on our previous website. The full content is being migrated 
                to our new platform. In the meantime, you can:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2">
                <li>Contact the church office for a copy of this article</li>
                <li>Visit us during service times to access printed materials</li>
                <li>Check back soon as we continue updating our content</li>
              </ul>
              
              {article.excerpt && (
                <div className="mt-6 p-4 bg-sage/10 rounded-lg">
                  <h3 className="font-semibold text-charcoal mb-2">Summary</h3>
                  <p className="text-charcoal/70">{article.excerpt}</p>
                </div>
              )}
            </div>

            {/* Related Articles */}
            {article.series && (
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-charcoal mb-6">
                  More from {article.series}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {migratedArticles
                    .filter(a => a.series === article.series && a.id !== article.id)
                    .slice(0, 4)
                    .map(related => (
                      <Link
                        key={related.id}
                        href={related.href}
                        className="glass-effect rounded-lg p-4 hover:shadow-md smooth-transition"
                      >
                        <h4 className="font-medium text-charcoal hover:text-steel-blue smooth-transition">
                          {related.title}
                        </h4>
                        <p className="text-sm text-charcoal/60 mt-1">
                          {related.category}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Generate static params for all articles
export async function generateStaticParams() {
  return migratedArticles.map((article) => ({
    slug: article.href.replace('/articles/', '')
  }))
}