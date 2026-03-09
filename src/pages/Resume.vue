<template>
  <div class="page-root">

    <div class="page-bg">
      <div class="bg-noise" />
      <div class="bg-orb bg-orb-1" />
      <div class="bg-orb bg-orb-2" />
      <div class="bg-orb bg-orb-3" />
    </div>

    <!-- ── HERO ──────────────────────────────────────── -->
    <section class="hero-section">
      <div class="hero-inner reveal-item">
        <p class="hero-eyebrow">
          <span class="eyebrow-dot" />
          Get to know me
        </p>
        <h1 class="hero-title">
          <span class="title-regular">Mary </span><span class="title-serif">Micah </span> 
          <span class="title-regular">Lapuz</span>
        </h1>
        <p class="hero-sub">
          A dedicated and collaborative professional committed to developing
          meaningful digital experiences.
        </p>
        <div class="resume-actions">
          <button class="btn-download" @click="viewResume">
            <span class="btn-download-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ── EDUCATION ─────────────────────────────────── -->
    <section class="resume-section reveal-item">
      <div class="section-header">
        <span class="section-dot" />
        <span class="section-label">Education</span>
      </div>
      <div class="timeline">
        <div
          class="timeline-item reveal-item"
          v-for="(item, i) in education"
          :key="i"
          :style="{ transitionDelay: `${i * 0.12}s` }"
        >
          <div class="timeline-org">{{ item.org }}</div>
          <div class="timeline-body">
            <div class="timeline-node"><span class="node-ring" /><span class="node-dot" /></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <span class="timeline-period">{{ item.period }}</span>
              <p v-if="item.desc" class="timeline-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── EXPERIENCE ────────────────────────────────── -->
    <section class="resume-section reveal-item">
      <div class="section-header">
        <span class="section-dot" />
        <span class="section-label">Experience</span>
      </div>
      <div class="timeline">
        <div
          class="timeline-item reveal-item"
          v-for="(item, i) in experience"
          :key="i"
          :style="{ transitionDelay: `${i * 0.12}s` }"
        >
          <div class="timeline-org">
            <span v-for="(line, l) in item.org" :key="l">{{ line }}<br v-if="l < item.org.length - 1"/></span>
          </div>
          <div class="timeline-body">
            <div class="timeline-node"><span class="node-ring" /><span class="node-dot" /></div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <span class="timeline-period">{{ item.period }}</span>
              <p class="timeline-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CERTIFICATES ──────────────────────────────── -->
    <section class="resume-section reveal-item">
      <div class="section-header">
        <span class="section-dot" />
        <span class="section-label">Certificates</span>
      </div>
      <div class="cert-groups">
        <div
          class="cert-group reveal-item"
          v-for="(group, gi) in certificates"
          :key="gi"
          :style="{ transitionDelay: `${gi * 0.1}s` }"
        >
          <div class="cert-issuer">{{ group.issuer }}</div>
          <div class="cert-list">
            <div class="cert-item" v-for="(cert, ci) in group.items" :key="ci">
              <div class="timeline-node"><span class="node-ring" /><span class="node-dot" /></div>
              <div class="cert-content">
                <span class="cert-name">{{ cert.name }}</span>
                <span class="cert-year">{{ cert.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── AWARDS ────────────────────────────────────── -->
    <section class="resume-section reveal-item">
      <div class="section-header">
        <span class="section-dot" />
        <span class="section-label">Awards</span>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-org">Holy Angel University</div>
          <div class="awards-list">
            <div
              class="award-item reveal-item"
              v-for="(award, i) in awards"
              :key="i"
              :style="{ transitionDelay: `${i * 0.1}s` }"
            >
              <div class="timeline-node"><span class="node-ring" /><span class="node-dot" /></div>
              <div class="award-content">
                <span class="award-name">{{ award.name }}</span>
                <span class="award-year">{{ award.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
// View Resume in new tab (same as home page)
const viewResume = () => {
  window.open('/Mary Micah Lapuz - Resume.pdf', '_blank');
};
import Lenis from 'lenis'
import { onMounted, onBeforeUnmount } from 'vue'

// ── Lenis on window — preserves normal document flow ──
let lenis: Lenis | null = null
let rafId: number | null = null

onMounted(() => {
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
const education = [
  {
    org: 'Holy Angel University',
    title: 'Bachelor of Science in Information Technology with Specialization in Web Development',
    period: '2023–Present', desc: ''
  },
  {
    org: '',
    title: 'Senior High School, Technical-Vocational-Livelihood (TVL) with a specialization in Information and Communications Technology (ICT)',
    period: '2021–2023', desc: ''
  }
]
const experience = [
  {
    org: ['Code Geeks,', 'Holy Angel University'],
    title: 'President', period: '2025–Present',
    desc: 'Lead a university-based organization dedicated to advancing web development skills and industry knowledge among students. Provides strategic leadership and direction in fostering a collaborative learning environment, organizing technical workshops and activities, and promoting excellence in modern development practices within the campus community.'
  },
  {
    org: ['School of Computing', 'Student Council,', 'Holy Angel University'],
    title: 'External Communication', period: '2024–2025',
    desc: "Handled the council's marketing and communication initiatives, including social media management, branding, partnerships, and sponsorship coordination. Responsible for building and maintaining external relationships, promoting student-led events and programs, and enhancing the organization's public presence through strategic communication and content development."
  },
  {
    org: ['Student Executive', 'Committee,', 'Holy Angel University'],
    title: 'Public Relations Officer', period: '2022–2023',
    desc: "Oversaw communication efforts that strengthen the organization's public image and stakeholder relationships. Managed media outreach, event promotion, and content development, while supporting collaborations, partnerships, and community engagement initiatives."
  }
]
const certificates = [
  {
    issuer: 'Hubspot',
    items: [
      { name: 'Content Marketing', year: '2023–2024' },
      { name: 'Digital Marketing', year: '2023–2024' }
    ]
  },
  {
    issuer: 'Simplilearn',
    items: [
      { name: 'Design Thinking for Beginners', year: '2023–2024' },
      { name: 'Introduction to Graphic Design', year: '2023–2024' },
      { name: 'Website UI/UX Designing using ChatGPT', year: '2023–2024' }
    ]
  },
  {
    issuer: 'FreeCodeCamp',
    items: [
      { name: 'Backend Development and APIs', year: '2023–2024' },
      { name: 'Legacy JavaScript Algorithms and Data Structure', year: '2023–2024' },
      { name: 'Responsive Design', year: '2023–2024' }
    ]
  }
]
const awards = [
  { name: "President's Lister",                 year: '2023–2024' },
  { name: "Dean's Lister",                       year: '2023–2024' },
  { name: 'TVL-ICT Valedictorian',               year: '2022–2023' },
  { name: 'Araw ng Parangal Leadership Awardee', year: '2022–2023' }
]
</script>

<style scoped>
/* Resume actions button group */
.resume-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.2rem;
  margin-bottom: 1.5rem;
}
/* ── Base: normal flow, no position:fixed ───────────── */
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
.bg-orb { position: absolute; border-radius: 50%; filter: blur(110px); }
.bg-orb-1 {
  width: 580px; height: 580px;
  background: radial-gradient(circle, rgba(103,128,31,0.18), transparent 80%);
  top: -120px; left: -80px; animation: orb1 18s ease-in-out infinite;
}
.bg-orb-2 {
  width: 440px; height: 440px;
  background: radial-gradient(circle, rgba(223, 139, 175, 0.13), transparent 80%);
  top: 40%; right: -80px; animation: orb2 22s ease-in-out infinite;
}
.bg-orb-3 {
  width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(103,128,31,0.1), transparent 70%);
  bottom: 10%; left: 25%; animation: orb1 28s ease-in-out infinite reverse;
}
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,25px)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-28px,35px)} }

/* ── Scroll reveal ──────────────────────────────────── */
.reveal-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-item.is-visible { opacity: 1; transform: translateY(0); }

/* ── HERO ───────────────────────────────────────────── */
.hero-section {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  text-align: center; padding: 110px 2rem 6rem; overflow: hidden;
}
.hero-inner { max-width: 680px; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
  color: #e0c0c0; padding: 6px 16px;
  border: 1px solid rgba(232, 152, 187, 0.25); border-radius: 999px;
  background: rgba(237, 167, 198, 0.06); margin-bottom: 1.75rem;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #e0c0c0; box-shadow: 0 0 8px rgba(236,100,160,0.6);
  animation: pulse 2.5s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
.hero-title { margin: 0 0 1.5rem; line-height: 1.0; }
.title-regular {
  font-family: 'Poppins', sans-serif; font-size: clamp(3rem, 7vw, 4rem);
  font-weight: 700; color: #fff; display: inline;
  letter-spacing: -0.03em; text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.title-serif {
  font-family: 'DM Serif Text', serif; font-style: italic; font-weight: 400;
  font-size: clamp(3.5rem, 9vw, 4.5rem); letter-spacing: -0.05em; line-height: 0.9; display: inline;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #fba3a3 100%); 
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub {
  font-size: 0.97rem; line-height: 1.8; color: rgba(255,255,255,0.4);
  font-weight: 300; max-width: 500px; margin: 0 auto 2.5rem;
}
.btn-download {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 0.85rem 2rem; border-radius: 999px;
  font-size: 0.88rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  text-decoration: none; color: #fff; border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04); backdrop-filter: blur(12px);
  cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden;
}
.btn-download::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(103,128,31,0.15), rgba(236,100,160,0.1));
  opacity: 0; transition: opacity 0.3s;
}
.btn-download:hover::before { opacity: 1; }
.btn-download:hover { border-color: rgba(103,128,31,0.5); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(103,128,31,0.2); }
.btn-download-icon {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(103,128,31,0.2); border: 1px solid rgba(103,128,31,0.35);
  flex-shrink: 0; position: relative; z-index: 1; transition: background 0.3s;
}
.btn-download:hover .btn-download-icon { background: rgba(103,128,31,0.35); }
.btn-download span:last-child { position: relative; z-index: 1; }
.hero-lines { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.h-line {
  position: absolute; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(103,128,31,0.2), transparent);
}
.h-line-1 { width: 60%; top: 30%; left: -10%; animation: lineDrift 12s ease-in-out infinite; }
.h-line-2 { width: 40%; bottom: 25%; right: -5%; animation: lineDrift 16s ease-in-out infinite reverse; }
@keyframes lineDrift { 0%,100%{transform:translateX(0);opacity:.4} 50%{transform:translateX(40px);opacity:.8} }

/* ── Resume sections ────────────────────────────────── */
.resume-section {
  position: relative; z-index: 1;
  max-width: 900px; margin: 0 auto; padding: 0 2rem 5rem;
}
.section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 2.5rem; }
.section-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #e0c0c0; box-shadow: 0 0 10px rgba(236,100,160,0.5); flex-shrink: 0;
}
.section-label {
  font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: rgba(255,255,255,0.25);
}

/* ── Timeline ───────────────────────────────────────── */
.timeline { display: flex; flex-direction: column; }
.timeline-item {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 0 2rem; padding-bottom: 3.5rem; position: relative;
}
.timeline-item:not(:last-child)::after {
  content: ''; position: absolute;
  left: calc(200px + 2rem + 9px); top: 24px; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, rgba(103,128,31,0.25), transparent);
}
.timeline-org {
  font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.55);
  line-height: 1.5; padding-top: 2px; letter-spacing: 0.01em;
}
.timeline-body { display: flex; gap: 1.25rem; }
.timeline-node { position: relative; flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px; }
.node-ring {
  position: absolute; inset: 0; border-radius: 50%;
  border: 1px solid rgba(103,128,31,0.4); background: rgba(103,128,31,0.06);
}
.node-dot {
  position: absolute; inset: 5px; border-radius: 50%;
  background: #67801F; box-shadow: 0 0 8px rgba(103,128,31,0.5);
}
.timeline-content { flex: 1; }
.timeline-title {
  font-size: 1.02rem; font-weight: 600; color: #fff; margin: 0 0 0.35rem;
  line-height: 1.4; letter-spacing: -0.01em;
}
.timeline-period {
  display: block; font-size: 0.68rem; font-weight: 500;
  color: #e0c0c0; letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 0.75rem;
}
.timeline-desc {
  font-size: 0.855rem; line-height: 1.75; color: rgba(255,255,255,0.38); font-weight: 300; margin: 0;
}

/* ── Certificates ───────────────────────────────────── */
.cert-groups { display: flex; flex-direction: column; }
.cert-group { display: grid; grid-template-columns: 200px 1fr; gap: 0 2rem; padding-bottom: 2.5rem; }
.cert-issuer {
  font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.55); padding-top: 2px; letter-spacing: 0.01em;
}
.cert-list { display: flex; flex-direction: column; gap: 1rem; }
.cert-item { display: flex; align-items: flex-start; gap: 1.25rem; }
.cert-content { display: flex; flex-direction: column; gap: 2px; }
.cert-name { font-size: 0.95rem; font-weight: 500; color: #fff; }
.cert-year {
  font-size: 0.65rem; font-weight: 500; color: #e0c0c0;
  letter-spacing: 0.08em; text-transform: uppercase;
}

/* ── Awards ─────────────────────────────────────────── */
.awards-list { display: flex; flex-direction: column; gap: 1.1rem; }
.award-item { display: flex; align-items: flex-start; gap: 1.25rem; }
.award-content { display: flex; flex-direction: column; gap: 2px; }
.award-name { font-size: 0.95rem; font-weight: 500; color: #fff; }
.award-year {
  font-size: 0.65rem; font-weight: 500; color: #e0c0c0;
  letter-spacing: 0.08em; text-transform: uppercase;
}

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 768px) {
  .hero-section { padding: 100px 1.5rem 5rem; }
  .title-regular { font-size: clamp(2.2rem, 8vw, 3.5rem); }
  .title-serif   { font-size: clamp(2.8rem, 10vw, 3rem); }
  .timeline-item, .cert-group { grid-template-columns: 1fr; gap: 0.5rem 0; }
  .timeline-item:not(:last-child)::after { display: none; }
  .timeline-org, .cert-issuer {
    font-size: 0.7rem; color: #e0c0c0;
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;
  }
}
@media (max-width: 480px) {
  .resume-section { padding: 0 1.25rem 4rem; }
}
</style>