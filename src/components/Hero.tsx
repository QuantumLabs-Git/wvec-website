'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  // YouTube video IDs for different screen sizes
  const YOUTUBE_VIDEO_DESKTOP = 'ulATKownJMc' // Desktop/landscape video
  const YOUTUBE_VIDEO_MOBILE = 'cZUNNhhdumY'  // Mobile/portrait video (Shorts)
  const YOUTUBE_VIDEO_SQUARE = 'HP0ymRehOuQ'  // Square/tablet video (Shorts)
  
  const [videoId, setVideoId] = useState<string>(YOUTUBE_VIDEO_DESKTOP)
  const [showVideo, setShowVideo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Determine which video to show based on screen size
    const selectVideo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height
      
      let selectedVideoId = YOUTUBE_VIDEO_DESKTOP
      
      // For very narrow screens (phones in portrait)
      if (width <= 480 && aspectRatio < 0.75) {
        selectedVideoId = YOUTUBE_VIDEO_MOBILE
      } 
      // For square-ish screens or tablets
      else if (width <= 768 && aspectRatio < 1.3) {
        selectedVideoId = YOUTUBE_VIDEO_SQUARE
      }
      
      setVideoId(selectedVideoId)
    }
    
    // Select video immediately
    selectVideo()
    
    // Since hero is at top of page, show video immediately
    // Small delay to ensure smooth page load
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 100)
    
    // Update on resize
    window.addEventListener('resize', selectVideo)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', selectVideo)
    }
  }, [])
  
  return (
    <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center" ref={containerRef}>
      {/* Background with optimized YouTube video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Gradient background - always visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel-blue via-sage to-champagne" />
        
        {/* YouTube thumbnail as placeholder for immediate visual */}
        {videoId && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
              filter: 'brightness(0.7)',
              opacity: showVideo ? 0 : 0.8,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        )}
        
        {/* Optimized YouTube iframe - loads after short delay */}
        {showVideo && videoId && (
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${videoId}&enablejsapi=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1`}
            className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
            style={{ 
              width: '100vw',
              height: '100vh',
              transform: 'scale(1.2)', // Slightly zoom to hide any YouTube UI
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Church Welcome Video"
            loading="eager"
          />
        )}
        
        {/* Cinematic overlay layers */}
        {/* Base darkening layer */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Vignette effect - darker edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
        
        {/* Center focus gradient - keeps center slightly brighter */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)'
          }}
        />
        
        {/* Cinematic color grade - subtle blue/teal tint */}
        <div className="absolute inset-0 bg-deep-navy/5 mix-blend-multiply" />
        
        {/* Top fade effect to create smooth transition from navigation */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
      </div>
      
      {/* Fallback gradient (visible if video fails to load) */}
      <div className="absolute inset-0 countryside-gradient -z-10" />
      
      {/* Animated background shapes - responsive sizes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-sage/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-steel-blue/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-ivory mb-4 sm:mb-6 px-2"
        >
          Whiddon Valley Evangelical Church
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-ivory italic max-w-3xl mx-auto px-4"
        >
          "Grace and peace be multiplied unto you through the knowledge of God, and of Jesus our Lord"
          <span className="block text-sm sm:text-base mt-2 not-italic text-ivory">2 Peter 1:2</span>
        </motion.p>
      </div>
    </section>
  )
}

export default Hero