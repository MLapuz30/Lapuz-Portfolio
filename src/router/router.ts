import { createRouter, createWebHistory } from 'vue-router';
import Index from '../pages/Index.vue';
import About from '../pages/About.vue';
import Projects from '../pages/Projects.vue';
import Contact from '../pages/Contact.vue';
import Resume from '../pages/Resume.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
