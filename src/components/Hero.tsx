'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const Hero = () => {
  // Using CloudFront CDN for optimal global performance
  const VIDEO_DESKTOP = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-desktop.mp4'
  const VIDEO_MOBILE = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-mobile.mp4'
  const VIDEO_SQUARE = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-square.mp4'
  
  // Poster images for instant loading
  const POSTER_DESKTOP = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-desktop-poster.jpg'
  const POSTER_MOBILE = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-mobile-poster.jpg'
  const POSTER_SQUARE = 'https://d1kn6tkqtghxrg.cloudfront.net/videos/hero-square-poster.jpg'
  
  const [videoSrc, setVideoSrc] = useState<string>(VIDEO_DESKTOP)
  const [posterSrc, setPosterSrc] = useState<string>(POSTER_DESKTOP)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Determine which video to show based on screen size
    const selectVideo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height
      
      let selectedVideo = VIDEO_DESKTOP
      let selectedPoster = POSTER_DESKTOP
      
      // For very narrow screens (phones in portrait)
      if (width <= 480 && aspectRatio < 0.75) {
        selectedVideo = VIDEO_MOBILE
        selectedPoster = POSTER_MOBILE
      } 
      // For square-ish screens or tablets
      else if (width <= 768 && aspectRatio < 1.3) {
        selectedVideo = VIDEO_SQUARE
        selectedPoster = POSTER_SQUARE
      }
      
      setVideoSrc(selectedVideo)
      setPosterSrc(selectedPoster)
    }
    
    // Select video immediately
    selectVideo()
    
    // Use Intersection Observer for optimal loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && videoRef.current) {
          // Start loading and playing video when visible
          videoRef.current.load()
          videoRef.current.play().catch(() => {
            // Silently handle autoplay failures (some browsers block it)
            console.log('Autoplay was prevented')
          })
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    // Update on resize (with debounce for performance)
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(selectVideo, 250)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])
  
  // Handle video loaded event
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay was prevented')
      })
    }
  }
  
  return (
    <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center" ref={containerRef}>
      {/* Background with optimized native video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Base gradient - always visible for immediate color */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel-blue via-sage to-champagne" />
        
        {/* Native HTML5 video - best performance and control */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: isVideoLoaded ? 0.85 : 0,
            transition: 'opacity 1s ease-in-out',
            transform: 'scale(1.1)' // Slight zoom for edge coverage
          }}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          onLoadedData={handleVideoLoaded}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Add WebM for better browser support and smaller file sizes */}
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>
        
        {/* Poster image fallback for instant visual */}
        {!isVideoLoaded && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${posterSrc})`,
              opacity: 0.7,
              filter: 'brightness(0.8) saturate(1.1)',
              transform: 'scale(1.1)'
            }}
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