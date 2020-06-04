import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import store from './store'

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  vuetify,
  i18n,
  router
}).$mount('#app');
