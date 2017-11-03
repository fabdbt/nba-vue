<template>
  <div class='scoreboard'>
    <h1>NBA scores</h1>
    <h2>{{ formattedDate }}</h2>
    <a href='#' @click='onPrev'>Precedent</a>
    <a href='#' @click='onNext'>Suivant</a>
    <ul>
      <li v-for='game in games'>
        {{ game.awayTeam.profile.name }} @ {{ game.homeTeam.profile.name }} => {{ game.boxscore.awayScore }} - {{ game.boxscore.homeScore }}
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
      date: new Date()
    }
  },
  created () {
    this.fetchGames()
  },
  methods: {
    async fetchGames () {
      const { data } = await axios.get(`http://localhost:8081/http://fr.global.nba.com/stats2/scores/daily.json?countryCode=FR&gameDate=${this.formattedDate}&locale=fr&tz=%2B1`)

      this.games = data.payload.date.games
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
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
