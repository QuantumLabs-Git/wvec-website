'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Youtube, Loader2, Radio } from 'lucide-react'
import { YOUTUBE_CONFIG, isYouTubeConfigured } from '@/lib/youtube-config'
import { useLiveStream } from '@/contexts/LiveStreamContext'

const YouTubeSection = () => {
  const [loading, setLoading] = useState(true)
  const [showLiveStream, setShowLiveStream] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { isLive, liveVideoId } = useLiveStream()

  useEffect(() => {
    // Simple loading simulation
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Automatically switch to live view when stream is detected
  useEffect(() => {
    setShowLiveStream(isLive)
  }, [isLive])


  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-ivory to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-charcoal mb-3 sm:mb-4">
            {showLiveStream ? 'Live Service' : 'Latest Services'}
          </h2>
          <p className="text-sm sm:text-base text-charcoal/70">
            {showLiveStream 
              ? 'Join our live service streaming now' 
              : 'If you can\'t join us in person in Barnstaple, join us online for worship and teaching from God\'s Word'}
          </p>
          
          {/* Show channel ID setup message if not configured */}
          {!isYouTubeConfigured() && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-amber-800">
                <strong>Setup Required:</strong> To display live streams, please add your YouTube channel ID 
                to <code className="bg-amber-100 px-1 rounded">src/lib/youtube-config.ts</code>
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative aspect-video rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden glass-effect p-1 sm:p-2 max-w-4xl mx-auto"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full bg-charcoal/5">
              <Loader2 className="w-12 h-12 text-steel-blue animate-spin" />
            </div>
          ) : (
            <>
              {isYouTubeConfigured() ? (
                <div className="relative w-full h-full">
                  {/* Live Stream Indicator - only show in YouTube section when live */}
                  {isLive && showLiveStream && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 left-4 z-10"
                    >
                      <div className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-xs font-bold uppercase tracking-wide">LIVE NOW</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Embed iframe with cinematic overlay */}
                  <div 
                    className="relative w-full h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <iframe
                      src={showLiveStream && liveVideoId
                        ? `https://www.youtube.com/embed/${liveVideoId}?autoplay=1`
                        : `https://www.youtube.com/embed/videoseries?list=${YOUTUBE_CONFIG.uploadsPlaylistId}`
                      }
                      title={showLiveStream ? "Live Stream - Whiddon Valley Evangelical Church" : "Latest Services - Whiddon Valley Evangelical Church"}
                      className="w-full h-full rounded-md sm:rounded-lg md:rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                    
                    {/* Cinematic overlay - fades on hover/interaction */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none rounded-md sm:rounded-lg md:rounded-xl overflow-hidden"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: isHovered ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient overlay with website colors */}
                      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/20 via-steel-blue/10 to-sage/15" />
                      
                      {/* Vignette effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
                      
                      {/* Subtle pattern overlay for texture */}
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
                      }} />
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* Fallback message with instructions */
                <div className="flex flex-col items-center justify-center h-full bg-charcoal/5 p-4">
                  <Youtube className="w-12 h-12 sm:w-16 sm:h-16 text-charcoal/30 mb-4" />
                  <p className="text-charcoal/50 mb-3 sm:mb-4 text-sm sm:text-base">YouTube channel not configured</p>
                  <div className="text-charcoal/40 text-xs sm:text-sm text-center px-4 sm:px-8 space-y-2">
                    <p>To display live streams and videos:</p>
                    <ol className="text-left inline-block space-y-1">
                      <li>1. Visit <a href={YOUTUBE_CONFIG.channelUrl} target="_blank" rel="noopener noreferrer" className="text-steel-blue hover:underline">{YOUTUBE_CONFIG.channelHandle}</a></li>
                      <li>2. View page source and search for "channelId"</li>
                      <li>3. Copy the ID (starts with UC)</li>
                      <li>4. Update channelId in src/lib/youtube-config.ts</li>
                    </ol>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 sm:mt-8"
        >
          <a
            href={YOUTUBE_CONFIG.streamsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-steel-blue hover:text-cyber-teal smooth-transition text-sm sm:text-base"
          >
            <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View all live streams and past services</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default YouTubeSection