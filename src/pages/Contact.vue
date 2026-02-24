<template>
  <div class="page-root">

    <!-- Warm atmospheric BG -->
    <div class="page-bg">
      <div class="bg-noise" />
      <div class="bg-orb bg-orb-1" />
      <div class="bg-orb bg-orb-2" />
    </div>

    <!-- ── Main ──────────────────────────────────────── -->
    <section class="contact-section">

      <!-- Header -->
      <div class="contact-header" ref="headerRef">
        <p class="page-eyebrow">Contact</p>
        <h1 class="contact-title">
          Let's talk,<br />
          <span class="name-serif">reach out.</span>
        </h1>
        <p class="contact-sub">
          Got a project in mind, a question, or just want to say hi?
          I'd love to hear from you.
        </p>
      </div>

      <!-- Social contact pills -->
      <div class="contact-pills" ref="pillsRef">
        <a
          v-for="(link, i) in contactLinks"
          :key="i"
          :href="link.href"
          :ref="el => pillEls[i] = el"
          class="contact-pill"
          target="_blank"
        >
          <span class="pill-icon" v-html="link.icon" />
          <span>{{ link.label }}</span>
          <span class="pill-arrow">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
      </div>

      <!-- Divider -->
      <div class="divider" ref="dividerRef">
        <span class="divider-line" />
        <span class="divider-label">or send a message</span>
        <span class="divider-line" />
      </div>

      <!-- Form -->
      <form class="contact-form" ref="formRef" @submit.prevent="handleSubmit" novalidate>
        <div class="form-row">
          <div class="form-field" :class="{ 'has-error': errors.name, 'is-focused': focused === 'name' }">
            <label class="field-label">Your Name</label>
            <input
              type="text" class="field-input" placeholder="Mary Micah"
              v-model="form.name"
              @focus="focused = 'name'"
              @blur="focused = null; validate('name')"
            />
            <span class="field-error" v-if="errors.name">{{ errors.name }}</span>
          </div>
          <div class="form-field" :class="{ 'has-error': errors.email, 'is-focused': focused === 'email' }">
            <label class="field-label">Your Email</label>
            <input
              type="email" class="field-input" placeholder="hello@example.com"
              v-model="form.email"
              @focus="focused = 'email'"
              @blur="focused = null; validate('email')"
            />
            <span class="field-error" v-if="errors.email">{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-field" :class="{ 'has-error': errors.message, 'is-focused': focused === 'message' }">
          <label class="field-label">Your Message</label>
          <textarea
            class="field-input field-textarea"
            placeholder="Tell me about your project, idea, or just say hi..."
            v-model="form.message"
            @focus="focused = 'message'"
            @blur="focused = null; validate('message')"
          />
          <span class="field-error" v-if="errors.message">{{ errors.message }}</span>
        </div>

        <button type="submit" class="submit-btn" :class="{ 'is-loading': isLoading, 'is-sent': isSent }">
          <span class="btn-inner" v-if="!isLoading && !isSent">
            Send Message
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="btn-inner" v-else-if="isLoading">
            <span class="spinner" /> Sending...
          </span>
          <span class="btn-inner" v-else>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3 3 7-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Message sent!
          </span>
        </button>
      </form>

    </section>

    <!-- Availability strip -->
    <div class="avail-strip" ref="availRef">
      <div class="avail-inner">
        <span class="avail-dot" />
        <span>Available Tuesday – Saturday &nbsp;·&nbsp; 10am – 11pm PHT</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const headerRef  = ref<HTMLElement | null>(null)
const pillsRef   = ref<HTMLElement | null>(null)
const dividerRef = ref<HTMLElement | null>(null)
const formRef    = ref<HTMLElement | null>(null)
const availRef   = ref<HTMLElement | null>(null)
const pillEls    = ref<(Element | null)[]>([])

const contactLinks = [
  {
    label: 'micah-lapuz',
    href: 'https://linkedin.com/in/micah-lapuz',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>`,
  },
  {
    label: 'MLapuz30',
    href: 'https://github.com/MLapuz30',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"/></svg>`,
  },
  {
    label: 'lapuzmicah30@gmail.com',
    href: 'mailto:lapuzmicah30@gmail.com',
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  },
]

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const focused = ref<string | null>(null)
const isLoading = ref(false)
const isSent = ref(false)

function validate(field: 'name' | 'email' | 'message') {
  if (field === 'name')    errors.name    = form.name.trim() ? '' : 'Name is required.'
  if (field === 'email')   errors.email   = !form.email.trim() ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Enter a valid email.' : ''
  if (field === 'message') errors.message = form.message.trim().length < 10 ? 'Message must be at least 10 characters.' : ''
}

async function handleSubmit() {
  ;(['name','email','message'] as const).forEach(validate)
  if (errors.name || errors.email || errors.message) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1800))
  isLoading.value = false
  isSent.value = true
}

const observers: IntersectionObserver[] = []
function reveal(targets: (Element | null)[] | HTMLElement | null, stagger = 0) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      setTimeout(() => el.classList.add('is-visible'), Number(el.dataset.delay ?? 0))
      obs.unobserve(el)
    })
  }, { threshold: 0.1 })
  const arr = Array.isArray(targets) ? targets : [targets]
  arr.forEach((el, i) => {
    if (!el) return
    ;(el as HTMLElement).dataset.delay = String(i * stagger)
    obs.observe(el)
  })
  observers.push(obs)
}

onMounted(() => {
  ;[headerRef, dividerRef, formRef, availRef].forEach(r => { if (r.value) reveal(r.value) })
  setTimeout(() => reveal(pillEls.value, 100), 60)
})
onUnmounted(() => observers.forEach(o => o.disconnect()))
</script>

<style scoped>
/* ── Base — matches index warm dark ───────────────── */
.page-root {
  background: #0e0c0b;
  color: #fff;
  font-family: 'Poppins', system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ── Atmospheric BG ───────────────────────────────── */
.page-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.bg-noise {
  position: absolute; inset: 0; opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
}
.bg-orb {
  position: absolute; border-radius: 50%; filter: blur(100px);
}
.bg-orb-1 {
  width: 550px; height: 550px;
  background: radial-gradient(circle, rgba(103,128,31,0.18), transparent 70%);
  top: -80px; right: 5%;
  animation: orb1 18s ease-in-out infinite;
}
.bg-orb-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(224,192,192,0.14), transparent 70%);
  bottom: 10%; left: -5%;
  animation: orb2 22s ease-in-out infinite;
}
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,30px)} }
@keyframes orb2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-25px)} }

@keyframes gradBorder {
  0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%}
}

.icon-indicator {
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; border-radius: 20%; padding: 3px; flex-shrink: 0;
}

.ui-label    { top: 18%; right: 3%; animation: slideTopRight 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.5s both; }
.avail-label { bottom: 22%; left: 3%; animation: slideLeft 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.7s both; }

.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #67801F; box-shadow: 0 0 8px rgba(103,128,31,0.8);
  flex-shrink: 0; animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.8)} }
@keyframes slideTopRight { from{opacity:0;transform:translateX(40px) translateY(-40px)} to{opacity:1;transform:none} }
@keyframes slideLeft     { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:none} }

/* ── Contact section ──────────────────────────────── */
.contact-section {
  position: relative; z-index: 1;
  max-width: 740px; margin: 0 auto;
  padding: 70px 2rem 5rem;
}

/* ── Header ───────────────────────────────────────── */
.contact-header {
  margin-bottom: 3rem;
  opacity: 0; transform: translateY(22px);
  transition: opacity 0.85s ease, transform 0.85s ease;
}
.contact-header.is-visible { opacity: 1; transform: translateY(0); }

.page-eyebrow {
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em;
  text-transform: uppercase; color: #67801F; margin: 0 0 1rem; display: block;
}
.contact-title {
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  font-weight: 700; letter-spacing: -0.04em; line-height: 1.05;
  margin: 0 0 1rem; color: #fff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.name-serif {
  font-family: 'DM Serif Text', serif;
  font-style: italic; font-weight: 400;
  background: linear-gradient(135deg, #e0c0c0 0%, #fff 50%, #c8b08a 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.contact-sub {
  font-size: 0.97rem; line-height: 1.75;
  color: rgba(255,255,255,0.4); margin: 0; font-weight: 300;
}

/* ── Contact pills ────────────────────────────────── */
.contact-pills {
  display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 2.5rem;
}
.contact-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 11px 18px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.6);
  text-decoration: none; font-size: 0.84rem; font-weight: 500;
  transition: border-color 0.3s, background 0.3s, color 0.3s, transform 0.25s, box-shadow 0.35s;
  opacity: 0; transform: translateY(14px);
}
.contact-pill.is-visible { opacity: 1; transform: translateY(0); }
.contact-pill:hover {
  border-color: rgba(103,128,31,0.5);
  background: rgba(103,128,31,0.08);
  color: #fff; transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(103,128,31,0.14);
}
.pill-icon { color: #67801F; display: flex; align-items: center; flex-shrink: 0; }
.pill-arrow {
  margin-left: 4px; color: rgba(255,255,255,0.18);
  transition: color 0.25s, transform 0.25s;
}
.contact-pill:hover .pill-arrow { color: rgba(103,128,31,0.7); transform: translate(2px,-2px); }

/* ── Divider ──────────────────────────────────────── */
.divider {
  display: flex; align-items: center; gap: 16px; margin-bottom: 2.5rem;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.divider.is-visible { opacity: 1; transform: translateY(0); }
.divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
.divider-label {
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.2); white-space: nowrap;
}

/* ── Form ─────────────────────────────────────────── */
.contact-form {
  display: flex; flex-direction: column; gap: 20px;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
}
.contact-form.is-visible { opacity: 1; transform: translateY(0); }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 8px; }

.field-label {
  font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: rgba(255,255,255,0.28);
  transition: color 0.25s;
}
.form-field.is-focused .field-label { color: #67801F; }
.form-field.has-error  .field-label { color: #e0c0c0; }

.field-input {
  width: 100%; padding: 14px 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: #fff; font-size: 0.9rem;
  font-family: 'Poppins', sans-serif; font-weight: 300;
  outline: none; resize: none; box-sizing: border-box;
  transition: border-color 0.25s, background 0.25s, box-shadow 0.3s;
}
.field-input::placeholder { color: rgba(255,255,255,0.18); }

.form-field.is-focused .field-input {
  border-color: rgba(103,128,31,0.45);
  background: rgba(103,128,31,0.05);
  box-shadow: 0 0 0 3px rgba(103,128,31,0.1);
}
.form-field.has-error .field-input {
  border-color: rgba(224,192,192,0.45);
  box-shadow: 0 0 0 3px rgba(224,192,192,0.08);
}

.field-textarea { min-height: 200px; line-height: 1.65; }

.field-error {
  font-size: 0.73rem; color: #e0c0c0;
  display: flex; align-items: center; gap: 5px;
}
.field-error::before { content: '·'; font-size: 1.2rem; line-height: 1; }

/* ── Submit button — olive gradient, matches index primary ─ */
.submit-btn {
  width: 100%; padding: 15px;
  border: none; border-radius: 999px; cursor: pointer;
  font-family: 'Poppins', sans-serif; font-size: 0.92rem; font-weight: 600;
  color: #fff;
  background: linear-gradient(to bottom, #7f9b2f 0%, #67801F 40%, #5a6f1a 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.28), 0 4px 12px rgba(0,0,0,0.2);
  transition: background 0.3s, transform 0.25s, box-shadow 0.3s;
}
.submit-btn:hover { background: #485e08; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(103,128,31,0.3); }
.submit-btn:active { transform: translateY(0); }
.submit-btn.is-sent {
  background: rgba(103,128,31,0.2);
  border: 1px solid rgba(103,128,31,0.4);
  box-shadow: none; cursor: default;
}
.submit-btn.is-sent:hover { background: rgba(103,128,31,0.2); transform: none; }

.btn-inner {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.spinner {
  width: 15px; height: 15px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff;
  animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Availability strip ───────────────────────────── */
.avail-strip {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(255,255,255,0.05); padding: 1.5rem 2rem;
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avail-strip.is-visible { opacity: 1; transform: translateY(0); }
.avail-inner {
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
.avail-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #67801F;
  box-shadow: 0 0 8px rgba(103,128,31,0.7);
  flex-shrink: 0; animation: blink 2.5s ease-in-out infinite;
}
.avail-strip span:last-child {
  font-size: 0.78rem; color: rgba(255,255,255,0.28); letter-spacing: 0.04em;
}

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 640px) {
  .contact-section { padding: 100px 1.5rem 4rem; }
  .form-row { grid-template-columns: 1fr; }
  .contact-pills { flex-direction: column; }
  .ui-label, .avail-label { display: none; }
}
</style>