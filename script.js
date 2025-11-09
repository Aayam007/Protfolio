// Main JavaScript file for Bishow Shrestha Portfolio
// Modern, Clean, and Elegant Interactions

$(document).ready(function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize Dark Mode
    initDarkMode();
    
    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if(target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 800, 'easeInOutCubic');
        }
    });
    
    // Add active state to navigation
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('section[id]').each(function() {
            var section = $(this);
            var sectionTop = section.offset().top;
            var sectionBottom = sectionTop + section.outerHeight();
            var sectionId = section.attr('id');
            
            if(scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if(entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    $('.ftco-animate').each(function() {
        observer.observe(this);
    });
    
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });
    
    // Add hover effect for cards
    $('.card, .services, .blog-entry, .tool-card').hover(
        function() {
            $(this).addClass('elevated');
        },
        function() {
            $(this).removeClass('elevated');
        }
    );
    
    // Smooth number counting animation
    if($('.number').length) {
        $('.number').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-number');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
});

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);
    
    // Toggle theme
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
            
            // Add animation
            this.style.transform = 'rotate(360deg) scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg) scale(1)';
            }, 300);
        });
    }
}

function updateThemeIcon(theme, iconElement) {
    if(iconElement) {
        iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Developer Tools Functions

// JSON Formatter
function formatJSON() {
    try {
        const input = document.getElementById('jsonInput').value;
        const parsed = JSON.parse(input);
        document.getElementById('jsonOutput').textContent = JSON.stringify(parsed, null, 2);
        document.getElementById('jsonOutput').style.color = '#28a745';
    } catch (error) {
        document.getElementById('jsonOutput').textContent = 'Error: ' + error.message;
        document.getElementById('jsonOutput').style.color = '#dc3545';
    }
}

function minifyJSON() {
    try {
        const input = document.getElementById('jsonInput').value;
        const parsed = JSON.parse(input);
        document.getElementById('jsonOutput').textContent = JSON.stringify(parsed);
        document.getElementById('jsonOutput').style.color = '#28a745';
    } catch (error) {
        document.getElementById('jsonOutput').textContent = 'Error: ' + error.message;
        document.getElementById('jsonOutput').style.color = '#dc3545';
    }
}

// Base64 Encoder/Decoder
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    const encoded = btoa(unescape(encodeURIComponent(input)));
    document.getElementById('base64Output').textContent = encoded;
}

function decodeBase64() {
    try {
        const input = document.getElementById('base64Input').value;
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64Output').textContent = decoded;
        document.getElementById('base64Output').style.color = '#28a745';
    } catch (error) {
        document.getElementById('base64Output').textContent = 'Error: Invalid Base64 string';
        document.getElementById('base64Output').style.color = '#dc3545';
    }
}

// Color Picker
document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', function() {
            const hex = this.value;
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            
            document.getElementById('hexValue').textContent = hex.toUpperCase();
            document.getElementById('rgbValue').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            document.getElementById('hslValue').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        });
    }
});

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Password Generator
function updatePassLength() {
    const length = document.getElementById('passwordLength').value;
    document.getElementById('passLength').textContent = length;
}

function generatePassword() {
    const length = document.getElementById('passwordLength').value;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('generatedPassword').value = password;
}

function copyPassword() {
    const password = document.getElementById('generatedPassword');
    password.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

// Lorem Ipsum Generator
function generateLorem() {
    const paragraphs = document.getElementById('paragraphCount').value;
    const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    
    let result = '';
    for (let i = 0; i < paragraphs; i++) {
        result += loremText + '\n\n';
    }
    
    document.getElementById('loremOutput').textContent = result.trim();
}

// URL Encoder/Decoder
function encodeURL() {
    const input = document.getElementById('urlInput').value;
    const encoded = encodeURIComponent(input);
    document.getElementById('urlOutput').textContent = encoded;
}

function decodeURL() {
    try {
        const input = document.getElementById('urlInput').value;
        const decoded = decodeURIComponent(input);
        document.getElementById('urlOutput').textContent = decoded;
        document.getElementById('urlOutput').style.color = '#28a745';
    } catch (error) {
        document.getElementById('urlOutput').textContent = 'Error: Invalid URL string';
        document.getElementById('urlOutput').style.color = '#dc3545';
    }
}

// Timestamp Converter
function convertTimestamp() {
    const timestamp = document.getElementById('timestampInput').value;
    if (!timestamp) {
        document.getElementById('timestampOutput').innerHTML = '<p style="color: #dc3545;">Please enter a timestamp</p>';
        return;
    }
    
    const date = new Date(parseInt(timestamp) * 1000);
    const output = `
        <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${date.toLocaleTimeString()}</p>
        <p><strong>Full:</strong> ${date.toString()}</p>
        <p><strong>UTC:</strong> ${date.toUTCString()}</p>
    `;
    document.getElementById('timestampOutput').innerHTML = output;
}

function getCurrentTimestamp() {
    const timestamp = Math.floor(Date.now() / 1000);
    document.getElementById('timestampInput').value = timestamp;
    convertTimestamp();
}

// Text Case Converter
function convertCase(caseType) {
    const input = document.getElementById('caseInput').value;
    let output = '';
    
    switch(caseType) {
        case 'upper':
            output = input.toUpperCase();
            break;
        case 'lower':
            output = input.toLowerCase();
            break;
        case 'title':
            output = input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            break;
        case 'camel':
            output = input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;
    }
    
    document.getElementById('caseOutput').textContent = output;
}

// UUID Generator
function generateUUID() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    document.getElementById('uuidOutput').value = uuid;
}

function copyUUID() {
    const uuid = document.getElementById('uuidOutput');
    uuid.select();
    document.execCommand('copy');
    alert('UUID copied to clipboard!');
}