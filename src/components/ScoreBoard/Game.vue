<template>
  <div class='game'>
    <table class="table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Team</th>
          <th>Q1</th>
          <th>Q2</th>
          <th>Q3</th>
          <th>Q4</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Away</th>
          <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">{{ awayTeam.profile.city }} {{ awayTeam.profile.name }}</a></td>
          </td>
          <td>{{ awayTeam.score.q1Score }}</td>
          <td>{{ awayTeam.score.q2Score }}</td>
          <td>{{ awayTeam.score.q3Score }}</td>
          <td>{{ awayTeam.score.q4Score }}</td>
          <td>{{ boxScore.awayScore }}</td>
        </tr>
        <tr>
          <th>Home</th>
          <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">{{ homeTeam.profile.city }} {{ homeTeam.profile.name }}</a></td>
          </td>
          <td>{{ homeTeam.score.q1Score }}</td>
          <td>{{ homeTeam.score.q2Score }}</td>
          <td>{{ homeTeam.score.q3Score }}</td>
          <td>{{ homeTeam.score.q4Score }}</td>
          <td>{{ boxScore.homeScore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    homeTeam () {
      return this.game.homeTeam
    },
    awayTeam () {
      return this.game.awayTeam
    },
    boxScore () {
      return this.game.boxscore
    }
  }
}
</script>

<style scoped>
</style>
