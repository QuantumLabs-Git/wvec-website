'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Download, Calendar, User, Clock, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface Sermon {
  id: string
  title: string
  speaker: string
  date: string
  duration?: string
  scripture?: string
  audio_url?: string
  description?: string
  sermon_type?: string
}

export default function ListenPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [availableSpeakers, setAvailableSpeakers] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedSpeaker, setSelectedSpeaker] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<{ [key: string]: number }>({})
  const [duration, setDuration] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  useEffect(() => {
    fetchSermons()
  }, [selectedYear, selectedSpeaker])

  const fetchSermons = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        type: 'audio',
        ...(selectedYear && { year: selectedYear }),
        ...(selectedSpeaker !== 'All' && { speaker: selectedSpeaker })
      })
      
      const response = await fetch(`/api/sermons?${params}`)
      const data = await response.json()
      
      setSermons(data.sermons || [])
      
      // Set available filters
      if (!selectedYear && data.years?.length > 0) {
        setSelectedYear(data.years[0].toString())
      }
      setAvailableYears(data.years || [])
      setAvailableSpeakers(data.speakers || [])
    } catch (error) {
      console.error('Failed to fetch sermons:', error)
      setSermons([])
    } finally {
      setLoading(false)
    }
  }

  const handlePlayPause = (sermonId: string) => {
    const audio = audioRefs.current[sermonId]
    
    if (!audio) return

    if (playingId === sermonId) {
      audio.pause()
      setPlayingId(null)
    } else {
      // Pause any currently playing audio
      if (playingId && audioRefs.current[playingId]) {
        audioRefs.current[playingId].pause()
      }
      
      audio.play()
      setPlayingId(sermonId)
    }
  }

  const handleTimeUpdate = (sermonId: string, time: number) => {
    setCurrentTime(prev => ({ ...prev, [sermonId]: time }))
  }

  const handleLoadedMetadata = (sermonId: string, dur: number) => {
    setDuration(prev => ({ ...prev, [sermonId]: dur }))
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
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

  useEffect(() => {
    // Cleanup function to pause audio when component unmounts
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) audio.pause()
      })
    }
  }, [])

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-ivory to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/sermons"
            className="inline-flex items-center space-x-2 text-charcoal/70 hover:text-steel-blue smooth-transition mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Sermons</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">
              Listen to Sermons
            </h1>
            <p className="text-charcoal/70 text-lg">
              Audio recordings of messages from our services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      {!loading && (availableYears.length > 0 || availableSpeakers.length > 0) && (
        <section className="py-8 bg-white border-b border-sage/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              {availableYears.length > 0 && (
                <div className="flex items-center space-x-4">
                  <label className="text-charcoal font-medium">Year:</label>
                  <div className="flex gap-2">
                    {availableYears.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year.toString())}
                        className={`px-4 py-2 rounded-full smooth-transition ${
                          selectedYear === year.toString()
                            ? 'bg-steel-blue text-white'
                            : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {availableSpeakers.length > 1 && (
                <div className="flex items-center space-x-4">
                  <label className="text-charcoal font-medium">Speaker:</label>
                  <select
                    value={selectedSpeaker}
                    onChange={(e) => setSelectedSpeaker(e.target.value)}
                    className="px-4 py-2 rounded-full border border-sage/30 focus:outline-none focus:border-steel-blue"
                  >
                    <option value="All">All Speakers</option>
                    {availableSpeakers.map(speaker => (
                      <option key={speaker} value={speaker}>{speaker}</option>
                    ))}
                  </select>
                </div>
              )}
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
          ) : sermons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-charcoal/50 text-lg">No sermons found for the selected filters</p>
              <p className="text-charcoal/40 text-sm mt-2">
                Audio sermons will appear here once they are uploaded by the admin.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {sermons.map((sermon, index) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 hover:shadow-lg smooth-transition"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-charcoal mb-2">
                          {sermon.title}
                        </h3>
                        {sermon.scripture && (
                          <p className="text-steel-blue font-medium mb-3">
                            {sermon.scripture}
                          </p>
                        )}
                        {sermon.description && (
                          <p className="text-charcoal/60 mb-3">
                            {sermon.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-charcoal/60">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{sermon.speaker}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(sermon.date).toLocaleDateString('en-GB')}</span>
                          </div>
                          {sermon.duration && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{sermon.duration}</span>
                            </div>
                          )}
                          {sermon.sermon_type && (
                            <span className="px-2 py-1 bg-champagne/30 rounded-full text-xs">
                              {formatSermonType(sermon.sermon_type)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        {sermon.audio_url ? (
                          <>
                            <button 
                              onClick={() => handlePlayPause(sermon.id)}
                              className="flex items-center space-x-2 bg-steel-blue text-white px-4 py-2 rounded-full hover:bg-cyber-teal smooth-transition"
                            >
                              {playingId === sermon.id ? (
                                <><Pause className="w-4 h-4" /><span>Pause</span></>
                              ) : (
                                <><Play className="w-4 h-4" /><span>Play</span></>
                              )}
                            </button>
                            <a 
                              href={sermon.audio_url}
                              download
                              className="flex items-center space-x-2 text-charcoal/60 hover:text-steel-blue smooth-transition"
                              title="Download Audio"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                          </>
                        ) : (
                          <span className="text-charcoal/40 text-sm">Audio not available</span>
                        )}
                      </div>
                    </div>

                    {/* Audio Player */}
                    {sermon.audio_url && (
                      <>
                        <audio
                          ref={el => {
                            if (el) audioRefs.current[sermon.id] = el
                          }}
                          src={sermon.audio_url}
                          onTimeUpdate={(e) => handleTimeUpdate(sermon.id, e.currentTarget.currentTime)}
                          onLoadedMetadata={(e) => handleLoadedMetadata(sermon.id, e.currentTarget.duration)}
                          onEnded={() => setPlayingId(null)}
                        />
                        
                        {/* Progress Bar */}
                        {playingId === sermon.id && (
                          <div className="w-full">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-charcoal/60">
                                {formatTime(currentTime[sermon.id] || 0)}
                              </span>
                              <div className="flex-1 h-2 bg-sage/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-steel-blue smooth-transition"
                                  style={{ 
                                    width: `${duration[sermon.id] ? (currentTime[sermon.id] || 0) / duration[sermon.id] * 100 : 0}%` 
                                  }}
                                />
                              </div>
                              <span className="text-sm text-charcoal/60">
                                {formatTime(duration[sermon.id] || 0)}
                              </span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
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
              Sermons are typically added within a few days of the service. 
              If you're looking for a specific sermon that isn't listed, please contact the church office.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}