<template>
  <div class="scoreboard">
    <div class="content">
      <p>
        <strong v-show="!fetching">{{ formattedDate }}</strong>
        <icon v-show="fetching" name="spinner" spin />
      </p>

      <navigation :fetching="fetching" @onNext="onNext" @onPrev="onPrev" />

      <v-touch class="games" v-on:swipeleft="onNext" v-on:swiperight="onPrev">
        <div class="box" :key="index" v-for="(game, index) in games">
          <game :game="game" />
        </div>
      </v-touch>

      <navigation
        v-if="games.length > 0"
        :fetching="fetching"
        @onNext="onNext"
        @onPrev="onPrev"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import "vue-awesome/icons/spinner";
const Game = () => import("@/components/ScoreBoard/Game");
const Navigation = () => import("@/components/ScoreBoard/Navigation");

export default {
  name: "ScoreBoard",
  methods: {
    async onNext() {
      if (this.fetching) {
        return;
      }

      this.$router.push({
        name: "ScoreBoard",
        params: { date: this.formattedTomorrowDate },
      });
    },
    async onPrev() {
      if (this.fetching) {
        return;
      }

      this.$router.push({
        name: "ScoreBoard",
        params: { date: this.formattedYesterdayDate },
      });
    },
  },
  computed: {
    ...mapState({
      date: (state) => state.games.date,
      games: (state) => state.games.all,
      fetching: (state) => state.games.fetching,
    }),
    ...mapGetters("games", [
      "formattedTomorrowDate",
      "formattedYesterdayDate",
      "formattedDate",
    ]),
  },
  components: {
    Game,
    Navigation,
  },
};
</script>

<style lang="css" scoped>
.box {
  -webkit-box-shadow: 0px 3px 21px -4px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 3px 21px -4px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 3px 21px -4px rgba(0, 0, 0, 0.3);
}

.games {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
