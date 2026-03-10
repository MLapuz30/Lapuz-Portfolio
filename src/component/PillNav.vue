<script setup lang="ts">
import { gsap } from 'gsap';
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';

type PillNavItem = {
  label: string;
  href?: string;
  ariaLabel?: string;
};

interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const props = withDefaults(defineProps<PillNavProps>(), {
  className: '',
  ease: 'power3.easeOut',
  baseColor: '#fff',
  pillColor: '#060010',
  initialLoadAnimation: true
});

const resolvedPillTextColor = props.pillTextColor ?? props.baseColor;
const isMobileMenuOpen = ref(false);
const hamburgerRef = useTemplateRef('hamburgerRef');
const mobileMenuRef = useTemplateRef('mobileMenuRef');
const navItemsRef = useTemplateRef('navItemsRef');

const isExternalLink = (href: string) =>
  href.startsWith('http://') ||
  href.startsWith('https://') ||
  href.startsWith('//') ||
  href.startsWith('mailto:') ||
  href.startsWith('tel:') ||
  href.startsWith('#');

const isRouterLink = (href?: string) => href && !isExternalLink(href);

onMounted(() => {
  const menu = mobileMenuRef.value;
  if (menu) {
    gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
  }

  if (props.initialLoadAnimation) {
    const navItems = navItemsRef.value;
    if (navItems) {
      gsap.set(navItems, { width: 0, overflow: 'hidden' });
      gsap.to(navItems, {
        width: 'auto',
        duration: 0.6,
        ease: props.ease
      });
    }
  }
});

onBeforeUnmount(() => {
  // Cleanup
});

const toggleMobileMenu = () => {
  const newState = !isMobileMenuOpen.value;
  isMobileMenuOpen.value = newState;

  const hamburger = hamburgerRef.value;
  const menu = mobileMenuRef.value;

  if (hamburger) {
    const lines = hamburger.querySelectorAll('.hamburger-line');
    if (newState) {
      if (lines[0]) gsap.to(lines[0], { rotation: 45, y: 3.25, duration: 0.35, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: -45, y: -3.25, duration: 0.35, ease: props.ease });
    } else {
      if (lines[0]) gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.35, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.35, ease: props.ease });
    }
  }

  if (menu) {
    if (newState) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(
        menu,
        { opacity: 0, x: 20, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.3,
          ease: props.ease,
          transformOrigin: 'top right'
        }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        x: 20,
        scale: 0.95,
        duration: 0.2,
        ease: props.ease,
        transformOrigin: 'top right',
        onComplete: () => {
          gsap.set(menu, { visibility: 'hidden' });
        }
      });
    }
  }

  props.onMobileMenuClick?.();
};

const cssVars = computed(() => ({
  '--base': props.baseColor,
  '--pill-bg': props.pillColor,
  '--pill-text': resolvedPillTextColor,
  '--nav-h': '42px',
  '--pill-pad-x': '18px',
  '--pill-gap': '3px',
  '--rose': '#e0c0c0',
  '--rose-dim': '#c9a8a8',
  '--rose-deep': '#9e7070',
  '--rose-glow': 'rgba(224, 192, 192, 0.15)',
}));

const getIconSvg = (label: string) => {
  const iconMap: Record<string, string> = {
    Home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="home-outline"><path fill="#fff" fill-rule="evenodd" d="M10.033 2.883a3 3 0 0 1 3.934 0l7 6.076A3 3 0 0 1 22 11.225V19a3 3 0 0 1-3 3h-3.5a1.5 1.5 0 0 1-1.5-1.5v-6.813h-4V20.5A1.5 1.5 0 0 1 8.5 22H5a3 3 0 0 1-3-3v-7.775a3 3 0 0 1 1.033-2.266zm2.623 1.51a1 1 0 0 0-1.312 0l-7 6.077a1 1 0 0 0-.344.755V19a1 1 0 0 0 1 1h3v-6.313a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V20h3a1 1 0 0 0 1-1v-7.775a1 1 0 0 0-.345-.755z" clip-rule="evenodd" stroke-width="0.5" stroke="#fff"/></g></svg>',
    Projects: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20 6c.58 0 1.05.2 1.42.59c.38.41.58.86.58 1.41v11c0 .55-.2 1-.58 1.41c-.37.39-.84.59-1.42.59H4c-.58 0-1.05-.2-1.42-.59C2.2 20 2 19.55 2 19V8c0-.55.2-1 .58-1.41C2.95 6.2 3.42 6 4 6h4V4c0-.58.2-1.05.58-1.42C8.95 2.2 9.42 2 10 2h4c.58 0 1.05.2 1.42.58c.38.37.58.84.58 1.42v2zM4 8v11h16V8zm10-2V4h-4v2z" stroke-width="0.5" stroke="#fff"/></svg>',
    About: '<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 16 16"><path fill="#fff" d="M10.561 8.073a6 6 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6 6 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0" stroke-width="0.5" stroke="#fff"/></svg>',
    Resume: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2.5 13.25c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9M12 12.25A2.25 2.25 0 0 0 14.25 10A2.25 2.25 0 0 0 12 7.75A2.25 2.25 0 0 0 9.75 10A2.25 2.25 0 0 0 12 12.25" stroke-width="0.5" stroke="#fff"/></svg>',
    Contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l9-6 9 6M4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/></svg>'
  };
  return iconMap[label] || '';
};

const isContactItem = (label: string) => label.toLowerCase() === 'contact';
</script>

<template>
  <div class="fixed top-[1.5rem] left-0 w-full z-[1000] px-4" :style="cssVars">
    <div class="hidden md:flex max-w-[1400px] mx-auto items-center justify-between">
  
      <!-- LEFT LOGO (Desktop only) -->
      <div class="flex items-center -mr-100 ml-100">
        <RouterLink to="/">
          <img src="/logo.png" alt="Logo" class="h-10 w-auto object-contain" />
        </RouterLink>
      </div>

      <!-- CENTER NAVIGATION PILL (Desktop) -->
      <nav
        :class="['flex items-center justify-center box-border rounded-full backdrop-blur-md', className]"
        aria-label="Primary"
        :style="{
          'background': 'transparent',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': 'none',
          'width': 'auto',
          'maxWidth': '100%',
          'padding': '4px 8px'
        }"
      >
        <div
          ref="navItemsRef"
          class="hidden md:flex relative items-center rounded-full"
          :style="{ height: 'var(--nav-h)' }"
        >
          <ul role="menubar" class="flex items-stretch m-0 p-[3px] h-full list-none" :style="{ gap: 'var(--pill-gap)' }">
            <li v-for="(item, i) in items" :key="item.href || `item-${i}`" class="flex h-full" role="none">
              <component
                :is="isRouterLink(item.href) ? 'RouterLink' : 'a'"
                :to="isRouterLink(item.href) ? item.href : undefined"
                :href="!isRouterLink(item.href) ? item.href : undefined"
                class="inline-flex box-border relative justify-center items-center px-0 rounded-full h-full overflow-hidden font-semibold text-[14px] no-underline uppercase leading-[0] tracking-[0.2px] whitespace-nowrap cursor-pointer transition-all duration-300 hover:opacity-80"
                :style="{
                  background: isContactItem(item.label) ? '#fff' : 'transparent',
                  color: isContactItem(item.label) ? '#000' : 'var(--base, #fff)',
                  paddingLeft: isContactItem(item.label) ? '16px' : 'var(--pill-pad-x)',
                  paddingRight: isContactItem(item.label) ? '24px' : 'var(--pill-pad-x)',
                  minWidth: isContactItem(item.label) ? 'auto' : '42px'
                }"
                :aria-label="item.ariaLabel || item.label"
              >
                <span class="inline-flex items-center gap-2 z-[2] relative">
                  <span
                    v-if="!isContactItem(item.label)"
                    class="inline-flex items-center justify-center w-5 h-5 flex-shrink-0"
                    :style="{ color: 'var(--base, #fff)', filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.9))' }"
                    v-html="getIconSvg(item.label)"
                  />
                  <span
                    v-if="isContactItem(item.label) || activeHref === item.href"
                    class="inline-block z-[2] relative leading-[1] font-semibold"
                    :style="{ color: isContactItem(item.label) ? '#000' : '#fff' }"
                  >
                    {{ item.label }}
                  </span>
                </span>
                <span
                  v-if="isContactItem(item.label)"
                  class="absolute w-1.5 h-1.5 rounded-full right-3 z-[4] blink-indicator"
                  :style="{ background: '#22c55e' }"
                  aria-hidden="true"
                />
              </component>
            </li>
          </ul>
        </div>
      </nav>

      <!-- RIGHT SPACER -->
      <div class="flex items-center" style="width: 40px;" />
    </div>

    <!-- ─── Mobile Layout ─────────────────────────────────────── -->
    <div class="md:hidden flex items-center justify-center">
      <nav
        :class="['flex items-center justify-between box-border rounded-full backdrop-blur-md', className]"
        aria-label="Primary"
        :style="{
          'background': 'transparent',
          'border': '1px solid rgba(224, 192, 192, 0.25)',
          'box-shadow': '0 4px 24px rgba(224,192,192,0.06)',
          'width': '100%',
          'maxWidth': '88%',
          'padding': '4px 10px'
        }"
      >
        <div class="flex md:hidden items-center justify-between w-full" :style="{ height: 'var(--nav-h)' }">
          <RouterLink to="/" class="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Logo" class="h-8 w-auto object-contain" />
          </RouterLink>

          <!-- Hamburger -->
          <button
            ref="hamburgerRef"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
            :aria-expanded="isMobileMenuOpen"
            class="hamburger-btn flex flex-col justify-center items-center border-0 rounded-lg cursor-pointer flex-shrink-0"
            style="width: 38px; height: 38px; background: rgba(224,192,192,0.08); transition: background 0.2s ease; gap: 5px;"
            @mouseenter="(e: MouseEvent) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(224,192,192,0.16)' }"
            @mouseleave="(e: MouseEvent) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(224,192,192,0.08)' }"
          >
            <span class="hamburger-line" :style="{ background: '#e0c0c0', width: '18px', height: '1.5px', borderRadius: '2px', display: 'block', transformOrigin: 'center center' }" />
            <span class="hamburger-line" :style="{ background: '#e0c0c0', width: '18px', height: '1.5px', borderRadius: '2px', display: 'block', transformOrigin: 'center center' }" />
          </button>
        </div>
      </nav>
    </div>

    <!-- ─── Mobile Dropdown ───────────────────────────────────── -->
    <div
      ref="mobileMenuRef"
      class="md:hidden absolute top-[72px] right-4 z-[998] origin-top-right"
      :style="{
        width: 'calc(100% - 2rem)',
        maxWidth: '320px',
        borderRadius: '20px',
        background: 'linear-gradient(160deg, #e8c8c8 0%, #dbb8b8 60%, #d4aeae 100%)',
        border: '1px solid rgba(255,255,255,0.5)',
        'box-shadow': '0 16px 48px rgba(160,100,100,0.25), 0 2px 8px rgba(160,100,100,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        overflow: 'hidden',
      }"
    >
      <!-- Top accent line -->
      <div class="mobile-menu-accent-line" />

      <!-- Header label -->
      <div class="px-5 pt-4 pb-2 flex items-center justify-between">
        <span class="text-[10px] tracking-[0.18em] uppercase font-medium" style="color: rgba(100,50,50,0.5); letter-spacing: 0.2em;">Navigation</span>
        <span class="text-[10px] tracking-widest font-light" style="color: rgba(100,50,50,0.3);">✦</span>
      </div>

      <!-- Divider -->
      <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(160,100,100,0.2) 40%, rgba(160,100,100,0.2) 60%, transparent); margin: 0 20px 8px;" />

      <!-- Nav items -->
      <ul class="flex flex-col m-0 p-3 pt-1 list-none">
        <li
          v-for="(item, idx) in items"
          :key="item.href || `mobile-${item.label}`"
          class="mobile-nav-item"
          :style="{ animationDelay: `${idx * 40}ms` }"
        >
          <component
            :is="isRouterLink(item.href) ? 'RouterLink' : 'a'"
            :to="isRouterLink(item.href) ? item.href : undefined"
            :href="!isRouterLink(item.href) ? item.href : undefined"
            class="mobile-link flex items-center gap-3 px-4 rounded-2xl font-medium text-[14px] relative overflow-hidden"
            :class="{ 'is-contact': isContactItem(item.label) }"
            :style="{
              height: '52px',
              marginBottom: idx < items.length - 1 ? '4px' : '0',
              background: isContactItem(item.label)
                ? 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,240,240,0.4) 100%)'
                : 'rgba(255,255,255,0.2)',
              border: isContactItem(item.label)
                ? '1px solid rgba(255,255,255,0.7)'
                : '1px solid rgba(255,255,255,0.3)',
              color: '#6b3535',
              transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              textDecoration: 'none',
            }"
            @mouseenter="(e: MouseEvent) => {
              const t = e.currentTarget as HTMLAnchorElement;
              if (isContactItem(item.label)) {
                t.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(255,240,240,0.6) 100%)';
                t.style.transform = 'scale(1.015) translateY(-1px)';
                t.style.boxShadow = '0 8px 20px rgba(160,100,100,0.2)';
                t.style.borderColor = 'rgba(255,255,255,0.9)';
              } else {
                t.style.background = 'rgba(255,255,255,0.35)';
                t.style.transform = 'scale(1.01) translateY(-1px)';
                t.style.borderColor = 'rgba(255,255,255,0.5)';
              }
            }"
            @mouseleave="(e: MouseEvent) => {
              const t = e.currentTarget as HTMLAnchorElement;
              if (isContactItem(item.label)) {
                t.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,240,240,0.4) 100%)';
                t.style.transform = '';
                t.style.boxShadow = '';
                t.style.borderColor = 'rgba(255,255,255,0.7)';
              } else {
                t.style.background = 'rgba(255,255,255,0.2)';
                t.style.transform = '';
                t.style.borderColor = 'rgba(255,255,255,0.3)';
              }
            }"
          >
            <!-- Icon container -->
            <span
              class="inline-flex items-center justify-center flex-shrink-0 rounded-xl"
              style="width: 34px; height: 34px; background: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.45);"
            >
              <span
                class="icon-wrap w-4 h-4"
                v-html="getIconSvg(item.label)"
                :style="{ filter: 'brightness(0) opacity(0.45)' }"
              />
            </span>

            <!-- Label -->
            <span class="flex-1 font-semibold tracking-wide text-[13.5px]"
              :style="{
                color: isContactItem(item.label) ? '#5a2a2a' : '#7a4040',
                letterSpacing: '0.04em'
              }"
            >{{ item.label }}</span>

            <!-- Contact: blinking dot + availability badge -->
            <span v-if="isContactItem(item.label)" class="flex items-center gap-2">
              <span class="text-[10px] tracking-wide" style="color: rgba(34,140,94,0.9); font-weight: 600;">Available</span>
              <span
                class="w-1.5 h-1.5 rounded-full blink-indicator"
                :style="{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.7)' }"
                aria-hidden="true"
              />
            </span>

            <!-- Arrow for regular items -->
            <svg
              v-if="!isContactItem(item.label)"
              class="w-3 h-3 flex-shrink-0"
              style="color: rgba(100,50,50,0.3);"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </component>
        </li>
      </ul>

      <!-- Footer -->
      <div class="px-5 py-3 flex items-center justify-center">
        <span style="height: 1px; flex: 1; background: linear-gradient(90deg, transparent, rgba(160,100,100,0.2));" />
        <span class="mx-3 text-[9px] tracking-[0.2em] uppercase" style="color: rgba(100,50,50,0.35);">Portfolio</span>
        <span style="height: 1px; flex: 1; background: linear-gradient(90deg, rgba(160,100,100,0.2), transparent);" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
.blink-indicator {
  animation: blink 2s ease-in-out infinite;
}

/* Top accent gradient line */
.mobile-menu-accent-line {
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.0) 10%,
    rgba(255, 255, 255, 0.7) 35%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.7) 65%,
    rgba(255, 255, 255, 0.0) 90%,
    transparent 100%
  );
}

/* Staggered item entrance */
@keyframes slideInItem {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.mobile-nav-item {
  animation: slideInItem 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* Icon SVG tint to match palette */
.icon-wrap :deep(svg) {
  width: 100%;
  height: 100%;
}
.icon-wrap :deep(path),
.icon-wrap :deep(g) {
  fill: #e0c0c0;
  stroke: #e0c0c0;
}
</style>