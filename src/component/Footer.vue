<template>
  <footer class="site-footer" ref="footerRef">
    <div class="footer-grid">

      <!-- COL 1: Heading + description + copyright -->
      <div class="footer-left">
        <h2 class="footer-heading">
          <span class="footer-regular">Get in </span><span class="footer-serif">Touch.</span>
        </h2>
        <p class="footer-sub">
          Are you in search of someone who's driven, team-oriented, and
          dedicated to building impactful digital experiences? Or perhaps just
          someone to chat with?
        </p>
        <p class="footer-copy-inline">
          Angeles City Pampanga, PH · © {{ year }} All Rights Reserved.
        </p>
      </div>

      <!-- COL 2: Social icons + email + availability -->
      <div class="footer-links">
        <div class="footer-social">
          <a href="https://linkedin.com" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" class="social-link" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
          </a>
          <a href="mailto:lapuzmicah30@gmail.com" class="social-link" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
        <a href="mailto:lapuzmicah30@gmail.com" class="footer-email">lapuzmicah30@gmail.com</a>
        <p class="footer-availability">Tuesday—Saturday</p>
        <p class="footer-availability">10am — 11pm</p>
      </div>

      <!-- COL 3: Nav links -->
      <div class="footer-right">
        <nav class="footer-nav" aria-label="Footer navigation">
          <RouterLink to="/"         class="footer-nav-link">Home</RouterLink>
          <RouterLink to="/projects" class="footer-nav-link">Projects</RouterLink>
          <RouterLink to="/about"    class="footer-nav-link">About</RouterLink>
          <RouterLink to="/resume"   class="footer-nav-link">Resume</RouterLink>
          <RouterLink to="/contact"  class="footer-nav-link">Contact</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const footerRef = ref<HTMLElement | null>(null)
const year = new Date().getFullYear()

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer?.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1 }
  )
  if (footerRef.value) observer.observe(footerRef.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.site-footer {
  position: relative; z-index: 20;
  background: rgba(255,255,255,0.018);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 4rem clamp(1.5rem, 8vw, 8rem) 3rem;
  font-family: 'Poppins', system-ui, sans-serif;
  /* Reveal animation */
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.site-footer.is-visible {
  opacity: 1; transform: translateY(0);
}

/* ── 3-column grid ──────────────────────────────────── */
.footer-grid {
  max-width: 1100px; margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1.2fr 0.6fr;
  gap: 3rem;
  align-items: start;
}

/* ── Col 1 ──────────────────────────────────────────── */
.footer-left {
  margin-left: -2em;
}
.footer-heading { margin: 0 0 0.75rem; line-height: 1.0; letter-spacing: -0.03em; }
.footer-regular {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700; color: #fff; display: inline;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.footer-serif {
  font-family: 'DM Serif Text', serif;
  font-style: italic; font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #c8b08a 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  display: inline-block; padding-right: 0.1em; padding-bottom: 0.1em; margin-bottom: -0.1em;
}
.footer-sub {
  font-size: 0.82rem; color: rgba(255,255,255,0.3);
  line-height: 1.7; font-weight: 300; margin: 0 0 1.5rem;
}
.footer-copy-inline {
  font-size: 0.68rem; color: rgba(255,255,255,0.18);
  letter-spacing: 0.04em; margin: 0;
}

/* ── Col 2 ──────────────────────────────────────────── */
.footer-social { display: flex; gap: 10px; margin-bottom: 1.25rem; }
.social-link {
  width: 38px; height: 38px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.25s;
}
.social-link:hover {
  border-color: rgba(103,128,31,0.5); color: #9ab23a;
  background: rgba(103,128,31,0.08); transform: translateY(-2px);
}
.footer-email {
  display: block; font-size: 0.85rem; font-weight: 500;
  color: rgba(255,255,255,0.6); text-decoration: none;
  margin-bottom: 0.75rem; transition: color 0.2s;
}
.footer-email:hover { color: #fff; }
.footer-availability {
  font-size: 0.72rem; color: rgba(255,255,255,0.25);
  letter-spacing: 0.02em; margin: 0 0 0.15rem;
}

/* ── Col 3: nav ─────────────────────────────────────── */
.footer-right {
  margin-right: -2rem;
}

.footer-nav {
  display: flex; flex-direction: column; gap: 0.6rem;
  align-items: flex-end;
}

.footer-nav-link {
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-nav-link:hover { color: rgba(255,255,255,0.8); }
.footer-nav-link.router-link-active { color: rgba(255,255,255,0.6); }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .footer-left {
    margin-left: 0;
  }

  .footer-right {
    margin-right: 0;
  }

  .footer-nav { align-items: flex-start; flex-direction: row; flex-wrap: wrap; gap: 0.75rem 1.5rem; }
}
</style>