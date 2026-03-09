<template>
  <!-- ===================================================
        HERO SECTION
        Full-viewport landing section with animated background,
        role badges, chat bubbles, and CTA buttons.
  =================================================== -->
  <section
    class="hero-section"
    aria-label="Hero section — Micah Lapuz, Frontend Developer and UI/UX Designer"
    role="region"
  >
    <!-- Background: interactive grid distortion using /bg.JPG -->
    <GridDistortion
      imageSrc="/bg.JPG"
      :grid="10"
      :mouse="0.1"
      :strength="0.15"
      :relaxation="0.9"
      className="hero-bg"
      aria-hidden="true"
      role="presentation"
    />

    <!-- ── Main hero content ── -->
    <div class="hero-content">

      <!-- Eyebrow kicker — small uppercase intro label -->
      <span class="eyebrow" aria-hidden="true">
        <span class="eyebrow-line" aria-hidden="true" />
        Hello, I'm
      </span>

      <!-- Primary heading -->
      <h1 class="hero-name" itemprop="name">
        <span class="name-text">Micah Lapuz.</span>
      </h1>

      <!-- ── Floating role badge cards ── -->
      <div
        class="badges-container"
        role="list"
        aria-label="Professional roles"
      >
        <!-- Badge 1: Frontend Developer -->
        <div
          class="floating-badge badge-left"
          role="listitem"
          aria-label="Role: Frontend Developer"
          itemprop="jobTitle"
        >
          <div class="badge-pin" aria-hidden="true"></div>
          <div class="badge-content">
            <div class="badge-icon" aria-hidden="true">
              <!-- Code brackets icon representing Frontend Development -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <title>Code brackets icon</title>
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <div class="badge-text">
              <span class="badge-label">ROLE</span>
              <span class="badge-title">Frontend Developer</span>
            </div>
          </div>
        </div>

        <!-- Badge 2: UI/UX Designer -->
        <div
          class="floating-badge badge-right"
          role="listitem"
          aria-label="Role: UI/UX Designer"
          itemprop="jobTitle"
        >
          <div class="badge-pin" aria-hidden="true"></div>
          <div class="badge-content">
            <div class="badge-icon" aria-hidden="true">
              <!-- Pen/cursor icon representing UI/UX Design -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <title>Design cursor icon</title>
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </div>
            <div class="badge-text">
              <span class="badge-label">ROLE</span>
              <span class="badge-title">UI/UX Designer</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Call-to-action buttons ── -->
      <div class="cta-buttons" role="group" aria-label="Primary actions">
        <!-- Opens resume PDF in a new tab -->
        <button
          class="btn btn-primary"
          @click="viewResume"
          aria-label="View Micah Lapuz's resume — opens PDF in a new tab"
          type="button"
        >
          <span>View Resume</span>
          <!-- Arrow icon indicating external/new-tab link -->
          <svg
            class="btn-arrow"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 17L17 7"/>
            <path d="M7 7h10v10"/>
          </svg>
        </button>

        <!-- Internal link to About page -->
        <RouterLink
          to="/about"
          class="btn btn-secondary"
          aria-label="Learn more about Micah Lapuz"
        >
          <span>More about me</span>
        </RouterLink>
      </div>
    </div>

    <!-- ── Tagline chat bubble (bottom-left) ──
          Animates through: hidden → typing → revealed in a loop.
          Contains rotating words: explore / imagine / create.
    ── -->
    <aside
      class="chat-widget-left"
      aria-label="Personal tagline"
      role="complementary"
    >
      <div
        class="chat-row align-left"
        :class="{ 'is-active': taglineBubble.state !== 'hidden' }"
        :aria-hidden="taglineBubble.state === 'hidden'"
      >
        <div
          class="chat-bubble bubble-light"
          role="status"
          aria-live="polite"
          aria-label="Tagline: I explore, imagine, create possibilities, then turn ideas into realities."
        >
          <!-- Animated typing indicator (3 bouncing dots) -->
          <div
            v-if="taglineBubble.state === 'typing'"
            class="typing-indicator"
            aria-label="Loading tagline…"
            role="img"
          >
            <span class="typing-dot" aria-hidden="true" />
            <span class="typing-dot" aria-hidden="true" />
            <span class="typing-dot" aria-hidden="true" />
          </div>

          <!-- Revealed tagline with rotating keyword -->
          <div
            v-else-if="taglineBubble.state === 'revealed'"
            class="bubble-content"
          >
            <span class="bubble-text tagline-bubble-text">
              I
              <!-- Rotating animated keyword: explore / imagine / create -->
              <span
                class="rotating-text-container"
                aria-live="polite"
                aria-label="rotating action word"
              >
                <Transition name="rotate-fade" mode="out-in">
                  <span
                    :key="rotatingWords[currentWordIndex]"
                    class="rotating-word"
                  >
                    {{ rotatingWords[currentWordIndex] }}
                  </span>
                </Transition>
              </span>
              <span class="bubble-text tagline-bubble-text"> possibilities,</span>
              <br />
              then turn ideas into realities.
            </span>
          </div>
        </div>
      </div>
    </aside>

    <!-- ── Chat-style conversation widget (bottom-right) ──
          Loops through a 4-bubble simulated conversation showcasing skills.
          Each bubble goes: hidden → typing → revealed.
    ── -->
    <aside
      class="chat-widget"
      aria-label="Skills showcase conversation"
      role="complementary"
    >
      <div
        v-for="(bubble, idx) in chatBubbles"
        :key="idx"
        class="chat-row"
        :class="[bubble.align, { 'is-active': bubble.state !== 'hidden' }]"
        :aria-hidden="bubble.state === 'hidden'"
      >
        <div
          class="chat-bubble"
          :class="[bubble.variant]"
          role="status"
          aria-live="polite"
          :aria-label="bubble.state === 'revealed' ? bubble.text : 'Loading message…'"
        >
          <!-- Typing indicator while bubble is loading -->
          <div
            v-if="bubble.state === 'typing'"
            class="typing-indicator"
            aria-hidden="true"
          >
            <span class="typing-dot" aria-hidden="true" />
            <span class="typing-dot" aria-hidden="true" />
            <span class="typing-dot" aria-hidden="true" />
          </div>

          <!-- Revealed bubble text content -->
          <div
            v-else-if="bubble.state === 'revealed'"
            class="bubble-content"
          >
            <span class="bubble-text">{{ bubble.text }}</span>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import GridDistortion from "../component/GridDistortion.vue";

  // Words that cycle inside the tagline bubble: "I [word] possibilities"
  const rotatingWords = ['explore', 'imagine', 'create'];
  const currentWordIndex = ref(0);
  let rotatingInterval: ReturnType<typeof setInterval> | null = null;

  // ── Chat bubble state type ──
  interface ChatBubble {
    text: string
    state: 'hidden' | 'typing' | 'revealed'
    variant: string   // CSS class: bubble-light | bubble-accent
    align: string     // CSS class: align-left | align-right
  }

  // Tagline bubble — bottom-left, always align-left
  const taglineBubble = reactive<ChatBubble>({
    text: '',
    state: 'hidden',
    variant: 'bubble-light',
    align: 'align-left',
  });

  // Conversation bubbles — bottom-right, alternating left/right
  const chatBubbles = reactive<ChatBubble[]>([
    {
      text: 'What do you bring to the table?',
      state: 'hidden',
      variant: 'bubble-light',
      align: 'align-left',
    },
    {
      text: 'Designing user-centered experiences',
      state: 'hidden',
      variant: 'bubble-accent',
      align: 'align-right',
    },
    {
      text: 'Love that. While?',
      state: 'hidden',
      variant: 'bubble-light',
      align: 'align-left',
    },
    {
      text: 'Building efficient, maintainable front-end solutions.',
      state: 'hidden',
      variant: 'bubble-accent',
      align: 'align-right',
    },
  ]);

  // Tracks all pending timeouts so they can be cleared on unmount or restart
  const pendingTimeouts: ReturnType<typeof setTimeout>[] = [];

  function clearAllTimeouts() {
    pendingTimeouts.forEach(clearTimeout);
    pendingTimeouts.length = 0;
  }

  // Schedules the full bubble animation sequence:
  function scheduleBubbleSequence() {
    clearAllTimeouts();
    taglineBubble.state = 'hidden';
    chatBubbles.forEach(b => (b.state = 'hidden'));

    const TYPING_MS = 1200;      // Duration of the typing animation per bubble
    const REVEAL_PAUSE_MS = 600; // Pause after revealing before moving to next bubble
    const LOOP_PAUSE_MS = 4500;  // Pause after all bubbles are revealed before looping
    let delay = 0;

    // Tagline bubble appears first
    pendingTimeouts.push(setTimeout(() => { taglineBubble.state = 'typing'; }, delay));
    delay += TYPING_MS;
    pendingTimeouts.push(setTimeout(() => { taglineBubble.state = 'revealed'; }, delay));
    delay += REVEAL_PAUSE_MS;

    // Chat bubbles appear sequentially
    chatBubbles.forEach(bubble => {
      pendingTimeouts.push(setTimeout(() => { bubble.state = 'typing'; }, delay));
      delay += TYPING_MS;
      pendingTimeouts.push(setTimeout(() => { bubble.state = 'revealed'; }, delay));
      delay += REVEAL_PAUSE_MS;
    });

    // Loop the entire sequence after all bubbles are visible
    pendingTimeouts.push(setTimeout(scheduleBubbleSequence, delay + LOOP_PAUSE_MS));
  }

  onMounted(() => {
    // Cycle rotating tagline words every 2.5s
    rotatingInterval = setInterval(() => {
      currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length;
    }, 2500);

    // Kick off the chat bubble animation loop
    scheduleBubbleSequence();
  });

  onUnmounted(() => {
    if (rotatingInterval) clearInterval(rotatingInterval);
    clearAllTimeouts();
  });

  // Opens the resume PDF in a new browser tab
  const viewResume = () => {
    window.open('/Mary Micah Lapuz - Resume.pdf', '_blank', 'noopener,noreferrer');
  };
</script>

<style scoped>
/* ============================================================
    HERO SECTION — full viewport landing area
============================================================ */
.hero-section {
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Grid distortion image fills hero as a decorative background */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.65;
}

/* ── Hero content ── */
.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 20;
  color: var(--text-primary);
  pointer-events: none;
  font-family: 'Poppins', sans-serif;
  gap: 0;
}

/* ── Entrance animation ── */
@keyframes fadeInUpHero {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Eyebrow kicker ── */
.hero-name {
  margin: 0;
  margin-top: -2rem;
  padding: 0;
  line-height: 1;
}

.eyebrow {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(0.75rem, 1.4vw, 1rem);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
  margin-bottom: 3rem;
  animation: fadeInUpHero 0.7s ease-out 0.1s both;
}

/* ── Hero name ── */
.name-text {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(4rem, 14vw, 6rem);
  font-weight: 500;
  font-style: italic;
  letter-spacing: -0.5rem;
  line-height: 0.85;
  color: var(--text-primary);
  -webkit-text-fill-color: var(--text-primary);
  filter: drop-shadow(0 4px 20px var(--shadow-sm));
  animation: fadeInUpHero 0.8s ease-out 0.25s both;
  margin: 0;
}

/* ============================================================
    FLOATING ROLE BADGES
============================================================ */
.badges-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
  flex-wrap: wrap;
  animation: fadeInUpHero 0.8s ease-out 0.5s both;
}

.floating-badge {
  position: relative;
  display: inline-block;
  z-index: 25;
  pointer-events: auto;
}

/* Left badge swings slightly left, right badge slightly right */
.badge-left {
  animation: floatInScaleLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both,
              gentleSwayLeft 3s ease-in-out 1.8s infinite;
  transform-origin: top center;
}

.badge-right {
  animation: floatInScaleRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both,
              gentleSwayRight 3.5s ease-in-out 2s infinite;
  transform-origin: top center;
}

@keyframes gentleSwayLeft {
  0%, 100% { transform: rotate(-3deg); }
  50%       { transform: rotate(2deg); }
}

@keyframes gentleSwayRight {
  0%, 100% { transform: rotate(3deg); }
  50%       { transform: rotate(-2deg); }
}

@keyframes floatInScaleLeft {
  from { opacity: 0; transform: translateY(30px) scale(0.8) rotate(-8deg); }
  to   { opacity: 1; transform: translateY(0) scale(1) rotate(-3deg); }
}

@keyframes floatInScaleRight {
  from { opacity: 0; transform: translateY(30px) scale(0.8) rotate(8deg); }
  to   { opacity: 1; transform: translateY(0) scale(1) rotate(3deg); }
}

/* Decorative pin/clip at the top of each badge */
.badge-pin {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #d28686 0%, #E0C0C0 100%);
  border-radius: 50%;
  box-shadow:
    0 2px 8px rgba(210, 134, 134, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.3);
  animation: pinGlow 2s ease-in-out infinite;
}

@keyframes pinGlow {
  0%, 100% {
    box-shadow:
      0 2px 8px rgba(210, 134, 134, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
  }
  50% {
    box-shadow:
      0 2px 16px rgba(210, 134, 134, 0.6),
      0 0 20px rgba(224, 192, 192, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
  }
}

.badge-content {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
}

.floating-badge:hover .badge-content {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-3px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.15);
}

/* Pause sway on hover so badge stays still while focused */
.badge-left:hover  { transform: rotate(-5deg); animation-play-state: paused; }
.badge-right:hover { transform: rotate(5deg);  animation-play-state: paused; }

/* Icon circle inside each badge */
.badge-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #d28686 0%, #E0C0C0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(210, 134, 134, 0.3);
}

.badge-icon svg {
  color: var(--text-primary);
  filter: drop-shadow(0 1px 2px var(--shadow-sm));
}

.badge-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.badge-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
}

.badge-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

/* ============================================================
    ROTATING TAGLINE WORD (explore / imagine / create)
============================================================ */
.rotating-text-container {
  display: inline-block;
  position: relative;
  min-width: fit-content;
  text-align: center;
  vertical-align: baseline;
}

.rotating-word {
  display: inline-block;
  font-family: 'Poppins', sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: -0.05rem;
  color: #fff;
  background: linear-gradient(135deg, #d28686 0%, #E0C0C0 100%);
  padding: 0.05em 0.55em;
  border-radius: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(210, 134, 134, 0.25);
}

/* Slide-up-in / slide-down-out transition for rotating word */
.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition: all 0.5s ease;
}

.rotate-fade-enter-from { opacity: 0; transform: translateY(-20px); }
.rotate-fade-leave-to   { opacity: 0; transform: translateY(20px); }
.rotate-fade-enter-to,
.rotate-fade-leave-from { opacity: 1; transform: translateY(0); }

/* ============================================================
    DESCRIPTION (currently unused, kept for future use)
============================================================ */
.description {
  font-size: clamp(0.85rem, 1.5vw, 0.95rem);
  margin: 0;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  animation: fadeInUpHero 0.8s ease-out 0.8s both;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  text-align: center;
  max-width: 520px;
  letter-spacing: 0.015em;
}

/* ============================================================
    CHAT WIDGET LEFT — tagline bubble, bottom-left
============================================================ */
.chat-widget-left {
  position: absolute;
  bottom: 3.5rem;
  left: 2.5rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  max-width: 400px;
  pointer-events: auto;
}

.tagline-bubble-text {
  font-size: clamp(0.88rem, 1.5vw, 1rem);
  color: #1a1a1a;
  line-height: 1.55;
  font-family: 'Poppins', sans-serif;
}

/* ============================================================
    CHAT WIDGET — skills conversation, bottom-right
============================================================ */
.chat-widget {
  position: absolute;
  bottom: 3.5rem;
  right: 2.5rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  max-width: 360px;
  pointer-events: auto;
}

/* Each row slides up when activated via .is-active */
.chat-row {
  display: flex;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-row.is-active {
  opacity: 1;
  transform: translateY(0);
}

.chat-row.align-left  { justify-content: flex-start; }
.chat-row.align-right { justify-content: flex-end; }

.chat-bubble {
  display: inline-flex;
  align-items: center;
  padding: 14px 22px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  line-height: 1.45;
  max-width: 320px;
}

/* Light variant: question bubbles (left-aligned, rounded bottom-left corner) */
.bubble-light {
  background: rgba(255, 255, 255, 0.92);
  color: #1a1a1a;
  border-radius: 20px 20px 20px 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

/* Accent variant: answer bubbles (right-aligned, rounded bottom-right corner) */
.bubble-accent {
  background: linear-gradient(135deg, #E0C0C0 0%, #d28686 100%);
  color: #3d2c2c;
  border-radius: 20px 20px 6px 20px;
  box-shadow: 0 2px 12px rgba(210, 134, 134, 0.25);
}

.bubble-content {
  display: inline-flex;
  align-items: center;
}

.bubble-text {
  display: inline;
}

/* ── Typing indicator — three bouncing dots ── */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 6px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: typing-bounce 1.4s ease-in-out infinite;
}

/* Dot color per bubble variant */
.bubble-accent .typing-dot { background: rgba(61, 44, 44, 0.45); }
.bubble-light  .typing-dot { background: rgba(80, 80, 80, 0.55); }

/* Stagger delay so dots ripple left-to-right */
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-bounce {
  0%, 60%, 100% { transform: translateY(0);   opacity: 0.35; }
  30%            { transform: translateY(-5px); opacity: 1; }
}

/* ============================================================
    CTA BUTTONS
============================================================ */
.cta-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  pointer-events: auto;
  animation: fadeInUpHero 0.8s ease-out 1.1s both;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.btn-arrow { transition: transform 0.3s ease; }
.btn:hover .btn-arrow { transform: translate(2px, -2px); }

/* Primary: warm rose gradient — main CTA */
.btn-primary {
  background: linear-gradient(135deg, #fbe9e9 0%, #E0C0C0 50%, #d7b3b3 100%);
  color: #3d2c2c;
  box-shadow: 0 4px 14px rgba(210, 134, 134, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #fddcdc 0%, #dfbaba 50%, #d8aaaa 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(210, 134, 134, 0.4);
}

/* Secondary: frosted glass — subtle secondary CTA */
.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
}

/* ============================================================
    RESPONSIVE — Large screens (≥1200px)
============================================================ */
@media (min-width: 1200px) {
  .hero-content { padding: 3rem 4rem; }
  .description  { max-width: 560px; }

  .badges-container { gap: 2rem; margin-top: 1.75rem; }
  .badge-content    { padding: 1.15rem 1.4rem; gap: 1rem; }
  .badge-icon       { width: 44px; height: 44px; }
  .badge-icon svg   { width: 22px; height: 22px; }
  .badge-title      { font-size: 0.95rem; }
  .badge-label      { font-size: 0.7rem; }
}

/* ============================================================
    RESPONSIVE — Tablet (≤900px)
    Layout: hero content shifts up slightly, chat widgets
    stack into a unified bottom bar — left tagline on left,
    right conversation on right, reduced font/padding.
============================================================ */
@media (max-width: 900px) {
  /* ── Section ── */
  .hero-section {
    height: 100dvh; /* dynamic viewport height handles mobile browser chrome */
    min-height: 600px;
  }

  /* ── Hero content: vertically centered in upper 65% of screen ── */
  .hero-content {
    justify-content: center;
    padding-top: 0;
    padding-bottom: 180px; /* reserve bottom space for chat widgets */
    padding-left: 2rem;
    padding-right: 2rem;
    gap: 0;
  }

  /* ── Eyebrow ── */
  .eyebrow {
    margin-bottom: 1.5rem;
  }

  /* ── Name ── */
  .name-text {
    font-size: clamp(3.2rem, 10vw, 5.5rem);
    letter-spacing: -0.3rem;
    margin-bottom: 1.75rem;
  }

  /* ── Badges: tighten gap, keep side-by-side ── */
  .badges-container {
    gap: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0;
    flex-wrap: nowrap; /* keep on one row on tablet */
  }

  /* Suppress animation transform conflicts on tablet — let badge just sit still */
  .badge-left,
  .badge-right {
    animation:
      floatInScaleLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both,
      gentleSwayLeft 3s ease-in-out 1.8s infinite;
  }
  .badge-right {
    animation:
      floatInScaleRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both,
      gentleSwayRight 3.5s ease-in-out 2s infinite;
  }

  .badge-content {
    padding: 0.8rem 1rem;
    gap: 0.65rem;
  }

  .badge-icon       { width: 34px; height: 34px; }
  .badge-icon svg   { width: 17px; height: 17px; }
  .badge-title      { font-size: 0.78rem; }
  .badge-label      { font-size: 0.58rem; }

  /* ── CTAs ── */
  .cta-buttons {
    margin-top: 2rem;
    gap: 0.65rem;
  }

  /* ── Chat widget left (tagline) — bottom-left, compact ── */
  .chat-widget-left {
    bottom: 1.75rem;
    left: 1.5rem;
    max-width: min(42vw, 300px);
  }

  .tagline-bubble-text {
    font-size: 0.82rem;
    line-height: 1.45;
  }

  /* ── Chat widget right (conversation) — bottom-right, compact ── */
  .chat-widget {
    bottom: 1.75rem;
    right: 1.5rem;
    max-width: min(44vw, 300px);
    gap: 0.5rem;
  }

  .chat-bubble {
    font-size: 0.78rem;
    padding: 10px 14px;
    max-width: 100%;
  }
}

/* ============================================================
    RESPONSIVE — Mobile landscape (≤768px, landscape orientation)
    Reduce vertical spacing to fit everything in one short viewport.
============================================================ */
@media (max-width: 768px) and (orientation: landscape) {
  .hero-content {
    padding-top: 0;
    padding-bottom: 100px;
  }

  .name-text {
    font-size: clamp(2.5rem, 8vw, 4rem);
    letter-spacing: -0.2rem;
  }

  .badges-container { margin-top: 0.75rem; }

  .chat-widget-left,
  .chat-widget {
    bottom: 1rem;
  }

  .chat-bubble {
    font-size: 0.72rem;
    padding: 8px 12px;
  }
}

/* ============================================================
    RESPONSIVE — Mobile portrait (≤600px)
    Strategy: hero content centered in upper ~60% of screen.
    Chat widgets move to a unified bottom strip, side by side,
    constrained so they never overlap.
============================================================ */
@media (max-width: 600px) {
  /* ── Section fills dynamic viewport ── */
  .hero-section {
    height: 100dvh;
    min-height: 580px;
  }

  /* ── Hero content: vertically centered in upper portion, bottom reserved for widgets ── */
  .hero-content {
    justify-content: center;
    align-items: center;
    padding-top: 0;
    padding-bottom: 160px; /* pushes center point up, leaving bottom for chat widgets */
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* ── Eyebrow ── */
  .eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    margin-bottom: 1.25rem;
  }

  /* ── Name ── */
  .hero-name { margin-top: 0; }
  .name-text {
    font-size: clamp(2.8rem, 13vw, 4.5rem);
    letter-spacing: -0.25rem;
    line-height: 0.9;
    margin-bottom: 1.5rem;
  }

  /* ── Badges: side-by-side, scaled down, no sway on small screens ── */
  .badges-container {
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.6rem;
    margin-top: 1.5rem;
    margin-bottom: 0;
    width: 100%;
    justify-content: center;
  }

  /* Disable continuous sway on mobile — avoids jank and saves battery */
  .badge-left {
    animation: floatInScaleLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
    transform: rotate(-2deg);
  }
  .badge-right {
    animation: floatInScaleRight 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both;
    transform: rotate(2deg);
  }
  /* Keep static rotation after entrance animation */
  .badge-left:not(:hover)  { transform: rotate(-2deg); }
  .badge-right:not(:hover) { transform: rotate(2deg); }

  .badge-content {
    padding: 0.65rem 0.85rem;
    gap: 0.55rem;
    border-radius: 10px;
  }

  .badge-pin    { width: 10px; height: 10px; top: -6px; }
  .badge-icon   { width: 30px; height: 30px; border-radius: 7px; }
  .badge-icon svg { width: 15px; height: 15px; }
  .badge-title  { font-size: 0.72rem; }
  .badge-label  { font-size: 0.55rem; }

  /* ── CTAs: full-width stacked ── */
  .cta-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
    margin-top: 1.75rem;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    padding: 0.78rem 1.5rem;
    font-size: 0.875rem;
  }

  /* ── Chat widgets: pinned side-by-side at the bottom ──
      Left widget (tagline) anchored to left edge.
      Right widget (conversation) anchored to right edge.
      Both sit above safe-area inset for notched devices.
  ── */
  .chat-widget-left {
    position: absolute;
    bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    left: 1rem;
    right: 50%; /* prevents overlap with right widget */
    max-width: none;
    width: auto;
    padding-right: 0.5rem;
  }

  .chat-widget {
    position: absolute;
    bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    right: 1rem;
    left: 50%; /* prevents overlap with left widget */
    max-width: none;
    width: auto;
    padding-left: 0.5rem;
    align-items: flex-end;
  }

  /* Constrain chat rows to not exceed half screen width */
  .chat-widget .chat-row { width: 100%; }

  .tagline-bubble-text {
    font-size: 0.75rem;
    line-height: 1.4;
  }

  .chat-bubble {
    font-size: 0.72rem;
    padding: 9px 13px;
    max-width: 100%;
    line-height: 1.4;
  }

  /* Slightly smaller typing dots on mobile */
  .typing-dot { width: 6px; height: 6px; }

  .rotating-word {
    font-size: 0.72rem;
    padding: 0.04em 0.4em;
    border-radius: 6px;
  }
}

/* ============================================================
    RESPONSIVE — Small mobile (≤390px)
    Tighten everything further for very small viewports.
============================================================ */
@media (max-width: 390px) {
  .hero-content {
    padding-top: 0;
    padding-bottom: 140px;
  }

  .name-text {
    font-size: clamp(2.4rem, 14vw, 3.5rem);
    letter-spacing: -0.18rem;
  }

  .eyebrow { font-size: 0.62rem; letter-spacing: 0.22em; }

  .badge-content   { padding: 0.55rem 0.75rem; gap: 0.45rem; }
  .badge-icon      { width: 26px; height: 26px; }
  .badge-icon svg  { width: 13px; height: 13px; }
  .badge-title     { font-size: 0.65rem; }
  .badge-label     { font-size: 0.5rem; }

  .tagline-bubble-text { font-size: 0.68rem; }
  .chat-bubble { font-size: 0.67rem; padding: 8px 11px; }

  .btn { font-size: 0.83rem; padding: 0.72rem 1.25rem; }
}
</style>