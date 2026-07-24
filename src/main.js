import Lenis from 'lenis';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const scrollVideo = document.querySelector('#scrollVideo');
const scrollContainer = document.querySelector('#scrollContainer');

function updateVideoScrub() {
  if (!scrollVideo || !scrollContainer) return;

  const rect = scrollContainer.getBoundingClientRect();
  const maxScroll = rect.height - window.innerHeight;

  if (maxScroll <= 0) return;

  // Calculate progress from 0 (top of container) to 1 (bottom of container)
  const currentScroll = -rect.top;
  const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

  if (scrollVideo.duration && !isNaN(scrollVideo.duration)) {
    scrollVideo.currentTime = progress * scrollVideo.duration;
  }
}

if (scrollVideo) {
  scrollVideo.addEventListener('loadedmetadata', updateVideoScrub);
  scrollVideo.load();
}

window.addEventListener('scroll', updateVideoScrub);
lenis.on('scroll', updateVideoScrub);
