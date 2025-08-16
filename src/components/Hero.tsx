'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  // Vimeo video IDs for different screen sizes
  const VIMEO_VIDEO_DESKTOP = '1110522023' // Desktop/landscape video
  const VIMEO_VIDEO_MOBILE = '1110522012'  // Mobile/vertical video
  const VIMEO_VIDEO_SQUARE = '1110522001'  // Square/tablet video
  
  const [videoId, setVideoId] = useState<string>(VIMEO_VIDEO_DESKTOP)
  const [showVideo, setShowVideo] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Determine which video to show based on screen size
    const selectVideo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height
      
      let selectedVideoId = VIMEO_VIDEO_DESKTOP
      
      // For very narrow screens (phones in portrait)
      if (width <= 480 && aspectRatio < 0.75) {
        selectedVideoId = VIMEO_VIDEO_MOBILE
      } 
      // For square-ish screens or tablets
      else if (width <= 768 && aspectRatio < 1.3) {
        selectedVideoId = VIMEO_VIDEO_SQUARE
      }
      
      setVideoId(selectedVideoId)
    }
    
    // Select video immediately
    selectVideo()
    
    // Use Intersection Observer for optimal loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Load video when hero section is visible
          setTimeout(() => setShowVideo(true), 500) // Small delay for smooth experience
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading slightly before visible
      }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    // Update on resize
    window.addEventListener('resize', selectVideo)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', selectVideo)
    }
  }, [])
  
  return (
    <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center" ref={containerRef}>
      {/* Background with Vimeo video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Base gradient - always visible for immediate color */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel-blue via-sage to-champagne" />
        
        {/* Vimeo thumbnail for instant visual feedback (if using Vimeo Plus/Pro) */}
        {/* For basic Vimeo accounts, you might want to use a custom thumbnail */}
        {videoId && !showVideo && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://vumbnail.com/${videoId}.jpg)`,
              opacity: 0.7,
              filter: 'brightness(0.8) saturate(1.1)',
              transform: 'scale(1.1)'
            }}
          />
        )}
        
        {/* Vimeo video with reliable loop and autoplay */}
        {showVideo && videoId && (
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&quality=auto`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ 
              border: 'none',
              width: '100vw',
              height: '100vh',
              transform: 'scale(1.2)', // Zoom to ensure full coverage
              opacity: 0.85,
              animation: 'fadeIn 2s ease-in-out'
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            title="Church Welcome Video"
          />
        )}
        
        {/* Professional cinematic overlay layers */}
        {/* Base darkening for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        
        {/* Vignette effect for focus */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
          }}
        />
        
        {/* Subtle color grading */}
        <div className="absolute inset-0 bg-deep-navy/10 mix-blend-overlay" />
        
        {/* Top gradient for nav blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        
        {/* Bottom gradient for content readability */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      {/* Fallback gradient pattern */}
      <div className="absolute inset-0 countryside-gradient -z-10" />
      
      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-champagne/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 sm:w-96 h-64 sm:h-96 bg-steel-blue/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero content with enhanced typography */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white mb-4 sm:mb-6 px-2 drop-shadow-2xl"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.8)'
          }}
        >
          Whiddon Valley Evangelical Church
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 italic max-w-3xl mx-auto px-4"
          style={{
            textShadow: '0 1px 10px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.8)'
          }}
        >
          "Grace and peace be multiplied unto you through the knowledge of God, and of Jesus our Lord"
          <span className="block text-sm sm:text-base mt-2 not-italic text-white/90">2 Peter 1:2</span>
        </motion.p>
      </div>
      
      {/* Add fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 0.85; }
        }
      `}</style>
    </section>
  )
}

export default Hero