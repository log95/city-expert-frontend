const state = {
    notifications: [],
};

const mutations = {
    addNotification: function (state, payload) {
        state.notifications.push({text: payload.text});
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
