#!/bin/bash

# Create output directory for compressed videos
mkdir -p public/videos/compressed

echo "🎬 Starting video compression and trimming..."

# Desktop video - trim to 20 seconds and compress
echo "Processing desktop video..."
ffmpeg -i public/videos/WVEChomepagevideo.mp4 \
  -t 20 \
  -c:v libx264 \
  -crf 28 \
  -preset medium \
  -vf "scale=1920:-2" \
  -an \
  -movflags +faststart \
  public/videos/compressed/hero-desktop.mp4

# Vertical/Mobile video - trim to 20 seconds and compress  
echo "Processing mobile video..."
ffmpeg -i public/videos/WVECHomepageVertical.mp4 \
  -t 20 \
  -c:v libx264 \
  -crf 30 \
  -preset medium \
  -vf "scale=720:-2" \
  -an \
  -movflags +faststart \
  public/videos/compressed/hero-mobile.mp4

# Square video - trim to 20 seconds and compress
echo "Processing square video..."
ffmpeg -i public/videos/WVECHomepageSquare.mp4 \
  -t 20 \
  -c:v libx264 \
  -crf 30 \
  -preset medium \
  -vf "scale=1080:-2" \
  -an \
  -movflags +faststart \
  public/videos/compressed/hero-square.mp4

echo "📸 Extracting poster images..."

# Extract poster images (first frame of each video)
ffmpeg -i public/videos/compressed/hero-desktop.mp4 -vframes 1 -q:v 2 public/videos/compressed/hero-desktop-poster.jpg
ffmpeg -i public/videos/compressed/hero-mobile.mp4 -vframes 1 -q:v 2 public/videos/compressed/hero-mobile-poster.jpg  
ffmpeg -i public/videos/compressed/hero-square.mp4 -vframes 1 -q:v 2 public/videos/compressed/hero-square-poster.jpg

echo "✅ Video processing complete!"
echo ""
echo "📊 File sizes:"
ls -lh public/videos/compressed/

echo ""
echo "Original sizes:"
ls -lh public/videos/*.mp4