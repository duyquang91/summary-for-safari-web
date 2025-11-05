// Force video autoplay on iOS
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true;
        video.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]:not(#showMoreFeatures)').forEach(anchor => {
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

// Modal functionality
const modal = document.getElementById('featuresModal');
const showMoreBtn = document.getElementById('showMoreFeatures');
const closeBtn = document.querySelector('.close');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Video play on visibility
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.muted = true;
            video.play().catch(function(error) {
                console.log('Video play prevented:', error);
            });
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 });

const video = document.querySelector('.hero-video video');
if (video) {
    videoObserver.observe(video);
}

// Scroll-based text gradient animation synchronized with scroll gesture
let lastScrollTop = 0;
let scrollVelocity = 0;
let ticking = false;

function updateGradients() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    
    // Calculate scroll velocity for more dynamic effects
    scrollVelocity = scrollTop - lastScrollTop;
    lastScrollTop = scrollTop;
    
    // Update text gradients - each element animates based on its position in viewport
    const textGradients = document.querySelectorAll('.gradient-text');
    textGradients.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distanceFromCenter = (elementCenter - viewportCenter) / window.innerHeight;
        
        // Position based on both scroll percentage and element position in viewport
        const textPositionX = ((scrollPercentage * 300) - (distanceFromCenter * 100)) % 300;
        const textPositionY = 50 + (Math.abs(distanceFromCenter) * 50);
        
        element.style.backgroundPosition = `${textPositionX}% ${textPositionY}%`;
    });
    
    ticking = false;
}

// Use passive event listener for better scroll performance
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateGradients);
        ticking = true;
    }
}, { passive: true });

// Initialize gradients on load
window.addEventListener('load', updateGradients);

