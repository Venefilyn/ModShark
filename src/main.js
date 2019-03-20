import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import moment from 'moment';
import VueSimpleMarkdown from 'vue-simple-markdown'

Vue.config.productionTip = false;

Vue.use(VueSimpleMarkdown);
Vue.prototype.moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

