<template>
    <div v-if="isApproveSubmitted">
        <v-alert type="success">
            {{ $t('MODERATION_TEST.APPROVE_SUBMITTED') }}
        </v-alert>
    </div>

    <div v-else-if="isRejectSubmitted">
        <v-alert type="success">
            {{ $t('MODERATION_TEST.REJECT_SUBMITTED') }}
        </v-alert>
    </div>

    <div v-else>
        <h2 class="text-center">Тест №{{ $route.params['test_id'] }}</h2>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">

                    <v-card-text>
                        <div class="d-flex justify-center mb-6">
                            <img :src="test ? test.image_url: null" style="max-height: 1000px; width: auto"/>
                        </div>
                        <br><br>

                        <v-text-field
                                :label="$t('TEST.QUESTION')"
                                :value="test ? test.question : ''"
                                disabled
                        ></v-text-field>

                        <v-text-field
                                :label="$t('TEST.ANSWER')"
                                :value="test ? test.answer : ''"
                                disabled
                        ></v-text-field>

                        <v-text-field
                                :label="$t('TEST.CITY')"
                                :value="test ? $t('CITY.' + test.city['name']) : ''"
                                disabled
                        ></v-text-field>

                        <div>{{ $t('TEST.HINTS') }}</div>
                        <div v-if="test" style="padding-left: 20px">
                            <v-text-field
                                    v-for="(hint, index) in test.hints"
                                    :key="index"
                                    :value="hint.text"
                                    :label="$t('HINT_NUM', {num: index + 1})"
                                    disabled
                            ></v-text-field>
                        </div>
                        <br><br>

                        <div v-if="test">
                            <div>Чат</div>
                            <Chat
                                    :chatId="test.chat_id"
                                    :isViewByCreator="false"
                            ></Chat>
                        </div>

                    </v-card-text>

                    <slot v-if="test" name="toolbar" v-bind:test="test"></slot>

                    <div v-if="availableTransitions.length">
                        <v-divider class="mt-12"></v-divider>

                        <v-card-actions>
                            <v-btn
                                    v-if="availableTransitions.includes('reject')"
                                    @click="rejectTest"
                                    :disabled="isLoading"
                                    color="error"
                                    text
                            >
                                {{ $t('MODERATION_TEST.REJECT_BTN') }}
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                                    v-if="availableTransitions.includes('approve')"
                                    @click="approveTest"
                                    :disabled="isLoading"
                                    color="success"
                                    text
                            >
                                {{ $t('MODERATION_TEST.APPROVE_BTN') }}
                            </v-btn>
                        </v-card-actions>
                    </div>

                </v-card>
            </v-col>
        </v-row>

        <v-snackbar
                v-model="isSnackbar"
                :timeout="4000"
                color="error"
        >
            {{ snackbarText }}
        </v-snackbar>
    </div>
</template>

<script>
    import api from '@/api';
    import Chat from '@/components/Chat/Chat';

    export default {
        name: 'PublicationTestShow',
        components: {
            Chat,
        },
        data: () => ({
            isLoading: false,

            test: null,

            availableTransitions: [],

            isApproveSubmitted: false,
            isRejectSubmitted: false,

            isSnackbar: false,
            snackbarText: '',
        }),
        methods: {
            async approveTest() {
                this.isLoading = true;

                try {
                    api.post('moderation/tests/' + this.$route.params['test_id'] + '/approve/');

                    this.isApproveSubmitted = true;
                } catch (error) {
                    alert('Error');
                    console.log(error.response);
                } finally {
                    this.isLoading = false;
                }
            },
            async rejectTest() {
                this.isLoading = true;

                try {
                    await api.post('moderation/tests/' + this.$route.params['test_id'] + '/reject/');

                    this.isRejectSubmitted = true;
                } catch (error) {
                    if (error.response.data.type && error.response.data.type === 'EMPTY_MESSAGE_ON_MODERATOR_REJECT') {
                        this.snackbarText = this.$t('MODERATION_TEST.EMPTY_MESSAGE_ON_MODERATOR_REJECT');
                        this.isSnackbar = true;
                    } else {
                        alert('Error');
                        console.log(error.response);
                    }
                } finally {
                    this.isLoading = false;
                }
            },
        },
        async created() {
            try {
                let response = await api.get('publication/tests/' + this.$route.params['test_id'] + '/');

                this.test = response.data;
            } catch (error) {
                alert('Error');
                console.log(error.response);
            }
        },
    }
</script>