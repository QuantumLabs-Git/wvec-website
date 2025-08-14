// YouTube Channel Configuration for WVEC

// To find your channel ID:
// 1. Go to https://www.youtube.com/@WhiddonValleyEvangelicalChurch
// 2. Right-click and select "View Page Source"
// 3. Search for "channelId" in the source
// 4. Copy the value (it starts with "UC" and is 24 characters long)
// 5. Replace 'YOUR_CHANNEL_ID_HERE' below

export const YOUTUBE_CONFIG = {
  // Channel handle (username)
  channelHandle: '@WhiddonValleyEvangelicalChurch',
  
  // Channel ID - REPLACE THIS with your actual channel ID
  channelId: 'UCMAt6jtqz3AmOPb_fb5ry7A',
  
  // Uploads playlist ID (automatically generated from channel ID)
  get uploadsPlaylistId() {
    return this.channelId.startsWith('UC') 
      ? this.channelId.replace('UC', 'UU') 
      : ''
  },
  
  // Live stream embed URL
  get liveStreamUrl() {
    return this.channelId.startsWith('UC')
      ? `https://www.youtube.com/embed/live_stream?channel=${this.channelId}`
      : ''
  },
  
  // Channel URL
  get channelUrl() {
    return `https://www.youtube.com/${this.channelHandle}`
  },
  
  // Streams page URL
  get streamsUrl() {
    return `https://www.youtube.com/${this.channelHandle}/streams`
  }
}

// Helper function to check if YouTube is configured
export const isYouTubeConfigured = () => {
  return YOUTUBE_CONFIG.channelId.startsWith('UC') && YOUTUBE_CONFIG.channelId.length === 24
}