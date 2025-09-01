'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calendar, Clock, MapPin, Tag, FileText, Save, Repeat, Upload, Image, Loader2 } from 'lucide-react'

export default function NewEventPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: 'Whiddon Valley Evangelical Church',
    category: 'service',
    image_url: '',
    isPublished: false,
    isRecurring: false,
    recurrencePattern: 'weekly',
    recurrenceEndDate: '',
    recurrenceInterval: 1,
    recurrenceDaysOfWeek: [] as string[]
  })

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
    setIsLoading(true)

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/events')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to create event')
      }
    } catch (error) {
      console.error('Failed to create event:', error)
      alert('Failed to create event')
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

  const handleDayOfWeekToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      recurrenceDaysOfWeek: prev.recurrenceDaysOfWeek.includes(day)
        ? prev.recurrenceDaysOfWeek.filter(d => d !== day)
        : [...prev.recurrenceDaysOfWeek, day]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/events"
          className="inline-flex items-center space-x-2 text-charcoal/60 hover:text-steel-blue smooth-transition mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </Link>
        <h1 className="text-3xl font-serif text-charcoal mb-2">Create New Event</h1>
        <p className="text-charcoal/60">Add a new event to the church calendar</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <span className="text-red-600">⚠️</span>
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-effect rounded-xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Event Title *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                placeholder="e.g., Sunday Morning Worship"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-charcoal/40 w-5 h-5" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
                placeholder="Provide details about the event..."
              />
            </div>
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
                  disabled={uploadingImage || isLoading}
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
              <p className="text-sm text-charcoal/60">
                Upload an image to display as the event thumbnail (optional)
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                  placeholder="e.g., 11:00 AM"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                placeholder="Event location"
              />
            </div>
          </div>

          {/* Category */}
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
                <option value="service">Church Service</option>
                <option value="bible-study">Bible Study</option>
                <option value="prayer">Prayer Meeting</option>
                <option value="fellowship">Fellowship</option>
                <option value="special">Special Event</option>
                <option value="conference">Conference</option>
                <option value="youth">Youth Event</option>
                <option value="outreach">Outreach</option>
              </select>
            </div>
          </div>

          {/* Publish Status */}
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
              Publish immediately (make visible on website)
            </label>
          </div>
        </div>

        {/* Recurring Event Section */}
        <div className="glass-effect rounded-xl p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isRecurring"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
              className="w-4 h-4 text-steel-blue border-charcoal/20 rounded focus:ring-steel-blue"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium text-charcoal flex items-center space-x-2">
              <Repeat className="w-4 h-4" />
              <span>Make this a recurring event</span>
            </label>
          </div>

          {formData.isRecurring && (
            <>
              {/* Recurrence Pattern */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Repeat Pattern
                  </label>
                  <select
                    name="recurrencePattern"
                    value={formData.recurrencePattern}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue appearance-none"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Repeat Every
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="recurrenceInterval"
                      value={formData.recurrenceInterval}
                      onChange={handleChange}
                      min="1"
                      max="30"
                      className="w-20 px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                    />
                    <span className="text-sm text-charcoal">
                      {formData.recurrencePattern === 'daily' && 'day(s)'}
                      {formData.recurrencePattern === 'weekly' && 'week(s)'}
                      {formData.recurrencePattern === 'monthly' && 'month(s)'}
                      {formData.recurrencePattern === 'yearly' && 'year(s)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Days of Week (for weekly recurrence) */}
              {formData.recurrencePattern === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Repeat on Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayOfWeekToggle(day.toLowerCase())}
                        className={`px-3 py-1 rounded-lg border smooth-transition ${
                          formData.recurrenceDaysOfWeek.includes(day.toLowerCase())
                            ? 'bg-steel-blue text-white border-steel-blue'
                            : 'border-charcoal/20 text-charcoal hover:border-steel-blue'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  End Recurring On (Optional)
                </label>
                <input
                  type="date"
                  name="recurrenceEndDate"
                  value={formData.recurrenceEndDate}
                  onChange={handleChange}
                  min={formData.date}
                  className="w-full md:w-auto px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
                />
                <p className="text-xs text-charcoal/60 mt-1">
                  Leave empty to continue indefinitely
                </p>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/events"
            className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal/5 smooth-transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-steel-blue text-white px-6 py-3 rounded-lg hover:bg-cyber-teal smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{isLoading ? 'Creating...' : 'Create Event'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}