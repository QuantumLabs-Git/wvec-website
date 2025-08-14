'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { YOUTUBE_CONFIG, isYouTubeConfigured } from '@/lib/youtube-config'

interface LiveStreamContextType {
  isLive: boolean
  liveVideoId: string | null
  liveVideoTitle: string | null
  lastChecked: Date | null
  checkingStatus: boolean
}

const LiveStreamContext = createContext<LiveStreamContextType>({
  isLive: false,
  liveVideoId: null,
  liveVideoTitle: null,
  lastChecked: null,
  checkingStatus: false
})

export const useLiveStream = () => {
  const context = useContext(LiveStreamContext)
  if (!context) {
    throw new Error('useLiveStream must be used within a LiveStreamProvider')
  }
  return context
}

export const LiveStreamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLive, setIsLive] = useState(false)
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null)
  const [liveVideoTitle, setLiveVideoTitle] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [checkingStatus, setCheckingStatus] = useState(false)

  const checkLiveStatus = async () => {
    if (!isYouTubeConfigured()) return

    setCheckingStatus(true)
    try {
      const response = await fetch(`/api/check-live-stream?channelId=${YOUTUBE_CONFIG.channelId}`)
      if (response.ok) {
        const data = await response.json()
        setIsLive(data.isLive)
        setLiveVideoId(data.videoId || null)
        setLiveVideoTitle(data.title || null)
      }
    } catch (error) {
      console.error('Error checking live stream status:', error)
      // Fallback: assume not live if we can't check
      setIsLive(false)
      setLiveVideoId(null)
      setLiveVideoTitle(null)
    } finally {
      setCheckingStatus(false)
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    // Check immediately on mount
    checkLiveStatus()

    // Set up interval to check every minute (60000 ms)
    const interval = setInterval(checkLiveStatus, 60000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <LiveStreamContext.Provider value={{ isLive, liveVideoId, liveVideoTitle, lastChecked, checkingStatus }}>
      {children}
    </LiveStreamContext.Provider>
  )
}