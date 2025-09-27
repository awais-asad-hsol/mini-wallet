import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('../Layouts/AuthLayout.vue'),
        children: [
          { path: 'login', component: () => import('../Pages/Auth/Login.vue') },
          { path: 'register', component: () => import('../Pages/Auth/Register.vue') },
        ],
    },
    {
        path: '/',
        component: () => import('../Layouts/AppLayout.vue'), // sidebar
        meta: { requiresAuth: true },
        children: [
          { path: 'dashboard', component: () => import('../Pages/Dashboard/Index.vue') },
          { path: 'transfer', component: () => import('../Pages/Transactions/TransferForm.vue') },
          { path: 'transactions/sent', component: () => import('../Pages/Transactions/Sent.vue') },
          { path: 'transactions/received', component: () => import('../Pages/Transactions/Received.vue') },
        ],
    },
      
];

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
