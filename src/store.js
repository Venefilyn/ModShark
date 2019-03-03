import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from "vuejs-storage";
import Snoowrap from "snoowrap";
import uuid from "uuid";

Vue.use(Vuex);
Vue.use(vuejsStorage);

export default new Vuex.Store({
  state: {
    accessToken: "",
    /** @member {Snoowrap|null} */
    reddit: null,
    state: uuid.v4(),
    clientId: process.env.VUE_APP_CLIENT_ID,
    redirectUrl: process.env.VUE_APP_REDIRECT_URL,
    userAgent: process.env.VUE_APP_USER_AGENT,
    drawerSubreddits: null,
    drawerSettings: null,
    settings: {},
    storeLocally: false,
    localAccessToken: "",
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
      if (state.storeLocally) {
        state.localAccessToken = token;
      }
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
    UPDATE_AUTHENTICATED(state, value) {
      state.authenticated = value;
    },
    UPDATE_STORE_LOCALLY(state, value) {
      state.storeLocally = value;
    }
  },
  actions: {
    createRedditInstance({ commit }) {
      commit("CREATE_REDDIT");
    },
    updateAccessToken({ commit }, token) {
      commit("UPDATE_ACCESS_TOKEN", token);
      commit("UPDATE_AUTHENTICATED", true);
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
    changeStoreLocally({ commit }, value) {
      commit("UPDATE_STORE_LOCALLY", value)
    }    
  },
  plugins: [
    vuejsStorage({
      keys: ['authenticated', 'settings', 'storeLocally', 'localAccessToken'],
      namespace: 'ms',
    })
  ]
})
