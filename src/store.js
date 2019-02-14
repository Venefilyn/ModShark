import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from "vuejs-storage";
import Snoowrap from "snoowrap";

Vue.use(Vuex);
Vue.use(vuejsStorage);

export default new Vuex.Store({
  state: {
    accessToken: "",
    /** @member {Snoowrap|null} */
    reddit: null,
    redirectUrl: "http://127.0.0.1:8080/#/",
    userAgent: "ModShark v0.1 by u/SpyTec13"
  },
  mutations: {
    CREATE_REDDIT(state) {
      state.reddit = new Snoowrap({
        accessToken: state.accessToken,
        userAgent: state.userAgent
      });
    },
    UPDATE_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
    UPDATE_REDDIT(state, reddit) {
      state.reddit = reddit;
    }
  },
  actions: {
    createRedditInstance({ commit }) {
      commit("CREATE_REDDIT");
    },
    updateAccessToken({ commit }, token) {
      commit("UPDATE_ACCESS_TOKEN", token);
    },
    updateReddit({ commit }, reddit) {
      commit("UPDATE_REDDIT", reddit);
    }
  },
  plugins: [
    vuejsStorage({
      keys: ['accessToken'],
      namespace: 'ms',
    })
  ]
})
