import axios from "axios";

const games = {
  state: {
    date: null,
    all: [],
    fetching: false,
  },
  getters: {
    formattedDate: (state) => {
      return state.date.toISOString().split("T")[0];
    },
    formattedTomorrowDate: (state) => {
      return new Date(state.date.getTime() + 86400000)
        .toISOString()
        .split("T")[0];
    },
    formattedYesterdayDate: (state) => {
      return new Date(state.date.getTime() - 86400000)
        .toISOString()
        .split("T")[0];
    },
  },
  actions: {
    async fetch({ state, commit }) {
      state.fetching = true;

      try {
        const { data } = await axios.get(
          "https://nba-proxy.vercel.app/http://fr.global.nba.com/stats2/scores/daily.json",
          {
            params: {
              gameDate: state.date,
              countryCode: "FR",
              locale: "FR",
            },
          }
        );

        commit("set", data.payload.date.games);
      } catch (e) {
        commit("set", []);

        console.log(e);
      }

      state.fetching = false;
    },
  },
  mutations: {
    set(state, games) {
      state.all = games;
    },
    setDate(state, date) {
      state.date = date;
    },
  },
};

export default games;
