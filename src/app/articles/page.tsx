'use client'

import { motion } from 'framer-motion'
import { FileText, Calendar, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { migratedArticles, getArticlesBySeries } from '@/lib/content-migration'

interface Article {
  id: string
  title: string
  author?: string
  date?: string
  excerpt?: string
  category: string
  series?: string
  href: string
}

// Combine migrated articles with any new articles
const articles: Article[] = [
  ...migratedArticles.map(article => ({
    ...article,
    author: article.author || 'WVEC',
    excerpt: article.excerpt || `Part of the ${article.series || article.category} series`
  })),
  // Add any new articles here
  {
    id: 'new-1',
    title: 'The Authority of Scripture',
    author: 'Pastor David Kay',
    date: '2024-03-15',
    excerpt: 'An exploration of why we believe in the full and verbal inspiration of the Old and New Testament Scriptures as the infallible Word of God.',
    category: 'Doctrine',
    href: '/articles/authority-of-scripture'
  },
  {
    id: 'new-2',
    title: 'Understanding the Doctrines of Grace',
    author: 'Elder John Smith',
    date: '2024-03-01',
    excerpt: 'A clear explanation of the five points of Calvinism and their biblical foundation, helping believers understand God\'s sovereign grace.',
    category: 'Doctrine',
    href: '/articles/doctrines-of-grace'
  },
  {
    id: 'new-3',
    title: 'The Importance of Family Worship',
    author: 'Pastor David Kay',
    date: '2024-02-20',
    excerpt: 'Practical guidance on establishing and maintaining family worship in the home, with suggested patterns and resources.',
    category: 'Christian Living',
    href: '/articles/family-worship'
  },
  {
    id: 'new-4',
    title: 'What is a Reformed Baptist Church?',
    author: 'Church Leadership',
    date: '2024-02-10',
    excerpt: 'An introduction to Reformed Baptist distinctives, including our confession of faith and church practices.',
    category: 'Church Life',
    href: '/articles/reformed-baptist-church'
  }
]

// Get unique categories from all articles
const allCategories = Array.from(new Set(articles.map(a => a.category))).sort()
const categories = ['All', ...allCategories]

// Get unique series
const allSeries = Array.from(new Set(articles.filter(a => a.series).map(a => a.series!))).sort()

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (article.author?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (article.series?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    const matchesSeries = !selectedSeries || article.series === selectedSeries
    return matchesSearch && matchesCategory && matchesSeries
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Articles
            </h1>
            <p className="text-charcoal/70 text-lg">
              Exploring God's Word and its application to our lives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-sage/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4">
              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category)
                      setSelectedSeries(null)
                    }}
                    className={`px-4 py-2 rounded-full smooth-transition ${
                      selectedCategory === category && !selectedSeries
                        ? 'bg-steel-blue text-white'
                        : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Series Filter - Show only if there are series */}
              {allSeries.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  <span className="text-sm text-charcoal/60 self-center mr-2">Series:</span>
                  {allSeries.map(series => (
                    <button
                      key={series}
                      onClick={() => {
                        setSelectedSeries(series)
                        setSelectedCategory('All')
                      }}
                      className={`px-3 py-1.5 text-sm rounded-full smooth-transition ${
                        selectedSeries === series
                          ? 'bg-cyber-teal text-white'
                          : 'bg-champagne/30 text-charcoal hover:bg-champagne/50'
                      }`}
                    >
                      {series} ({articles.filter(a => a.series === series).length})
                    </button>
                  ))}
                  {selectedSeries && (
                    <button
                      onClick={() => setSelectedSeries(null)}
                      className="px-3 py-1.5 text-sm rounded-full bg-charcoal/10 text-charcoal hover:bg-charcoal/20 smooth-transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FileText className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <p className="text-charcoal/50 text-lg">No articles found matching your search</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8 hover:shadow-xl smooth-transition group"
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 bg-sage/20 text-charcoal rounded-full text-sm">
                      {article.category}
                    </span>
                    {article.series && (
                      <span className="inline-block px-3 py-1 bg-champagne/30 text-charcoal rounded-full text-sm">
                        {article.series}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-charcoal mb-3 group-hover:text-steel-blue smooth-transition">
                    <Link href={article.href}>
                      {article.title}
                    </Link>
                  </h2>
                  
                  <p className="text-charcoal/70 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-charcoal/60">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      {article.date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('en-GB')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      href={article.href}
                      className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note about articles */}
      <section className="py-12 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Contributing Articles
            </h3>
            <p className="text-charcoal/70">
              If you would like to contribute an article or have a topic you'd like to see addressed, 
              please contact the church office.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}