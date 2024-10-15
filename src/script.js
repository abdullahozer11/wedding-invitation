document.addEventListener('DOMContentLoaded', function() {
    const soundToggle = document.getElementById('soundToggle');
    const video = document.getElementById('invitationVideo');

    soundToggle.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});
