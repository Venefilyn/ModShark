import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from "vuejs-storage";
import * as snoowrap from "snoowrap";
import uuid from "uuid";
import * as api from "./api";
import {CLIENT_ID, REDIRECT_URL, USER_AGENT} from "../models/RedditFactory";
import RedditFactory from "../models/RedditFactory";

Vue.use(Vuex);
Vue.use(vuejsStorage);

export default new Vuex.Store({
  state: {
    accessToken: "",
    /** @member {Snoowrap|null} */
    state: uuid.v4(),
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    userAgent: USER_AGENT,
    drawerSubreddits: null,
    drawerSettings: null,
    settings: {},
    storeLocally: false,
    localAccessToken: "",
  },
  mutations: {
    UPDATE_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
      if (state.storeLocally) {
        state.localAccessToken = token;
      }
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
    updateAccessToken({ commit }, token) {
      commit("UPDATE_ACCESS_TOKEN", token);
      commit("UPDATE_AUTHENTICATED", true);
    },
    updateSubredditsDrawer({ commit }, value) {
      commit("UPDATE_SUBREDDITS_DRAWER", value);
    },
    updateSettingsDrawer({ commit }, value) {
      commit("UPDATE_SETTINGS_DRAWER", value);
    },
    changeStoreLocally({ commit }, value) {
      commit("UPDATE_STORE_LOCALLY", value)
    },
    /**
     * @param commit
     * @returns {Promise<string>}
     * @throws {Error}
     */
    async authenticateFromServer({ commit }) {
      let token = await api.getToken();
      if (token) {
        
        let r = new snoowrap({
          accessToken: token,
          clientId: CLIENT_ID,
          userAgent: USER_AGENT
        });
        RedditFactory.setReddit(r);
        let me = await r.getMe();

        if (!(me instanceof snoowrap.objects.RedditUser)) {
          throw new Error("Could not get Reddit user, aborting.")
        }
        console.log(RedditFactory.instance());
        commit("UPDATE_ACCESS_TOKEN", token);
      }
    }
  },
  plugins: [
    vuejsStorage({
      keys: ['authenticated', 'settings', 'storeLocally', 'localAccessToken'],
      namespace: 'ms',
    })
  ]
})
