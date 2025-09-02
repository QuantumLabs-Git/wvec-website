'use client'

import { motion } from 'framer-motion'
import { FileText, Calendar, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  author?: string
  created_at?: string
  excerpt?: string
  category?: string
  tags?: string[]
  slug?: string
  is_published?: boolean
  featured_image?: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/public/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || [])
        
        // Extract unique categories
        const categorySet = new Set<string>()
        data.articles.forEach((article: Article) => {
          if (article.category) {
            categorySet.add(article.category)
          }
        })
        const uniqueCategories = Array.from(categorySet).sort()
        setCategories(['All', ...uniqueCategories])
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (article.author?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
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
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full smooth-transition ${
                      selectedCategory === category
                        ? 'bg-steel-blue text-white'
                        : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-charcoal/60">Loading articles...</p>
              </div>
            </div>
          ) : filteredArticles.length === 0 ? (
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
                  className="glass-effect rounded-2xl overflow-hidden hover:shadow-xl smooth-transition group"
                >
                  {/* Featured Image */}
                  {article.featured_image && (
                    <Link href={`/articles/${article.slug || article.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.featured_image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                        />
                      </div>
                    </Link>
                  )}
                  
                  <div className="p-8">
                    {article.category && (
                      <div className="mb-4 flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 bg-sage/20 text-charcoal rounded-full text-sm">
                        {article.category}
                      </span>
                      {article.tags?.map(tag => (
                        <span key={tag} className="inline-block px-3 py-1 bg-champagne/30 text-charcoal rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <h2 className="text-2xl font-semibold text-charcoal mb-3 group-hover:text-steel-blue smooth-transition">
                    <Link href={`/articles/${article.slug || article.id}`}>
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
                      {article.created_at && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.created_at).toLocaleDateString('en-GB')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      href={`/articles/${article.slug || article.id}`}
                      className="text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
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