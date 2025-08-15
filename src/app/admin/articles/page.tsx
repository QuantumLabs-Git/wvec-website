'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, FileText, Calendar, Eye, EyeOff, Search, Tag } from 'lucide-react'

interface Article {
  id: string
  title: string
  excerpt?: string
  content: string
  category?: string
  author?: string
  slug?: string
  is_published?: boolean
  isPublished?: boolean  // For backwards compatibility
  featured_image?: string
  featuredImage?: string  // For backwards compatibility
  tags?: string[]
  created_at?: string
  createdAt?: string  // For backwards compatibility
  updated_at?: string
  updatedAt?: string  // For backwards compatibility
}

export default function ArticlesManagementPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || [])
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== articleId))
      } else {
        alert('Failed to delete article')
      }
    } catch (error) {
      console.error('Failed to delete article:', error)
      alert('Failed to delete article')
    }
  }

  const togglePublish = async (articleId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_published: !currentStatus })
      })

      if (response.ok) {
        setArticles(articles.map(article => 
          article.id === articleId 
            ? { ...article, is_published: !currentStatus, isPublished: !currentStatus }
            : article
        ))
      }
    } catch (error) {
      console.error('Failed to toggle publish status:', error)
    }
  }

  const categories = [
    'all',
    'theology',
    'bible-study',
    'church-news',
    'testimonies',
    'devotional',
    'missions',
    'youth',
    'family'
  ]

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-charcoal mb-2">Articles Management</h1>
          <p className="text-charcoal/60">Manage blog posts and articles</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-steel-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-teal smooth-transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FileText className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
            <p className="text-charcoal/60">No articles found. Create your first article to get started.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="glass-effect rounded-xl overflow-hidden hover:shadow-lg smooth-transition">
              {(article.featured_image || article.featuredImage) && (
                <div className="h-48 bg-gradient-to-br from-steel-blue/20 to-cyber-teal/20"></div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-steel-blue bg-steel-blue/10 px-2 py-1 rounded">
                    {(article.category || 'general').replace('-', ' ')}
                  </span>
                  <button
                    onClick={() => togglePublish(article.id, article.is_published || article.isPublished || false)}
                    className={`p-1 rounded ${
                      (article.is_published ?? article.isPublished) 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-charcoal/40 hover:bg-charcoal/5'
                    }`}
                    title={(article.is_published ?? article.isPublished) ? 'Published' : 'Draft'}
                  >
                    {(article.is_published ?? article.isPublished) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                
                <h3 className="font-serif text-lg text-charcoal mb-2 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-charcoal/60 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs text-charcoal/50 bg-charcoal/5 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-charcoal/50 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(article.created_at || article.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <span>{article.author}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="flex items-center space-x-1 text-steel-blue hover:text-cyber-teal smooth-transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 smooth-transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}