import Vue from 'vue'
import VueRouter from 'vue-router'

import MyPage from '@/views/MyPage.vue'
import MyAnalysis from '@/views/MyAnalysis.vue'
import Search from '@/views/Search.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import VideoDetail from '@/views/VideoDetail.vue'
import Home from '@/views/Home.vue'
import Channel from '@/views/Channel.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Utuberank from '@/views/Utuberank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/search/:text',
    name: 'Search',
    component: Search,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/myAnalysis',
    name: 'MyAnalysis',
    component: MyAnalysis,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  // 도희
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('token')) {
        next('/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/channel/:channelId',
    name: 'Channel',
    component: Channel,
    props: true,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/rank/:subject',
    name: 'Utuberank',
    component: Utuberank,
    props: true,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  },

  // 지훈

  // main
  {
    path: '/',
    name: 'Main',
    component: Main,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('token')) {
        next('/home')
      } else {
        next()
      }
    }
  },

  // 404
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound
  },

  // 용욱
  {
    path: '/video/:video_youtube_id',
    name: 'VideoDetail',
    component: VideoDetail,
    beforeEnter(to, from, next) {
      if (!Vue.$cookies.isKey('token')) {
        next('/login')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
