<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Footer from '../component/Footer.vue';

const route = useRoute();
const router = useRouter();

// Project data structure
interface Project {
  id: number;
  title: string;
  headliner: string;
  mainImage: string;
  tools: string[];
  teamSize: string;
  website: string;
  websiteLabel: string;
  websiteIcon: string;
  roleTitle: string;
  overview: string;
  responsibilities: string[];
  keyFeatures: string[];
  problem: string;
  solution: string;
  designDecisionImage: string;
  designOutputImages: string[];
  successOutcome: string;
  year: string;
}

// Project data - with placeholders
const projectsData: Record<string, Project> = {
  'buffs-chicken': {
    id: 1,
    title: 'Buffs Chicken',
    headliner: 'SEO-Optimized Ordering Platform for Food Startup',
    mainImage: '/buffschicken.png',
    tools: ['Vue', 'Nuxt', 'Tailwind', 'Digital Ocean'],
    teamSize: '4 developers',
    website: 'https://buffschicken.com/',
    websiteLabel: 'Website',
    websiteIcon: 'live',
    roleTitle: 'Frontend Developer',
    overview: 'Buffs Chicken is a responsive restaurant website and online ordering platform for a local food business in Angeles City, focusing on front-end user experience and device accessibility. Customers can browse menus, view events, read blogs, and place orders through a clean, intuitive interface. Built with Nuxt.js and server-side rendering, the site ensures fast loading, smooth navigation, and improved SEO. The design emphasizes clear product presentation, organized layouts, and a seamless ordering flow, with features like real-time order notifications, responsive components, and optimized images for a consistent, user-friendly experience.',
    responsibilities: [
      'Developed responsive and engaging interfaces using Vue.js and Nuxt.js',
      'Translated brand research and user insights into intuitive UI/UX designs',
      'Designed intuitive UI/UX flows for key user journeys',
      'Optimized layout, interactions, and accessibility for maximum usability',
      'Implemented dynamic, interactive components for visual engagement',
      'Collaborated with stakeholders to ensure design aligned with goals'
    ],
    designDecisionImage: 'https://via.placeholder.com/1200x600/E0C0C0/333333?text=Design+Decision',
    keyFeatures: [
      'Real-time order tracking system',
      'Dynamic menu and event management',
      'Image upload with compression and validation',
      'Email OTP verification for orders',
      'Restaurant open/close scheduling',
      'SEO-optimized Nuxt architecture'
    ],
    problem: 'The local food startup needed a strong online presence to connect with customers beyond their physical location. While they were relying on third-party delivery apps, this approach generated significant tax complications and fees, making profitability a challenge.',
    solution: 'Built a full-stack e-commerce platform using modern Vue/Nuxt architecture with server-side rendering to maximize SEO performance. Delivered a smooth, intuitive ordering experience with real-time inventory tracking, enabling the business to regain control over sales and reduce reliance on costly third-party platforms.',
    designOutputImages: [
      '/buffschicken/output1.png',
      '/buffschicken/output2.png',
      '/buffschicken/output3.png',
      '/buffschicken/output4.png',
      '/buffschicken/output5.png',
      '/buffschicken/output6.png',
      '/buffschicken/output7.png',
    ],
    successOutcome: 'The project delivered a fully functional online presence for the restaurant, including an easy-to-manage ordering system through the admin dashboard, optimized performance as reflected in high Google PageSpeed Insights scores, and ensured the website is fully indexed and discoverable on Google.',
    year: '2026',
  },
  'code-geeks': {
    roleTitle: 'Frontend Developer',
    id: 2,
    title: 'Code Geeks',
    headliner: 'Intuitive Design Meets Clear, Informative Content',
    mainImage: '/codegeeks.png',
    tools: ['Angular', 'Tailwind', 'Netlify'],
    teamSize: '4 developers',
    website: 'https://codegeeks2526.netlify.app/',
    websiteLabel: 'Website',
    websiteIcon: 'live',
    overview: 'The CodeGeeks website serves as an informational hub for the organization. It aims to introduce visitors to the mission, vision, events, and activities of CodeGeeks while providing an avenue for students to join, stay updated, and connect with the team. Featuring responsive layouts, intuitive navigation, and clear content presentation, the website is designed to effectively communicate the organization\'s community presence.',
    responsibilities: [
      'Built responsive frontend with Angular framework',
      'Designed and implemented component library',
      'Created content management workflow',
      'Deployed and maintained on Netlify',
    ],
    keyFeatures: [
      'Overview of CodeGeeks, including mission, vision, and history.',
      'Member profiles and spotlight',
      'Blog and updates section',
      'Membership registration form',
    ],
    problem: 'With growing interest in student organizations, CodeGeeks needed a digital platform to showcase their activities and engage more students, making it easier to attract and increase membership.',
    solution: 'Created a modern, component-based website using Angular with Tailwind CSS for rapid development. Implemented a straightforward CMS approach for easy content updates by non-technical team members.',
    designDecisionImage: 'https://via.placeholder.com/1200x600/E0C0C0/333333?text=Design+Decision',
    designOutputImages: [
      '/codegeeks/output1.png',
      '/codegeeks/output2.png',
      '/codegeeks/output3.png',
      '/codegeeks/output4.png',
      '/codegeeks/output5.png',
      '/codegeeks/output6.png',
      '/codegeeks/output7.png',
    ],
    successOutcome: 'The website serves as a central hub for the organization, resulting in increased membership inquiries and better communication with the student community.',
    year: '2025',
  },
  'ben-ibe': {
    roleTitle: 'Frontend Developer',
    designDecisionImage: 'https://via.placeholder.com/1200x600/67801F/ffffff?text=Design+Decision',
    id: 3,
    title: 'Ben Ibe',
    headliner: 'Bringing Floral Artistry to Life Online',
    mainImage: '/BenIbe.webp',
    tools: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    teamSize: '2 developers',
    website: 'https://www.figma.com/design/BBnMxrfYRJjm1uthAOqwP5/WEBPUB---Ben-Ibe?node-id=10-30&t=lmFoTXO6fISSroh1-1',
    websiteLabel: 'Figma',
    websiteIcon: 'figma',
    overview: 'Ben Ibe is an e-commerce platform for flowers, designed to provide a seamless shopping experience. Customers can explore a variety of floral arrangements, place their orders, and verify them through an email-based OTP system. The platform also features a comprehensive admin dashboard, enabling staff to oversee the product catalog, manage order processing, and update customers when their arrangements are ready for pickup or if an order is cancelled.',
    responsibilities: [
      'User research and analysis',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Interaction design',
      'Usability testing and feedback',
      'Design system maintenance'
    ],
    keyFeatures: [
      'Searchable product catalog',
      'Customer order system',
      'Email OTP order confirmation',
      'Admin product management',
      'Admin order control',
      'Pick-up ready notifications'
    ],
    problem: 'The flower shop was relying on phone orders and social media DMs, leading to inefficiencies and missed opportunities. They needed a platform that showcased their floral arrangements beautifully while simplifying the order process.',
    solution: 'Built a MERN stack application with a visually-focused product catalog and streamlined checkout. Integrated inventory tracking and delivery scheduling to manage operations efficiently.',
    designOutputImages: [
      '/benibe/output1.png',
      '/benibe/output2.png',
      '/benibe/output3.png',
      '/benibe/output4.png',
      '/benibe/output5.png',
      '/benibe/output6.png',
      '/benibe/output7.png',
    ],
    successOutcome: 'Built a comprehensive online store for a local flower shop, enabling seamless order placement and automated email confirmations. Developed a robust admin interface to efficiently manage inventory and track orders in real time, enhancing operational control and customer experience.',
    year: '2025',
  },
  'splitsmart': {
    roleTitle: 'Frontend Developer',
    designDecisionImage: 'https://via.placeholder.com/1200x600/E0C0C0/333333?text=Design+Decision',
    id: 4,
    title: 'SplitSmart',
    headliner: 'Simplifying Group Expenses and Bill Splitting, Made Easy',
    mainImage: '/SplitSmart.webp',
    tools: ['Vue', 'Node.js', 'Tailwind', 'MongoDB'],
    teamSize: '5 developers',
    website: 'https://github.com/MLapuz30/6WCSERVER.git',
    websiteLabel: 'Website',
    websiteIcon: 'github',
    overview: 'Designed for groups, Splitsmart is a full-stack web app that simplifies tracking shared expenses. Users can form groups, add expenses, and allocate costs among members. Its intuitive dashboard gives an at-a-glance view of individual spending, group activity, and outstanding balances, helping everyone easily see who owes what across multiple groups.',
    responsibilities: [
      'Developed responsive Vue.js frontend with Tailwind CSS',
      'Designed intuitive dashboards and user flows',
      'Created interactive components for adding and splitting expenses',
      'Conducted usability testing and iterated UI/UX designs',
      'Ensured consistent visual design across screens',
      'Optimized mobile and desktop user experience'
    ],
    keyFeatures: [
      'Dashboard with overview',
      'Real-time expense tracking',
      'Automated balance calculations',
      'Group expense management',
      'Payment history and activity log',
      'Search functionality'
    ],
    problem: 'Friends and roommates struggle with tracking shared expenses, leading to confusion and awkward money conversations. Existing solutions were either too complex or lacked essential features.',
    solution: 'Developed an intuitive expense-splitting website with real-time balance calculations, payment tracking, and settlement suggestions. Focused on a clean, friendly interface that removes financial friction from relationships.',
    designOutputImages: [
      '/splitsmart/output1.png',
      '/splitsmart/output2.png',
      '/splitsmart/output3.png',
      '/splitsmart/output4.png',
      '/splitsmart/output5.png',
      '/splitsmart/output6.png',
      '/splitsmart/output7.png',
    ],
    successOutcome: 'Successfully proposed and contributed to the development of Splitsmart, an expense-sharing platform to simplify group expense tracking, successfully designing and implementing its responsive frontend and user-friendly UI/UX experience.',
    year: '2025',
  },
  'runners-high': {
    roleTitle: 'Frontend Developer',
    designDecisionImage: 'https://via.placeholder.com/1200x600/67801F/ffffff?text=Design+Decision',
    id: 5,
    title: 'Runner\'s High',
    headliner: 'Connecting Runners Through Digital Community',
    mainImage: '/runnershigh.png',
    tools: ['HTML', 'CSS', 'JavaScript'],
    teamSize: 'Solo project',
    website: 'https://ycah30.github.io/Runner-s-High/',
    websiteLabel: 'Website',
    websiteIcon: 'live',
    overview: 'Runner\'s High is a static community-focused running website that offers group run schedules, training tips, and guidance for marathons and longer races. Founded in 2024, it aims to connect runners of all levels, providing a welcoming space to share experiences, track progress, and stay motivated. The site encourages both beginners and experienced runners to reach their goals while fostering a supportive and inclusive running community.',
    responsibilities: [
      'Designed website layout and user interface',
      'Developed responsive HTML/CSS/JavaScript',
      'Created event calendar functionality',
      'Implemented mobile-first approach',
      'Optimized for fast loading',
      'Deployed on GitHub Pages'
    ],
    keyFeatures: [
      'Interactive event calendar',
      'Training resources library',
      'Marathon announcements',
      'Photo gallery from runs',
      'Membership registration form',
      'Runner spotlights and testimonials'
    ],
    problem: 'The running club was using scattered Facebook posts and group chats to communicate, making it hard for new members to get involved and existing members to track events.',
    solution: 'Created a clean, fast-loading static website with event calendars, member spotlights, and training resources. Optimized for mobile access since runners typically check on-the-go.',
    designOutputImages: [
      '/runnershigh/output1.png',
      '/runnershigh/output2.png',
      '/runnershigh/output3.png',
      '/runnershigh/output4.png',
      '/runnershigh/output5.png',
      '/runnershigh/output6.png',
      '/runnershigh/output7.png',
    ],
    successOutcome: 'Successfully established a well-designed and user-friendly platform that effectively organizes run schedules, training resources, and community information. Its intuitive layout, clear navigation, and engaging content have made it easy for visitors to access information and stay connected.',
    year: '2024',
  },
};

const projectSlug = computed(() => route.params.slug as string);
const project = computed(() => projectsData[projectSlug.value]);

onMounted(() => {
  if (!project.value) {
    router.push('/projects');
  }
});

const goBack = () => {
  router.push('/projects');
};

const contentVisible = ref(false);
const sectionsVisible = ref({
  screen1: false,
  screen2: false,
  screen3: false,
  screen4: false
});

onMounted(() => {
  setTimeout(() => {
    contentVisible.value = true;
    sectionsVisible.value.screen1 = true;
  }, 100);
  
  setTimeout(() => { sectionsVisible.value.screen2 = true; }, 400);
  setTimeout(() => { sectionsVisible.value.screen3 = true; }, 700);
  setTimeout(() => { sectionsVisible.value.screen4 = true; }, 1000);
});
</script>

<template>
  <div v-if="project" class="project-detail-root">
    
    <!-- Navigation Bar -->
    <nav class="detail-nav">
      <button @click="goBack" class="nav-back">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 10H5M10 5l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back</span>
      </button>
      <div class="nav-title">{{ project.title }}</div>
      <div class="nav-year">{{ project.year }}</div>
    </nav>

    <!-- SCREEN 1: Hero -->
    <section class="screen screen-hero" :class="{ visible: sectionsVisible.screen1 }">
      <div class="hero-bg" :style="{ backgroundImage: `url(${project.mainImage})` }">
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-pill">
          <span>Frontend Developer</span>
          <span class="pill-divider">/</span>
          <span>UI/UX Designer</span>
        </div>
        <h1 class="hero-title">{{ project.title }}</h1>
        <p class="hero-subtitle">{{ project.headliner }}</p>

        <!-- Tech Pills -->
        <div class="hero-tech-pills">
          <span v-for="tool in project.tools" :key="tool" class="hero-tech-pill">{{ tool }}</span>
        </div>

        <!-- Team + CTA row -->
        <div class="hero-bottom-row">
          <div class="hero-team-stamp">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="hero-team-stamp-count">{{ project.teamSize }}</span>
          </div>

          <span class="hero-bottom-divider"></span>

          <a :href="project.website" target="_blank" rel="noopener noreferrer" class="hero-cta-link">
            <span class="cta-eyebrow">View Project</span>
            <span class="cta-main-label">
              {{ project.websiteLabel }}
              <span class="cta-underline"></span>
            </span>
            <span class="cta-arrow-circle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

    </section>

    <!-- SCREEN 3: Project Details -->
    <section class="screen screen-details" :class="{ visible: sectionsVisible.screen3 }">
      <div class="screen-content">
        <!-- Overview Block -->
        <div class="overview-block-details">
          <div class="section-label">
            <span class="label-text">Project Overview</span>
          </div>
          <p class="overview-text">{{ project.overview }}</p>
        </div>

        <div class="challenge-solution">
          <div class="cs-item cs-challenge">
            <div class="cs-label">Challenge</div>
            <p class="cs-text">{{ project.problem }}</p>
          </div>
          <div class="cs-item cs-solution">
            <div class="cs-label">Solution</div>
            <p class="cs-text">{{ project.solution }}</p>
          </div>
        </div>
        
        <!-- Responsibilities & Features -->
        <div class="details-grid">
          <div class="details-col">
            <h3 class="details-title">Responsibilities</h3>
            <ul class="details-list">
              <li v-for="(item, index) in project.responsibilities" :key="index">{{ item }}</li>
            </ul>
          </div>
          
          <div class="details-col">
            <h3 class="details-title">Key Features</h3>
            <ul class="details-list">
              <li v-for="(item, index) in project.keyFeatures" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
        
        <div class="success-outcome">
          <div class="outcome-badge">Impact & Results</div>
          <p class="outcome-text">{{ project.successOutcome }}</p>

          <!-- Project Link inside outcome section -->
          <div class="outcome-link-row">
            <a
              :href="project.website"
              target="_blank"
              rel="noopener noreferrer"
              class="outcome-link"
              :class="`outcome-link-${project.websiteIcon}`"
            >
              <!-- Live -->
              <template v-if="project.websiteIcon === 'live'">
                <span class="outcome-link-dot"></span>
                <span>Website</span>
              </template>
              <!-- GitHub -->
              <template v-else-if="project.websiteIcon === 'github'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Website</span>
              </template>
              <!-- Figma -->
              <template v-else-if="project.websiteIcon === 'figma'">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5zM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2zM12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0zM5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
                </svg>
                <span>Figma</span>
              </template>
              <svg class="outcome-link-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SCREEN 4: Design Showcase -->
    <section class="screen screen-design" :class="{ visible: sectionsVisible.screen4 }">
      <div class="screen-content">
        <div class="bento-header">
          <h2 class="bento-heading">Design Showcase</h2>
          <p class="bento-subheading">Exploring the design process and final deliverables</p>
        </div>
        
        <div class="bento-grid">
          <div class="bento-item bento-large">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[0]" alt="Output 1" class="bento-img" />
          </div>
          <div class="bento-item bento-tall">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[1]" alt="Output 2" class="bento-img" />
          </div>
          <div class="bento-item">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[2]" alt="Output 3" class="bento-img" />
          </div>
          <div class="bento-item bento-tall">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[3]" alt="Output 4" class="bento-img" />
          </div>
          <div class="bento-item">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[4]" alt="Output 5" class="bento-img" />
          </div>
          <div class="bento-item">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[5]" alt="Output 6" class="bento-img" />
          </div>
          <div class="bento-item">
            <div class="bento-overlay"></div>
            <img :src="project.designOutputImages[6]" alt="Output 7" class="bento-img" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ══════════════════════════════════════════════════════
   BASE & ROOTS
   ══════════════════════════════════════════════════════ */
.project-detail-root {
  min-height: 100vh;
  background: #0e0c0b;
  color: #ffffff;
  font-family: 'Poppins', system-ui, sans-serif;
  position: relative;
}

/* ══════════════════════════════════════════════════════
   NAVIGATION BAR
   ══════════════════════════════════════════════════════ */
.detail-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 5vw;
  background: rgba(14, 12, 11, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.detail-nav::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ec64a0, transparent);
  opacity: 0.3;
}

.nav-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e0c0c0;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-back:hover {
  background: rgba(236, 100, 160, 0.15);
  border-color: rgba(236, 100, 160, 0.4);
  transform: translateX(-4px);
}

.nav-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
  text-align: center;
}

.nav-year {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

/* ══════════════════════════════════════════════════════
   SCREEN BASE
   ══════════════════════════════════════════════════════ */
.screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 5vw 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.screen.visible {
  opacity: 1;
  transform: translateY(0);
}

.screen-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.screen-heading {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
}

.screen-heading::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ec64a0, #67801f);
  border-radius: 2px;
  animation: expandLine 0.8s ease forwards;
}

@keyframes expandLine {
  from { width: 0; }
  to { width: 60px; }
}

/* ══════════════════════════════════════════════════════
   SCREEN 1: HERO
   ══════════════════════════════════════════════════════ */
.screen-hero {
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(14, 12, 11, 0.6) 0%,
    rgba(14, 12, 11, 0.72) 60%,
    rgba(14, 12, 11, 0.92) 100%
  );
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 780px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  animation: heroContentFade 1s ease forwards;
  opacity: 0;
}

@keyframes heroContentFade {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Role — small quiet label */
.hero-role {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.25rem;
  background: rgba(236, 100, 160, 0.15);
  border: 1px solid rgba(236, 100, 160, 0.4);
  border-radius: 50px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ffffff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(236, 100, 160, 0.2);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(236, 100, 160, 0.3); }
  50% { box-shadow: 0 0 40px rgba(236, 100, 160, 0.6), 0 0 60px rgba(103, 128, 31, 0.3); }
}

.pill-divider {
  color: #ec64a0;
  font-weight: 300;
}

/* Title */
.hero-title {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(4rem, 14vw, 6rem);
  font-weight: 500;
  font-style: italic;
  letter-spacing: -0.5rem;
  line-height: 1;
  margin: 0;
  color: #ffffff;
  text-shadow: 
    0 0 40px rgba(236, 100, 160, 0.5),
    0 0 80px rgba(103, 128, 31, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.8);
  animation: titlePulse 4s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% {
    text-shadow: 
      0 0 40px rgba(236, 100, 160, 0.5),
      0 0 80px rgba(103, 128, 31, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.8);
  }
  50% {
    text-shadow: 
      0 0 60px rgba(236, 100, 160, 0.8),
      0 0 120px rgba(103, 128, 31, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.8);
  }
}

/* Subtitle */
.hero-subtitle {
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  max-width: 560px;
}

/* Tech Pills */
.hero-tech-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.hero-tech-pill {
  padding: 0.4rem 0.9rem;
  background: rgba(103, 128, 31, 0.18);
  border: 1px solid rgba(103, 128, 31, 0.4);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.25s ease;
  white-space: nowrap;
}

.hero-tech-pill:hover {
  background: rgba(103, 128, 31, 0.32);
  border-color: rgba(103, 128, 31, 0.7);
  transform: translateY(-2px);
}

/* ── Bottom Row: team + divider + CTA ── */
.hero-bottom-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.hero-bottom-divider {
  width: 1px;
  height: 18px;
  background: rgba(255, 255, 255, 0.15);
  display: inline-block;
  flex-shrink: 0;
}

/* Team stamp */
.hero-team-stamp {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.hero-team-stamp svg {
  color: rgba(236, 100, 160, 0.6);
  flex-shrink: 0;
}

.hero-team-stamp-count {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

/* CTA */
.hero-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
}

.cta-eyebrow {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.3s ease;
}

.cta-main-label {
  font-family: 'DM Serif Display', serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  position: relative;
}

.cta-underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #ec64a0;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
}

.hero-cta-link:hover .cta-underline { width: 100%; }
.hero-cta-link:hover .cta-eyebrow { color: rgba(255, 255, 255, 0.6); }

.cta-arrow-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.hero-cta-link:hover .cta-arrow-circle {
  border-color: #ec64a0;
  color: #ec64a0;
  background: rgba(236, 100, 160, 0.1);
  transform: rotate(45deg);
}

/* ══════════════════════════════════════════════════════
   SCREEN 3: PROJECT DETAILS
   ══════════════════════════════════════════════════════ */
.screen-details {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.label-text {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
}

.overview-block-details {
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease forwards;
  opacity: 0;
  animation-delay: 0.2s;
}

.overview-block-details .overview-text {
  font-size: 1.125rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.9);
  max-width: 100%;
  text-align: justify;
}

.overview-text {
  font-size: 1.125rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.9);
  max-width: 900px;
  text-align: justify;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.details-col {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.details-col::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, #ec64a0, #67801f);
  transition: height 0.6s ease;
}

.details-col:hover::before {
  height: 100%;
}

.details-col:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(236, 100, 160, 0.2);
  transform: translateX(5px);
}

.details-title {
  font-size: 1rem;
  font-weight: 700;
  color: #ec64a0;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.75rem;
  padding-left: 1.25rem;
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.details-list li:nth-child(1) { animation-delay: 0.1s; }
.details-list li:nth-child(2) { animation-delay: 0.2s; }
.details-list li:nth-child(3) { animation-delay: 0.3s; }
.details-list li:nth-child(4) { animation-delay: 0.4s; }
.details-list li:nth-child(5) { animation-delay: 0.5s; }
.details-list li:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.details-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #ec64a0;
  font-weight: 600;
}

.challenge-solution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.cs-item {
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.cs-item::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cs-item:hover::before { opacity: 1; }
.cs-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.cs-challenge {
  background: linear-gradient(135deg, rgba(236, 100, 160, 0.1) 0%, transparent 100%);
  border-color: rgba(236, 100, 160, 0.3);
}

.cs-solution {
  background: linear-gradient(135deg, rgba(103, 128, 31, 0.1) 0%, transparent 100%);
  border-color: rgba(103, 128, 31, 0.3);
}

.cs-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.cs-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

/* ══════════════════════════════════════════════════════
   SUCCESS OUTCOME
   ══════════════════════════════════════════════════════ */
.success-outcome {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(103, 128, 31, 0.15) 0%, rgba(236, 100, 160, 0.15) 100%);
  border: 2px solid rgba(236, 100, 160, 0.3);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.success-outcome::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.outcome-badge {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, rgba(103, 128, 31, 0.4), rgba(236, 100, 160, 0.4));
  border: 1px solid rgba(236, 100, 160, 0.6);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(236, 100, 160, 0.2);
}

.outcome-text {
  font-size: 1rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.75rem;
  position: relative;
  z-index: 1;
}

.outcome-link-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.outcome-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: all 0.3s ease;
  position: relative;
}

.outcome-link-live {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(74, 222, 128, 0.08);
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.outcome-link-live:hover {
  background: rgba(74, 222, 128, 0.15);
  border-color: rgba(74, 222, 128, 0.6);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.2);
}

.outcome-link-github {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.outcome-link-github:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.35);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.outcome-link-figma {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(162, 89, 255, 0.08);
  border: 1px solid rgba(162, 89, 255, 0.3);
}

.outcome-link-figma:hover {
  background: rgba(162, 89, 255, 0.15);
  border-color: rgba(162, 89, 255, 0.6);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(162, 89, 255, 0.2);
}

.outcome-link-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px #4ade80;
  animation: pulseDot 1.8s ease-in-out infinite;
  display: inline-block;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.8); }
}

.outcome-link-arrow {
  opacity: 0.6;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.outcome-link:hover .outcome-link-arrow {
  transform: translateX(3px);
  opacity: 1;
}

/* ══════════════════════════════════════════════════════
   SCREEN 4: DESIGN SHOWCASE (BENTO GRID)
   ══════════════════════════════════════════════════════ */
.screen-design {
  background: linear-gradient(180deg, rgba(14, 12, 11, 1) 0%, rgba(103, 128, 31, 0.05) 50%, rgba(14, 12, 11, 1) 100%);
  margin-bottom: 3rem;
}

.bento-header {
  text-align: center;
  margin-bottom: 3rem;
}

.bento-heading {
  font-size: clamp(1.5rem, 4vw, 1rem);
  font-weight: 100;
  margin-bottom: 0.75rem;
  color: #ffffff;
  letter-spacing: -0.05em;
}

.bento-subheading {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
}

.bento-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.bento-item:hover {
  transform: translateY(-5px);
  border-color: rgba(236, 100, 160, 0.4);
  box-shadow: 0 20px 50px rgba(236, 100, 160, 0.2);
}

.bento-large {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-tall {
  grid-row: span 2;
}

.bento-wide {
  grid-column: span 2;
}

.bento-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.bento-item:hover .bento-overlay {
  opacity: 1;
}

.bento-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

/* ══════════════════════════════════════════════════════
   RESPONSIVE DESIGN
   ══════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .details-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .challenge-solution { grid-template-columns: 1fr; }
  .bento-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .bento-large, .bento-wide { grid-column: span 2; }
  .bento-tall { grid-row: span 2; }
}

@media (max-width: 768px) {
  .detail-nav { padding: 1rem 4vw; }
  .nav-title { font-size: 0.95rem; }
  .screen { padding: 4rem 4vw 2rem; }
  .screen-hero { padding: 0; }
  .hero-content { padding: 1.5rem; }
  .screen-heading { font-size: 1.5rem; }
  .hero-title { font-size: clamp(1.75rem, 6vw, 2.5rem); }
  .hero-subtitle { font-size: 0.875rem; }
  .bento-grid { grid-template-columns: 1fr; grid-auto-rows: 250px; }
  .bento-large, .bento-tall, .bento-wide { grid-column: span 1; grid-row: span 1; }
  .hero-tech-pills { flex-wrap: wrap; justify-content: center; }
  .hero-bottom-row { flex-wrap: wrap; gap: 0.75rem; }
}

@media (max-width: 480px) {
  .detail-nav { padding: 0.875rem 3vw; flex-wrap: wrap; gap: 0.5rem; }
  .nav-back { padding: 0.5rem 1rem; font-size: 0.85rem; }
  .nav-title { font-size: 0.875rem; flex-basis: 100%; order: -1; }
  .screen { padding: 4rem 3vw 2rem; }
  .hero-pill { font-size: 0.65rem; padding: 0.4rem 1rem; }
  .hero-subtitle { font-size: 0.85rem; }
  .details-col, .cs-item { padding: 1.5rem; }
  .details-list li { font-size: 0.8rem; }
  .cs-text { font-size: 0.85rem; }
  .hero-cta-link { font-size: 0.8rem; padding: 0.75rem 1.4rem; }
}
</style>