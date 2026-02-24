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
      if (lines[0]) gsap.to(lines[0], { rotation: 45, y: 6, duration: 0.3, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: -45, y: -6, duration: 0.3, ease: props.ease });
    } else {
      if (lines[0]) gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: props.ease });
      if (lines[1]) gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: props.ease });
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
  '--pill-gap': '3px'
}));

const getIconSvg = (label: string) => {
  const iconMap: Record<string, string> = {
    Home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="home-outline"><path fill="#fff" fill-rule="evenodd" d="M10.033 2.883a3 3 0 0 1 3.934 0l7 6.076A3 3 0 0 1 22 11.225V19a3 3 0 0 1-3 3h-3.5a1.5 1.5 0 0 1-1.5-1.5v-6.813h-4V20.5A1.5 1.5 0 0 1 8.5 22H5a3 3 0 0 1-3-3v-7.775a3 3 0 0 1 1.033-2.266zm2.623 1.51a1 1 0 0 0-1.312 0l-7 6.077a1 1 0 0 0-.344.755V19a1 1 0 0 0 1 1h3v-6.313a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V20h3a1 1 0 0 0 1-1v-7.775a1 1 0 0 0-.345-.755z" clip-rule="evenodd" stroke-width="0.5" stroke="#fff"/></g></svg>',
    Projects: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M20 6c.58 0 1.05.2 1.42.59c.38.41.58.86.58 1.41v11c0 .55-.2 1-.58 1.41c-.37.39-.84.59-1.42.59H4c-.58 0-1.05-.2-1.42-.59C2.2 20 2 19.55 2 19V8c0-.55.2-1 .58-1.41C2.95 6.2 3.42 6 4 6h4V4c0-.58.2-1.05.58-1.42C8.95 2.2 9.42 2 10 2h4c.58 0 1.05.2 1.42.58c.38.37.58.84.58 1.42v2zM4 8v11h16V8zm10-2V4h-4v2z" stroke-width="0.5" stroke="#fff"/></svg>',
    About: '<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 16 16"><path fill="#fff" d="M10.561 8.073a6 6 0 0 1 3.432 5.142a.75.75 0 1 1-1.498.07a4.5 4.5 0 0 0-8.99 0a.75.75 0 0 1-1.498-.07a6 6 0 0 1 3.431-5.142a3.999 3.999 0 1 1 5.123 0M10.5 5a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0" stroke-width="0.5" stroke="#fff"/></svg>',
    Resume: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-2.5 13.25c0-1.5-3-2.25-4.5-2.25s-4.5.75-4.5 2.25V17h9M12 12.25A2.25 2.25 0 0 0 14.25 10A2.25 2.25 0 0 0 12 7.75A2.25 2.25 0 0 0 9.75 10A2.25 2.25 0 0 0 12 12.25" stroke-width="0.5" stroke="#fff"/></svg>',
    Contact: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l9-6 9 6M4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9"/></svg>'
  };
  return iconMap[label] || '';
};

const isContactItem = (label: string) => label.toLowerCase() === 'contact';
</script>

<template>
  <div class="fixed top-[1.5rem] left-0 w-full z-[1000] px-4">
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
          ...cssVars,
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

    <!-- Mobile Layout -->
    <div class="md:hidden flex items-center justify-center">
      <nav
        :class="['flex items-center justify-between box-border rounded-full backdrop-blur-md', className]"
        aria-label="Primary"
        :style="{
          ...cssVars,
          'background': 'transparent',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': 'none',
          'width': '100%',
          'maxWidth': '80%',
          'padding': '4px 8px'
        }"
      >
        <div class="flex md:hidden items-center justify-between w-full" :style="{ height: 'var(--nav-h)' }">
          <RouterLink to="/" class="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="Logo" class="h-8 w-auto object-contain" />
          </RouterLink>
          <button
            ref="hamburgerRef"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
            :aria-expanded="isMobileMenuOpen"
            class="flex flex-col justify-center items-center gap-1.5 p-2 border-0 rounded-lg cursor-pointer transition-all duration-200 flex-shrink-0"
            style="width: 40px; height: 40px;"
          >
            <span class="rounded w-5 h-0.5 origin-center transition-all duration-300 ease-out hamburger-line" :style="{ background: '#fff' }" />
            <span class="rounded w-5 h-0.5 origin-center transition-all duration-300 ease-out hamburger-line" :style="{ background: '#fff' }" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      ref="mobileMenuRef"
      class="md:hidden absolute top-[70px] right-4 z-[998] rounded-2xl backdrop-blur-xl origin-top-right shadow-2xl"
      :style="{
        background: 'linear-gradient(135deg, rgba(15, 10, 30, 0.98) 0%, rgba(10, 5, 20, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        'box-shadow': '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'min-width': '260px'
      }"
    >
      <ul class="flex flex-col m-0 p-3 list-none">
        <li v-for="(item, idx) in items" :key="item.href || `mobile-${item.label}`">
          <component
            :is="isRouterLink(item.href) ? 'RouterLink' : 'a'"
            :to="isRouterLink(item.href) ? item.href : undefined"
            :href="!isRouterLink(item.href) ? item.href : undefined"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-[15px] transition-all duration-300 ease-out relative overflow-hidden group"
            :style="{
              background: isContactItem(item.label) ? 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)' : 'rgba(255, 255, 255, 0.04)',
              color: isContactItem(item.label) ? '#000' : '#fff',
              marginBottom: idx < items.length - 1 ? '6px' : '0',
              borderLeft: isContactItem(item.label) ? 'none' : '2px solid transparent'
            }"
            @mouseenter="
              (e: MouseEvent) => {
                const target = e.currentTarget as HTMLAnchorElement;
                if (isContactItem(item.label)) {
                  target.style.background = 'linear-gradient(135deg, #fff 0%, #e8e8e8 100%)';
                  target.style.transform = 'translateX(4px)';
                  target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.15)';
                } else {
                  target.style.background = 'rgba(224, 192, 192, 0.12)';
                  target.style.transform = 'translateX(4px)';
                  target.style.borderLeftColor = '#ec64a0';
                }
              }
            "
            @mouseleave="
              (e: MouseEvent) => {
                const target = e.currentTarget as HTMLAnchorElement;
                if (isContactItem(item.label)) {
                  target.style.background = 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)';
                  target.style.transform = 'translateX(0)';
                  target.style.boxShadow = 'none';
                } else {
                  target.style.background = 'rgba(255, 255, 255, 0.04)';
                  target.style.transform = 'translateX(0)';
                  target.style.borderLeftColor = 'transparent';
                }
              }
            "
          >
            <span
              class="inline-flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-lg transition-all duration-300"
              :style="{
                background: isContactItem(item.label) ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
                color: isContactItem(item.label) ? '#000' : '#fff'
              }"
            >
              <span class="w-5 h-5" v-html="getIconSvg(item.label)" />
            </span>

            <span class="flex-1 font-semibold">{{ item.label }}</span>

            <span
              v-if="isContactItem(item.label)"
              class="w-2 h-2 rounded-full flex-shrink-0 blink-indicator"
              :style="{ background: '#22c55e', boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }"
              aria-hidden="true"
            />

            <svg
              v-if="!isContactItem(item.label)"
              class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </component>
        </li>
      </ul>
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
</style>