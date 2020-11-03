const queryPrefix = 'cities';

const state = {
    cities: [],
};

const mutations = {
    setCities: function (state, cities) {
        state.cities = cities;
    },
};

const actions = {
    async loadList({ commit }) {
        const response = await this.$api.get(queryPrefix);

        commit('setCities', response.data);
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
