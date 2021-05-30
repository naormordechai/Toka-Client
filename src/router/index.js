import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CitiesList from '../views/CitiesList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cities',
    name: 'Cities List',
    component: CitiesList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
