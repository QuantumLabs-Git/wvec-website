'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText, Tag, User, Image, Save, Upload, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { handleImageUpload as uploadImage } from '@/components/ImageUploadHandler'

// Load RichTextEditor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-charcoal/5 rounded-lg animate-pulse" />
})

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB max for images)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setUploadingImage(true)
    setUploadProgress(0)

    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Use the new upload handler that falls back to Supabase
      const publicUrl = await uploadImage(
        file,
        token,
        (progress) => setUploadProgress(progress)
      )

      // Update form with the public URL
      setFormData(prev => ({ ...prev, featuredImage: publicUrl }))
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      alert(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setUploadingImage(false)
      setUploadProgress(0)
    }
  }

  const handleContentChange = (newContent: string) => {
    setFormData(prev => ({ ...prev, content: newContent }))
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

              {/* Rich Text Content Editor */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Content *
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your article content here..."
                />
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
                  Featured Image
                </label>
                
                {/* Upload Button */}
                <div className="mb-3">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-dashed border-charcoal/20 rounded-lg hover:border-steel-blue cursor-pointer smooth-transition"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-5 h-5 text-steel-blue animate-spin" />
                        <span className="text-sm text-charcoal">Uploading... {uploadProgress}%</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-charcoal/40" />
                        <span className="text-sm text-charcoal">Upload Image</span>
                      </>
                    )}
                  </label>
                  <p className="text-xs text-charcoal/40 mt-1">Max 5MB, JPG/PNG</p>
                </div>

                {/* Progress Bar */}
                {uploadingImage && (
                  <div className="mb-3">
                    <div className="w-full bg-charcoal/10 rounded-full h-2">
                      <div 
                        className="bg-steel-blue h-2 rounded-full smooth-transition"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Image Preview */}
                {formData.featuredImage && (
                  <div className="mb-3">
                    <img 
                      src={formData.featuredImage} 
                      alt="Featured" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="text-xs text-red-600 hover:text-red-700 mt-1"
                    >
                      Remove image
                    </button>
                  </div>
                )}

                {/* Manual URL Input */}
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue text-sm"
                    placeholder="Or enter image URL"
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