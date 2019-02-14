import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from "vuejs-storage";

Vue.use(Vuex);
Vue.use(vuejsStorage);

export default new Vuex.Store({
  state: {
    accessToken: ""
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    vuejsStorage({
      keys: ['accessToken'],
      namespace: 'ms',
    })
  ]
})
