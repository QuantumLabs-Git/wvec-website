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
  duration: string
  scripture: string
  audioUrl?: string
}

// Placeholder sermons - these would come from your CMS/database
const sermons: Sermon[] = [
  {
    id: '1',
    title: 'The Glory of the Gospel',
    speaker: 'Pastor David Kay',
    date: '2024-03-17',
    duration: '45:23',
    scripture: 'Romans 1:16-17',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
  },
  {
    id: '2',
    title: 'Walking in the Light',
    speaker: 'Pastor David Kay',
    date: '2024-03-10',
    duration: '38:15',
    scripture: '1 John 1:5-10',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Placeholder audio
  },
  {
    id: '3',
    title: 'The Sufficiency of Scripture',
    speaker: 'Elder John Smith',
    date: '2024-03-03',
    duration: '42:30',
    scripture: '2 Timothy 3:16-17',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', // Placeholder audio
  },
  {
    id: '4',
    title: 'Christ Our Passover',
    speaker: 'Pastor David Kay',
    date: '2024-02-25',
    duration: '40:45',
    scripture: '1 Corinthians 5:7-8',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Placeholder audio
  },
]

export default function ListenPage() {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedSpeaker, setSelectedSpeaker] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<{ [key: string]: number }>({})
  const [duration, setDuration] = useState<{ [key: string]: number }>({})
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})

  const years = ['2024', '2023', '2022', '2021']
  const speakers = ['All', 'Pastor David Kay', 'Elder John Smith']

  const filteredSermons = sermons.filter(sermon => {
    const yearMatch = sermon.date.startsWith(selectedYear)
    const speakerMatch = selectedSpeaker === 'All' || sermon.speaker === selectedSpeaker
    return yearMatch && speakerMatch
  })

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
      <section className="py-8 bg-white border-b border-sage/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-charcoal font-medium">Year:</label>
              <div className="flex gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full smooth-transition ${
                      selectedYear === year
                        ? 'bg-steel-blue text-white'
                        : 'bg-sage/10 text-charcoal hover:bg-sage/20'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-charcoal font-medium">Speaker:</label>
              <select
                value={selectedSpeaker}
                onChange={(e) => setSelectedSpeaker(e.target.value)}
                className="px-4 py-2 rounded-full border border-sage/30 focus:outline-none focus:border-steel-blue"
              >
                {speakers.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker}</option>
                ))}
              </select>
            </div>
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
              <p className="text-charcoal/50 text-lg">No sermons found for the selected filters</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredSermons.map((sermon, index) => (
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
                        <p className="text-steel-blue font-medium mb-3">
                          {sermon.scripture}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-charcoal/60">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{sermon.speaker}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(sermon.date).toLocaleDateString('en-GB')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{sermon.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <button 
                          onClick={() => handlePlayPause(sermon.id)}
                          className="flex items-center space-x-2 bg-steel-blue text-white px-4 py-2 rounded-full hover:bg-cyber-teal smooth-transition"
                          disabled={!sermon.audioUrl}
                        >
                          {playingId === sermon.id ? (
                            <><Pause className="w-4 h-4" /><span>Pause</span></>
                          ) : (
                            <><Play className="w-4 h-4" /><span>Play</span></>
                          )}
                        </button>
                        {sermon.audioUrl && (
                          <a 
                            href={sermon.audioUrl}
                            download
                            className="flex items-center space-x-2 text-charcoal/60 hover:text-steel-blue smooth-transition"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Audio Player */}
                    {sermon.audioUrl && (
                      <>
                        <audio
                          ref={el => {
                            if (el) audioRefs.current[sermon.id] = el
                          }}
                          src={sermon.audioUrl}
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