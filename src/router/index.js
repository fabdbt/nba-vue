import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const ScoreBoard = () => import('@/components/ScoreBoard')

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/:date?',
      name: 'ScoreBoard',
      component: ScoreBoard
    }
  ]
})

router.afterEach((to, from) => {
  let date = new Date()

  if (to.params && to.params.date) {
    date = new Date(to.params.date)
  } else {
    // Set date to yesterday
    date.setDate(date.getDate() - 1)
  }

  store.commit('games/setDate', date)
  store.dispatch('games/fetch')
})

export default router
