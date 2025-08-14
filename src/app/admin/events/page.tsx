'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, Search } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/events', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId))
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      console.error('Failed to delete event:', error)
      alert('Failed to delete event')
    }
  }

  const togglePublish = async (eventId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`/api/admin/events/${eventId}/publish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isPublished: !currentStatus })
      })

      if (response.ok) {
        setEvents(events.map(event => 
          event.id === eventId 
            ? { ...event, isPublished: !currentStatus }
            : event
        ))
      }
    } catch (error) {
      console.error('Failed to toggle publish status:', error)
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-charcoal mb-2">Events Management</h1>
          <p className="text-charcoal/60">Manage church events and activities</p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-steel-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-teal smooth-transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Event</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
          />
        </div>
      </div>

      {/* Events Table */}
      <div className="glass-effect rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-charcoal/5 border-b border-charcoal/10">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Event</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Date & Time</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Location</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-charcoal">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-charcoal/40">
                    No events found. Create your first event to get started.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-charcoal/5 hover:bg-charcoal/2">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-charcoal">{event.title}</p>
                        <p className="text-sm text-charcoal/60 mt-1">{event.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-charcoal/70">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-charcoal/70 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-charcoal/70">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(event.id, event.isPublished)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.isPublished
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {event.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 text-charcoal/60 hover:text-steel-blue smooth-transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-charcoal/60 hover:text-red-600 smooth-transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}