document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const soundToggle = document.getElementById('soundToggle');
    const video = document.getElementById('invitationVideo');
    const languageIcon = document.getElementById('languageIcon');
    let isEnglish = true;

    languageToggle.addEventListener('click', function() {
        isEnglish = !isEnglish;
        if (isEnglish) {
            video.src = 'english_invitation.mp4';
            languageIcon.src = 'images/tr.png';
            languageIcon.alt = 'Turkish';
        } else {
            video.src = 'turkish_invitation.mp4';
            languageIcon.src = 'gb.png';
            languageIcon.alt = 'English';
        }
        video.load();
        video.play();
    });

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
