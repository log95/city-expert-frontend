import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import cities from "./modules/cities";
import accountTests from './modules/account/tests';
import moderationTests from './modules/moderation/tests';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        snackbar,
        cities,
        accountTests,
        moderationTests,
    },
    strict: true,
})
