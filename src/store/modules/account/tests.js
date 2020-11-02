const apiAccountTests = 'account/tests';

const state = {
    tests: null,
};

const mutations = {
    save: function (state, tests) {
        state.tests = tests;
    },
};

const actions = {
    async load({ commit }) {
        const resp = await this.$api.get(apiAccountTests);

        commit('save', resp.data.tests);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};