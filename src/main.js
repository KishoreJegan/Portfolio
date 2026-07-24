import Lenis from 'lenis';

const TOTAL_FRAMES = 300;
const canvas  = document.getElementById('animation-canvas');
const ctx     = canvas.getContext('2d');
const progressBar = document.getElementById('progress-bar');
const preloader   = document.getElementById('preloader');

const images = new Array(TOTAL_FRAMES).fill(null);
let loadedCount  = 0;
let currentFrame = 0;   // lerped frame (smooth)
let targetFrame  = 0;   // raw frame from scroll
let lastRendered = -1;
let lenisScroll  = 0;   // virtual scroll value from Lenis

// ── Lenis smooth-scroll ───────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Lenis fires this with its own virtual scroll position
lenis.on('scroll', ({ scroll }) => {
  lenisScroll = scroll;
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// ── Canvas sizing (retina aware) ──────────────────────────────────────────
const dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width  = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  ctx.scale(dpr, dpr);
  lastRendered = -1;
  drawFrame(Math.round(currentFrame));
}
window.addEventListener('resize', resizeCanvas);

// ── Draw a single frame (object-fit: contain math) ────────────────────────
function drawFrame(idx) {
  const clampedIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, idx));
  const img = images[clampedIdx];
  if (!img || !img.complete || img.naturalWidth === 0) return;

  const W = window.innerWidth;
  const H = window.innerHeight;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, W, H);

  const imgAspect    = img.naturalWidth / img.naturalHeight;
  const screenAspect = W / H;
  let dw, dh, dx, dy;

  if (screenAspect > imgAspect) {
    dh = H; dw = H * imgAspect; dx = (W - dw) / 2; dy = 0;
  } else {
    dw = W; dh = W / imgAspect; dx = 0; dy = (H - dh) / 2;
  }

  ctx.drawImage(img, dx, dy, dw, dh);
  lastRendered = clampedIdx;
}

// ── Preload all frames ────────────────────────────────────────────────────
function preloadImages() {
  const done = [];
  let firstDrawn = false;

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const p = new Promise((resolve) => {
      const img = new Image();
      img.src = `/animation/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

      img.onload = () => {
        images[i] = img;
        loadedCount++;
        progressBar.style.width = `${(loadedCount / TOTAL_FRAMES) * 100}%`;
        // Draw frame 0 as soon as it's ready
        if (!firstDrawn && i === 0) { firstDrawn = true; drawFrame(0); }
        resolve();
      };
      img.onerror = () => { loadedCount++; resolve(); };
    });
    done.push(p);
  }

  Promise.all(done).then(() => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      drawFrame(Math.round(currentFrame));
    }, 200);
  });
}

// ── Main animation loop ───────────────────────────────────────────────────
// scroll position (from Lenis) → frame index → lerped draw
function animLoop() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollable > 0) {
    const progress = Math.min(1, Math.max(0, lenisScroll / scrollable));
    targetFrame = progress * (TOTAL_FRAMES - 1);
  }

  // Lerp for smoothness between integer frame jumps
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.05) {
    currentFrame += diff * 0.15;
  } else {
    currentFrame = targetFrame;
  }

  const rounded = Math.round(currentFrame);
  if (rounded !== lastRendered) {
    drawFrame(rounded);
  }

  requestAnimationFrame(animLoop);
}

// ── Boot ──────────────────────────────────────────────────────────────────
resizeCanvas();
preloadImages();
animLoop();
