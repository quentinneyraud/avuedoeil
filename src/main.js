import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import SplashscreenComponent from './components/Splashscreen.vue'
import VrComponent from './components/Vr.vue'
import MapsComponent from './components/Maps.vue'
import SocialComponent from './components/Social.vue'
import TestComponent from './components/Test.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  // abstract: true,
  // hashbang: false
})

router.map({
  '/': {
    component: SplashscreenComponent
  },
  '/vr': {
    component: VrComponent
  },
  '/maps': {
    component: MapsComponent
  },
  '/social': {
    component: SocialComponent
  },
  '/test': {
    component: TestComponent
  }
})

router.beforeEach(() => {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/'
})

router.start(App, '#app-container')
