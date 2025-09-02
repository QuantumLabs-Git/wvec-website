'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, FileText, Tag, User, Image, Save, Bold, Italic, List, Link2, Quote, Upload } from 'lucide-react'

export default function NewArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          author: formData.author,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          featured_image: formData.featuredImage || null,
          is_published: formData.isPublished
        })
      })

      if (response.ok) {
        router.push('/admin/articles')
      } else {
        const error = await response.json()
        console.error('Article creation error:', error)
        alert(error.details || error.message || 'Failed to create article')
      }
    } catch (error) {
      console.error('Failed to create article:', error)
      alert('Failed to create article')
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
      
      // Get pre-signed URL
      const urlResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          uploadType: 'image',
          folder: 'articles'
        })
      })

      if (!urlResponse.ok) {
        const errorData = await urlResponse.json()
        console.error('Upload URL error:', errorData)
        throw new Error(errorData.error || 'Failed to get upload URL')
      }

      const { uploadUrl, fileUrl } = await urlResponse.json()

      // Upload file to S3 using XMLHttpRequest for progress tracking
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            setUploadProgress(progress)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve(xhr.response)
          } else {
            console.error('S3 upload failed with status:', xhr.status)
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('Upload failed')))

        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

      // Update form with S3 URL
      setFormData(prev => ({ ...prev, featuredImage: fileUrl }))
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image')
    } finally {
      setUploadingImage(false)
      setUploadProgress(0)
    }
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
    
    // Reset cursor position
    setTimeout(() => {
      textarea.selectionStart = start + newText.length
      textarea.selectionEnd = start + newText.length
      textarea.focus()
    }, 0)
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
        <h1 className="text-3xl font-serif text-charcoal mb-2">Create New Article</h1>
        <p className="text-charcoal/60">Write and publish a new article or blog post</p>
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
                  placeholder="Brief summary of the article (appears in article listings)..."
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
                    placeholder="Write your article content here... (Markdown formatting supported)"
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
                  Publish immediately
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
                  placeholder="faith, prayer, salvation (comma-separated)"
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
                        <div className="w-5 h-5 border-2 border-steel-blue border-t-transparent rounded-full animate-spin" />
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
                <span>{isLoading ? 'Creating...' : 'Create Article'}</span>
              </button>
              <Link
                href="/admin/articles"
                className="w-full block text-center px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 smooth-transition"
              >
                Cancel
              </Link>
            </div>

            {/* Help Text */}
            <div className="glass-effect rounded-xl p-6">
              <h4 className="text-sm font-semibold text-charcoal mb-3">Formatting Help</h4>
              <div className="space-y-2 text-xs text-charcoal/60">
                <p><code className="bg-charcoal/5 px-1">**bold**</code> → <strong>bold</strong></p>
                <p><code className="bg-charcoal/5 px-1">*italic*</code> → <em>italic</em></p>
                <p><code className="bg-charcoal/5 px-1">## Heading</code> → Heading 2</p>
                <p><code className="bg-charcoal/5 px-1">[text](url)</code> → Link</p>
                <p><code className="bg-charcoal/5 px-1">&gt; quote</code> → Blockquote</p>
                <p><code className="bg-charcoal/5 px-1">- item</code> → List item</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}