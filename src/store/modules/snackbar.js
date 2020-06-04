const state = {
    text: '',
    color: '',
    timeout: 0,
};

const mutations = {
    addNotification: function (state, payload) {
        state.text = payload.text;
        state.color = payload.color || 'primary';
        state.timeout = payload.timeout || 3000;
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
