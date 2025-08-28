'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, Calendar, User, Book, Clock, Upload } from 'lucide-react'
import { motion } from 'framer-motion'

interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  scripture?: string
  description?: string
  audio_url?: string
  duration?: string
  sermon_type: string
  is_published: boolean
}

export default function AdminSermons() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const response = await fetch('/api/admin/sermons', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login')
          return
        }
        throw new Error('Failed to fetch sermons')
      }

      const data = await response.json()
      setSermons(data.sermons || [])
    } catch (err) {
      setError('Failed to load sermons')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sermon?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/sermons/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete sermon')
      }

      setSuccess('Sermon deleted successfully')
      fetchSermons()
    } catch (err) {
      setError('Failed to delete sermon')
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/sermons/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_published: !currentStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update sermon')
      }

      setSuccess('Sermon updated successfully')
      fetchSermons()
    } catch (err) {
      setError('Failed to update sermon')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-steel-blue/20 via-white to-sage/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading sermons...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-blue/20 via-white to-sage/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-steel-blue hover:text-cyber-teal mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif text-charcoal">Manage Sermons</h1>
            <Link
              href="/admin/sermons/new"
              className="inline-flex items-center bg-steel-blue text-white px-6 py-3 rounded-full hover:bg-cyber-teal transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Sermon
            </Link>
          </div>
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

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6"
          >
            {success}
          </motion.div>
        )}

        {sermons.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Upload className="w-16 h-16 text-charcoal/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-charcoal mb-2">No sermons yet</h3>
            <p className="text-charcoal/60 mb-6">Get started by adding your first sermon</p>
            <Link
              href="/admin/sermons/new"
              className="inline-flex items-center bg-steel-blue text-white px-6 py-3 rounded-full hover:bg-cyber-teal transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add First Sermon
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-steel-blue/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Speaker</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Scripture</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-charcoal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sermons.map((sermon) => (
                  <tr key={sermon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-charcoal">{sermon.title}</p>
                        {sermon.duration && (
                          <p className="text-sm text-charcoal/60 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {sermon.duration}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-charcoal/80">
                        <User className="w-4 h-4 mr-2" />
                        {sermon.speaker}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-charcoal/80">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(sermon.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sermon.scripture && (
                        <div className="flex items-center text-charcoal/80">
                          <Book className="w-4 h-4 mr-2" />
                          {sermon.scripture}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-steel-blue/10 text-steel-blue rounded text-sm">
                        {sermon.sermon_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(sermon.id, sermon.is_published)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sermon.is_published 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {sermon.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/sermons/${sermon.id}/edit`}
                          className="p-2 text-steel-blue hover:text-cyber-teal transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(sermon.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}