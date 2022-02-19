import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyOffers from '../views/MyOffers'
import NewOffer from '../views/NewOffer'
import Requests from '../views/Requests'
import Profile from '../views/Profile'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import NotFound from '../views/NotFound'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-offers',
    name: 'MyOffers',
    component: MyOffers
  },
  {
    path: '/new-offer',
    name: 'NewOffer',
    component: NewOffer
  },
  {
    path: '/requests',
    name: 'Requests',
    component: Requests
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/:notFound(.*)', // .* = any other text
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
