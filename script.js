document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Player Logic
  const audio = document.getElementById('wedding-audio');
  const musicBtn = document.getElementById('music-toggle-btn');
  const musicText = document.getElementById('music-text');
  const iconContainer = document.getElementById('music-icon-container');

  if (audio && musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play()
          .then(() => {
            musicText.textContent = 'الموسيقى تعمل';
            iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9 2 9 2 15 6 15 11 19 11 5z"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
          })
          .catch(err => console.log("Playback blocked or failed:", err));
      } else {
        audio.pause();
        musicText.textContent = 'تشغيل الموسيقى';
        iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" x2="17" y1="9" y2="15"></line><line x1="17" x2="23" y1="9" y2="15"></line></svg>';
      }
    });
  }

  // 2. Dynamic Countdown Logic
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-minutes');
  const secsEl = document.getElementById('countdown-seconds');

  // Fallback to August 20 if no specific date was passed by the HTML
  const targetDate = window.countdownTargetDate || new Date('2026-08-20T17:00:00+01:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Run immediately on load, then update every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
});
