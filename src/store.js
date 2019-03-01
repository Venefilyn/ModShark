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
    clientId: process.env.VUE_APP_CLIENT_ID,
    redirectUrl: process.env.VUE_APP_REDIRECT_URL,
    userAgent: process.env.VUE_APP_USER_AGENT,
    drawerSubreddits: null,
    drawerSettings: null,
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
    },
    UPDATE_SUBREDDITS_DRAWER(state, value) {
      state.drawerSubreddits = value;
    },
    UPDATE_SETTINGS_DRAWER(state, value) {
      state.drawerSettings = value;
    },
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
    },
    updateSubredditsDrawer({ commit }, value) {
      commit("UPDATE_SUBREDDITS_DRAWER", value);
    },
    updateSettingsDrawer({ commit }, value) {
      commit("UPDATE_SETTINGS_DRAWER", value);
    },
  },
  plugins: [
    vuejsStorage({
      keys: ['accessToken'],
      namespace: 'ms',
    })
  ]
})
