<template>
  <div class='scoreboard'>
    <div class='content'>
      <h1>NBA scores</h1>
      <p>
        <b>{{ formattedDate }}</b>
      </p>
      <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click='onPrev' :disabled='fetching'>Previous</a>
        <a class="pagination-next" @click='onNext' :disabled='fetching'>Next page</a>
      </nav>
      <!-- <span v-show='fetching'>Fetching ...</span> -->
      <transition-group name='list-complete' tag='p'>
        <div class='box list-complete-item' :key='index' v-for='({ homeTeam, awayTeam, boxscore, profile }, index) in games'>
          <div class='columns'>
            <div class='column'>
              <div class='score-detail'>
                <div class='name is-pulled-left'>
                  <b>{{ awayTeam.profile.name }}</b>
                  {{ toLocaleTime(profile.utcMillis) }}
                </div>
                <div class='score is-pulled-right'>
                  {{ boxscore.awayScore }}
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column'>
              <div class='score-detail'>
                <div class='name is-pulled-left'>
                  <b>{{ homeTeam.profile.name }}</b>
                </div>
                <div class='score is-pulled-right'>
                  {{ boxscore.homeScore }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
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
        const { data } = await axios.get(`https://nba-vue-server-takiwyotly.now.sh/http://fr.global.nba.com/stats2/scores/daily.json`, { params: {
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
    },
    toLocaleTime (utcMillis) {
      return new Date(parseInt(utcMillis)).toLocaleString().split(',')[1]
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
.list-complete-item {
  transition: all 0.2s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
}
.list-complete-leave-active {
  /*transition: all 0.5s;*/
  /*opacity: 0;*/
}

.box {
/*  transition: all 2s;
  -webkit-transition: all 2s;
*/}
.score {
  /*text-align: left;*/
}

.score > .score-detail {
  /*background-color: red;*/
/*  width: 100%;
  height: 100%;
*/}
</style>
