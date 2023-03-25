import { createRouter, createWebHistory } from 'vue-router';
import SignupForm from '../views/SignupForm.vue';
import HomePage from '../views/HomePage.vue';
import CommunicationModule from '../views/CommunicationModule.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupForm,
  },

  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/LoginPage.vue'),
  },
  {
    path: '/communication',
    name: 'communication',
    component: CommunicationModule,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
