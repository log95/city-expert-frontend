const queryPrefix = 'account/tests';

const state = {
    tests: [],
    count: 0,
};

const mutations = {
    setTests: function (state, tests) {
        state.tests = tests;
    },
    setCount: function (state, count) {
        state.count = count;
    }
};

const actions = {
    async loadList({ commit }, params) {
        const response = await this.$api.get(queryPrefix, params);

        commit('setTests', response.data.tests);
        commit('setCount', response.data.count);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
