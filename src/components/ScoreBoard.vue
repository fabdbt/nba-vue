<template>
  <div class="scoreboard">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li v-for='game in todayGames'>
        {{ game.v.tc }} @ {{ game.h.tc }} {{ game.etm }} => {{ game.v.s }} - {{ game.h.s }}
      </li>
    </ul>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ScoreBoard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      scores: []
    }
  },
  created () {
    this.fetchScoreBoard()
  },
  methods: {
    async fetchScoreBoard () {
      // Please enable 'Allow-Control-Allow-Origin' extension.
      // TODO : Set 'referer' header to 'stats.nba.com' in node server
      // https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2017/scores/00_todays_scores.json
      const { data: { lscd } } = await axios.get('https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2017/league/00_full_schedule_week.json')

      this.scores = lscd
    }
  },
  computed: {
    currentMonthGames () {
      const currentMonth = this.scores.map(c => c.mscd).find(c => c.mon === 'October')

      return currentMonth ? currentMonth.g : []
    },
    todayGames () {
      return this.currentMonthGames.filter(g => g.gdte === '2017-10-26')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
