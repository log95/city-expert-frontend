<template>
    <div class="comments elevation-3">
        <div class="messages">
            <div
                    v-for="comment in comments"
                    :key="comment.id"
                    class="d-flex mb-6"
                    :class="comment.by_test_creator === isViewByCreator ? 'justify-start left-message' : 'justify-end right-message'"
            >
                <div class="message-text">{{ comment.message }}</div>
            </div>
        </div>

        <v-divider v-if="comments.length !== 0"></v-divider>

        <div>
            <v-text-field
                    v-model="userMessage"
                    append-outer-icon="mdi-send"
                    :label="$t('MESSAGE')"
                    clearable
                    :loading="isSendingMessage"
                    style="padding: 10px"
                    @click:append-outer="addComment"
                    @click:clear="clearUserMessage"
            ></v-text-field>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';

    export default {
        name: 'Comments',
        data: () => ({
            userMessage: '',

            isSendingMessage: false,
        }),
        computed: {
            ...mapState('testComments', {
                comments: 'comments',
            }),
        },
        props: [
            'testId',
            'isViewByCreator',
        ],
        methods: {
            ...mapActions({
                loadComments: 'testComments/loadList',
            }),
            ...mapMutations({
                addCommentStore: 'testComments/addComment',
            }),
            async addComment() {
                if (this.isSendingMessage) {
                    return;
                }

                try {
                    this.isSendingMessage = true;

                    let response = await this.$api.post('tests/' + this.testId + '/comments/', {
                        message: this.userMessage,
                    });

                    this.addCommentStore({
                        'id': response.data.id,
                        'message': response.message,
                        'author_name': response.author_name,
                        'by_test_creator': this.isViewByCreator,
                    });

                    this.clearUserMessage();
                } catch (error) {
                    alert('Error');
                    console.log(error.response);
                } finally {
                    this.isSendingMessage = false;
                }
            },
            clearUserMessage: function () {
                this.userMessage = '';
            },
        },
        async created() {
            this.loadComments(this.testId);
        },
    }
</script>

<style>
    .comments .messages {
        max-height: 300px;
        overflow-y: auto;
        padding: 10px;
    }

    .message-text {
        padding: 10px;
        border-radius: .3em;
        color: black;
        font-size: 14px;
        max-width: 50%;
    }

    .left-message > .message-text {
        background-color: palegreen;
    }

    .right-message > .message-text {
        background-color: powderblue;
    }
</style>
