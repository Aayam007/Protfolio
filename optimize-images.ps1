# Image Optimization Script for Portfolio (PowerShell)
# This script downloads, converts, and optimizes images for better performance
# Requires: ffmpeg, ImageMagick (magick)
# Install: choco install ffmpeg imagemagick (using Chocolatey)
# Or download from: https://ffmpeg.org/download.html and https://imagemagick.org

Write-Host "🎨 Portfolio Image Optimization Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check dependencies
$ffmpegExists = Get-Command ffmpeg -ErrorAction SilentlyContinue
$magickExists = Get-Command magick -ErrorAction SilentlyContinue

if (-not $ffmpegExists) {
    Write-Host "❌ ffmpeg is required but not installed." -ForegroundColor Red
    Write-Host "   Install via Chocolatey: choco install ffmpeg" -ForegroundColor Yellow
    Write-Host "   Or download from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    exit 1
}

if (-not $magickExists) {
    Write-Host "❌ ImageMagick is required but not installed." -ForegroundColor Red
    Write-Host "   Install via Chocolatey: choco install imagemagick" -ForegroundColor Yellow
    Write-Host "   Or download from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    exit 1
}

# Create images directory if it doesn't exist
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images" | Out-Null
    Write-Host "✅ Created images directory" -ForegroundColor Green
}

Write-Host ""
Write-Host "📥 Step 1: Downloading GIF files..." -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Write-Host ""

# Download GIPHY coding GIF
if (-not (Test-Path "images\coding.gif")) {
    Write-Host "Downloading coding.gif from GIPHY..." -ForegroundColor White
    try {
        Invoke-WebRequest -Uri "https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" -OutFile "images\coding.gif"
        Write-Host "✅ Downloaded coding.gif" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️  Failed to download coding.gif: $_" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  coding.gif already exists, skipping..." -ForegroundColor Gray
}

# Download GitHub gif3
if (-not (Test-Path "images\gif3.gif")) {
    Write-Host "Downloading gif3.gif from GitHub..." -ForegroundColor White
    try {
        Invoke-WebRequest -Uri "https://raw.githubusercontent.com/devSouvik/devSouvik/master/gif3.gif" -OutFile "images\gif3.gif"
        Write-Host "✅ Downloaded gif3.gif" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️  Failed to download gif3.gif: $_" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  gif3.gif already exists, skipping..." -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎬 Step 2: Converting GIFs to Video (WebM + MP4)" -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Yellow
Write-Host ""

# Convert coding.gif to WebM
if (-not (Test-Path "images\coding.webm")) {
    Write-Host "Converting coding.gif to WebM..." -ForegroundColor White
    ffmpeg -i images\coding.gif -c:v libvpx-vp9 -b:v 0 -crf 41 -vf scale=480:360 -an images\coding.webm -y 2>$null
    if (Test-Path "images\coding.webm") {
        Write-Host "✅ Created coding.webm (Est. savings: ~179 KiB)" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Failed to create coding.webm" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  coding.webm already exists, skipping..." -ForegroundColor Gray
}

# Convert coding.gif to MP4
if (-not (Test-Path "images\coding.mp4")) {
    Write-Host "Converting coding.gif to MP4..." -ForegroundColor White
    ffmpeg -i images\coding.gif -movflags faststart -pix_fmt yuv420p -vf scale=480:360 -b:v 800k -an images\coding.mp4 -y 2>$null
    if (Test-Path "images\coding.mp4") {
        Write-Host "✅ Created coding.mp4 (Safari fallback)" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Failed to create coding.mp4" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  coding.mp4 already exists, skipping..." -ForegroundColor Gray
}

# Create poster for coding video
if (-not (Test-Path "images\coding-poster.jpg")) {
    Write-Host "Creating poster image for coding video..." -ForegroundColor White
    ffmpeg -i images\coding.gif -vf scale=480:360 -vframes 1 images\coding-poster.jpg -y 2>$null
    if (Test-Path "images\coding-poster.jpg") {
        Write-Host "✅ Created coding-poster.jpg" -ForegroundColor Green
    }
}
else {
    Write-Host "⏭️  coding-poster.jpg already exists, skipping..." -ForegroundColor Gray
}

# Convert gif3.gif to WebM
if (-not (Test-Path "images\gif3.webm")) {
    Write-Host "Converting gif3.gif to WebM (optimized size 550x412)..." -ForegroundColor White
    ffmpeg -i images\gif3.gif -vf scale=550:412 -c:v libvpx-vp9 -b:v 0 -crf 41 -an images\gif3.webm -y 2>$null
    if (Test-Path "images\gif3.webm") {
        Write-Host "✅ Created gif3.webm (Est. savings: ~84 KiB)" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Failed to create gif3.webm" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  gif3.webm already exists, skipping..." -ForegroundColor Gray
}

# Convert gif3.gif to MP4
if (-not (Test-Path "images\gif3.mp4")) {
    Write-Host "Converting gif3.gif to MP4..." -ForegroundColor White
    ffmpeg -i images\gif3.gif -movflags faststart -pix_fmt yuv420p -vf scale=550:412 -b:v 600k -an images\gif3.mp4 -y 2>$null
    if (Test-Path "images\gif3.mp4") {
        Write-Host "✅ Created gif3.mp4 (Safari fallback)" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Failed to create gif3.mp4" -ForegroundColor Yellow
    }
}
else {
    Write-Host "⏭️  gif3.mp4 already exists, skipping..." -ForegroundColor Gray
}

# Create poster for gif3 video
if (-not (Test-Path "images\gif3-poster.jpg")) {
    Write-Host "Creating poster image for gif3 video..." -ForegroundColor White
    ffmpeg -i images\gif3.gif -vf scale=550:412 -vframes 1 images\gif3-poster.jpg -y 2>$null
    if (Test-Path "images\gif3-poster.jpg") {
        Write-Host "✅ Created gif3-poster.jpg" -ForegroundColor Green
    }
}
else {
    Write-Host "⏭️  gif3-poster.jpg already exists, skipping..." -ForegroundColor Gray
}

Write-Host ""
Write-Host "🖼️  Step 3: Optimizing journey.png" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Write-Host ""

if (Test-Path "images\journey.png") {
    # Create properly sized desktop version
    if (-not (Test-Path "images\journey-small.png")) {
        Write-Host "Creating optimized desktop version (549x113)..." -ForegroundColor White
        magick images\journey.png -resize 549x113 images\journey-small.png
        if (Test-Path "images\journey-small.png") {
            Write-Host "✅ Created journey-small.png" -ForegroundColor Green
        }
    }
    else {
        Write-Host "⏭️  journey-small.png already exists, skipping..." -ForegroundColor Gray
    }

    # Create mobile version
    if (-not (Test-Path "images\journey-mobile.png")) {
        Write-Host "Creating mobile version (400x82)..." -ForegroundColor White
        magick images\journey.png -resize 400x82 images\journey-mobile.png
        if (Test-Path "images\journey-mobile.png") {
            Write-Host "✅ Created journey-mobile.png" -ForegroundColor Green
        }
    }
    else {
        Write-Host "⏭️  journey-mobile.png already exists, skipping..." -ForegroundColor Gray
    }

    # Convert to WebP (desktop)
    if (-not (Test-Path "images\journey.webp")) {
        Write-Host "Converting to WebP (desktop)..." -ForegroundColor White
        magick images\journey-small.png images\journey.webp
        if (Test-Path "images\journey.webp") {
            Write-Host "✅ Created journey.webp (Est. savings: ~3-5 KiB)" -ForegroundColor Green
        }
    }
    else {
        Write-Host "⏭️  journey.webp already exists, skipping..." -ForegroundColor Gray
    }

    # Convert to WebP (mobile)
    if (-not (Test-Path "images\journey-mobile.webp")) {
        Write-Host "Converting to WebP (mobile)..." -ForegroundColor White
        magick images\journey-mobile.png images\journey-mobile.webp
        if (Test-Path "images\journey-mobile.webp") {
            Write-Host "✅ Created journey-mobile.webp" -ForegroundColor Green
        }
    }
    else {
        Write-Host "⏭️  journey-mobile.webp already exists, skipping..." -ForegroundColor Gray
    }
}
else {
    Write-Host "⚠️  images\journey.png not found. Please ensure it exists in the images\ directory." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📊 Step 4: File Size Comparison" -ForegroundColor Yellow
Write-Host "--------------------------------" -ForegroundColor Yellow
Write-Host ""

# Function to get file size in KB
function Get-FileSize {
    param($Path)
    if (Test-Path $Path) {
        $size = (Get-Item $Path).Length / 1KB
        return "{0:N1} KB" -f $size
    }
    return "N/A"
}

Write-Host "Original GIFs:" -ForegroundColor White
Write-Host "  coding.gif:      $(Get-FileSize 'images\coding.gif')"
Write-Host "  gif3.gif:        $(Get-FileSize 'images\gif3.gif')"
Write-Host ""
Write-Host "Optimized Videos:" -ForegroundColor White
Write-Host "  coding.webm:     $(Get-FileSize 'images\coding.webm')"
Write-Host "  coding.mp4:      $(Get-FileSize 'images\coding.mp4')"
Write-Host "  gif3.webm:       $(Get-FileSize 'images\gif3.webm')"
Write-Host "  gif3.mp4:        $(Get-FileSize 'images\gif3.mp4')"
Write-Host ""
Write-Host "Journey Image:" -ForegroundColor White
Write-Host "  journey.png:           $(Get-FileSize 'images\journey.png')"
Write-Host "  journey-small.png:     $(Get-FileSize 'images\journey-small.png')"
Write-Host "  journey.webp:          $(Get-FileSize 'images\journey.webp')"
Write-Host "  journey-mobile.webp:   $(Get-FileSize 'images\journey-mobile.webp')"

Write-Host ""
Write-Host "✅ Optimization Complete!" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review the optimized files in the images\ directory" -ForegroundColor White
Write-Host "2. Update index.html to use video elements (see PERFORMANCE_FIXES_GUIDE.md)" -ForegroundColor White
Write-Host "3. Test video playback across browsers (Chrome, Firefox, Edge)" -ForegroundColor White
Write-Host "4. Run Lighthouse audit to verify improvements" -ForegroundColor White
Write-Host "5. Consider implementing Service Worker for better caching" -ForegroundColor White
Write-Host ""
Write-Host "See PERFORMANCE_FIXES_GUIDE.md for detailed implementation instructions." -ForegroundColor Yellow
