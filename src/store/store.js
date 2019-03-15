import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from "vuejs-storage";
import * as snoowrap from "snoowrap";
import uuid from "uuid";
import * as api from "./api";
import {CLIENT_ID, REDIRECT_URL, USER_AGENT} from "../models/RedditFactory";
import RedditFactory from "../models/RedditFactory";
import MsNotification from "../models/Notification";

Vue.use(Vuex);
Vue.use(vuejsStorage);

export default new Vuex.Store({
  state: {
    accessToken: "",
    state: uuid.v4(),
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URL,
    userAgent: USER_AGENT,
    drawerSubreddits: null,
    drawerSettings: null,
    authenticated: false,
    settings: {},
    storeLocally: false,
    localAccessToken: "",
    subreddit: "mod",
    notifications: [],
  },
  mutations: {
    UPDATE_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
      if (state.storeLocally) {
        state.localAccessToken = token;
      }
    },
    UPDATE_LOCAL_TOKEN(state) {
      state.localAccessToken = state.accessToken;
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
    },
    CHANGE_SETTINGS(state, value) {
      state.settings = value;
    },
    UPDATE_SELECTED_SUBREDDIT(state, value) {
      state.subreddit = value;
    },
    UPDATE_SELECTED_SUBREDDIT_OBJECT(state, r) {
      state.subreddit = r.getSubreddit(state.subreddit);
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification)
    }
  },
  actions: {
    switchToLocal({ commit }) {
      commit("UPDATE_STORE_LOCALLY", true);
      commit("UPDATE_LOCAL_TOKEN");
    },
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
    addNotification({ commit }, notification) {
      if (!(notification instanceof MsNotification)) {
        console.warn('Notification is not a MsNotification object', notification);
      }
      commit("ADD_NOTIFICATION", notification)
    },
    logOut({ commit }) {
      commit("UPDATE_ACCESS_TOKEN", "");
      commit("UPDATE_LOCAL_TOKEN");
      commit("UPDATE_STORE_LOCALLY", false);
      commit("CHANGE_SETTINGS", {});
      commit("UPDATE_AUTHENTICATED", false);
    },
    updateSelectedSubreddit({ commit }, subreddit) {
      commit("UPDATE_SELECTED_SUBREDDIT", subreddit);
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
        commit("UPDATE_SELECTED_SUBREDDIT_OBJECT", r);

        if (!(me instanceof snoowrap.objects.RedditUser)) {
          throw new Error("Could not get Reddit user, aborting.")
        }
        commit("UPDATE_ACCESS_TOKEN", token);
        commit("UPDATE_AUTHENTICATED", true);
      }
    }
  },
  getters: {
    getSubredditName(state) {
      return state.subreddit instanceof Object ? state.subreddit.display_name : state.subreddit;
    }
  },
  plugins: [
    vuejsStorage({
      keys: ['authenticated', 'settings', 'storeLocally', 'localAccessToken'],
      namespace: 'ms',
    })
  ]
})
