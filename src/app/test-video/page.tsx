'use client'

import { useState } from 'react'

export default function TestVideoPage() {
  const [showVideo, setShowVideo] = useState(false)
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Video Test Page</h1>
      
      <div className="space-y-8">
        {/* Test 1: Direct YouTube embed */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 1: Direct YouTube Embed (Desktop Video)</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/ulATKownJMc?autoplay=1&mute=1&controls=1"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 2: Mobile video */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 2: Mobile Video (Shorts)</h2>
          <div className="relative w-full max-w-sm" style={{ paddingBottom: '177.77%' }}>
            <iframe
              src="https://www.youtube.com/embed/cZUNNhhdumY?autoplay=1&mute=1&controls=1"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 3: Square video */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 3: Square Video</h2>
          <div className="relative w-full max-w-sm" style={{ paddingBottom: '100%' }}>
            <iframe
              src="https://www.youtube.com/embed/HP0ymRehOuQ?autoplay=1&mute=1&controls=1"
              className="absolute top-0 left-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Test 4: Dynamic load test */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 4: Click to Load Video</h2>
          <button 
            onClick={() => setShowVideo(!showVideo)}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            {showVideo ? 'Hide' : 'Show'} Video
          </button>
          {showVideo && (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/ulATKownJMc?autoplay=1&mute=1&controls=1"
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}
        </div>
        
        {/* Test 5: Thumbnail test */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Test 5: YouTube Thumbnails</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm mb-2">Desktop thumbnail</p>
              <img 
                src="https://img.youtube.com/vi/ulATKownJMc/maxresdefault.jpg" 
                alt="Desktop"
                className="w-full"
              />
            </div>
            <div>
              <p className="text-sm mb-2">Mobile thumbnail</p>
              <img 
                src="https://img.youtube.com/vi/cZUNNhhdumY/maxresdefault.jpg" 
                alt="Mobile"
                className="w-full"
              />
            </div>
            <div>
              <p className="text-sm mb-2">Square thumbnail</p>
              <img 
                src="https://img.youtube.com/vi/HP0ymRehOuQ/maxresdefault.jpg" 
                alt="Square"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}