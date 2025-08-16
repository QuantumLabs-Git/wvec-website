'use client'

import { useState, useEffect } from 'react'

export default function VideoTestPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Video Test Page - Debug YouTube Embeds</h1>
      
      <div className="space-y-12">
        {/* Test 1: Desktop Video - Basic Embed */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 1: Desktop Video (ulATKownJMc) - Basic Embed</h2>
          <p className="text-sm text-gray-600 mb-4">Direct YouTube URL: https://www.youtube.com/watch?v=ulATKownJMc</p>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/ulATKownJMc"
              className="absolute top-0 left-0 w-full h-full border-2 border-blue-500"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 2: Desktop Video - With Autoplay */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 2: Desktop Video - With Autoplay & Mute</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/ulATKownJMc?autoplay=1&mute=1"
              className="absolute top-0 left-0 w-full h-full border-2 border-green-500"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 3: Mobile Video */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 3: Mobile Video (cZUNNhhdumY) - Shorts Format</h2>
          <p className="text-sm text-gray-600 mb-4">Direct YouTube URL: https://www.youtube.com/watch?v=cZUNNhhdumY</p>
          <div className="relative w-full max-w-sm mx-auto" style={{ paddingBottom: '177.77%' }}>
            <iframe
              src="https://www.youtube.com/embed/cZUNNhhdumY?autoplay=1&mute=1"
              className="absolute top-0 left-0 w-full h-full border-2 border-purple-500"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 4: Square Video */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 4: Square Video (HP0ymRehOuQ)</h2>
          <p className="text-sm text-gray-600 mb-4">Direct YouTube URL: https://www.youtube.com/watch?v=HP0ymRehOuQ</p>
          <div className="relative w-full max-w-md mx-auto" style={{ paddingBottom: '100%' }}>
            <iframe
              src="https://www.youtube.com/embed/HP0ymRehOuQ?autoplay=1&mute=1"
              className="absolute top-0 left-0 w-full h-full border-2 border-orange-500"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 5: With All Parameters Like Hero */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 5: Desktop Video - Exact Hero Parameters</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/ulATKownJMc?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=0&rel=0&showinfo=0&playlist=ulATKownJMc"
              className="absolute top-0 left-0 w-full h-full border-2 border-red-500"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              title="Church Welcome Video"
            />
          </div>
        </div>
        
        {/* Test 6: Thumbnail Images */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 6: YouTube Thumbnails</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Desktop thumbnail (ulATKownJMc)</p>
              <img 
                src="https://i.ytimg.com/vi/ulATKownJMc/maxresdefault.jpg" 
                alt="Desktop"
                className="w-full border-2 border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Thumbnail+Not+Found'
                }}
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Mobile thumbnail (cZUNNhhdumY)</p>
              <img 
                src="https://i.ytimg.com/vi/cZUNNhhdumY/maxresdefault.jpg" 
                alt="Mobile"
                className="w-full border-2 border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Thumbnail+Not+Found'
                }}
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Square thumbnail (HP0ymRehOuQ)</p>
              <img 
                src="https://i.ytimg.com/vi/HP0ymRehOuQ/maxresdefault.jpg" 
                alt="Square"
                className="w-full border-2 border-gray-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Thumbnail+Not+Found'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Test 7: Simple HTML5 Video Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test 7: Browser Video Support Check</h2>
          <video 
            controls 
            className="w-full max-w-md mx-auto"
            poster="https://i.ytimg.com/vi/ulATKownJMc/maxresdefault.jpg"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Console Debug Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`Window Size: ${typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}
User Agent: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}
Page Loaded: ${mounted ? 'Yes' : 'No'}
Current Time: ${new Date().toISOString()}

YouTube Video IDs:
- Desktop: ulATKownJMc
- Mobile: cZUNNhhdumY  
- Square: HP0ymRehOuQ

If videos don't load, check:
1. Browser console for errors (F12)
2. Network tab for blocked requests
3. YouTube videos are public/unlisted
4. Embedding is allowed on videos
5. No browser extensions blocking YouTube`}
          </pre>
        </div>
      </div>
    </div>
  )
}