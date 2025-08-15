'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calendar, Clock, MapPin, Tag, FileText, Save, Repeat } from 'lucide-react'

export default function NewEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: 'Whiddon Valley Evangelical Church',
    category: 'service',
    isPublished: false,
    isRecurring: false,
    recurrencePattern: 'weekly',
    recurrenceEndDate: '',
    recurrenceInterval: 1,
    recurrenceDaysOfWeek: [] as string[]
  })

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