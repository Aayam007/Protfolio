#!/bin/bash
# Image Optimization Script for Portfolio
# This script downloads, converts, and optimizes images for better performance
# Requires: ffmpeg, ImageMagick (magick)

echo "🎨 Portfolio Image Optimization Script"
echo "======================================="

# Check dependencies
command -v ffmpeg >/dev/null 2>&1 || { echo "❌ ffmpeg is required but not installed. Install: https://ffmpeg.org/download.html"; exit 1; }
command -v magick >/dev/null 2>&1 || { echo "❌ ImageMagick is required but not installed. Install: https://imagemagick.org/script/download.php"; exit 1; }

# Create images directory if it doesn't exist
mkdir -p images

echo ""
echo "📥 Step 1: Downloading GIF files..."
echo "-----------------------------------"

# Download GIPHY coding GIF
if [ ! -f "images/coding.gif" ]; then
    echo "Downloading coding.gif from GIPHY..."
    curl -L -o images/coding.gif "https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
    echo "✅ Downloaded coding.gif"
else
    echo "⏭️  coding.gif already exists, skipping..."
fi

# Download GitHub gif3
if [ ! -f "images/gif3.gif" ]; then
    echo "Downloading gif3.gif from GitHub..."
    curl -L -o images/gif3.gif "https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif"
    echo "✅ Downloaded gif3.gif"
else
    echo "⏭️  gif3.gif already exists, skipping..."
fi

echo ""
echo "🎬 Step 2: Converting GIFs to Video (WebM + MP4)"
echo "------------------------------------------------"

# Convert coding.gif to video
if [ ! -f "images/coding.webm" ]; then
    echo "Converting coding.gif to WebM..."
    ffmpeg -i images/coding.gif -c:v libvpx-vp9 -b:v 0 -crf 41 -vf scale=480:360 -an images/coding.webm -y
    echo "✅ Created coding.webm (Est. savings: ~179 KiB)"
else
    echo "⏭️  coding.webm already exists, skipping..."
fi

if [ ! -f "images/coding.mp4" ]; then
    echo "Converting coding.gif to MP4..."
    ffmpeg -i images/coding.gif -movflags faststart -pix_fmt yuv420p -vf scale=480:360 -b:v 800k -an images/coding.mp4 -y
    echo "✅ Created coding.mp4 (Safari fallback)"
else
    echo "⏭️  coding.mp4 already exists, skipping..."
fi

# Create poster for coding video
if [ ! -f "images/coding-poster.jpg" ]; then
    echo "Creating poster image for coding video..."
    ffmpeg -i images/coding.gif -vf scale=480:360 -vframes 1 images/coding-poster.jpg -y
    echo "✅ Created coding-poster.jpg"
else
    echo "⏭️  coding-poster.jpg already exists, skipping..."
fi

# Convert gif3.gif to video (with proper sizing)
if [ ! -f "images/gif3.webm" ]; then
    echo "Converting gif3.gif to WebM (optimized size 550x412)..."
    ffmpeg -i images/gif3.gif -vf scale=550:412 -c:v libvpx-vp9 -b:v 0 -crf 41 -an images/gif3.webm -y
    echo "✅ Created gif3.webm (Est. savings: ~84 KiB)"
else
    echo "⏭️  gif3.webm already exists, skipping..."
fi

if [ ! -f "images/gif3.mp4" ]; then
    echo "Converting gif3.gif to MP4..."
    ffmpeg -i images/gif3.gif -movflags faststart -pix_fmt yuv420p -vf scale=550:412 -b:v 600k -an images/gif3.mp4 -y
    echo "✅ Created gif3.mp4 (Safari fallback)"
else
    echo "⏭️  gif3.mp4 already exists, skipping..."
fi

# Create poster for gif3 video
if [ ! -f "images/gif3-poster.jpg" ]; then
    echo "Creating poster image for gif3 video..."
    ffmpeg -i images/gif3.gif -vf scale=550:412 -vframes 1 images/gif3-poster.jpg -y
    echo "✅ Created gif3-poster.jpg"
else
    echo "⏭️  gif3-poster.jpg already exists, skipping..."
fi

echo ""
echo "🖼️  Step 3: Optimizing journey.png"
echo "-----------------------------------"

if [ -f "images/journey.png" ]; then
    # Create properly sized desktop version
    if [ ! -f "images/journey-small.png" ]; then
        echo "Creating optimized desktop version (549x113)..."
        magick images/journey.png -resize 549x113 images/journey-small.png
        echo "✅ Created journey-small.png"
    else
        echo "⏭️  journey-small.png already exists, skipping..."
    fi

    # Create mobile version
    if [ ! -f "images/journey-mobile.png" ]; then
        echo "Creating mobile version (400x82)..."
        magick images/journey.png -resize 400x82 images/journey-mobile.png
        echo "✅ Created journey-mobile.png"
    else
        echo "⏭️  journey-mobile.png already exists, skipping..."
    fi

    # Convert to WebP
    if [ ! -f "images/journey.webp" ]; then
        echo "Converting to WebP (desktop)..."
        magick images/journey-small.png images/journey.webp
        echo "✅ Created journey.webp (Est. savings: ~3-5 KiB)"
    else
        echo "⏭️  journey.webp already exists, skipping..."
    fi

    if [ ! -f "images/journey-mobile.webp" ]; then
        echo "Converting to WebP (mobile)..."
        magick images/journey-mobile.png images/journey-mobile.webp
        echo "✅ Created journey-mobile.webp"
    else
        echo "⏭️  journey-mobile.webp already exists, skipping..."
    fi
else
    echo "⚠️  images/journey.png not found. Please ensure it exists in the images/ directory."
fi

echo ""
echo "📊 Step 4: File Size Comparison"
echo "--------------------------------"

# Function to get file size in KB
get_size() {
    if [ -f "$1" ]; then
        size=$(du -k "$1" | cut -f1)
        echo "${size} KB"
    else
        echo "N/A"
    fi
}

echo "Original GIFs:"
echo "  coding.gif:      $(get_size images/coding.gif)"
echo "  gif3.gif:        $(get_size images/gif3.gif)"
echo ""
echo "Optimized Videos:"
echo "  coding.webm:     $(get_size images/coding.webm)"
echo "  coding.mp4:      $(get_size images/coding.mp4)"
echo "  gif3.webm:       $(get_size images/gif3.webm)"
echo "  gif3.mp4:        $(get_size images/gif3.mp4)"
echo ""
echo "Journey Image:"
echo "  journey.png:           $(get_size images/journey.png)"
echo "  journey-small.png:     $(get_size images/journey-small.png)"
echo "  journey.webp:          $(get_size images/journey.webp)"
echo "  journey-mobile.webp:   $(get_size images/journey-mobile.webp)"

echo ""
echo "✅ Optimization Complete!"
echo "========================="
echo ""
echo "Next Steps:"
echo "1. Update index.html to use the optimized video files"
echo "2. Test video playback across browsers (Chrome, Firefox, Safari)"
echo "3. Run Lighthouse audit to verify improvements"
echo "4. Consider implementing Service Worker for better caching"
echo ""
echo "See PERFORMANCE_FIXES_GUIDE.md for detailed implementation instructions."
