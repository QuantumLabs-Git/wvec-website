# Hero Background Video Specifications

## Required Files

1. **hero-background.mp4** - Main video file (MP4 format)
2. **hero-background.webm** - Alternative format for better browser support (optional but recommended)
3. **hero-poster.jpg** - Still image shown while video loads

## Video Specifications

### MP4 Version (Required)
- **Codec**: H.264
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps
- **Audio**: Remove audio track completely
- **Duration**: 15-30 seconds (for smooth looping)
- **File Size**: Aim for under 10MB, ideally 3-5MB

### WebM Version (Recommended)
- **Codec**: VP9
- **Resolution**: Same as MP4
- **Frame Rate**: Same as MP4
- **Bitrate**: 1-3 Mbps (WebM typically achieves better compression)
- **Audio**: None
- **File Size**: Usually 30-50% smaller than MP4

### Poster Image
- **Format**: JPEG
- **Resolution**: Same as video
- **Quality**: 80-90% JPEG quality
- **File Size**: Under 500KB

## Optimization Tools

### Using FFmpeg

To convert and optimize your video:

```bash
# Remove audio and optimize MP4
ffmpeg -i input-video.mp4 -c:v libx264 -preset slow -crf 23 -vf "scale=1920:1080" -an -movflags +faststart hero-background.mp4

# Create WebM version
ffmpeg -i input-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf "scale=1920:1080" -an hero-background.webm

# Extract poster frame (from 1 second into the video)
ffmpeg -i input-video.mp4 -ss 00:00:01 -vframes 1 -vf "scale=1920:1080" -q:v 2 hero-poster.jpg
```

### Using HandBrake (GUI Alternative)

1. Open your video in HandBrake
2. Choose "Web" preset
3. Set resolution to 1920x1080 or 1280x720
4. Under Audio tab, remove all audio tracks
5. Under Video tab:
   - Set constant quality to 23-25
   - Set framerate to "Same as source" or 30fps
6. Enable "Web Optimized" checkbox
7. Export as MP4

## Content Recommendations

- **Subtle movement**: Avoid fast motion that might distract from content
- **Seamless loop**: Ensure the last frame transitions smoothly to the first
- **Appropriate content**: Nature scenes, clouds, water, or abstract patterns work well
- **Color compatibility**: Should work with the overlay (currently black/30% opacity)

## Testing

After adding videos, test on:
- Different browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS and Android)
- Different connection speeds
- With JavaScript disabled (should show poster)