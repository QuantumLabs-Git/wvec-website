'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface WrittenSermon {
  id: string
  title: string
  speaker: string
  date: string
  scripture?: string
  series?: string
  excerpt: string
  href: string
}

// Placeholder sermons - these would come from your CMS or database
const sermons: WrittenSermon[] = [
  {
    id: '1',
    title: 'The Glory of Christ',
    speaker: 'Pastor David Kay',
    date: '2024-03-10',
    scripture: 'John 1:1-14',
    series: 'The Gospel of John',
    excerpt: 'An exposition of the prologue to John\'s Gospel, exploring the eternal nature and divine glory of Christ.',
    href: '/sermons/read/glory-of-christ'
  },
  {
    id: '2',
    title: 'Justification by Faith Alone',
    speaker: 'Pastor David Kay',
    date: '2024-03-03',
    scripture: 'Romans 3:21-26',
    series: 'Romans',
    excerpt: 'A detailed examination of the doctrine of justification and its central importance to the Gospel.',
    href: '/sermons/read/justification-by-faith'
  },
  {
    id: '3',
    title: 'The Sufficiency of Scripture',
    speaker: 'Elder John Smith',
    date: '2024-02-25',
    scripture: '2 Timothy 3:16-17',
    series: 'Pastoral Epistles',
    excerpt: 'Why the Bible is sufficient for all matters of faith and practice in the Christian life.',
    href: '/sermons/read/sufficiency-of-scripture'
  }
]

export default function ReadSermonsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)

  const allSeries = Array.from(new Set(sermons.filter(s => s.series).map(s => s.series!))).sort()

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sermon.scripture?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesSeries = !selectedSeries || sermon.series === selectedSeries
    return matchesSearch && matchesSeries
  })

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Written Sermons
            </h1>
            <p className="text-charcoal/70 text-lg">
              Read and study sermon transcripts at your own pace
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-sage/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sermons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-sage/30 focus:outline-none focus:border-steel-blue smooth-transition"
                />
              </div>
            </div>

            {/* Series Filter */}
            {allSeries.length > 0 && (
              <div className="flex gap-2 flex-wrap items-center">
                <span className="text-sm text-charcoal/60">Series:</span>
                <button
                  onClick={() => setSelectedSeries(null)}
                  className={`px-4 py-2 rounded-full smooth-transition ${
                    !selectedSeries
                      ? 'bg-steel-blue text-white'
                      : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                  }`}
                >
                  All
                </button>
                {allSeries.map(series => (
                  <button
                    key={series}
                    onClick={() => setSelectedSeries(series)}
                    className={`px-4 py-2 rounded-full smooth-transition ${
                      selectedSeries === series
                        ? 'bg-steel-blue text-white'
                        : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                    }`}
                  >
                    {series}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {filteredSermons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <p className="text-charcoal/50 text-lg">No sermons found matching your search</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {filteredSermons.map((sermon, index) => (
                <motion.article
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8 hover:shadow-xl smooth-transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-charcoal mb-2 hover:text-steel-blue smooth-transition">
                        <Link href={sermon.href}>
                          {sermon.title}
                        </Link>
                      </h2>
                      
                      {sermon.scripture && (
                        <p className="text-steel-blue font-medium mb-2">
                          {sermon.scripture}
                        </p>
                      )}
                      
                      <p className="text-charcoal/70 mb-4">
                        {sermon.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{sermon.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(sermon.date).toLocaleDateString('en-GB')}</span>
                        </div>
                        {sermon.series && (
                          <span className="px-3 py-1 bg-champagne/30 rounded-full">
                            {sermon.series}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Link
                        href={sermon.href}
                        className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                      >
                        <BookOpen className="w-5 h-5" />
                        Read Sermon
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Sermons */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/sermons"
            className="text-steel-blue hover:text-cyber-teal smooth-transition"
          >
            ← Back to all sermons
          </Link>
        </div>
      </section>
    </div>
  )
}