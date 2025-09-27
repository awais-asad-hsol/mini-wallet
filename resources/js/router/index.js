import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../Pages/Auth/Login.vue') },
    { path: '/register', component: () => import('../Pages/Auth/Register.vue') },
    { path: '/dashboard', component: () => import('../Pages/Dashboard/Index.vue'), meta: { requiresAuth: true } },
    { path: '/transactions', component: () => import('../Pages/Transactions/List.vue'), meta: { requiresAuth: true } },
    { path: '/transfer', component: () => import('../Pages/Transactions/TransferForm.vue'), meta: { requiresAuth: true } },
]
  

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) return next('/login');
  if ((to.path === '/login' || to.path === '/register') && token) return next('/dashboard');
  return next();
});

export default router;
