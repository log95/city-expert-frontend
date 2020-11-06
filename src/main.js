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
store.$api = api;

Vue.mixin(authMixin);

const app = new Vue({
  store,
  render: h => h(App),
  vuetify,
  i18n,
  router,
}).$mount('#app');
