'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, User, Search } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface WrittenSermon {
  id: string
  title: string
  speaker: string
  date: string
  scripture?: string
  description?: string
  sermon_type?: string
  audio_url?: string
}

export default function ReadSermonsPage() {
  const [sermons, setSermons] = useState<WrittenSermon[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/sermons?type=read')
      const data = await response.json()
      setSermons(data.sermons || [])
    } catch (error) {
      console.error('Failed to fetch sermons:', error)
      setSermons([])
    } finally {
      setLoading(false)
    }
  }

  const formatSermonType = (type?: string) => {
    switch(type) {
      case 'lords-day':
        return "Lord's Day Reading"
      case 'special':
        return 'Special Service'
      default:
        return 'Regular Service'
    }
  }

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sermon.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         (sermon.scripture?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    
    const matchesType = selectedType === 'all' || sermon.sermon_type === selectedType
    
    return matchesSearch && matchesType
  })

  const sermonTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'regular', label: 'Regular Service' },
    { value: 'lords-day', label: "Lord's Day" },
    { value: 'special', label: 'Special Service' }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/sermons"
            className="inline-flex items-center space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition mb-8"
          >
            <BookOpen className="w-5 h-5" />
            <span>Back to Sermons</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Written Sermons
            </h1>
            <p className="text-charcoal/70 text-lg">
              Read sermon notes and transcripts at your own pace
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      {!loading && (
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

              {/* Type Filter */}
              <div className="flex gap-2 flex-wrap items-center">
                <span className="text-sm text-charcoal/60">Type:</span>
                {sermonTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-full smooth-transition ${
                      selectedType === type.value
                        ? 'bg-steel-blue text-white'
                        : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sermons List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-steel-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-charcoal/60">Loading sermons...</p>
            </div>
          ) : filteredSermons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <p className="text-charcoal/50 text-lg">
                {searchTerm || selectedType !== 'all' 
                  ? 'No sermons found matching your search'
                  : 'No written sermons available yet'}
              </p>
              <p className="text-charcoal/40 text-sm mt-2">
                Written sermons will appear here once they are uploaded by the admin.
              </p>
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
                      <h2 className="text-2xl font-semibold text-charcoal mb-2">
                        {sermon.title}
                      </h2>
                      
                      {sermon.scripture && (
                        <p className="text-steel-blue font-medium mb-2">
                          {sermon.scripture}
                        </p>
                      )}
                      
                      {sermon.description && (
                        <p className="text-charcoal/70 mb-4">
                          {sermon.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{sermon.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(sermon.date).toLocaleDateString('en-GB')}</span>
                        </div>
                        {sermon.sermon_type && (
                          <span className="px-3 py-1 bg-champagne/30 rounded-full">
                            {formatSermonType(sermon.sermon_type)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {sermon.description && (
                        <button
                          className="inline-flex items-center gap-2 text-steel-blue hover:text-cyber-teal smooth-transition font-medium"
                        >
                          <BookOpen className="w-5 h-5" />
                          Read Notes
                        </button>
                      )}
                      {sermon.audio_url && (
                        <Link
                          href="/sermons/listen"
                          className="text-charcoal/50 hover:text-steel-blue smooth-transition"
                          title="Audio available"
                        >
                          🎧
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-gradient-to-b from-white to-sage/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-8"
          >
            <p className="text-charcoal/70">
              Written sermon notes and transcripts are provided for selected messages. 
              For audio recordings, please visit the <Link href="/sermons/listen" className="text-steel-blue hover:text-cyber-teal">Listen to Sermons</Link> page.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}