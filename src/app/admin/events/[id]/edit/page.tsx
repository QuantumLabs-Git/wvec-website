'use client'

import { useState, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, FileText, AlertCircle, Upload, Image, Loader2 } from 'lucide-react'

export default function EditEventPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'general',
    image_url: '',
    isPublished: false,
    isRecurring: false,
    recurrencePattern: 'weekly',
    recurrenceEnd: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/events/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch event')
      }
      
      const data = await response.json()
      const event = data.event
      
      // Format date for input field
      const eventDate = new Date(event.date)
      const formattedDate = eventDate.toISOString().split('T')[0]
      
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: formattedDate,
        time: event.time || '',
        location: event.location || '',
        category: event.category || 'general',
        image_url: event.image_url || '',
        isPublished: event.is_published || false,
        isRecurring: event.is_recurring || false,
        recurrencePattern: event.recurrence_pattern || 'weekly',
        recurrenceEnd: event.recurrence_end ? new Date(event.recurrence_end).toISOString().split('T')[0] : ''
      })
    } catch (err) {
      console.error('Error fetching event:', err)
      setError('Failed to load event')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB limit for images)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploadingImage(true)
    setUploadProgress(0)
    setError('')

    try {
      // Get pre-signed URL from our API
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: `event-${Date.now()}-${file.name}`,
          fileType: file.type,
          fileSize: file.size
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get upload URL')
      }

      const { uploadUrl, publicUrl } = await response.json()

      // Upload file directly to S3
      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(percentComplete)
        }
      })

      // Handle upload completion
      await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve(xhr.response)
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`))
          }
        }
        xhr.onerror = () => reject(new Error('Upload failed'))

        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', file.type)
        xhr.send(file)
      })

      // Update form with the public URL
      setFormData(prev => ({ ...prev, image_url: publicUrl }))

    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploadingImage(false)
      setUploadProgress(0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          category: formData.category,
          image_url: formData.image_url,
          is_published: formData.isPublished,
          is_recurring: formData.isRecurring,
          recurrence_pattern: formData.isRecurring ? formData.recurrencePattern : null,
          recurrence_end: formData.isRecurring ? formData.recurrenceEnd : null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update event')
      }

      router.push('/admin/events')
    } catch (err) {
      console.error('Error updating event:', err)
      setError('Failed to update event. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading event...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/events"
          className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
        <h1 className="text-3xl font-serif text-charcoal">Edit Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-charcoal mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-charcoal mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              <Image className="w-4 h-4 inline mr-2" />
              Event Image
            </label>
            
            <div className="space-y-4">
              {/* Current Image Preview */}
              {formData.image_url && (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={formData.image_url} 
                    alt="Event thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Upload Button */}
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      {formData.image_url ? 'Change Image' : 'Upload Image'}
                    </>
                  )}
                </button>

                {/* Progress Bar */}
                {uploadingImage && (
                  <div className="flex-1 max-w-xs">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-steel-blue h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-charcoal/60 mt-1">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>

              {/* Image URL Input */}
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="Or paste image URL directly"
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-charcoal mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-charcoal mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-charcoal mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            >
              <option value="general">General</option>
              <option value="service">Service</option>
              <option value="bible-study">Bible Study</option>
              <option value="prayer-meeting">Prayer Meeting</option>
              <option value="youth">Youth</option>
              <option value="special">Special Event</option>
            </select>
          </div>

          {/* Recurring Event */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                name="isRecurring"
                checked={formData.isRecurring}
                onChange={handleChange}
                className="w-4 h-4 text-steel-blue rounded focus:ring-steel-blue"
              />
              <label htmlFor="isRecurring" className="ml-2 text-sm font-medium text-charcoal">
                This is a recurring event
              </label>
            </div>

            {formData.isRecurring && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label htmlFor="recurrencePattern" className="block text-sm font-medium text-charcoal mb-2">
                    Recurrence Pattern
                  </label>
                  <select
                    id="recurrencePattern"
                    name="recurrencePattern"
                    value={formData.recurrencePattern}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="recurrenceEnd" className="block text-sm font-medium text-charcoal mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="recurrenceEnd"
                    name="recurrenceEnd"
                    value={formData.recurrenceEnd}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Publish Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-steel-blue rounded focus:ring-steel-blue"
            />
            <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-charcoal">
              Publish this event
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <Link
            href="/admin/events"
            className="px-6 py-2 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 smooth-transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || uploadingImage}
            className="px-6 py-2 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50"
          >
            {saving ? 'Updating...' : 'Update Event'}
          </button>
        </div>
      </form>
    </div>
  )
}