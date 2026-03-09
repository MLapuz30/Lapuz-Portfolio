<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import ScrollStack from '../component/ScrollStack.vue';
import { ScrollStackItem } from '../component/ScrollStack.vue';
import Footer from '../component/Footer.vue';
import CountUp from '../component/CountUp.vue';
import Stack from '../component/Stack.vue';

// ─── Stack motion images ──────────────────────────────────────────────────────
// Loaded from /public/works/ — displayed in the draggable Stack component
const stackImages = [
  { id: 1,  img: '/works/works1.png' },
  { id: 2,  img: '/works/works2.png' },
  { id: 3,  img: '/works/works3.png' },
  { id: 4,  img: '/works/works4.png' },
  { id: 5,  img: '/works/works5.png' },
  { id: 6,  img: '/works/works6.png' },
  { id: 7,  img: '/works/works7.png' },
  { id: 8,  img: '/works/works8.png' },
  { id: 9,  img: '/works/works9.png' },
  { id: 10, img: '/works/works10.png' },
  { id: 11, img: '/works/works11.png' },
];

// ─── Project data ─────────────────────────────────────────────────────────────
// Each entry maps to one ScrollStackItem card.
// `link` routes to the project detail page via RouterLink.
const projects = [
  {
    id: 1,
    tags: ['Vue', 'Nuxt', 'Tailwind', 'Digital Ocean'],
    title: 'Buffs Chicken',
    description: 'Buffs Chicken is a web-based e-commerce platform for a food startup, built with responsive layouts, intuitive navigation, and clear presentation of products and orders. Designed to provide a seamless ordering experience, secure checkout, and optimized SEO functionality for better search visibility across devices.',
    year: '2026',
    link: '/projects/buffs-chicken',
  },
  {
    id: 2,
    tags: ['Angular', 'Tailwind', 'Netlify'],
    title: 'Code Geeks',
    description: 'Code Geeks is an informational website for a student organization, featuring responsive layouts, intuitive navigation, and clear content presentation. Designed to effectively communicate the organization\'s mission, activities, and community presence while ensuring accessibility across devices.',
    year: '2025',
    link: '/projects/code-geeks',
  },
  {
    id: 3,
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    title: 'Ben Ibe',
    description: 'Ben Ibe is a web-based e-commerce order system for a flower shop, designed with responsive layouts, intuitive navigation, and clear presentation of products and orders. Built to streamline the ordering process, enhance usability, and provide a smooth, visually engaging shopping experience across devices.',
    year: '2025',
    link: '/projects/ben-ibe',
  },
  {
    id: 4,
    tags: ['Vue', 'Node.js', 'Tailwind', 'MongoDB'],
    title: 'SplitSmart',
    description: 'SplitSmart is a web-based application that simplifies group expense tracking and bill splitting. Built with responsive layouts, intuitive navigation, and clear presentation of expenses, payments, and balances. Designed to streamline shared financial management and enhance usability across devices.',
    year: '2025',
    link: '/projects/splitsmart',
  },
  {
    id: 5,
    tags: ['HTML', 'CSS', 'JavaScript'],
    title: "Runner's High",
    description: "Runner's High is a static running club website, focused on delivering an engaging online hub for runners. Built with responsive layouts, intuitive navigation, and clear presentation of group runs, training resources, and community events. Designed to help runners of all levels track activities, stay motivated, and connect with the club efficiently across devices.",
    year: '2023',
    link: '/projects/runners-high',
  },
];

// ─── Testimonials data ────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
  {
    name: 'Name',
    role: 'Position',
    avatar: 'N/A',
    quote: 'Lorem ipsum dolor sit amet. Et voluptas perferendis qui velit neque aut repellendus facere cum voluptas amet sit dolor nemo!',
    rating: 5,
  },
];

// ─── Spotlight effect logic ───────────────────────────────────────────────────
// Tracks per-card mouse position and opacity for the radial gradient spotlight.
interface SpotlightState {
  position: { x: number; y: number };
  opacity: number;
  focused: boolean;
}

// One spotlight state object per testimonial card
const spotlightStates = ref(
  testimonials.map(() => ({ position: { x: 0, y: 0 }, opacity: 0, focused: false }))
) as Ref<SpotlightState[]>;

// Template refs for each testimonial card DOM element
const cardRefs = ref<(HTMLDivElement | null)[]>([]);

/** Returns the spotlight state for a given card index (safe fallback). */
const getSpotlight = (idx: number): SpotlightState =>
  spotlightStates.value[idx] ?? { position: { x: 0, y: 0 }, opacity: 0, focused: false };

/** Sets the spotlight opacity on mouseenter (0.6) and mouseleave (0). */
const setOpacity = (idx: number, val: number) => {
  const state = spotlightStates.value[idx];
  if (state) state.opacity = val;
};

/**
 * Updates the spotlight radial gradient origin to follow the cursor
 * relative to the hovered card's bounding box.
 */
const handleSpotlightMove = (e: MouseEvent, idx: number) => {
  const el = cardRefs.value[idx];
  const state = spotlightStates.value[idx];
  if (!el || !state || state.focused) return;
  const rect = el.getBoundingClientRect();
  state.position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
};

// ─── Banner entrance animation ────────────────────────────────────────────────
// Triggers CSS transition from opacity:0 → opacity:1 after mount
const bannerVisible = ref(false);

// ─── Responsive Stack card dimensions ────────────────────────────────────────
const stackCardSize = ref({ width: 400, height: 400 });

function updateStackSize() {
  const w = window.innerWidth;
  if (w <= 480) {
    // Fluid: fill most of screen width, capped at 320px
    const size = Math.min(w - 40, 320);
    stackCardSize.value = { width: size, height: size };
  } else if (w <= 768) {
    stackCardSize.value = { width: 340, height: 340 };
  } else if (w <= 1024) {
    // Bigger on tablet — closer to desktop size
    stackCardSize.value = { width: 400, height: 400 };
  } else {
    stackCardSize.value = { width: 400, height: 400 };
  }
}

onMounted(() => {
  setTimeout(() => { bannerVisible.value = true; }, 100);
  updateStackSize();
  window.addEventListener('resize', updateStackSize);
});

onUnmounted(() => window.removeEventListener('resize', updateStackSize));
</script>

<template>
  <!-- ===================================================
       WORKS PAGE ROOT
       Full-page scroll container. Overflow hidden so
       Lenis smooth scroll controls all scrolling.
  =================================================== -->
  <div class="page-root" role="main">
    <ScrollStack
      :item-distance="120"
      :item-scale="0.03"
      :item-stack-distance="28"
      stack-position="18%"
      scale-end-position="8%"
      :base-scale="0.88"
    >

      <!-- ══════════════════════════════════════════════
           BANNER SECTION
           Hero area for the Works page. Full-viewport,
           centered content with animated orb background,
           headline, description, and stats bar.
      ══════════════════════════════════════════════ -->
      <section
        class="banner"
        aria-labelledby="works-heading"
        itemscope
        itemtype="https://schema.org/CollectionPage"
      >
        <!-- Decorative animated background orbs -->
        <div class="banner-bg" aria-hidden="true">
          <div class="banner-orb banner-orb-1" />
          <div class="banner-orb banner-orb-2" />
          <div class="banner-orb banner-orb-3" />
        </div>

        <!-- Main banner -->
        <div
          class="banner-content"
          :class="{ visible: bannerVisible }"
          itemprop="description"
        >
          <!-- Eyebrow pill label -->
          <div class="banner-eyebrow" aria-label="Section: Selected Work">
            <span class="eyebrow-dot" aria-hidden="true" />
            Selected Work
          </div>

          <!-- Primary page heading -->
          <h1 id="works-heading" class="banner-title" itemprop="name">
            <span class="title-line">Things I've</span>
            <span class="title-line title-accent">
              <em>Built</em>&amp; <em>Designed</em>
            </span>
          </h1>

          <!-- Page description -->
          <p class="banner-desc">
            A curated collection of projects across product design,
            front-end engineering, and creative direction.
          </p>

          <!-- Animated stats bar — countup numbers on scroll-into-view -->
          <div
            class="banner-stats"
            role="list"
            aria-label="Career statistics"
          >
            <!-- Stat 1: Projects delivered -->
            <div class="stat" role="listitem" aria-label="4+ projects delivered">
              <span class="stat-num" aria-hidden="true">
                <CountUp :to="4" :duration="1.2" />+
              </span>
              <span class="stat-label">Projects delivered</span>
            </div>

            <div class="stat-divider" aria-hidden="true" />

            <!-- Stat 2: Years of experience -->
            <div class="stat" role="listitem" aria-label="3 years of experience">
              <span class="stat-num" aria-hidden="true">
                <CountUp :to="3" :duration="1.2" />
              </span>
              <span class="stat-label">Years of Experience</span>
            </div>

            <div class="stat-divider" aria-hidden="true" />

            <!-- Stat 3: Client satisfaction -->
            <div class="stat" role="listitem" aria-label="98% client satisfaction">
              <span class="stat-num" aria-hidden="true">
                <CountUp :to="98" :duration="1.2" />%
              </span>
              <span class="stat-label">Client satisfaction</span>
            </div>
          </div>
        </div>

        <!-- Scroll hint — bouncing arrow indicator at bottom of banner -->
        <div class="banner-scroll-hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M8 3v10M3 8l5 5 5-5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </section>

      <!-- Section label above the project cards stack -->
      <div class="projects-heading" aria-hidden="true">
        <span class="section-label">/ Projects</span>
      </div>

      <!-- ══════════════════════════════════════════════
           PROJECT CARDS (ScrollStack items)
           Each card links to its detail page and displays
           title, tags, description, year, and a preview image.
      ══════════════════════════════════════════════ -->
      <ScrollStackItem
        v-for="project in projects"
        :key="project.id"
        item-class-name="project-card"
      >
        <!-- RouterLink wraps the entire card for full-card click area -->
        <RouterLink
          :to="project.link ?? ''"
          class="project-card-inner"
          :aria-label="`View project: ${project.title} (${project.year})`"
          itemprop="url"
        >
          <!-- Left: project metadata and description -->
          <div class="project-info">

            <!-- Technology/stack tags -->
            <ul
              class="project-tags"
              aria-label="Technologies used"
              role="list"
            >
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="tag"
                role="listitem"
              >
                {{ tag }}
              </li>
            </ul>

            <!-- Project title -->
            <h2
              class="project-title"
              itemprop="name"
            >
              {{ project.title }}
            </h2>

            <!-- Project description -->
            <p
              class="project-desc"
              itemprop="description"
            >
              {{ project.description }}
            </p>

            <div class="project-footer">
              <!-- Year completed -->
              <time
                class="project-year"
                :datetime="project.year"
                itemprop="datePublished"
              >
                {{ project.year }}
              </time>

              <!-- View project CTA with directional arrow icon -->
              <span class="project-cta" aria-hidden="true">
                View project
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3 8h10M8 3l5 5-5 5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <!-- Right: project preview image with decorative glow -->
          <div class="project-preview" aria-hidden="true">
            <!-- Radial glow behind the preview image — alternates olive/blush per project -->
            <div
              class="preview-glow"
              :style="{
                background: `radial-gradient(circle at 50% 50%, ${project.id % 2 === 1 ? '#67801F99' : '#E0C0C099'}, transparent 80%)`
              }"
            ></div>

            <div style="position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
              <!-- Project preview images — each keyed to project id for precise control -->
              <template v-if="project.id === 1">
                <img
                  src="/buffschicken.png"
                  alt="Buffs Chicken e-commerce platform"
                  class="unified-project-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </template>
              <template v-else-if="project.id === 2">
                <img
                  src="/codegeeks.png"
                  alt="Code Geeks student organization website"
                  class="unified-project-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </template>
              <template v-else-if="project.id === 3">
                <img
                  src="/BenIbe.webp"
                  alt="Ben Ibe flower shop order system"
                  class="unified-project-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </template>
              <template v-else-if="project.id === 4">
                <img
                  src="/SplitSmart.webp"
                  alt="SplitSmart group expense tracking app"
                  class="unified-project-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </template>
              <template v-else-if="project.id === 5">
                <img
                  src="/runnershigh.png"
                  alt="Runner's High running club website"
                  class="unified-project-img"
                  loading="lazy"
                  width="400"
                  height="300"
                />
              </template>
            </div>
          </div>
        </RouterLink>
      </ScrollStackItem>

      <!-- ══════════════════════════════════════════════
           STACK MOTION IMAGE SECTION
           Interactive draggable image stack component
           showcasing additional work samples.
      ══════════════════════════════════════════════ -->
      <div
        class="stack-wrapper"
        aria-label="Interactive gallery of work samples"
        role="region"
      >
        <Stack
          :randomRotation="true"
          :sensitivity="180"
          :sendToBackOnClick="false"
          :cardDimensions="stackCardSize"
          :cardsData="stackImages"
        />
      </div>

      <!-- ══════════════════════════════════════════════
           TESTIMONIALS SECTION
           Grid of spotlight-hover cards showing quotes
           from collaborators, clients, and team leads.
      ══════════════════════════════════════════════ -->
      <section
        class="testimonials-section"
        aria-labelledby="testimonials-heading"
        itemscope
        itemtype="https://schema.org/Review"
      >
        <header class="testimonials-header">
          <h2 id="testimonials-heading" class="testimonials-title">
            What collaborators <em>say</em>
          </h2>
          <p class="testimonials-sub">Feedback from collaborators, clients, and leads.</p>
        </header>

        <!-- Testimonial cards grid -->
        <div
          class="testimonials-grid"
          role="list"
          aria-label="Testimonials"
        >
          <article
            v-for="(t, idx) in testimonials"
            :key="t.name + idx"
            ref="cardRefs"
            class="spotlight-card"
            role="listitem"
            :aria-label="`Testimonial from ${t.name}, ${t.role}`"
            itemscope
            itemtype="https://schema.org/Review"
            @mousemove="handleSpotlightMove($event, idx)"
            @mouseenter="setOpacity(idx, 0.6)"
            @mouseleave="setOpacity(idx, 0)"
          >
            <!-- Radial spotlight overlay that follows the cursor -->
            <div
              class="spotlight-layer"
              aria-hidden="true"
              :style="{
                opacity: getSpotlight(idx).opacity,
                background: `radial-gradient(circle at ${getSpotlight(idx).position.x}px ${getSpotlight(idx).position.y}px, rgba(236,100,160,0.15), transparent 75%)`
              }"
            />

            <!-- Star rating — filled pink stars -->
            <div
              class="stars"
              :aria-label="`${t.rating} out of 5 stars`"
              role="img"
              itemprop="reviewRating"
            >
              <svg
                v-for="s in t.rating"
                :key="s"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.765l-3.09 1.735.59-3.43L2 4.635l3.455-.505z"
                  fill="#ec64a0"
                />
              </svg>
            </div>

            <!-- Quote text -->
            <blockquote
              class="testimonial-quote"
              itemprop="reviewBody"
            >
              "{{ t.quote }}"
            </blockquote>

            <!-- Author info -->
            <div class="testimonial-author" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <!-- Avatar initials circle -->
              <div
                class="author-avatar"
                aria-hidden="true"
              >
                {{ t.avatar }}
              </div>
              <div class="author-info">
                <span class="author-name" itemprop="name">{{ t.name }}</span>
                <span class="author-role" itemprop="jobTitle">{{ t.role }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ══════════════════════════════════════════════
           FOOTER — full-width breakout
           Lives inside ScrollStack so Lenis scrolls it
           into view naturally. Negative margin escapes
           the ScrollStack inner padding so it spans 100vw.
      ══════════════════════════════════════════════ -->
      <div class="footer-breakout">
        <Footer />
      </div>

    </ScrollStack>
  </div>
</template>

<style scoped>
/* ============================================================
   PAGE ROOT — full-viewport scroll container
============================================================ */
.page-root {
  height: 100vh;
  overflow: hidden;
  background: #0e0c0b;
  color: #ffffff;
  font-family: 'Poppins', system-ui, sans-serif;
}

/* ============================================================
   BANNER SECTION 
============================================================ */
.banner {
  position: relative;
  margin-top: -20vh;
  min-height: 100vh;
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

/* ── Decorative background  ── */
.banner-bg { position: absolute; inset: 0; pointer-events: none; }

.banner-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
}

/* Olive orb — top-left */
.banner-orb-1 {
  width: 580px; height: 580px;
  background: radial-gradient(circle, rgba(103,128,31,0.22), transparent 70%);
  top: -80px; left: -60px;
  animation: orb1 18s ease-in-out infinite;
}

/* Blush/pink orb — bottom-right */
.banner-orb-2 {
  width: 440px; height: 440px;
  background: radial-gradient(circle, rgba(223,139,175,0.13), transparent 80%);
  bottom: 0; right: -40px;
  animation: orb2 22s ease-in-out infinite;
}

/* Subtle olive orb — center */
.banner-orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(103,128,31,0.1), transparent 70%);
  top: 50%; left: 50%;
  animation: orb1 28s ease-in-out infinite reverse;
}

@keyframes orb1 {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(35px, 25px); }
}
@keyframes orb2 {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(-28px, 35px); }
}

/* ── Banner content — fades in after mount ── */
.banner-content {
  position: relative;
  text-align: center;
  width: 100%; max-width: 100%;
  overflow: visible;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}
.banner-content.visible { opacity: 1; transform: translateY(0); }

/* ── Eyebrow pill  ── */
.banner-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #e0c0c0;
  margin-bottom: 3rem;
  margin-top: 5rem;
  padding: 6px 16px;
  border: 1px solid #e0c0c0;
  border-radius: 999px;
  background: rgba(236,100,160,0.07);
  font-family: 'Poppins', sans-serif;
}

/* Pulsing dot inside the eyebrow pill */
.eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #e0c0c0;
  box-shadow: 0 0 8px rgba(236,100,160,0.6);
  animation: orbPulse 2.5s ease-in-out infinite;
}
@keyframes orbPulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50%       { transform: scale(1.5); opacity: 1; }
}

/* ── Banner heading ── */
.banner-title {
  display: flex;
  flex-direction: column;
  font-size: clamp(3.5rem, 10vw, 5rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem;
  padding-bottom: 0.25em; 
}

.title-line {
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.title-accent {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
}
.title-accent em {
  font-family: 'DM Serif Text', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.1em;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #eafeae 0%, #ffe4e4 50%, #fba3a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  padding-right: 0.2em;
  padding-bottom: 0.2em;
  margin-bottom: -0.2em;
}

/* ── Banner description ── */
.banner-desc {
  font-size: 0.97rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
  margin: 0 0 3rem;
  font-weight: 300;
}

/* ── Stats bar —- frosted pill with three key metrics ── */
.banner-stats {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  padding: 1.4rem 2.5rem;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  background: rgba(255,255,255,0.025);
  backdrop-filter: blur(12px);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

/* Stat number */
.stat-num {
  font-family: 'DM Serif Text', serif;
  font-style: italic;
  font-size: 2rem;
  font-weight: 400;
  color: #e0c0c0;
  line-height: 1;
}
.stat-num * { font-family: inherit; font-style: inherit; }

.stat-label {
  font-size: 0.62rem;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.09em;
}

/* Thin vertical divider between stat items */
.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.06); }

/* ── Scroll hint — bounces to draw attention downward ── */
.banner-scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: bounce 2.5s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

/* ============================================================
   SECTION LABELS 
============================================================ */
.section-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
  font-family: 'Poppins', sans-serif;
}

.projects-heading {
  margin-top: 2rem;
  margin-bottom: 3rem;
}

/* ============================================================
   PROJECT CARDS — ScrollStack items
============================================================ */

/* Deep selector targets the ScrollStack slot wrapper's generated class */
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

/* Full-card clickable link — flex row: info left, preview right */
.project-card-inner {
  display: flex;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

/* Left panel: tags, title, description, footer */
.project-info {
  flex: 0 0 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  border-right: 1px solid rgba(255,255,255,0.05);
}

/* Technology tags — olive pill style */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.25rem;
  padding: 0;
  list-style: none;
}

.tag {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 1rem;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.project-desc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.4);
  margin: 0 0 2rem;
  flex: 1;
  font-weight: 300;
}

.project-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Year label — uses <time> element for semantic date markup */
.project-year {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

/* CTA arrow link — pink, animates gap on card hover */
.project-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #ec64a0;
  letter-spacing: 0.02em;
  transition: gap 0.25s, color 0.25s;
}
.project-card-inner:hover .project-cta { gap: 10px; color: #f4a0c0; }

/* Right panel: preview image with decorative glow */
.project-preview {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Radial glow behind the preview — color alternates per project */
.preview-glow { position: absolute; inset: 0; pointer-events: none; }

/* Preview images — contain within panel, rounded corners */
.unified-project-img {
  width: 100%;
  height: auto;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
}

/* ============================================================
   TESTIMONIALS SECTION
============================================================ */
.testimonials-section { padding: 6rem 0 8rem; }

.testimonials-header {
  text-align: center;
  margin-bottom: 4rem;
}

.testimonials-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 1rem 0;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.testimonials-title em {
  font-family: 'DM Serif Text', serif;
  font-style: italic;
  font-weight: 400;
  font-size: 1.15em;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ffe4e4 50%, #fba3a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.testimonials-sub {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.28);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 300;
}

/* 3-column grid on desktop */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

/* ── Spotlight card ── */
.spotlight-card {
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.07);
  overflow: hidden;
  padding: 2rem;
  background: rgba(255,255,255,0.02);
  transition: border-color 0.3s ease, transform 0.3s ease;
  cursor: default;
}
.spotlight-card:hover {
  border-color: #e0c0c0;
  transform: translateY(-2px);
}

/* Radial gradient spotlight overlay that tracks cursor position */
.spotlight-layer {
  pointer-events: none;
  position: absolute;
  inset: 0;
  transition: opacity 0.4s ease;
}

/* Star rating icons — pink fill */
.stars { display: flex; gap: 3px; margin-bottom: 1.25rem; }

.testimonial-quote {
  font-size: 0.93rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.5);
  font-style: italic;
  margin: 0 0 1.75rem;
  position: relative;
  z-index: 1;
  font-weight: 300;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

/* Avatar circle — olive */
.author-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #67801F, #c8b08a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.author-info { display: flex; flex-direction: column; gap: 2px; }
.author-name { font-size: 0.875rem; font-weight: 600; color: #fff; }
.author-role { font-size: 0.68rem; color: rgba(255,255,255,0.28); }

/* ============================================================
   STACK WRAPPER — responsive container for the draggable image stack
   Height is set explicitly so the Stack component (absolutely positioned
   internally) has a defined bounding box at every breakpoint.
============================================================ */
.stack-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6rem auto;
  width: 100%;
  height: 460px;
  position: relative;
}

@media (max-width: 1024px) {
  .stack-wrapper {
    /* Bigger on tablet — matches increased card size of 400px */
    height: 480px;
    margin: 4rem auto;
    /* Ensure horizontal centering within any ScrollStack padding */
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    position: relative;
  }
}

@media (max-width: 768px) {
  .stack-wrapper {
    height: 420px;
    margin: 3rem auto;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    position: relative;
  }
}

@media (max-width: 480px) {
  .stack-wrapper {
    height: calc(min(100vw - 40px, 320px) + 80px);
    margin: 2.5rem auto;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    position: relative;
  }
}

/* ============================================================
   FOOTER BREAKOUT — escapes ScrollStack padding for full width
   ScrollStack's inner wrapper has px-20 (80px each side).
   This wrapper uses a negative margin trick to span 100vw.
============================================================ */
.footer-breakout {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

/* ============================================================
   RESPONSIVE — Tablet (≤1024px)
============================================================ */
@media (max-width: 1024px) {
  /* Testimonials: 2 columns on tablet */
  .testimonials-grid { grid-template-columns: repeat(2, 1fr); }

  :deep(.project-card) {
    width: 90% !important;
    height: 520px !important;
  }

  .project-title { font-size: 1.6rem; }
  .project-info  { padding: 2rem; }
}

/* ============================================================
   RESPONSIVE — Mobile (≤768px)
============================================================ */
@media (max-width: 768px) {
  :deep(.project-card) {
    width: 100% !important;
    height: auto !important;
    border-radius: 20px !important;
  }

  .project-card-inner { flex-direction: column; }

  .project-info {
    flex: none;
    padding: 1.75rem 1.5rem 1.25rem;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .project-title { font-size: 1.45rem; }
  .project-desc  { font-size: 0.85rem; margin-bottom: 1.25rem; }

  .project-preview { min-height: 160px; padding: 1.25rem; }

  /* Testimonials: single column */
  .testimonials-grid   { grid-template-columns: 1fr; }
  .testimonials-section { padding: 3rem 0 5rem; }
  .testimonials-header  { margin-bottom: 2.5rem; }
  .spotlight-card       { padding: 1.5rem; }
  .testimonial-quote    { font-size: 0.88rem; margin-bottom: 1.25rem; }

  /* Stats bar: tighter padding on mobile */
  .banner-stats {
    gap: 1rem;
    padding: 1rem 1.25rem;
  }
  .stat-num      { font-size: 1.6rem; font-family: 'DM Serif Text', serif; }
  .stat-divider  { height: 28px; }

  .projects-heading { margin-top: 1rem; margin-bottom: 2rem; }
}

/* ============================================================
   RESPONSIVE — Small mobile (≤480px)
============================================================ */
@media (max-width: 480px) {
  :deep(.project-card) { border-radius: 16px !important; }

  .project-info  { padding: 1.25rem 1.25rem 1rem; }
  .project-title { font-size: 1.25rem; }
  .project-desc  { font-size: 0.82rem; }
  .project-preview { min-height: 130px; padding: 1rem; }

  /* Stats bar: wrap onto two rows, hide dividers */
  .banner-stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem 1.5rem;
    padding: 1rem;
  }
  .stat-divider { display: none; }

  .spotlight-card    { padding: 1.25rem; border-radius: 16px; }
  .testimonial-quote { font-size: 0.85rem; }
}
</style>