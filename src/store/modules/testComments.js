const query = 'tests/#test_id#/comments';

const state = {
    comments: [],
};

const mutations = {
    addComment: function (state, comment) {
        state.comments.push(comment);
    },
    setComments: function (state, comments) {
        state.comments = comments;
    },
};

const actions = {
    async loadList({ commit }, testId) {
        const url = query.replace('#test_id#', testId);

        const response = await this.$api.get(url);

        commit('setComments', response.data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
