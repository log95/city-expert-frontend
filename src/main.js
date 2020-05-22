import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify';
import i18n from './i18n'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  vuetify,
  i18n,
  router
}).$mount('#app');
