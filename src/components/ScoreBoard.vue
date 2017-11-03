<template>
  <div class='scoreboard'>
    <h1>NBA scores</h1>
    <p>
      <a href='#' @click='onPrev' v-if='!fetching'><<</a>
      <b>{{ formattedDate }}</b>
      <a href='#' @click='onNext' v-if='!fetching'>>></a>
    </p>
    <span v-show='fetching'>Fetching ...</span>
    <ul>
      <li v-for='{ homeTeam, awayTeam, boxscore } in games'>
        {{ awayTeam.profile.name }} @ {{ homeTeam.profile.name }} => {{ boxscore.awayScore }} - {{ boxscore.homeScore }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

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
      this.games = []
      this.fetching = true

      try {
        const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/http://fr.global.nba.com/stats2/scores/daily.json`, { params: {
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
      this.date = new Date(this.date.getTime() + 86400000)

      await this.fetchGames()
    },
    async onPrev () {
      this.date = new Date(this.date.getTime() - 86400000)

      await this.fetchGames()
    }
  },
  computed: {
    formattedDate () {
      return `${this.date.toISOString().split('T')[0]}`
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
  margin: 0 10px;
}

a {
  color: #42b983;
  text-decoration: none;
}
</style>
