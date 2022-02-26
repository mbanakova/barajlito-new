import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import MyOffers from '../views/MyOffers'
import Offers from '../views/Offers'
import OfferDetail from '../views/OfferDetail'
import NewOffer from '../views/NewOffer'
import EditOffer from '../views/EditOffer'
import Requests from '../views/Requests'
import Profile from '../views/Profile'
import Auth from '../views/Auth'
import NotFound from '../views/NotFound'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
