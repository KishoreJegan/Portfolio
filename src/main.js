const scrollVideo = document.querySelector('#scrollVideo');
const scrollContainer = document.querySelector('#scrollContainer');

if (!scrollVideo || !scrollContainer) {
  console.error('Video or container not found — check your HTML IDs');
}

function updateScrub() {
  if (!scrollVideo || !scrollContainer) return;

  const rect = scrollContainer.getBoundingClientRect();
  const maxScroll = rect.height - window.innerHeight;
  
  if (maxScroll <= 0) return;

  const scrollProgress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

  if (scrollVideo.duration && !isNaN(scrollVideo.duration)) {
    scrollVideo.currentTime = scrollProgress * scrollVideo.duration;
  }
}

window.addEventListener('scroll', updateScrub);

if (scrollVideo) {
  scrollVideo.addEventListener('loadedmetadata', () => {
    console.log('Video loaded, duration:', scrollVideo.duration);
    updateScrub();
  });
  // Trigger initial calculation
  updateScrub();
}
