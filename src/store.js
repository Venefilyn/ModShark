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
    // TODO: Move out to .env
    redirectUrl: "http://127.0.0.1:8080/#/",
    // TODO: Move out to .env & match versioning to package.json
    userAgent: "ModShark v0.1 by u/SpyTec13",
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
