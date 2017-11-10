<template>
  <div class='scoreboard'>
    <div class='content'>
      <h1>NBA scores</h1>
      <p>
        <b v-show='!fetching'>{{ formattedDate }}</b>
        <icon v-show='fetching' name='spinner' spin/>
      </p>

      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click='onPrev' :disabled='fetching'>Previous</a>
        <a class="pagination-next" @click='onNext' :disabled='fetching'>Next</a>
      </nav>

      <transition-group name='list-complete' tag='p'>
        <div class='box list-complete-item' :key='index' v-for='game, index in games'>
          <game :game='game' />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'vue-awesome/icons/spinner'
const Game = () => import('@/components/ScoreBoard/Game')

export default {
  name: 'ScoreBoard',
  data () {
    return {
      games: [],
      date: new Date(),
      fetching: false,
      api: null
    }
  },
  created () {
    this.fetchGames()
  },
  methods: {
    async fetchGames () {
      // this.games = []
      this.fetching = true

      try {
        const { data } = await axios.get('https://nba-proxy.now.sh/http://fr.global.nba.com/stats2/scores/daily.json', { params: {
          gameDate: this.formattedDate,
          countryCode: 'FR',
          locale: 'FR'
        } })

        this.games = data.payload.date.games
      } catch (e) {
        console.log(e)
      }

      this.fetching = false
    },
    async onNext () {
      if (this.fetching) { return }

      this.date = new Date(this.date.getTime() + 86400000)

      await this.fetchGames()
    },
    async onPrev () {
      if (this.fetching) { return }

      this.date = new Date(this.date.getTime() - 86400000)

      await this.fetchGames()
    }
  },
  computed: {
    formattedDate () {
      return `${this.date.toISOString().split('T')[0]}`
    }
  },
  components: {
    Game
  }
}
</script>

<style scoped>
/*.list-complete-item {
  transition: all 0.2s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
}
.list-complete-leave-active {*/
  /*transition: all 0.5s;*/
  /*opacity: 0;*/
/*}*/

nav {
  margin-bottom: 1rem;
}

nav > a {
  transition: .5s ease all;
}

div.game {
  margin-bottom: 1rem;
}
</style>
