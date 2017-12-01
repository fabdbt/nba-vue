<template>
  <div class='game'>
    <div v-if='isLive'>
      <span class='tag'>
        <span>Live</span>
        <div class='live'></div>
      </span>
    </div>
    <div v-else>
      <p class='head'>
        <span>
          <icon name='clock-o' scale='1' class='star v-align' />
          {{ toLocaleTime(profile.utcMillis) }}
        </span>
        <span class='star' v-if='isImportant && !isLive' >
          <icon name='star' class='v-align' scale='1' />
        </span>
      </p>
    </div>
    <table class='table game-score'>
      <thead>
        <tr>
          <th>Team</th>
          <th class='is-hidden-mobile'>Logo</th> <!-- Volontary hide Logo instead of Team in mobile -->
          <th class='is-hidden-mobile'><abbr title='Wins / Losses'>Ratio</abbr></th>
          <th :class='{ "current-period": livePeriod === "1" }'>Q1</th>
          <th :class='{ "current-period": livePeriod === "2" }'>Q2</th>
          <th :class='{ "current-period": livePeriod === "3" }'>Q3</th>
          <th :class='{ "current-period": livePeriod === "4" }'>Q4</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class='is-hidden-mobile'>
            <icon name='home' class='v-align' scale='1' />
            <span>{{ homeTeam.profile.city }} {{ homeTeam.profile.name }}</span>
          </td>
          <td class='logo'>
            <img class='team-logo' v-lazy='homeTeamLogoPath' type='image/svg+xml' :alt='homeTeam.profile.abbr' />
          </td>
          <td class='is-hidden-mobile'>{{ homeTeam.matchup.wins }} / {{ homeTeam.matchup.losses }}</td>
          <td :class='{ "current-period": livePeriod === "1" }'>{{ homeTeam.score.q1Score }}</td>
          <td :class='{ "current-period": livePeriod === "2" }'>{{ homeTeam.score.q2Score }}</td>
          <td :class='{ "current-period": livePeriod === "3" }'>{{ homeTeam.score.q3Score }}</td>
          <td :class='{ "current-period": livePeriod === "4" }'>{{ homeTeam.score.q4Score }}</td>
          <td><b>{{ boxScore.homeScore }}</b></td>
        </tr>
        <tr>
          <td class='is-hidden-mobile'>
            <span>{{ awayTeam.profile.city }} {{ awayTeam.profile.name }}</span>
          </td>
          <td class='logo'>
            <img class='team-logo' v-lazy='awayTeamLogoPath' type='image/svg+xml' :alt='awayTeam.profile.abbr' />
          </td>
          <td class='is-hidden-mobile'>{{ awayTeam.matchup.wins }} / {{ awayTeam.matchup.losses }}</td>
          <td :class='{ "current-period": livePeriod === "1" }'>{{ awayTeam.score.q1Score }}</td>
          <td :class='{ "current-period": livePeriod === "2" }'>{{ awayTeam.score.q2Score }}</td>
          <td :class='{ "current-period": livePeriod === "3" }'>{{ awayTeam.score.q3Score }}</td>
          <td :class='{ "current-period": livePeriod === "4" }'>{{ awayTeam.score.q4Score }}</td>
          <td><b>{{ boxScore.awayScore }}</b></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/clock-o'
import 'vue-awesome/icons/star'

const maxImportantConfRank = 8

export default {
  name: 'Game',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    homeTeam () { return this.game.homeTeam },
    awayTeam () { return this.game.awayTeam },
    boxScore () { return this.game.boxscore },
    profile () { return this.game.profile },
    homeTeamLogoPath () {
      return `/images/logos/${this.homeTeam.profile.abbr}_logo.svg`
    },
    awayTeamLogoPath () {
      return `/images/logos/${this.awayTeam.profile.abbr}_logo.svg`
    },
    isLive () {
      return !this.profile.scheduleCode && !!this.boxScore.periodClock
    },
    livePeriod () {
      return this.isLive && this.boxScore.period
    },
    isImportant () {
      return [this.homeTeam.matchup.confRank, this.awayTeam.matchup.confRank].every(r => parseInt(r) <= maxImportantConfRank)
    }
  },
  methods: {
    toLocaleTime (utcMillis) {
      return new Date(parseInt(utcMillis)).toLocaleTimeString()
    }
  }
}
</script>

<style lang='scss' scoped>
@keyframes live {
  0% {
    transform: scale( .8 );
  }
  50% {
    transform: scale( 1 );
  }
  100% {
    transform: scale( .8 );
  }
}

div.live {
  margin-left: 0.2rem;
  display: inline-block;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  background-color: red;
  animation: live 4s infinite
}

table.game-score {
  table-layout: fixed;

  td, th {
    text-align: center !important;
  }

  th.current-period {
    background-color: whitesmoke;
    color: red;
  }

  td.current-period {
    background-color: whitesmoke;
  }

  img.team-logo {
    width: 3rem;
    min-width: 1.5rem;
    margin: 0 auto;
    text-align: center;
  }
}

.v-align {
  vertical-align: middle;
}

p.head {
  margin-bottom: 1rem;
}

span.star {
  color: #f4c242;
}
</style>
