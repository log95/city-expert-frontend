<template>
    <div class="elevation-3">
        <div id="comments" class="comments">
            <div
                v-for="comment in comments"
                :key="comment.id"
                class="d-flex mb-6"
                :class="comment.by_test_creator === isViewByCreator ? 'justify-start' : 'justify-end'"
            >
                <div
                    class="comment-wrapper"
                    :class="comment.by_test_creator === isViewByCreator ? 'left-comment' : 'right-comment'"
                >
                    <div class="comment-author">{{ comment.author_name }}</div>
                    <div class="comment-message">{{ comment.message }}</div>
                </div>

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
                    @keyup.enter="addComment"
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
                addCommentToStore: 'testComments/addComment',
            }),
            async addComment() {
                if (this.isSendingMessage || !this.userMessage) {
                    return;
                }

                try {
                    this.isSendingMessage = true;

                    let response = await this.$api.post('tests/' + this.testId + '/comments/', {
                        message: this.userMessage,
                    });

                    this.addCommentToStore({
                        'id': response.data.id,
                        'message': response.data.message,
                        'author_name': response.data.author_name,
                        'by_test_creator': this.isViewByCreator,
                    });

                    this.scrollToLastComment();

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
            scrollToLastComment: function () {
                let  self = this;
                setTimeout(function() {
                    let comments = self.$el.querySelector("#comments");
                    comments.scrollTop = comments.scrollHeight;
                }, 300);
            },
        },
        async created() {
            await this.loadComments(this.testId);

            this.scrollToLastComment();
        },
    }
</script>

<style>
    .comments {
        max-height: 300px;
        overflow-y: auto;
        padding: 10px;
    }

    .comment-wrapper {
        padding: 5px;
        color: black;
        max-width: 50%;
    }

    .comment-wrapper .comment-author {
        font-size: 12px;

    }

    .comment-wrapper .comment-message {
        font-size: 14px;
        padding: 10px;
        border-radius: .3em;
    }

    .left-comment .comment-message {
        background-color: palegreen;
    }

    .right-comment .comment-message {
        background-color: powderblue;
    }
</style>
