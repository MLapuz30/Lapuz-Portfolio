<template>
  <div class="hero-section">
    <GradientBlinds
      :gradient-colors="['#1a0a0a', '#e0c0c0', '#1a0a0a']"
      :angle="20"
      :noise="0.25"
      :blind-count="10"
      :blind-min-width="60"
      :spotlight-radius="0.45"
      :spotlight-softness="1.2"
      :spotlight-opacity="0.5"
      :mouse-dampening="0.30"
      :distort-amount="0"
      shine-direction="left"
      mix-blend-mode="normal"
    />
    
    <!-- Hero content -->
    <div class="hero-content">
      <div class="hero-left">
        <!-- Labels for mobile and ltablet - positioned around circular photo -->
        <div class="label ui-label mobile-tablet-label">
          <span class="icon-indicator" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#67801F" d="M17 17c.361 0 .598.187.694.278c.116.11.198.249.269.39a1 1 0 0 0 .4.386c.133.073.257.143.363.256a1.01 1.01 0 0 1 .001 1.38c-.106.114-.23.183-.365.256a1 1 0 0 0-.4.386c-.077.143-.146.277-.267.39a1.01 1.01 0 0 1-1.39 0c-.12-.114-.19-.247-.268-.39a1 1 0 0 0-.4-.386a1.3 1.3 0 0 1-.364-.255a1.01 1.01 0 0 1 .001-1.381a1.3 1.3 0 0 1 .364-.256a1 1 0 0 0 .4-.386c.077-.143.147-.277.267-.39c.096-.09.333-.278.695-.278M13.768 5.282l4.95 4.95l-9.092 9.09a1.5 1.5 0 0 1-.723.401l-4.455 1.028a1 1 0 0 1-1.2-1.2l1.028-4.455a1.5 1.5 0 0 1 .4-.723zm6.364-2.121l.707.707a3 3 0 0 1 0 4.242l-.707.707l-4.95-4.95l.707-.706a3 3 0 0 1 4.243 0M6 0a1 1 0 0 1 .946.677l.129.377c.3.88.992 1.57 1.87 1.871l.378.13a1 1 0 0 1 0 1.891l-.377.13c-.88.3-1.57.99-1.87 1.87l-.13.377a1.001 1.001 0 0 1-1.892 0l-.129-.378a3 3 0 0 0-1.87-1.87l-.379-.129a1 1 0 0 1 0-1.892l.379-.13c.879-.3 1.57-.99 1.87-1.87l.129-.377A1 1 0 0 1 6 0"/></g>
            </svg>
          </span>
          <span>UI / UX<br/>Designer</span>
        </div>

        <div class="label developer-label mobile-tablet-label">
          <span class="icon-indicator" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="#67801F" d="M8.136 45.956c3.271.266 8.463.544 15.864.544s12.593-.278 15.864-.544c3.288-.267 5.825-2.804 6.092-6.092c.266-3.271.544-8.463.544-15.864c0-3.71-.07-6.864-.173-9.5H1.673A244 244 0 0 0 1.5 24c0 7.401.278 12.593.544 15.864c.267 3.288 2.804 5.825 6.092 6.092"/><path fill="#67801F" fill-rule="evenodd" d="M1.815 11.5q.11-1.933.229-3.364c.267-3.288 2.804-5.825 6.092-6.092C11.407 1.778 16.599 1.5 24 1.5s12.593.278 15.864.544c3.288.267 5.825 2.804 6.092 6.092q.118 1.43.229 3.364zM7.5 7A1.5 1.5 0 0 1 9 5.5h2a1.5 1.5 0 0 1 0 3H9A1.5 1.5 0 0 1 7.5 7M17 5.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 0 0-3z" clip-rule="evenodd"/>
            </svg>
          </span>
          <span>Front End<br />Developer</span>
        </div>

        <div class="label available-label mobile-tablet-label">
          <span class="status-indicator blink-indicator" aria-hidden="true"/>
          <span>Available for<br />Opportunities</span>
        </div>

        <h1 ref="headingRef" class="blur-heading">
          <Motion
            v-for="(segment, index) in headingSegments"
            :key="`${animationKey}-${index}`"
            tag="span"
            :initial="fromSnapshot"
            :animate="inView ? getAnimateKeyframes() : fromSnapshot"
            :transition="getTransition(index)"
            :style="{
              display: 'inline',
              willChange: 'transform, filter, opacity'
            }"
            :class="{ 'name-highlight': segment.isHighlight }"
          >
            {{ segment.text }}<br v-if="segment.hasBr" />
          </Motion>
        </h1>
        <p class="tagline">I explore, imagine, create,<br />then push to celebrate.</p>
        <p class="description">Designing user-centered experiences while building efficient, maintainable front-end solutions</p>
        
        <div class="cta-buttons">
          <button class="btn btn-primary" @click="viewResume">Download Resume</button>
          <button class="btn btn-secondary">More about me</button>
        </div>
      </div>
      
      <div class="hero-right">
          <!-- Wrapper gives labels room to float outside the image box -->
          <div class="image-wrapper">

            <!-- Desktop labels — positioned outside the image via the wrapper -->
            <div class="label ui-label desktop-label">
              <span class="icon-indicator" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="#67801F" d="M17 17c.361 0 .598.187.694.278c.116.11.198.249.269.39a1 1 0 0 0 .4.386c.133.073.257.143.363.256a1.01 1.01 0 0 1 .001 1.38c-.106.114-.23.183-.365.256a1 1 0 0 0-.4.386c-.077.143-.146.277-.267.39a1.01 1.01 0 0 1-1.39 0c-.12-.114-.19-.247-.268-.39a1 1 0 0 0-.4-.386a1.3 1.3 0 0 1-.364-.255a1.01 1.01 0 0 1 .001-1.381a1.3 1.3 0 0 1 .364-.256a1 1 0 0 0 .4-.386c.077-.143.147-.277.267-.39c.096-.09.333-.278.695-.278M13.768 5.282l4.95 4.95l-9.092 9.09a1.5 1.5 0 0 1-.723.401l-4.455 1.028a1 1 0 0 1-1.2-1.2l1.028-4.455a1.5 1.5 0 0 1 .4-.723zm6.364-2.121l.707.707a3 3 0 0 1 0 4.242l-.707.707l-4.95-4.95l.707-.706a3 3 0 0 1 4.243 0M6 0a1 1 0 0 1 .946.677l.129.377c.3.88.992 1.57 1.87 1.871l.378.13a1 1 0 0 1 0 1.891l-.377.13c-.88.3-1.57.99-1.87 1.87l-.13.377a1.001 1.001 0 0 1-1.892 0l-.129-.378a3 3 0 0 0-1.87-1.87l-.379-.129a1 1 0 0 1 0-1.892l.379-.13c.879-.3 1.57-.99 1.87-1.87l.129-.377A1 1 0 0 1 6 0"/></g>
                </svg>
              </span>
              <span>UI / UX<br/>Designer</span>
            </div>

            <div class="label developer-label desktop-label">
              <span class="icon-indicator" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="#67801F" d="M8.136 45.956c3.271.266 8.463.544 15.864.544s12.593-.278 15.864-.544c3.288-.267 5.825-2.804 6.092-6.092c.266-3.271.544-8.463.544-15.864c0-3.71-.07-6.864-.173-9.5H1.673A244 244 0 0 0 1.5 24c0 7.401.278 12.593.544 15.864c.267 3.288 2.804 5.825 6.092 6.092"/><path fill="#67801F" fill-rule="evenodd" d="M1.815 11.5q.11-1.933.229-3.364c.267-3.288 2.804-5.825 6.092-6.092C11.407 1.778 16.599 1.5 24 1.5s12.593.278 15.864.544c3.288.267 5.825 2.804 6.092 6.092q.118 1.43.229 3.364zM7.5 7A1.5 1.5 0 0 1 9 5.5h2a1.5 1.5 0 0 1 0 3H9A1.5 1.5 0 0 1 7.5 7M17 5.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 0 0-3z" clip-rule="evenodd"/>
                </svg>
              </span>
              <span>Front End<br />Developer</span>
            </div>

            <div class="label available-label desktop-label">
              <span class="status-indicator blink-indicator" aria-hidden="true"/>
              <span>Available for<br />Opportunities</span>
            </div>

            <div class="image-placeholder">
              <div class="placeholder-content">
                <img src="/micah.jpg" alt="Micah" class="profile-image" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
  import { Motion } from 'motion-v';
  import GradientBlinds from "../component/GradientBlinds.vue";

  type AnimationSnapshot = Record<string, string | number>;

  interface HeadingSegment {
    text: string;
    isHighlight: boolean;
    hasBr: boolean;
  }

  const headingRef = useTemplateRef<HTMLHeadingElement>('headingRef');
  const inView = ref(false);
  const animationKey = ref(0);
  const completionFired = ref(false);

  let observer: IntersectionObserver | null = null;

  const headingSegments: HeadingSegment[] = [
    { text: 'Hello,', isHighlight: false, hasBr: false },
    { text: ' I\'m', isHighlight: false, hasBr: true },
    { text: 'Micah', isHighlight: true, hasBr: false },
    { text: ' .', isHighlight: true, hasBr: false }
  ];

  const defaultFrom = computed<AnimationSnapshot>(() => ({
    filter: 'blur(10px)',
    opacity: 0,
    y: -50
  }));

  const defaultTo = computed<AnimationSnapshot[]>(() => [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: 5
    },
    {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0
    }
  ]);

  const fromSnapshot = computed(() => defaultFrom.value);
  const toSnapshots = computed(() => defaultTo.value);

  const stepDuration = 0.35;
  const delay = 120;
  const stepCount = computed(() => toSnapshots.value.length + 1);
  const totalDuration = computed(() => stepDuration * (stepCount.value - 1));
  const times = computed(() =>
    Array.from({ length: stepCount.value }, (_, i) => (stepCount.value === 1 ? 0 : i / (stepCount.value - 1)))
  );

  const buildKeyframes = (
    from: AnimationSnapshot,
    steps: AnimationSnapshot[]
  ): Record<string, Array<string | number>> => {
    const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))]);
    const keyframes: Record<string, Array<string | number>> = {};

    for (const key of keys) {
      keyframes[key] = [from[key], ...steps.map(step => step[key])];
    }

    return keyframes;
  };

  const getAnimateKeyframes = () => {
    return buildKeyframes(fromSnapshot.value, toSnapshots.value);
  };

  const getTransition = (index: number) => {
    return {
      duration: totalDuration.value,
      times: times.value,
      delay: (index * delay) / 1000,
      ease: (t: number) => t
    };
  };

  const handleAnimationComplete = (index: number) => {
    if (index === headingSegments.length - 1 && !completionFired.value) {
      completionFired.value = true;
    }
  };

  const setupObserver = () => {
    if (!headingRef.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true;
          observer?.unobserve(headingRef.value as Element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(headingRef.value);
  };

  onMounted(() => {
    setupObserver();
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  watch([() => 0.1, () => '0px'], () => {
    observer?.disconnect();
    setupObserver();
  });

  watch([() => delay, () => stepDuration], () => {
    animationKey.value++;
    completionFired.value = false;
  });

  const viewResume = () => {
    window.open('/Mary Micah Lapuz - Resume.pdf', '_blank');
  };
</script>


<style scoped>
.hero-section {
  width: 100vw;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Hero content overlay */
.hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  z-index: 20;
  color: #fff;
  pointer-events: none;
  font-family: 'Poppins', sans-serif;
}

@keyframes fadeInUpHero {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-left {
  flex: 1;
  min-width: 0;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-left h1 {
  font-size: 60px;
  font-weight: 700;
  margin: 0 0 3rem 0;
  line-height: 1.2;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.name-highlight {
  font-family: 'DM Serif Text', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 150px;
  line-height: 0.9;
  letter-spacing: -0.6rem;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.7);  
}

.tagline {
  font-size: 35px;
  margin: 0 0 1rem 0;
  color: #fff;
  font-weight: 300;
  font-family: 'Poppins', sans-serif;
  animation: fadeInUpHero 0.8s ease-out 0.3s both;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  line-height: 3rem;
}

.description {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  margin: 0 0 2rem 0;
  color: rgba(255, 255, 255, 0.838);
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
  animation: fadeInUpHero 0.8s ease-out 0.5s both;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  pointer-events: auto;
  animation: fadeInUpHero 0.8s ease-out 0.7s both;
}

.btn {
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  font-family: 'Poppins', sans-serif;
}

.btn-primary {
  background: linear-gradient(
    to bottom,
    #7f9b2f 0%,   
    #67801F 40%, 
    #5a6f1a 100%
  );
  color: #fff;
  border-radius: 999px;
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.3), 
    0 4px 8px rgba(0,0,0,0.2);            
}


.btn-primary:hover {
  background-color: #485e08;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(61, 59, 59, 0.12);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(12px);

  border: 1px solid rgba(255, 255, 255, 0.2);  
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: linear-gradient(135deg, rgba(103,128,31,0.15), rgba(236,100,160,0.1));
  color: #fff;
  border-color: #67801F;
  transform: translateY(-1px);
}

.hero-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;
  min-width: 0;
  min-height: 400px;
}

.image-placeholder {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.placeholder-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-circle {
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(135deg, #d0d0d0 0%, #b0b0b0 100%);
  border-radius: 50%;
  position: absolute;
}

.label {
  position: absolute;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  z-index: 20;
}

@keyframes gradient-border {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes slideInTopRight {
  from {
    opacity: 0;
    transform: translateX(40px) translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInBottomRight {
  from {
    opacity: 0;
    transform: translateX(40px) translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.ui-label {
  position: absolute;
  isolation: isolate;
  top: 20%;
  right: 5%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 40px 10px 15px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  animation: slideInTopRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both;

  background: rgba(61, 59, 59, 0.12);   
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  transition: all 0.3s ease;
}

.ui-label:hover {
  background: #000;
  transform: translateY(-3px);
}

.ui-label::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(to right, #67801F, #E0C0C0, #67801F);
  background-size: 300% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradient-border 2s linear infinite;
  pointer-events: none;
}

.developer-label {
  position: absolute;
  bottom: 55%;
  left: 55%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 40px 10px 15px;
  border-radius: 12px;
  background-color: #000;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s both;

  background: rgba(61, 59, 59, 0.12);  
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  transition: all 0.3s ease
}

.developer-label::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(to right, #67801F, #E0C0C0, #67801F);
  background-size: 300% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradient-border 2s linear infinite;
  pointer-events: none;
}

.icon-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 20%;
  margin-right: 5px;
  padding: 3px;
}

.icon-indicator svg {
  display: block;
  width: 24px;
  height: 24px;
}

.available-label {
  position: absolute;
  bottom: 18%;
  right: 20%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 40px 10px 15px;
  border-radius: 12px;
  background-color: #000;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  animation: slideInBottomRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s both;

  background: rgba(61, 59, 59, 0.12);   
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(24px);

  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);

  transition: all 0.3s ease
}

.available-label::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(to right, #67801F, #E0C0C0, #67801F);
  background-size: 300% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gradient-border 2s linear infinite;
  pointer-events: none;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  flex-shrink: 0;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.95);
  }
}

.blink-indicator {
  animation: blink 2s ease-in-out infinite;
}

/* Hide mobile/tablet labels on desktop */
.mobile-tablet-label {
  display: none;
}

/* Responsive Design */

/* Tablet (768px and below) */
@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
  
  /* Ensure GradientBlinds component covers full hero section on tablet */
  .hero-section > :first-child {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh !important;
    z-index: 1 !important;
  }
  
  .hero-content {
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    padding: 3rem 1.75rem;
    position: relative;
  }
  
  .hero-left {
    max-width: 100%;
    text-align: center;
    animation: fadeInUpHero 0.8s ease-out 0.2s both;
    position: relative;
  }
  
  /* Profile image for tablet - circular with glow */
  .hero-left::before {
    content: '';
    display: block;
    width: 120px;
    height: 120px;
    margin: 0 auto 2rem;
    background-image: url('/micah.jpg');
    background-size: 120%;
    background-position: center;
    border-radius: 50%;
    box-shadow: 
      0 0 30px rgba(103, 128, 31, 0.6),
      0 0 60px rgba(103, 128, 31, 0.4),
      0 8px 16px rgba(0, 0, 0, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.3);
    animation: fadeInUpHero 0.8s ease-out 0.1s both;
  }
  
  .hero-left h1 {
    font-size: clamp(2.2rem, 7vw, 3.8rem);
    margin-bottom: 1.25rem;
    line-height: 1.15;
  }
  
  .blur-heading {
    font-size: clamp(2.2rem, 7vw, 3.8rem);
    margin-bottom: 1.25rem;
    line-height: 1.15;
  }
  
  .name-highlight {
    font-size: clamp(3.2rem, 13vw, 6.5rem);
    line-height: 0.92;
    letter-spacing: -0.35rem;
  }
  
  .tagline {
    font-size: clamp(1.2rem, 4.5vw, 1.6rem);
    margin-bottom: 1.25rem;
    line-height: 1.5;
    font-weight: 400;
  }
  
  .description {
    font-size: clamp(0.95rem, 2.8vw, 1.05rem);
    margin-bottom: 2rem;
    line-height: 1.7;
    opacity: 0.92;
  }
  
  .cta-buttons {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.25rem;
  }
  
  .btn {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
    border-radius: 50px;
  }
  
  .hero-right {
    min-height: 320px;
    width: 100%;
    max-width: 380px;
    margin: 1rem auto 0;
    animation: fadeInUpHero 0.8s ease-out 0.4s both;
    display: none;
  }
  
  .image-placeholder {
    max-width: 100%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Show and position labels around circular photo on tablet */
  .mobile-tablet-label.ui-label,
  .mobile-tablet-label.developer-label,
  .mobile-tablet-label.available-label {
    display: inline-flex !important;
    position: absolute !important;
    font-size: 10px !important;
    padding: 6px 18px 6px 8px !important;
    border-radius: 8px !important;
    gap: 5px !important;
    pointer-events: auto !important;
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
  }
  
  .mobile-tablet-label.ui-label {
    top: -10px !important;
    right: 20% !important;
    left: auto !important;
    bottom: auto !important;
  }
  
  .mobile-tablet-label.developer-label {
    bottom: 20px !important;
    left: 10% !important;
    top: auto !important;
    right: auto !important;
  }
  
  .mobile-tablet-label.available-label {
    bottom: 35px !important;
    right: 10% !important;
    top: auto !important;
    left: auto !important;
  }
  
  .mobile-tablet-label .icon-indicator {
    padding: 2px !important;
  }
  
  .mobile-tablet-label .icon-indicator svg {
    width: 16px !important;
    height: 16px !important;
  }
}

/* Mobile (480px and below) */
@media (max-width: 480px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }
  
  /* Ensure GradientBlinds component covers full hero section on mobile */
  .hero-section > :first-child {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh !important;
    z-index: 1 !important;
  }
  
  .hero-content {
    flex-direction: column;
    gap: 2rem;
    padding: 2.5rem 1.25rem;
    justify-content: flex-start;
  }
  
  .hero-left {
    width: 100%;
    animation: fadeInUpHero 0.8s ease-out 0.2s both;
    margin-top: 8rem;
    position: relative;
  }
  
  /* Profile image for mobile - circular with glow */
  .hero-left::before {
    content: '';
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto 1.5rem;
    background-image: url('/micah.jpg');
    background-size: 110%;
    background-position: center;
    border-radius: 50%;
    box-shadow: 
      0 0 25px rgba(103, 128, 31, 0.6),
      0 0 50px rgba(103, 128, 31, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.3);
    animation: fadeInUpHero 0.8s ease-out 0.1s both;
  }
  
  .hero-left h1 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin-bottom: 1.25rem;
  }
  
  .blur-heading {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin-bottom: 1.25rem;
  }
  
  .name-highlight {
    font-size: clamp(2.5rem, 10vw, 4rem);
    line-height: 0.9;
    letter-spacing: -0.22rem;
  }
  
  .tagline {
    font-size: clamp(1.05rem, 4vw, 1.35rem);
    margin-bottom: 1rem;
    line-height: 1.6;
    font-weight: 400;
  }
  
  .description {
    font-size: clamp(0.85rem, 2.5vw, 0.98rem);
    margin-bottom: 1.75rem;
    line-height: 1.6;
    padding: 0 0.5rem;
    opacity: 0.9;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 0.9rem;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-size: 0.9rem;
    min-height: 46px;
    border-radius: 50px;
  }
  
  .btn-primary {
    box-shadow: 
      inset 0 2px 4px rgba(255,255,255,0.2), 
      0 6px 12px rgba(0,0,0,0.25);
  }
  
  .hero-right {
    min-height: auto;
    width: 100%;
    max-width: 100%;
    margin-top: 0.5rem;
    animation: fadeInUpHero 0.8s ease-out 0.4s both;
    display: none;
  }
  
  .image-placeholder {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .label {
    font-size: 0.75rem;
    padding: 0.45rem 0.9rem;
  }
  
  /* Show and position labels around circular photo on mobile */
  .mobile-tablet-label.ui-label,
  .mobile-tablet-label.developer-label,
  .mobile-tablet-label.available-label {
    display: inline-flex !important;
    position: absolute !important;
    font-size: 9px !important;
    padding: 5px 15px 5px 7px !important;
    gap: 4px !important;
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border: none !important;
    box-shadow: none !important;
  }
  
  .mobile-tablet-label.ui-label {
    top: 55px !important;
    right: 7% !important;
    left: auto;
    bottom: auto;
  }
  
  .mobile-tablet-label.developer-label {
    bottom: 410px !important;
    left: 5% !important;
  }
  
  .mobile-tablet-label.available-label {
    bottom: 470px  !important;
    right: 18% !important;
    left: auto !important;
  }
}

/* Large screens (1200px and above) */
@media (min-width: 1200px) {
  .hero-content {
    gap: 4rem;
    padding: 2rem 8rem;
  }
  
  .hero-left {
    max-width: 550px;
  }
  
  .image-placeholder {
    max-width: 450px;
  }
}
</style>