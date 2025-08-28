'use client'

import { useEffect, useState } from 'react'
import { Calendar, FileText, Edit3, Users, TrendingUp, Clock, Mic } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalEvents: number
  upcomingEvents: number
  totalArticles: number
  recentArticles: number
  lastUpdated: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalArticles: 0,
    recentArticles: 0,
    lastUpdated: new Date().toISOString()
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    }
  }

  const quickActions = [
    {
      title: 'Add New Event',
      description: 'Create a new church event',
      icon: Calendar,
      href: '/admin/events/new',
      color: 'bg-steel-blue'
    },
    {
      title: 'Write Article',
      description: 'Publish a new article',
      icon: FileText,
      href: '/admin/articles/new',
      color: 'bg-sage'
    },
    {
      title: 'Upload Sermon',
      description: 'Add a new sermon recording',
      icon: Mic,
      href: '/admin/sermons/new',
      color: 'bg-deep-navy'
    },
    {
      title: 'Edit Homepage',
      description: 'Update homepage content',
      icon: Edit3,
      href: '/admin/content/homepage',
      color: 'bg-champagne'
    },
    {
      title: 'Change Password',
      description: 'Update your password',
      icon: Users,
      href: '/admin/profile',
      color: 'bg-cyber-teal'
    }
  ]

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'text-steel-blue',
      bgColor: 'bg-steel-blue/10'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: Clock,
      color: 'text-sage',
      bgColor: 'bg-sage/10'
    },
    {
      title: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-champagne',
      bgColor: 'bg-champagne/10'
    },
    {
      title: 'Recent Articles',
      value: stats.recentArticles,
      icon: TrendingUp,
      color: 'text-cyber-teal',
      bgColor: 'bg-cyber-teal/10'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-charcoal mb-2">Admin Dashboard</h1>
        <p className="text-charcoal/60">Welcome to the WVEC Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold text-charcoal">{stat.value}</span>
              </div>
              <h3 className="text-sm font-medium text-charcoal/60">{stat.title}</h3>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-serif text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.title}
                href={action.href}
                className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition group"
              >
                <div className={`w-12 h-12 ${action.color} text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 smooth-transition`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-charcoal mb-1">{action.title}</h3>
                <p className="text-sm text-charcoal/60">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Content Management */}
      <div className="mb-8">
        <h2 className="text-xl font-serif text-charcoal mb-4">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/events"
            className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition"
          >
            <Calendar className="w-8 h-8 text-steel-blue mb-3" />
            <h3 className="font-semibold text-charcoal mb-1">Manage Events</h3>
            <p className="text-sm text-charcoal/60">View and edit all events</p>
          </Link>
          <Link
            href="/admin/articles"
            className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition"
          >
            <FileText className="w-8 h-8 text-sage mb-3" />
            <h3 className="font-semibold text-charcoal mb-1">Manage Articles</h3>
            <p className="text-sm text-charcoal/60">View and edit all articles</p>
          </Link>
          <Link
            href="/admin/sermons"
            className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition"
          >
            <Mic className="w-8 h-8 text-deep-navy mb-3" />
            <h3 className="font-semibold text-charcoal mb-1">Manage Sermons</h3>
            <p className="text-sm text-charcoal/60">View and upload sermons</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-serif text-charcoal mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-charcoal/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-charcoal">System is running normally</span>
            </div>
            <span className="text-xs text-charcoal/40">Just now</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-charcoal/10">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-steel-blue rounded-full"></div>
              <span className="text-sm text-charcoal">Last content update</span>
            </div>
            <span className="text-xs text-charcoal/40">
              {new Date(stats.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}