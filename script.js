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
            video.play();
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 });

const video = document.querySelector('.hero-video video');
if (video) {
    videoObserver.observe(video);
}

