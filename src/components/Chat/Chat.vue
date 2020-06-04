<template>
    <div class="chat elevation-3">
        <div class="messages">
            <div
                    v-for="message in messages"
                    :key="message.id"
                    class="d-flex mb-6"
                    :class="message.by_creator === isViewByCreator ? 'justify-start left-message' : 'justify-end right-message'"
            >
                <div class="message-text">{{ message.text }}</div>
            </div>
        </div>

        <v-divider v-if="messages.length !== 0"></v-divider>

        <div>
            <v-text-field
                    v-model="userMessage"
                    append-outer-icon="mdi-send"
                    label="Сообщение"
                    clearable
                    :loading="isSendingMessage"
                    style="padding: 10px"
                    @click:append-outer="sendMessage"
                    @click:clear="clearUserMessage"
            ></v-text-field>
        </div>
    </div>
</template>

<script>
    import api from '@/api';

    export default {
        name: 'Chat',
        data: () => ({
            messages: [],
            userMessage: '',

            isSendingMessage: false,
        }),
        props: [
            'chatId',
            'isViewByCreator',
        ],
        methods: {
            async sendMessage() {
                if (this.isSendingMessage) {
                    return;
                }

                try {
                    this.isSendingMessage = true;

                    let response = await api.post('chat/' + this.chatId + '/messages/', {
                        message: this.userMessage,
                    });

                    this.messages.push({
                        'id': response.data.id,
                        'text': this.userMessage,
                        'by_creator': this.isViewByCreator,
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
            try {
                let response = await api.get('chat/' + this.chatId + '/messages/');
                this.messages = response.data.messages;
            } catch (error) {
                alert('Error');
                console.log(error.response);
            }
        },
    }
</script>

<style>
    .chat .messages {
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