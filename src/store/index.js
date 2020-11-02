import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import accountTests from './modules/account/tests';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        snackbar,
        accountTests,
    },
    strict: true,
})