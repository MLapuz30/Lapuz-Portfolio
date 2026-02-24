<script setup lang="ts">

import { ref, onMounted, type Ref } from 'vue';
import ScrollStack from '../component/ScrollStack.vue';
import { ScrollStackItem } from '../component/ScrollStack.vue';
import Footer from '../component/Footer.vue';
import CountUp from '../component/CountUp.vue';

const projects = [
  {
    id: 1,
    tags: ['Vue', 'Nuxt', 'Tailwind','Digital Ocean'],
    title: 'Buffs Chicken',
    description: 'Designed and developed a fully functional e-commerce website for a food startup, featuring a seamless ordering experience, secure checkout flow, and SEO optimization. Led the creation of conversion-focused frontend and UI/UX designs.',
    year: '2026',
    link: '',
  },
  {
    id: 2,
    tags: ['Angular', 'Tailwind', 'Netlify'],
    title: 'Code Geeks',
    description: 'An informational website for a student organization, leading both frontend development and UI/UX design. Focused on clear content structure, responsive layouts, and accessible navigation to effectively communicate the organization’s mission, activities, and community presence.',
    year: '2025',
  },
  {
    id: 3,
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    title: 'Ben Ibe',
    description: 'Led the frontend development and UI/UX design for a flower shop e-commerce order system, creating an intuitive ordering flow, responsive interfaces, and a visually engaging shopping experience. Focused on usability, performance, and seamless customer interactions to support efficient order processing and conversions.',
    year: '2025',
    link: '',
  },
  {
    id: 4,
    tags: ['Vue', 'Node.js', 'Tailwind', 'MongoDB'],
    title: 'SplitSmart',
    description: 'Collaborate a group expense-tracking web application, leading frontend development and UI/UX design with a strong focus on intuitive workflows, responsive layouts, and clear data presentation. Designed the interface to simplify shared expense management and enhance usability across devices.',
    year: '2024',
    link: '',
  },
];

const testimonials = [
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5
  }
];

// ─── Spotlight logic ──────────────────────────────────────────────────────────
interface SpotlightState {
  position: { x: number; y: number };
  opacity: number;
  focused: boolean;
}

const spotlightStates = ref(
  testimonials.map(() => ({ position: { x: 0, y: 0 }, opacity: 0, focused: false }))
) as Ref<SpotlightState[]>;

const cardRefs = ref<(HTMLDivElement | null)[]>([]);

const getSpotlight = (idx: number): SpotlightState =>
  spotlightStates.value[idx] ?? { position: { x: 0, y: 0 }, opacity: 0, focused: false };

const setOpacity = (idx: number, val: number) => {
  const state = spotlightStates.value[idx];
  if (state) state.opacity = val;
};

const handleSpotlightMove = (e: MouseEvent, idx: number) => {
  const el = cardRefs.value[idx];
  const state = spotlightStates.value[idx];
  if (!el || !state || state.focused) return;
  const rect = el.getBoundingClientRect();
  state.position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

const bannerVisible = ref(false);
onMounted(() => setTimeout(() => { bannerVisible.value = true; }, 100));
</script>

<template>
  <div class="page-root">
    <ScrollStack
      :item-distance="120"
      :item-scale="0.03"
      :item-stack-distance="28"
      stack-position="18%"
      scale-end-position="8%"
      :base-scale="0.88"
    >

      <!-- BANNER -->
      <section class="banner">
        <div class="banner-bg">
          <div class="banner-orb banner-orb-1" />
          <div class="banner-orb banner-orb-2" />
          <div class="banner-orb banner-orb-3" />
          <div class="banner-noise" />
        </div>
        <div class="banner-content" :class="{ visible: bannerVisible }">
          <div class="banner-eyebrow">
            <span class="eyebrow-dot" />
            Selected Work
          </div>
          <h1 class="banner-title">
            <span class="title-line">Things I've</span>
            <span class="title-line title-accent"><em>Built</em>&amp; <em>Designed</em></span>
          </h1>
          <p class="banner-desc">
            A curated collection of projects across product design,
            front-end engineering, and creative direction.
          </p>
          <div class="banner-stats">
            <div class="stat">
              <span class="stat-num">
                <CountUp :to="4" :duration="1.2" />+
              </span>
              <span class="stat-label">Projects delivered</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">
                <CountUp :to="1" :duration="1.2" />
              </span>
              <span class="stat-label">Years of Experience</span>
            </div>
            <div class="stat-divider" />
            <div class="stat">
              <span class="stat-num">
                <CountUp :to="98" :duration="1.2" />%
              </span>
              <span class="stat-label">Client satisfaction</span>
            </div>
          </div>
        </div>
        <div class="banner-scroll-hint">
          <span>Scroll to explore</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </section>

      <!-- Projects heading -->
      <div class="projects-heading">
        <span class="section-label">/ Projects</span>
      </div>

      <!-- STACK CARDS -->
      <ScrollStackItem
        v-for="project in projects"
        :key="project.id"
        item-class-name="project-card"
      >
        <RouterLink :to="project.link" class="project-card-inner">
          <div class="project-info">
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <h2 class="project-title">{{ project.title }}</h2>
            <p class="project-desc">{{ project.description }}</p>
            <div class="project-footer">
              <span class="project-year">{{ project.year }}</span>
              <span class="project-cta">
                View case study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
          <div class="project-preview">
            <div
              class="preview-glow"
              :style="{
                background: `radial-gradient(circle at 50% 50%, ${project.id % 2 === 1 ? '#67801F99' : '#E0C0C099'}, transparent 80%)`
              }"
            ></div>
            <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <template v-if="project.id === 1">
                <img src="/BuffsChicken.webp" alt="Buffs Chicken" class="unified-project-img" />
              </template>
              <template v-else-if="project.id === 2">
                <img src="/CodeGeeks.webp" alt="Code Geeks" class="unified-project-img" />
              </template>
              <template v-else-if="project.id === 3">
                <img src="/BenIbe.webp" alt="Ben Ibe" class="unified-project-img" />
              </template>
              <template v-else-if="project.id === 4">
                <img src="/SplitSmart.webp" alt="SplitSmart" class="unified-project-img" />
              </template>
            </div>
          </div>
        </RouterLink>
      </ScrollStackItem>

      <!-- TESTIMONIALS -->
      <section class="testimonials-section">
        <div class="testimonials-header">
          <span class="section-label">/ Kind words</span>
          <h2 class="testimonials-title">
            What collaborators <em>say</em>
          </h2>
          <p class="testimonials-sub">Feedback from collaborators, clients, and leads.</p>
        </div>
        <div class="testimonials-grid">
          <div
            v-for="(t, idx) in testimonials"
            :key="t.name"
            ref="cardRefs"
            class="spotlight-card"
            @mousemove="handleSpotlightMove($event, idx)"
            @mouseenter="setOpacity(idx, 0.6)"
            @mouseleave="setOpacity(idx, 0)"
          >
            <div
              class="spotlight-layer"
              :style="{
                opacity: getSpotlight(idx).opacity,
                background: `radial-gradient(circle at ${getSpotlight(idx).position.x}px ${getSpotlight(idx).position.y}px, rgba(236,100,160,0.15), transparent 75%)`
              }"
            />
            <div class="stars">
              <svg v-for="s in t.rating" :key="s" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.765l-3.09 1.735.59-3.43L2 4.635l3.455-.505z" fill="#ec64a0"/>
              </svg>
            </div>
            <blockquote class="testimonial-quote">"{{ t.quote }}"</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar">{{ t.avatar }}</div>
              <div class="author-info">
                <span class="author-name">{{ t.name }}</span>
                <span class="author-role">{{ t.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER — lives inside ScrollStack so Lenis scrolls it into view.
           Negative margin breaks out of ScrollStack's px-20 padding so
           the footer spans full viewport width, same trick as .banner. -->
      <div class="footer-breakout">
        <Footer />
      </div>

    </ScrollStack>
  </div>
</template>

<style scoped>
/* ── Base ───────────────────────────────────────────── */
.page-root {
  height: 100vh;
  overflow: hidden;
  background: #0e0c0b;
  color: #fff;
  font-family: 'Poppins', system-ui, sans-serif;
}

/* ── Banner ─────────────────────────────────────────── */
.banner {
  position: relative;
  margin-top: -20vh;
  min-height: 100vh;
  /* Full-width breakout: escape any narrow slot container */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 5vw 4rem;
  box-sizing: border-box;
}

.banner-bg { position: absolute; inset: 0; pointer-events: none; }

/* Noise texture — matches about page */
.banner-noise {
  position: absolute; inset: 0; opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}

/* Olive + blush/pink orbs — green & pink palette */
.banner-orb {
  position: absolute; border-radius: 50%;
  filter: blur(110px);
}
.banner-orb-1 {
  width: 580px; height: 580px;
  background: radial-gradient(circle, rgba(103,128,31,0.22), transparent 70%);
  top: -80px; left: -60px;
  animation: orb1 18s ease-in-out infinite;
}
.banner-orb-2 {
  width: 440px; height: 440px;
  background: radial-gradient(circle, rgba(223, 139, 175, 0.13), transparent 80%);
  bottom: 0; right: -40px;
  animation: orb2 22s ease-in-out infinite;
}
.banner-orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(103,128,31,0.1), transparent 70%);
  top: 50%; left: 50%;
  animation: orb1 28s ease-in-out infinite reverse;
}
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-28px,35px)} }

.banner-content {
  position: relative; text-align: center;
  width: 100%; max-width: 100%;
  overflow: visible;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}
.banner-content.visible { opacity: 1; transform: translateY(0); }

/* Eyebrow pill — pink tint added */
.banner-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.68rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #e0c0c0; 
  margin-bottom: 3rem;
  margin-top: 5rem;
  padding: 6px 16px;
  border: 1px solid #e0c0c0;
  border-radius: 999px;
  background: rgba(236,100,160,0.07);
  font-family: 'Poppins', sans-serif;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #e0c0c0;
  box-shadow: 0 0 8px rgba(236,100,160,0.6);
  animation: orbPulse 2.5s ease-in-out infinite;
}
@keyframes orbPulse {
  0%,100% { transform: scale(1); opacity: 0.7; }
  50%      { transform: scale(1.5); opacity: 1; }
}

/* Title — Poppins bold + DM Serif italic accent like hero */
.banner-title {
  display: flex; flex-direction: column;
  font-size: clamp(3.5rem, 10vw, 5rem);
  font-weight: 700; line-height: 1.12;
  letter-spacing: -0.03em; margin: 0 0 1.5rem;
  /* enough room for italic descenders */
  padding-bottom: 0.25em;
}
.title-line {
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

/* "Built & Designed" — italic "Designed" uses DM Serif + pink-blush gradient */
.title-accent {
  font-family: 'Poppins', sans-serif;
  color: #fff;
}
.title-accent em {
  font-family: 'DM Serif Text', serif;
  font-style: italic; font-weight: 400;
  font-size: 1.1em;
  letter-spacing: -0.04em;
  /* Green → blush → pink gradient */
  background: linear-gradient(135deg, #b8d44a 0%, #e0c0c0 50%, #e0c0c0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  padding-right: 0.2em;
  padding-bottom: 0.2em;
  margin-bottom: -0.2em;
}

.banner-desc {
  font-size: 0.97rem; line-height: 1.8;
  color: rgba(255,255,255,0.4); margin: 0 0 3rem;
  font-weight: 300;
}

/* Stats bar — matches about page stat-item treatment */
.banner-stats {
  display: inline-flex; align-items: center; gap: 2rem;
  padding: 1.4rem 2.5rem;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(12px);
}
.stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-num {
  font-family: 'DM Serif Text', serif;
  font-style: italic; font-size: 2rem; font-weight: 400;
  color: #e0c0c0; line-height: 1;
}
.stat-label {
  font-size: 0.62rem; color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.09em;
}
.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.06); }

.banner-scroll-hint {
  position: absolute; bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 8px;
  font-size: 0.65rem; color: rgba(255,255,255,0.2);
  letter-spacing: 0.1em; text-transform: uppercase;
  animation: bounce 2.5s ease-in-out infinite;
}
@keyframes bounce {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(6px); }
}

/* ── Section labels ─────────────────────────────────── */
.section-label {
  font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  font-family: 'Poppins', sans-serif;
}
.projects-heading {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

/* ── Project Cards ──────────────────────────────────── */
:deep(.project-card) {
  background: #100f0e !important;
  border: 1px solid rgba(255,255,255,0.07) !important;
  height: 500px !important;
  border-radius: 28px !important;
  padding: 0 !important;
  overflow: hidden !important;
  width: 80% !important;
  margin: auto;
}
.project-card-inner {
  display: flex; width: 100%; height: 100%;
  text-decoration: none; color: inherit;
}
.project-info {
  flex: 0 0 45%;
  display: flex; flex-direction: column; justify-content: center;
  padding: 3rem;
  border-right: 1px solid rgba(255,255,255,0.05);
}

/* Tags — olive style matching about page */
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.25rem; }
.tag {
  font-size: 0.62rem; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  padding: 5px 12px;
  border: 1px solid rgba(103,128,31,0.3);
  border-radius: 999px;
  background: rgba(103,128,31,0.08);
  transition: border-color 0.25s, background 0.25s, color 0.25s;
}
.project-card-inner:hover .tag {
  border-color: rgba(103,128,31,0.55);
  background: rgba(103,128,31,0.16);
  color: #fff;
}

.project-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.9rem; font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1;
  margin: 0 0 1rem; color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.project-desc {
  font-size: 0.9rem; line-height: 1.75;
  color: rgba(255,255,255,0.4); margin: 0 0 2rem; flex: 1;
  font-weight: 300;
}
.project-footer { display: flex; align-items: center; justify-content: space-between; }
.project-year {
  font-size: 0.65rem; color: rgba(255,255,255,0.2);
  letter-spacing: 0.09em; text-transform: uppercase;
}

/* CTA link — pink */
.project-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.78rem; font-weight: 600; color: #ec64a0;
  letter-spacing: 0.02em;
  transition: gap 0.25s, color 0.25s;
}
.project-card-inner:hover .project-cta { gap: 10px; color: #f4a0c0; }

.project-preview {
  flex: 1; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
}
.preview-glow { position: absolute; inset: 0; pointer-events: none; }
.preview-mock {
  position: relative; z-index: 2; width: 100%; max-width: 320px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px; overflow: hidden;
  backdrop-filter: blur(8px);
}
.mock-bar {
  display: flex; align-items: center; gap: 5px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.mock-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); }
.mock-body { display: flex; }
.mock-sidebar {
  flex: 0 0 35%; padding: 12px;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex; flex-direction: column; gap: 8px;
}
.mock-main { flex: 1; padding: 12px; }
.mock-hero {
  width: 100%; height: 56px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.mock-hero-dot { width: 18px; height: 18px; border-radius: 50%; opacity: 0.7; }
.mock-line { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.07); }

/* ── Testimonials ───────────────────────────────────── */
.testimonials-section { padding: 6rem 0 8rem; }
.testimonials-header { text-align: center; margin-bottom: 4rem; }

.testimonials-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700; letter-spacing: -0.03em; margin: 1rem 0;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

/* "say" uses DM Serif italic + blush gradient, mirroring "Micah" / "Touch." */
.testimonials-title em {
  font-family: 'DM Serif Text', serif;
  font-style: italic; font-weight: 400;
  font-size: 1.15em; letter-spacing: -0.04em;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #c8b08a 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.testimonials-sub {
  font-size: 0.88rem; color: rgba(255,255,255,0.28);
  max-width: 400px; margin: 0 auto; line-height: 1.6;
  font-weight: 300;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
/* ── Tablet (≤1024px) ───────────────────────────────── */
@media (max-width: 1024px) {
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }

  :deep(.project-card) {
    width: 90% !important;
    height: 520px !important;
  }
  .project-title { font-size: 1.6rem; }
  .project-info { padding: 2rem; }
}

/* ── Mobile (≤768px) ────────────────────────────────── */
@media (max-width: 768px) {
  /* Project cards: stack vertically, full width, auto height */
  :deep(.project-card) {
    width: 100% !important;
    height: auto !important;
    border-radius: 20px !important;
  }
  .project-card-inner {
    flex-direction: column;
  }
  .project-info {
    flex: none;
    padding: 1.75rem 1.5rem 1.25rem;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .project-title { font-size: 1.45rem; }
  .project-desc { font-size: 0.85rem; margin-bottom: 1.25rem; }

  /* Preview: shorter on mobile since it's below the text */
  .project-preview {
    min-height: 160px;
    padding: 1.25rem;
  }
  .preview-mock { max-width: 260px; }

  /* Testimonials: 1 column */
  .testimonials-grid { grid-template-columns: 1fr; }
  .testimonials-section { padding: 3rem 0 5rem; }
  .testimonials-header { margin-bottom: 2.5rem; }
  .spotlight-card { padding: 1.5rem; }
  .testimonial-quote { font-size: 0.88rem; margin-bottom: 1.25rem; }

  /* Banner stats: tighter */
  .banner-stats {
    gap: 1rem;
    padding: 1rem 1.25rem;
  }
  .stat-num { font-size: 1.6rem; }
  .stat-divider { height: 28px; }

  /* Section heading */
  .projects-heading { margin-top: 1rem; margin-bottom: 2rem; }
}

/* ── Small mobile (≤480px) ──────────────────────────── */
@media (max-width: 480px) {
  :deep(.project-card) {
    border-radius: 16px !important;
  }
  .project-info { padding: 1.25rem 1.25rem 1rem; }
  .project-title { font-size: 1.25rem; }
  .project-desc { font-size: 0.82rem; }
  .project-preview { min-height: 130px; padding: 1rem; }
  .preview-mock { max-width: 220px; }

  /* Banner stats: wrap if needed */
  .banner-stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem 1.5rem;
    padding: 1rem;
  }
  .stat-divider { display: none; }

  .spotlight-card { padding: 1.25rem; border-radius: 16px; }
  .testimonial-quote { font-size: 0.85rem; }
}

/* ── Spotlight Card ─────────────────────────────────── */
.spotlight-card {
  position: relative; border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden; padding: 2rem;
  background: rgba(255,255,255,0.02);
  transition: border-color 0.3s ease, transform 0.3s ease;
  cursor: default;
}
.spotlight-card:hover {
  border-color: #e0c0c0;
  transform: translateY(-2px);
}
.spotlight-layer {
  pointer-events: none; position: absolute; inset: 0;
  transition: opacity 0.4s ease;
}

/* Stars — pink */
.stars { display: flex; gap: 3px; margin-bottom: 1.25rem; }

.testimonial-quote {
  font-size: 0.93rem; line-height: 1.75;
  color: rgba(255,255,255,0.5); font-style: italic;
  margin: 0 0 1.75rem; position: relative; z-index: 1;
  font-weight: 300;
}
.testimonial-author {
  display: flex; align-items: center; gap: 12px;
  position: relative; z-index: 1;
}

/* Avatar — olive/blush gradient instead of green/pink */
.author-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, #67801F, #c8b08a);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.68rem; font-weight: 700; color: #fff; flex-shrink: 0;
}
.author-info { display: flex; flex-direction: column; gap: 2px; }
.author-name { font-size: 0.875rem; font-weight: 600; color: #fff; }
.author-role { font-size: 0.68rem; color: rgba(255,255,255,0.28); }

/* ── Footer full-width breakout ─────────────────────── */
/* ScrollStack's inner wrapper has px-20 (80px each side).
   This wrapper escapes it so the footer spans 100vw. */
.footer-breakout {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

</style>

