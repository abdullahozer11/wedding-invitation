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

    // Address functionality
    const addressButton = document.getElementById('addressButton');
    const addressDropdown = document.getElementById('addressDropdown');
    const copyAddress = document.getElementById('copyAddress');
    const openGoogleMaps = document.getElementById('openGoogleMaps');
    const openAppleMaps = document.getElementById('openAppleMaps');

    // Replace these with your actual venue details
    const venueAddress = "Sahil Park Sosyal Tesisleri - Sahilkent, D400, 07940 Finike/Antalya, Türkiye";
    const venueLatitude = 0.0; // Replace with actual latitude
    const venueLongitude = 0.0; // Replace with actual longitude

    // Toggle address dropdown
    addressButton.addEventListener('click', function(e) {
        e.stopPropagation();
        addressDropdown.style.display =
            addressDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!addressDropdown.contains(e.target) && e.target !== addressButton) {
            addressDropdown.style.display = 'none';
        }
    });

    // Copy address functionality
    copyAddress.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(venueAddress);
            showCopyAlert('Address copied to clipboard!');
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = venueAddress;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showCopyAlert('Address copied to clipboard!');
            } catch (err) {
                showCopyAlert('Failed to copy address. Please try selecting it manually.');
            }
            document.body.removeChild(textArea);
        }
        addressDropdown.style.display = 'none';
    });

    // Maps functionality
    openGoogleMaps.addEventListener('click', function() {
        const encodedAddress = encodeURIComponent(venueAddress);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        addressDropdown.style.display = 'none';
    });

    openAppleMaps.addEventListener('click', function() {
        const encodedAddress = encodeURIComponent(venueAddress);
        window.open(`http://maps.apple.com/?address=${encodedAddress}`, '_blank');
        addressDropdown.style.display = 'none';
    });

    // Utility function to show copy alert
    function showCopyAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'copy-alert';
        alert.textContent = message;
        document.body.appendChild(alert);

        // Trigger reflow
        alert.offsetHeight;

        alert.classList.add('show');

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 2000);
    }

});