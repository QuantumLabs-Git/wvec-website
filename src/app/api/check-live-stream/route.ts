import { NextRequest, NextResponse } from 'next/server'

const YOUTUBE_API_KEY = 'AIzaSyB7fH_OlhnrCpg2VhlJ5wZOAg0YbCCJIxg'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const channelId = searchParams.get('channelId')

  if (!channelId) {
    return NextResponse.json({ error: 'Channel ID is required' }, { status: 400 })
  }

  try {
    // Check for live streams using YouTube Data API v3
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${YOUTUBE_API_KEY}`
    
    const response = await fetch(searchUrl, {
      next: { revalidate: 30 } // Cache for 30 seconds
    })
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('YouTube API error:', response.status, errorData)
      return NextResponse.json({ 
        isLive: false,
        error: 'YouTube API request failed',
        checkedAt: new Date().toISOString()
      })
    }
    
    const data = await response.json()
    
    // Check if there are any live videos
    const isLive = data.items && data.items.length > 0
    
    // If live, return the first live video details
    if (isLive && data.items[0]) {
      const liveVideo = data.items[0]
      return NextResponse.json({ 
        isLive: true,
        channelId,
        videoId: liveVideo.id.videoId,
        title: liveVideo.snippet.title,
        description: liveVideo.snippet.description,
        thumbnailUrl: liveVideo.snippet.thumbnails?.high?.url || liveVideo.snippet.thumbnails?.default?.url,
        checkedAt: new Date().toISOString()
      })
    }
    
    return NextResponse.json({ 
      isLive: false,
      channelId,
      checkedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error checking live stream:', error)
    return NextResponse.json({ 
      isLive: false,
      error: 'Failed to check live stream status',
      checkedAt: new Date().toISOString()
    })
  }
}