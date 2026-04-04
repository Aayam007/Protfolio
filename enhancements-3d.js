/**
 * 3D Enhancements for Bishow Shrestha Portfolio
 * Adds Three.js particle effects and interactive 3D elements
 * Author: Enhanced by GitHub Copilot
 * Date: April 2026
 */

// Diagnostic logging
console.log('✅ enhancements-3d.js loaded successfully');

// -----------------------------------------
// 1. PARTICLE BACKGROUND FOR HERO SECTION
// -----------------------------------------
class ParticleBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 50 : 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            velocities[i] = (Math.random() - 0.5) * 0.01;
            velocities[i + 1] = (Math.random() - 0.5) * 0.01;
            velocities[i + 2] = (Math.random() - 0.5) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.velocities = velocities;

        // Use theme color for particles
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? 0xa78bfa : 0x6c8ef4;

        const material = new THREE.PointsMaterial({
            color: particleColor,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Animate particles
        const positions = this.particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += this.velocities[i];
            positions[i + 1] += this.velocities[i + 1];
            positions[i + 2] += this.velocities[i + 2];

            // Bounce particles back
            if (Math.abs(positions[i]) > 5) this.velocities[i] *= -1;
            if (Math.abs(positions[i + 1]) > 5) this.velocities[i + 1] *= -1;
            if (Math.abs(positions[i + 2]) > 5) this.velocities[i + 2] *= -1;
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
        this.particles.rotation.y += 0.001;
        this.particles.rotation.x += 0.0005;

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        });
    }

    updateTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? 0xa78bfa : 0x6c8ef4;
        this.particles.material.color.setHex(particleColor);
    }
}

// -----------------------------------------
// 2. 3D SKILL BARS WITH DEPTH
// -----------------------------------------
class Skill3D {
    constructor(skillElement) {
        this.element = skillElement;
        this.percentage = parseInt(this.element.dataset.percentage || 85);
        this.createVisual();
    }

    createVisual() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(100, 100);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.element.appendChild(renderer.domElement);

        // Create a torus representing skill level
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6c8ef4,
            metalness: 0.5,
            roughness: 0.2
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        // Add lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        camera.position.z = 2;

        // Animate
        const animate = () => {
            requestAnimationFrame(animate);
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    }
}

// -----------------------------------------
// 3. INTERACTIVE PROJECT CARDS WITH 3D TILT
// -----------------------------------------
class ProjectCard3D {
    constructor(cardElement) {
        this.card = cardElement;
        this.addTiltEffect();
    }

    addTiltEffect() {
        this.card.addEventListener('mousemove', e => {
            const rect = this.card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
        });

        this.card.addEventListener('mouseleave', () => {
            this.card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
        });
    }
}

// -----------------------------------------
// 4. SMOOTH SCROLL WITH PARALLAX
// -----------------------------------------
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');

            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// -----------------------------------------
// 5. TYPING ANIMATION FOR HERO
// -----------------------------------------
class TypingAnimation {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetweenWords = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetweenWords = delayBetweenWords;
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;

        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];

        if (this.isDeleting) {
            this.currentText = currentWord.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentWord.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentText === currentWord) {
            speed = this.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
}

// -----------------------------------------
// 6. CURSOR TRAIL EFFECT
// -----------------------------------------
class CursorTrail {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'cursor-trail-canvas';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 20;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', e => this.addParticle(e.clientX, e.clientY));

        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        this.particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1.0
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;

            if (particle.life <= 0) return false;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(108, 142, 244, ${particle.life})`;
            this.ctx.fill();

            return true;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// -----------------------------------------
// 7. INITIALIZATION
// -----------------------------------------
function init3DEnhancements() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        // Silently skip if Three.js not loaded
        return;
    }

    // Initialize particle background for hero section
    const heroSection = document.getElementById('home-section');
    if (heroSection) {
        console.log('✅ Hero section found, creating particle background...');
        // Create container for Three.js canvas
        const particleContainer = document.createElement('div');
        particleContainer.id = '3d-particles';
        heroSection.insertBefore(particleContainer, heroSection.firstChild);
        console.log('✅ Particle container created and inserted');

        const particleBg = new ParticleBackground('3d-particles');
        console.log('✅ Particle background initialized');

        // Update particles on theme change
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                setTimeout(() => particleBg.updateTheme(), 100);
            });
            console.log('✅ Theme toggle listener added');
        } else {
            console.warn('⚠️ Theme toggle button not found');
        }
    } else {
        console.error('❌ Hero section with id="home-section" not found');
    }

    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project');
    if (projectCards.length > 0) {
        console.log(`✅ Found ${projectCards.length} project cards, adding 3D tilt effect...`);
        projectCards.forEach(card => new ProjectCard3D(card));
    } else {
        console.warn('⚠️ No project cards found with class "project"');
    }

    // Add 3D skill visualizations (optional - only if you add containers)
    const skillContainers = document.querySelectorAll('.skill-3d-container');
    if (skillContainers.length > 0) {
        console.log(`✅ Found ${skillContainers.length} 3D skill containers`);
        skillContainers.forEach(container => new Skill3D(container));
    }

    // Initialize smooth scrolling
    console.log('✅ Initializing smooth scroll...');
    new SmoothScroll();

    // Add cursor trail effect (desktop only)
    if (window.innerWidth > 768) {
        console.log('✅ Desktop detected, adding cursor trail...');
        new CursorTrail();
    } else {
        console.log('ℹ️ Mobile detected, skipping cursor trail');
    }

    // Typing animation for hero subtitle (if element exists)
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        console.log('✅ Typing element found, starting animation...');
        new TypingAnimation(typingElement, [
            'Full Stack Developer',
            '.NET Core Expert',
            'Angular Specialist',
            'Database Architect',
            'Agile Leader'
        ]);
    } else {
        console.error('❌ Typing animation element (.typing-text) not found');
    }

    console.log('🎉 All 3D enhancements initialized successfully!');
}

// Initialize when DOM and Three.js are ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DEnhancements);
} else {
    init3DEnhancements();
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleBackground,
        ProjectCard3D,
        Skill3D,
        SmoothScroll,
        TypingAnimation,
        CursorTrail
    };
}
