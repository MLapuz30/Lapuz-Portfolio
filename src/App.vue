<script setup lang="ts">
import { useRoute } from 'vue-router';
import PillNav from './component/PillNav.vue';
import Footer from './component/Footer.vue';

const route = useRoute();

const navItems = [
  { label: 'Home',     href: '/'        },
  { label: 'Projects',href: '/projects' },
  { label: 'About',   href: '/about'    },
  { label: 'Resume',  href: '/resume'   },
  { label: 'Contact', href: '/contact'  }
];

// Pages where the content manages its own full-viewport layout
// and must NOT be constrained by main's padding
const fullBleedRoutes = ['/', '/projects'];
</script>

<template>
  <div class="min-h-screen">
    <PillNav
      logoAlt="Lapuz Portfolio"
      :items="navItems"
      :activeHref="route.path"
      class="custom-nav"
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#000000"
      pillTextColor="#000000"
    />

    <!--
      Home + Projects manage their own full-viewport layout (hero fills 100vh,
      ScrollStack takes over, etc.), so they get NO padding from <main>.
      All other pages get pt-20 px-4 to clear the fixed nav and add breathing room.
    -->
    <main :class="fullBleedRoutes.includes(route.path) ? '' : 'pt-20 px-4'">
      <RouterView />
    </main>

    <Footer v-if="route.path !== '/projects'" />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #0e0c0b;
  /* Remove scroll-behavior:smooth — Lenis handles smoothing on pages
     that use it. Native smooth-scroll conflicts with Lenis interpolation. */
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>