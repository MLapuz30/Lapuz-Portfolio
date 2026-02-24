<template>
  <div class="page-root">

    <div class="page-bg">
      <div class="bg-noise" />
      <div class="bg-orb bg-orb-1" />
      <div class="bg-orb bg-orb-2" />
      <div class="bg-orb bg-orb-3" />
    </div>

    <!-- ── HERO ───────────────────────────────────────── -->
    <section class="hero-section">
      <div class="photo-stack">
        <div class="photo-left">
          <img src="/micah3.webp" alt="Mary Micah Lapuz" />
        </div>
        <div class="photo-center">
          <img src="/micah2.webp" alt="Mary Micah Lapuz" />
        </div>
        <div class="photo-right">
          <img src="/micah4.webp" alt="Mary Micah Lapuz" />
        </div>
      </div>

      <div class="hero-copy reveal-item">
        <h1 class="hero-name">
          <span class="name-regular">Mary </span><span class="name-serif">Micah </span>
          <span class="name-regular">Lapuz</span>
        </h1>
        <p class="hero-bio">
          A multidisciplinary designer and front-end developer who creates clear, 
          visually refined, and highly functional digital experiences.
          Work that doesn't just look good — it <em>feels</em> right.
        </p>
        <p class="hero-sub">
          Based in Angeles City, PH &nbsp;·&nbsp; Remote-friendly &nbsp;·&nbsp; Open for freelance
        </p>
        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary">Get in touch</a>
          <a href="/projects" class="btn btn-secondary">View work</a>
        </div>
      </div>
    </section>

    <!-- ── STATS ──────────────────────────────────────── -->
    <section class="stats-section">
      <div class="stats-row">
        <div
          class="stat-item reveal-item"
          v-for="(s, i) in stats"
          :key="i"
          :style="{ transitionDelay: `${i * 0.1}s` }"
        >
          <span class="stat-num">
            <CountUp
              :from="0"
              :to="parseInt(String(s.value).replace(/[^\d]/g, ''))"
              :duration="1.2"
              separator="," 
              class-name="stat-num"
            />
            <template v-if="/[^\d]/.test(s.value)">{{ String(s.value).replace(/^[\d]+/, '') }}</template>
          </span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── SKILLS ─────────────────────────────────────── -->
    <section class="content-section reveal-item">
      <h2 class="section-title">Skills</h2>
      <div class="skills-cols">
        <div class="skill-col">
          <p class="col-label">Technical</p>
          <div class="tag-wrap">
            <span class="tag tag--olive" v-for="s in technicalSkills" :key="s">{{ s }}</span>
          </div>
        </div>
        <div class="skill-col">
          <p class="col-label">Soft</p>
          <div class="tag-wrap">
            <span class="tag tag--blush" v-for="s in softSkills" :key="s">{{ s }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STACKS ─────────────────────────────────────── -->
    <section class="content-section reveal-item">
      <h2 class="section-title">Stacks</h2>
      <div class="stacks-grid">
        <div
          class="stack-card reveal-item"
          v-for="(stack, i) in stacks"
          :key="stack.name"
          :style="{ '--glow': stack.color, transitionDelay: `${i * 0.06}s` }"
          @mouseenter="(e) => (e.currentTarget as HTMLElement).classList.add('is-hovered')"
          @mouseleave="(e) => (e.currentTarget as HTMLElement).classList.remove('is-hovered')"
        >
          <div class="stack-icon-wrap">
            <img :src="stack.icon" :alt="stack.name" />
          </div>
          <span class="stack-name">{{ stack.name }}</span>
        </div>
      </div>
    </section>

    <!-- ── BEYOND DEV ─────────────────────────────────── -->
    <section class="content-section beyond-section reveal-item">
      <h2 class="section-title section-title--center">Beyond Dev</h2>
      <p class="section-sub">More than just a developer, I'm someone who immerses myself in the things I love. 
        My wide range of hobbies and interests reflects a multifaceted personality. 
        Beyond coding, I enjoy exploring leadership opportunities and engaging in extracurricular activities. 
        I have a particular passion for photography, especially with a vintage or 1920s film aesthetic. 
        I love embracing new experiences, often stepping outside my comfort zone, and 
        I find joy in traveling, journaling, and crafting.</p>
      <div class="beyond-grid">
        <div
          class="beyond-card reveal-item"
          v-for="(item, i) in beyondItems"
          :key="item.title"
          :class="item.size"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <img :src="item.img" :alt="item.title" class="beyond-img" />
          <div class="beyond-overlay">
            <span class="beyond-label">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────── -->
    <section class="cta-section reveal-item">
      <div class="cta-divider">
        <span class="cta-divider-line" />
        <span class="cta-divider-orb" />
        <span class="cta-divider-line" />
      </div>
      <div class="cta-inner">
        <p class="cta-eyebrow">Open to Opportunities</p>
        <h2 class="cta-heading">
          <span class="cta-regular">Let's work </span><span class="cta-serif">together.</span>
        </h2>
        <p class="cta-body">
          I'm actively seeking full-time and contract opportunities. If you're looking for a designer and engineer
          who brings both creative vision and technical execution, let's explore how I can contribute to your team.
        </p>
        <a href="/contact" class="btn btn-cta">
          <span class="btn-cta-text">Start a conversation</span>
          <span class="btn-cta-arrow">→</span>
        </a>
      </div>
      <div class="cta-glow" />
    </section>

  </div>
</template>

<script setup lang="ts">
import Lenis from 'lenis'
import { onMounted, onBeforeUnmount } from 'vue'
import CountUp from '../component/CountUp.vue'

// ── Lenis on window — preserves normal document flow ──
// Footer, nav, everything stacks correctly because the page
// is NOT position:fixed. Lenis just intercepts wheel events.
let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
  // No wrapper/content props → Lenis targets the window
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    wheelMultiplier: 1,
    lerp: 0.1,
    syncTouch: true,
    syncTouchLerp: 0.075,
  })

  const raf = (time: number) => {
    lenis!.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  // Reveal — root: null means viewport (correct for window scroll)
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        ;(e.target as HTMLElement).classList.add('is-visible')
        io.unobserve(e.target)
      }
    }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal-item').forEach((el) => io.observe(el))
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
})

// ── Data ─────────────────────────────────────────────
const stats = [
  { value: '4+', label: 'Projects Delivered'  },
  { value: '100%',  label: 'Internship Ready' },
  { value: '8',   label: 'Certificates'        },
]
const technicalSkills = [
  'UI/UX Design', 'Front-End Dev', 'Vue.js', 'React',
  'Figma', 'TailwindCSS', 'TypeScript', 'Node.js',
  'Responsive Design', 'Motion Design', 'User Flow',
  'Prototyping', 'Wireframing', 'Brand Identity',
]
const softSkills = [
  'Creative Direction', 'Communication', 'Problem Solving',
  'Adaptability', 'Collaboration', 'Time Management',
  'Attention to Detail', 'Critical Thinking', 'Multitasking', 'Perseverance',
]
const stacks = [
  { name: 'Vue.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',           color: '#42d392' },
  { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           color: '#61dafb' },
  { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
  { name: 'Figma',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',           color: '#9129F3' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',  color: '#38bdf8' },
  { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',         color: '#68a063' },
  { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',               color: '#f05032' },
  { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
]
const beyondItems = [
  { title: 'Museum',          img: '/museum.webp',       size: 'tall' },
  { title: 'Student Leader',  img: '/leader.webp',       size: 'wide' },
  { title: 'Photography',     img: '/photography.webp',  size: 'wide' },
  { title: 'Hosting',         img: '/hosting.webp',      size: 'wide' },
  { title: 'Exploring',       img: '/explore.webp',      size: ''     },
]
</script>

<style scoped>
.page-root {
  background: #0e0c0b;
  color: #fff;
  font-family: 'Poppins', system-ui, sans-serif;
  min-height: 100vh;
  position: relative;
}

/* ── Atmospheric BG ─────────────────────────────────── */
.page-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.bg-noise {
  position: absolute; inset: 0; opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
.bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); }
.bg-orb-1 {
  width: 580px; height: 580px;
  background: radial-gradient(circle, rgba(103,128,31,0.2), transparent 70%);
  top: -120px; left: -80px; animation: orb1 10s ease-in-out infinite;
}
.bg-orb-2 {
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(223, 139, 175, 0.13), transparent 80%);
  bottom: 0; right: -40px; animation: orb2 10s ease-in-out infinite;
}
.bg-orb-3 {
  width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(103,128,31,0.1), transparent 70%);
  bottom: 12%; left: 30%; animation: orb1 18s ease-in-out infinite reverse;
}
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-28px,35px)} }

/* ── Scroll reveal ──────────────────────────────────── */
.reveal-item {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── PHOTO STACK ────────────────────────────────────── */
.hero-section {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  padding: 70px 2rem 5rem; gap: 2.5rem;
}
.photo-stack { display: flex; align-items: flex-end; justify-content: center; }
.photo-left, .photo-center, .photo-right {
  flex-shrink: 0; border-radius: 20px; overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.65);
}
.photo-left img, .photo-center img, .photo-right img {
  display: block; object-fit: cover;
  filter: saturate(0.80) brightness(1); width: 100%; height: 100%;
}
.photo-left {
  width: 150px; height: 195px; transform: rotate(-6deg) translateY(10px);
  margin-right: -30px; z-index: 1; border: 1px solid rgba(224,192,192,0.12);
  animation: floatLeft 4s ease-in-out infinite;
}
.photo-center {
  width: 210px; height: 270px; z-index: 3;
  border: 1px solid rgba(224,192,192,0.25);
  box-shadow: 0 16px 60px rgba(0,0,0,0.75), 0 0 40px rgba(103,128,31,0.1);
  animation: floatCenter 5s ease-in-out infinite;
}
.photo-center img { filter: saturate(0.80) brightness(1); }
.photo-right {
  width: 150px; height: 195px; transform: rotate(5deg) translateY(10px);
  margin-left: -30px; z-index: 2; border: 1px solid rgba(224,192,192,0.1);
  animation: floatRight 4.5s ease-in-out infinite;
}
@keyframes floatLeft   { 0%,100%{transform:rotate(-6deg) translateY(10px)} 50%{transform:rotate(-6deg) translateY(0)} }
@keyframes floatCenter { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes floatRight  { 0%,100%{transform:rotate(5deg) translateY(10px)} 50%{transform:rotate(5deg) translateY(2px)} }

/* ── Hero copy ──────────────────────────────────────── */
.hero-copy { text-align: center; max-width: 620px; }
.hero-name { margin: 0 0 1.5rem; line-height: 1.0; }
.name-regular {
  font-family: 'Poppins', sans-serif; 
  font-size: clamp(3rem, 7vw, 4rem);
  font-weight: 700; color: #fff; display: inline;
  letter-spacing: -0.03em; text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.name-serif {
  font-family: 'DM Serif Text', serif; 
  font-style: italic; 
  font-weight: 400;
  font-size: clamp(3.5rem, 9vw, 4.5rem); 
  letter-spacing: -0.05em; 
  line-height: 0.9; 
  display: inline;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #e0c0c0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-bio {
  font-size: 0.97rem; line-height: 1.8; color: rgba(255,255,255,0.45);
  margin: 0 0 0.6rem; font-weight: 300;
}
.hero-bio em { color: #e0c0c0; font-style: italic; }
.hero-sub { font-size: 0.8rem; color: rgba(255,255,255,0.22); letter-spacing: 0.04em; margin: 0; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 0.75rem 1.75rem; border-radius: 999px;
  font-size: 0.9rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  text-decoration: none; cursor: pointer; border: none; transition: all 0.3s ease;
}
.btn-primary {
  background: linear-gradient(to bottom, #7f9b2f 0%, #67801F 40%, #5a6f1a 100%);
  color: #fff; box-shadow: inset 0 2px 4px rgba(255,255,255,0.28), 0 4px 8px rgba(0,0,0,0.2);
}
.btn-primary:hover { background: #485e08; transform: translateY(-2px); }
.btn-secondary {
  background: rgba(61,59,59,0.14); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.18); color: #fff;
}
.btn-secondary:hover {
  background: linear-gradient(135deg, rgba(103,128,31,0.15), rgba(236,100,160,0.1));
  transform: translateY(-1px);
}

/* ── STATS ──────────────────────────────────────────── */
.stats-section { position: relative; z-index: 1; padding: 0 2rem 4rem; }
.stats-row {
  display: flex; max-width: 640px; margin: 0 auto;
  background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px; overflow: hidden;
}
.stat-item {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  padding: 2.2rem 1.25rem; border-right: 1px solid rgba(255,255,255,0.06);
  cursor: default;
  /* reveal transition is set by .reveal-item; hover adds on top */
  transition: opacity 0.7s ease, transform 0.7s ease, background 0.3s;
}
.stat-item:last-child { border-right: none; }
.stat-item:hover { background: rgba(103,128,31,0.06); }
.stat-num {
  font-family: 'DM Serif Text', serif; font-style: italic; font-size: 2.4rem;
  font-weight: 400; line-height: 1; color: #e0c0c0; margin-bottom: 6px;
}
.stat-label {
  font-size: 0.67rem; color: rgba(255,255,255,0.25);
  text-transform: uppercase; letter-spacing: 0.09em; text-align: center;
}

/* ── Shared content sections ────────────────────────── */
.content-section {
  position: relative; z-index: 1; padding: 3rem 2rem 4rem;
  max-width: 960px; margin: 0 auto;
}
.section-title {
  font-size: clamp(1.5rem, 3.5vw, 2.2rem); font-weight: 700;
  letter-spacing: -0.02em; margin: 0 0 2rem; color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.4);
}
.section-title--center { text-align: center; }
.section-sub {
  text-align: center; font-size: 0.88rem; color: rgba(255,255,255,0.28);
  margin: -1.25rem 0 2.5rem; font-weight: 300; line-height: 1.6;
}

/* ── SKILLS ─────────────────────────────────────────── */
.skills-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; }
.col-label {
  font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(255,255,255,0.2); margin: 0 0 1rem;
}
.tag-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  display: inline-block; padding: 7px 16px; border-radius: 999px;
  font-size: 0.78rem; cursor: default;
  transition: transform 0.2s, background 0.25s, border-color 0.25s, color 0.25s;
}
.tag--olive {
  border: 1px solid rgba(103,128,31,0.3); background: rgba(103,128,31,0.08); color: rgba(255,255,255,0.65);
}
.tag--olive:hover {
  border-color: rgba(103,128,31,0.65); background: rgba(103,128,31,0.18); color: #fff; transform: translateY(-2px);
}
.tag--blush {
  border: 1px solid rgba(224,192,192,0.22); background: rgba(224,192,192,0.05); color: rgba(255,255,255,0.65);
}
.tag--blush:hover {
  border-color: rgba(224,192,192,0.55); background: rgba(224,192,192,0.12); color: #fff; transform: translateY(-2px);
}

/* ── STACKS ─────────────────────────────────────────── */
.stacks-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.stack-card {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 1.75rem 1rem; border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02); cursor: default;
  transition: opacity 0.5s ease, transform 0.5s ease,
              border-color 0.35s, background 0.35s, box-shadow 0.45s;
}
.stack-card.is-hovered {
  border-color: color-mix(in srgb, var(--glow) 40%, transparent);
  background: color-mix(in srgb, var(--glow) 6%, transparent);
  box-shadow: 0 0 20px color-mix(in srgb, var(--glow) 25%, transparent),
              0 0 44px color-mix(in srgb, var(--glow) 8%, transparent);
  transform: translateY(-4px) scale(1.03) !important;
}
.stack-icon-wrap {
  width: 46px; height: 46px; display: flex; align-items: center; justify-content: center;
  transition: filter 0.4s, transform 0.3s;
}
.stack-card.is-hovered .stack-icon-wrap { filter: drop-shadow(0 0 12px var(--glow)); transform: scale(1.1); }
.stack-icon-wrap img { width: 100%; height: 100%; object-fit: contain; }
.stack-name { font-size: 0.72rem; color: rgba(255,255,255,0.25); letter-spacing: 0.03em; transition: color 0.3s; }
.stack-card.is-hovered .stack-name { color: rgba(255,255,255,0.75); }

/* ── BEYOND DEV ─────────────────────────────────────── */
.beyond-section { max-width: 960px; }
.beyond-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  grid-auto-rows: 200px; gap: 14px; margin-top: 1rem;
}
.beyond-card {
  border-radius: 18px; overflow: hidden; position: relative; cursor: pointer;
  /* Use scale for reveal on these — override the default translateY */
  transform: scale(0.94) !important;
  transition: opacity 0.6s ease, transform 0.6s ease !important;
}
.beyond-card.is-visible { transform: scale(1) !important; }
.beyond-card.tall  { grid-row: span 2; }
.beyond-card.wide  { grid-column: span 2; }
.beyond-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: saturate(0.6) brightness(1);
  transition: transform 0.55s ease, filter 0.4s ease;
}
.beyond-card:hover .beyond-img { transform: scale(1.06); filter: saturate(0.75) brightness(1); }
.beyond-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(14,12,11,0.9) 100%);
  display: flex; align-items: flex-end; padding: 18px;
  opacity: 0; transition: opacity 0.4s ease;
}
.beyond-card:hover .beyond-overlay { opacity: 1; }
.beyond-label { font-size: 0.88rem; font-weight: 600; color: #fff; }

/* ── CTA ────────────────────────────────────────────── */
.cta-section {
  position: relative; z-index: 1; padding: 2rem 2rem 7rem; text-align: center; overflow: hidden;
}
.cta-divider { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 4.5rem; }
.cta-divider-line {
  display: block; flex: 1; max-width: 180px; height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
}
.cta-divider-orb {
  display: block; width: 6px; height: 6px; border-radius: 50%;
  background:rgba(170, 209, 51, 0.75);
  box-shadow: 0 0 10px rgba(103,128,31,0.4), 0 0 20px rgba(103,128,31,0.15);
  animation: orbPulse 3s ease-in-out infinite;
}
@keyframes orbPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:1} }
.cta-inner { max-width: 680px; margin: 0 auto; position: relative; z-index: 2; }
.cta-eyebrow {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(170, 209, 51, 0.75); margin: 0 0 1.2rem;
}
.cta-heading { margin: 0 0 1.5rem; line-height: 1.0; letter-spacing: -0.03em; }
.cta-regular {
  font-family: 'Poppins', sans-serif; font-size: clamp(2.8rem, 7vw, 5.2rem);
  font-weight: 700; color: #fff; display: inline; text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.cta-serif {
  font-family: 'DM Serif Text', serif; font-style: italic; font-weight: 400;
  font-size: clamp(3.2rem, 9vw, 6.6rem); letter-spacing: -0.05em; line-height: 0.9; display: inline;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #e0c0c0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.cta-body {
  font-size: 0.93rem; line-height: 1.85; color: rgba(255,255,255,0.35); font-weight: 300; margin: 0 0 2.5rem;
}
.btn-cta {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 1rem 2.5rem; border-radius: 999px;
  font-size: 0.9rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  text-decoration: none; cursor: pointer; border: none;
  background: linear-gradient(to bottom, #7f9b2f 0%, #67801F 40%, #5a6f1a 100%);
  color: #fff;
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.28), 0 4px 24px rgba(103,128,31,0.35), 0 0 60px rgba(103,128,31,0.08);
  transition: all 0.35s ease; position: relative; overflow: hidden;
}
.btn-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15), transparent 60%);
  opacity: 0; transition: opacity 0.35s ease;
}
.btn-cta:hover::before { opacity: 1; }
.btn-cta:hover {
  background: linear-gradient(to bottom, #8eab32 0%, #75901f 40%, #62791a 100%);
  transform: translateY(-3px);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.28), 0 8px 32px rgba(103,128,31,0.45), 0 0 80px rgba(103,128,31,0.12);
}
.btn-cta-text { position: relative; z-index: 1; }
.btn-cta-arrow {
  position: relative; z-index: 1; display: inline-block;
  transition: transform 0.3s ease; font-size: 1.1rem; line-height: 1;
}
.btn-cta:hover .btn-cta-arrow { transform: translateX(5px); }
.cta-glow {
  position: absolute; bottom: -80px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 300px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(103,128,31,0.12) 0%, transparent 70%);
  filter: blur(40px); pointer-events: none;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 768px) {
  .hero-section { padding: 100px 1.5rem 4rem; gap: 2rem; }
  .photo-left  { width: 115px; height: 150px; margin-right: -20px; }
  .photo-center{ width: 165px; height: 212px; }
  .photo-right { width: 115px; height: 150px; margin-left: -20px; }
  .name-regular { font-size: clamp(2.2rem, 8vw, 3.5rem); }
  .name-serif   { font-size: clamp(2.8rem, 10vw, 5rem); }
  .stats-row { flex-direction: column; }
  .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .stat-item:last-child { border-bottom: none; }
  .skills-cols { grid-template-columns: 1fr; }
  .stacks-grid { grid-template-columns: repeat(2,1fr); }
  .beyond-grid { grid-template-columns: repeat(2,1fr); }
  .beyond-card.tall, .beyond-card.wide { grid-row: span 1; grid-column: span 1; }
  .cta-section { padding: 4rem 1.5rem 5rem; }
  .cta-divider-line { max-width: 80px; }
}
@media (max-width: 480px) {
  .photo-left  { width: 95px; height: 124px; margin-right: -16px; }
  .photo-center{ width: 140px; height: 180px; }
  .photo-right { width: 95px; height: 124px; margin-left: -16px; }
  .stacks-grid { grid-template-columns: repeat(2,1fr); }
  .beyond-grid { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; align-items: center; }
  .btn { width: 100%; justify-content: center; }
  .cta-regular { font-size: clamp(2.2rem, 10vw, 3.5rem); }
  .cta-serif   { font-size: clamp(2.8rem, 12vw, 4.5rem); }
}
</style>