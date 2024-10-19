document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('invitationVideo');
    const soundToggle = document.getElementById('soundToggle');
    const progressBar = document.getElementById('progressBar');
    const loadingContainer = document.getElementById('loadingContainer');
    let totalLoadTime = 0;

    // Handle sound toggle
    soundToggle.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });

    // Track video loading progress
    video.addEventListener('loadeddata', function() {
        video.style.opacity = '1';
        loadingContainer.style.display = 'none';
    });

    video.addEventListener('progress', function() {
        if (video.buffered.length > 0) {
            const percentage = (video.buffered.end(0) / video.duration) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    });

    // Fallback for browsers that don't properly trigger progress events
    const progressInterval = setInterval(() => {
        totalLoadTime += 100;
        if (video.readyState >= 4) {
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            setTimeout(() => {
                video.style.opacity = '1';
                loadingContainer.style.display = 'none';
            }, 500);
        } else if (totalLoadTime < 30000) { // 30 second timeout
            const fakeProgress = Math.min((totalLoadTime / 30000) * 100, 90);
            progressBar.style.width = `${fakeProgress}%`;
        }
    }, 100);
});