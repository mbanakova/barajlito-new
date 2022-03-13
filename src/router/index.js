
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Profile from '../views/Profile'
const Auth = () => import('../views/Auth')
const Offers = () => import('../views/Offers')
const MyOffers = () => import('../views/MyOffers')
const NewOffer = () => import('../views/NewOffer')
const EditOffer = () => import('../views/EditOffer')
const Requests = () => import('../views/Requests')
const NotFound = () => import('../views/NotFound')
const OfferDetail = () => import('../views/OfferDetail')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/offers',
      name: 'Offers',
      component: Offers,
      meta: { requiresAuth: true }
    },
    {
      path: '/offers/:id',
      name: 'OfferDetail',
      component: OfferDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-offers',
      name: 'MyOffers',
      component: MyOffers,
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:id',
      name: 'EditOffer',
      component: EditOffer,
      meta: { requiresAuth: true }
    },
    {
      path: '/new-offer',
      name: 'NewOffer',
      component: NewOffer,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      meta: { requiresUnAuth: true }
    },
    {
      path: '/:notFound(.*)', // .* = any other text
      component: NotFound
    }
  ]
});


// global nav guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
