'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, Calendar, User, Book, Clock, FileAudio } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NewSermon() {
  const [formData, setFormData] = useState({
    title: '',
    speaker: 'Pastor David Kay',
    date: new Date().toISOString().split('T')[0],
    scripture: '',
    description: '',
    audio_url: '',
    duration: '',
    sermon_type: 'regular',
    is_published: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/sermons', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create sermon')
      }

      router.push('/admin/sermons')
    } catch (err) {
      setError('Failed to create sermon. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-blue/20 via-white to-sage/20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin/sermons" className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sermons
          </Link>
          
          <h1 className="text-3xl font-serif text-charcoal">Add New Sermon</h1>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-charcoal font-medium mb-2">
                Sermon Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="Enter sermon title"
              />
            </div>

            {/* Speaker */}
            <div>
              <label className="block text-charcoal font-medium mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Speaker *
              </label>
              <input
                type="text"
                name="speaker"
                value={formData.speaker}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="Speaker name"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-charcoal font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
              />
            </div>

            {/* Scripture */}
            <div>
              <label className="block text-charcoal font-medium mb-2">
                <Book className="w-4 h-4 inline mr-2" />
                Scripture Reference
              </label>
              <input
                type="text"
                name="scripture"
                value={formData.scripture}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="e.g., John 3:16-17"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-charcoal font-medium mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="e.g., 45:30"
              />
            </div>

            {/* Sermon Type */}
            <div>
              <label className="block text-charcoal font-medium mb-2">
                Sermon Type
              </label>
              <select
                name="sermon_type"
                value={formData.sermon_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
              >
                <option value="regular">Regular Service</option>
                <option value="lords-day">Lord's Day Reading</option>
                <option value="special">Special Service</option>
              </select>
            </div>

            {/* Audio URL */}
            <div className="md:col-span-2">
              <label className="block text-charcoal font-medium mb-2">
                <FileAudio className="w-4 h-4 inline mr-2" />
                Audio File URL
              </label>
              <input
                type="url"
                name="audio_url"
                value={formData.audio_url}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="https://example.com/sermon.mp3"
              />
              <p className="text-sm text-charcoal/60 mt-1">
                Upload your audio to a service like Dropbox, Google Drive, or S3, and paste the direct link here
              </p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-charcoal font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                placeholder="Brief description of the sermon..."
              />
            </div>

            {/* Publish Status */}
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="w-5 h-5 text-steel-blue rounded focus:ring-2 focus:ring-steel-blue mr-3"
                />
                <span className="text-charcoal font-medium">Publish immediately</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <Link
              href="/admin/sermons"
              className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-steel-blue text-white rounded-lg hover:bg-cyber-teal transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </span>
              ) : (
                'Create Sermon'
              )}
            </button>
          </div>
        </form>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-charcoal mb-3">
            <Upload className="w-5 h-5 inline mr-2" />
            How to Upload Audio Files
          </h3>
          <ol className="space-y-2 text-charcoal/80">
            <li>1. Upload your MP3 file to a cloud storage service (Google Drive, Dropbox, or AWS S3)</li>
            <li>2. Get the direct/public link to the file</li>
            <li>3. Paste the link in the "Audio File URL" field above</li>
            <li>4. Make sure the link is publicly accessible</li>
          </ol>
          <p className="mt-4 text-sm text-charcoal/60">
            Note: For best results, use MP3 files under 50MB compressed at 128kbps or lower.
          </p>
        </div>
      </div>
    </div>
  )
}