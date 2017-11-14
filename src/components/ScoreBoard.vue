<template>
  <div class='scoreboard'>
    <div class='content'>
      <p>
        <b v-show='!fetching'>{{ formattedDate }}</b>
        <icon v-show='fetching' name='spinner' spin/>
      </p>

      <navigation :fetching='fetching' @onNext='onNext' @onPrev='onPrev' />

      <div class='box' :key='index' v-for='game, index in dailyGames'>
        <game :game='game' />
      </div>

      <navigation v-if='dailyGames.length > 0' :fetching='fetching' @onNext='onNext' @onPrev='onPrev' />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import 'vue-awesome/icons/spinner'
const Game = () => import('@/components/ScoreBoard/Game')
const Navigation = () => import('@/components/ScoreBoard/Navigation')

export default {
  name: 'ScoreBoard',
  data () {
    return {
      games: {},
      date: null,
      fetching: false
    }
  },
  created () {
    this.$ga.page('/')

    this.date = new Date()
    // Set date to yesterday
    this.date.setDate(this.date.getDate() - 1)
  },
  methods: {
    async fetchGames () {
      this.fetching = true

      try {
        const { data } = await axios.get('https://nba-proxy.now.sh/http://fr.global.nba.com/stats2/scores/daily.json', { params: {
          gameDate: this.formattedDate,
          countryCode: 'FR',
          locale: 'FR'
        } })

        // Reactivity
        Vue.set(this.games, this.formattedDate, data.payload.date.games)
      } catch (e) {
        console.log(e)
      }

      this.fetching = false
    },
    async setDailyGames () {
      if (this.dailyGames.length === 0) {
        await this.fetchGames()
      }
    },
    async onNext () {
      if (this.fetching) { return }

      this.date = new Date(this.date.getTime() + 86400000)
    },
    async onPrev () {
      if (this.fetching) { return }

      this.date = new Date(this.date.getTime() - 86400000)
    }
  },
  computed: {
    formattedDate () {
      return `${this.date.toISOString().split('T')[0]}`
    },
    dailyGames () {
      return this.games[this.formattedDate] || []
    }
  },
  components: {
    Game,
    Navigation
  },
  watch: {
    date (val, old) {
      this.setDailyGames()
    }
  }
}
</script>

<style lang='scss' scoped>
div.navigation-component {
  margin-bottom: 1rem;
}

.box {
  -webkit-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.75);
  box-shadow: 0px 3px 21px -4px rgba(0,0,0,0.75);
}
</style>
