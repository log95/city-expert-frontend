import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import store from './store'
import api from './api'

Vue.config.productionTip = false;

Vue.prototype.$api = api;

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      // TODO: redirect
    }

    return error;
  },
);

new Vue({
  store,
  render: h => h(App),
  vuetify,
  i18n,
  router
}).$mount('#app');
