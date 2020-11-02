import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import store from './store'
import api from './api'
import authMixin from './mixins/auth'

Vue.config.productionTip = false;

Vue.prototype.$api = api;

// Login page if user is not authorized.
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('JWT_TOKEN');

      let loginPage = router.resolve({'name': 'LoginRegister'});
      window.location.href = loginPage.href;
    }

    return error;
  },
);

Vue.mixin(authMixin);

store.$api = api;

const app = new Vue({
  store,
  render: h => h(App),
  vuetify,
  i18n,
  router,
}).$mount('#app');