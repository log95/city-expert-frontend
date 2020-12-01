const state = {
    points: null,
};

const mutations = {
    setPoints: function (state, points) {
        state.points = points;
    },
    addPoints: function (state, points) {
        state.points += points;
    },
};

const getters = {};

const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
