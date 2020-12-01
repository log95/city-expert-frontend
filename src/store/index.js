import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from './modules/snackbar'
import notifications from './modules/notifications'
import userPoints from './modules/userPoints'
import cities from "./modules/cities";
import testComments from "./modules/testComments";
import accountTests from './modules/account/tests';
import moderationTests from './modules/moderation/tests';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        snackbar,
        notifications,
        userPoints,
        cities,
        testComments,
        accountTests,
        moderationTests,
    },
    strict: true,
})
