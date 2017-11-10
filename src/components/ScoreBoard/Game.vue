<template>
  <div class='game'>
    <p>{{ toLocaleTime(profile.utcMillis) }}</p>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Team</th>
          <th><abbr title='Wins / Losses'>Ratio</abbr></th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
          <th>Q4</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <icon name='home' scale='2' CLASS='text-center' />
            {{ homeTeam.profile.abbr }}
            <img class='team-logo' :src='homeTeamLgo' type='image/svg+xml' alt='' />
          </td>
          <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">{{ homeTeam.profile.city }} {{ homeTeam.profile.name }}</a></td>
          <td>{{ homeTeam.matchup.wins }} / {{ homeTeam.matchup.losses }}</td>
          <td>{{ homeTeam.score.q1Score }}</td>
          <td>{{ homeTeam.score.q2Score }}</td>
          <td>{{ homeTeam.score.q3Score }}</td>
          <td>{{ homeTeam.score.q4Score }}</td>
          <td>{{ boxScore.homeScore }}</td>
        </tr>
        <tr>
          <td>{{ awayTeam.profile.abbr }}</td>
          <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">{{ awayTeam.profile.city }} {{ awayTeam.profile.name }}</a></td>
          <td>{{ awayTeam.matchup.wins }} / {{ awayTeam.matchup.losses }}</td>
          <td>{{ awayTeam.score.q1Score }}</td>
          <td>{{ awayTeam.score.q2Score }}</td>
          <td>{{ awayTeam.score.q3Score }}</td>
          <td>{{ awayTeam.score.q4Score }}</td>
          <td>{{ boxScore.awayScore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'vue-awesome/icons/home'

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
    homeTeamLgo () { return `/assets/images/logos/ ${this.homeTeam.profile.abbr}_logo.svg` }
  },
  methods: {
    toLocaleTime (utcMillis) {
      return new Date(parseInt(utcMillis)).toLocaleString().split(',')[1]
    }
  }
}
</script>

<style scoped>
table {
  table-layout: fixed;
}

img.team-logo {
  width: 50px;
}
</style>
