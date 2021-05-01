import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
const ScoreBoard = () => import("@/components/ScoreBoard");

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: "/:date?",
      name: "ScoreBoard",
      component: ScoreBoard,
    },
  ],
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  let date = new Date();

  if (to.params && to.params.date) {
    date = new Date(to.params.date);
  } else {
    // Set date to yesterday
    date.setDate(date.getDate() - 1);
  }

  store.commit("games/setDate", date);
  store.dispatch("games/fetch");
});

export default router;
