'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText, Tag, User, Image, Save, Bold, Italic, List, Link2, Quote } from 'lucide-react'

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [articleId, setArticleId] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'theology',
    author: '',
    tags: '',
    featuredImage: '',
    isPublished: false
  })

  useEffect(() => {
    params.then((resolvedParams) => {
      setArticleId(resolvedParams.id)
      fetchArticle(resolvedParams.id)
    })
  }, [])

  const fetchArticle = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/articles/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const article = data.article
        setFormData({
          title: article.title || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          category: article.category || 'theology',
          author: article.author || '',
          tags: article.tags ? article.tags.join(', ') : '',
          featuredImage: article.featured_image || article.featuredImage || '',
          isPublished: article.is_published !== undefined ? article.is_published : (article.isPublished || false)
        })
      } else {
        alert('Failed to load article')
        router.push('/admin/articles')
      }
    } catch (error) {
      console.error('Failed to fetch article:', error)
      alert('Failed to load article')
      router.push('/admin/articles')
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          is_published: formData.isPublished
        })
      })

      if (response.ok) {
        router.push('/admin/articles')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to update article')
      }
    } catch (error) {
      console.error('Failed to update article:', error)
      alert('Failed to update article')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    let newText = ''

    switch (format) {
      case 'bold':
        newText = `**${selectedText}**`
        break
      case 'italic':
        newText = `*${selectedText}*`
        break
      case 'list':
        newText = `\n- ${selectedText}`
        break
      case 'link':
        newText = `[${selectedText}](url)`
        break
      case 'quote':
        newText = `\n> ${selectedText}`
        break
      case 'heading':
        newText = `\n## ${selectedText}`
        break
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
    setFormData(prev => ({ ...prev, content: newContent }))
    
    setTimeout(() => {
      textarea.selectionStart = start + newText.length
      textarea.selectionEnd = start + newText.length
      textarea.focus()
    }, 0)
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/articles"
          className="inline-flex items-center space-x-2 text-charcoal/60 hover:text-steel-blue smooth-transition mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Articles</span>
        </Link>
        <h1 className="text-3xl font-serif text-charcoal mb-2">Edit Article</h1>
        <p className="text-charcoal/60">Update your article or blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-effect rounded-xl p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue text-lg"
                  placeholder="Enter a compelling title..."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
                  placeholder="Brief summary of the article..."
                />
              </div>

              {/* Content with Formatting Toolbar */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Content *
                </label>
                <div className="border border-charcoal/20 rounded-lg overflow-hidden">
                  <div className="bg-charcoal/5 px-4 py-2 flex items-center space-x-2 border-b border-charcoal/10">
                    <button
                      type="button"
                      onClick={() => insertFormatting('bold')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('italic')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('heading')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="Heading"
                    >
                      <span className="font-bold text-sm">H2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('list')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('link')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="Link"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('quote')}
                      className="p-2 hover:bg-charcoal/10 rounded smooth-transition"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-charcoal/40 ml-4">Markdown supported</span>
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={20}
                    className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none font-mono text-sm"
                    placeholder="Write your article content here..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="glass-effect rounded-xl p-6 space-y-6">
              <h3 className="font-semibold text-charcoal">Publish Settings</h3>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 text-steel-blue border-charcoal/20 rounded focus:ring-steel-blue"
                />
                <label htmlFor="isPublished" className="text-sm text-charcoal">
                  Published
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Category *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue appearance-none"
                  >
                    <option value="theology">Theology</option>
                    <option value="bible-study">Bible Study</option>
                    <option value="church-news">Church News</option>
                    <option value="testimonies">Testimonies</option>
                    <option value="devotional">Devotional</option>
                    <option value="missions">Missions</option>
                    <option value="youth">Youth</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Author *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  placeholder="faith, prayer, salvation"
                />
                <p className="text-xs text-charcoal/40 mt-1">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Featured Image URL
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="glass-effect rounded-xl p-6 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-steel-blue text-white py-3 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
              <Link
                href="/admin/articles"
                className="w-full block text-center px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 smooth-transition"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}