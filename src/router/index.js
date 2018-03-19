import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Maps from '@/components/Maps'
import Projects from '@/components/projects/Projects'
import Rummy from '@/components/projects/Rummy'
import Resume from '@/components/Resume'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Zacharilius.me',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/map',
      name: 'Maps',
      component: Maps
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/projects/rummy-data-visualization',
      name: 'Rummy',
      component: Rummy
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    }
  ]
})
