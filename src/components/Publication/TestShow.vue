<template>
    <div>
        <h2 class="text-center">Тест №{{ $route.params['test_id'] }}</h2>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">

                    <v-card-text>
                        <div v-if="test" class="d-flex justify-end mb-6">
                            <StatusBadge :status="test.status"></StatusBadge>
                        </div>

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
                                    :isViewByCreator="isViewByCreator"
                            ></Chat>
                        </div>

                    </v-card-text>

                    <v-divider class="mt-12"></v-divider>

                    <slot
                            v-if="test"
                            name="toolbar"
                            v-bind:test="test"
                    ></slot>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import api from '@/api';
    import Chat from '@/components/Chat/Chat';
    import StatusBadge from "@/components/Publication/TestStatusBadge";

    export default {
        name: 'PublicationTestShow',
        components: {
            Chat,
            StatusBadge,
        },
        data: () => ({
            test: null,
        }),
        props: [
            'isViewByCreator',
        ],
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