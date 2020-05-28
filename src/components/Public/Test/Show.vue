<template>
    <div>
        <div v-if="isLoading" class="text-center">
            <div>
                <v-progress-circular
                        indeterminate
                        color="primary"
                ></v-progress-circular>
                <span>  {{ $t('LOADING') }}</span>
            </div>
        </div>

        <div v-if="!isLoading">
            <div class="d-flex justify-space-between mb-6">
                <v-btn
                        @click="$router.push({name: 'PublicTestIndexPage'})"
                        text
                        color="primary"
                        class="float-left"
                >
                    <v-icon small>mdi-arrow-left</v-icon>
                    <span>К списку</span>
                </v-btn>
                <TestStatusBadge :status="test.status"></TestStatusBadge>
            </div>

            <h2 class="text-center">{{ test.question }}</h2><br>

            <div class="d-flex justify-center mb-6">
                <img :src="test.image_url" style="max-height: 1000px; width: auto"/>
            </div>

            <div class="d-flex justify-center mb-6">
                <v-btn
                        @click="toggleLikeTest(true)"
                        :disabled="isInterestLoading"
                        icon
                        style="margin-right: 20px"
                >
                    <v-icon
                            :color="test.interest.current_user_liked === true ? 'blue' : ''"
                    >mdi-thumb-up</v-icon>
                    <span>{{ test.interest.likes_count }}</span>
                </v-btn>
                <v-btn
                        @click="toggleLikeTest(false)"
                        :disabled="isInterestLoading"
                        icon
                >
                    <v-icon
                            :color="test.interest.current_user_liked === false ? 'red' : ''"
                    >mdi-thumb-down</v-icon>
                    <span>{{ test.interest.dislikes_count }}</span>
                </v-btn>
            </div>

            <v-container>
                <v-row>

                    <v-col cols="12">
                        <v-text-field
                                v-if="!test.answer"
                                v-model="userAnswer"
                                append-outer-icon="mdi-send"
                                clearable
                                label="Введите ответ"
                                @click:append-outer="checkAnswer"
                                @click:clear="clearAnswer"
                        ></v-text-field>
                        <v-text-field
                            v-else
                            label="Ответ"
                            :value="test.answer"
                            readonly
                        ></v-text-field>
                    </v-col>

                    <v-col vols="12">
                        <v-expansion-panels multiple>
                            <v-expansion-panel
                                    v-for="(hint, key) in hints"
                                    :key="hint.id"
                                    @change="onHintToggled(hint, key)"
                            >
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-expansion-panel-header v-on="hint.isAccessible ? '' : on" disable-icon-rotate>
                                            Подсказка №{{ key + 1 }}
                                            <template v-slot:actions>
                                                <v-icon
                                                        v-if="hint.isAccessible"
                                                        color="teal"
                                                >
                                                    mdi-check
                                                </v-icon>
                                                <v-icon
                                                        v-else
                                                        color="orange"
                                                >
                                                    mdi-currency-usd
                                                </v-icon>
                                            </template>
                                        </v-expansion-panel-header>
                                    </template>
                                    <span>{{ hintPointsText }}</span>
                                </v-tooltip>

                                <v-expansion-panel-content>{{ hint.text }}</v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>

                    <v-col v-if="!test.answer" cols="12">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        dark v-on="on"
                                        color="blue-grey"
                                        class="ma-2 white--text"
                                        @click="showAnswer"
                                >
                                    <v-icon left dark>mdi-key</v-icon>
                                    Посмотреть ответ
                                </v-btn>
                            </template>
                            <span>{{ showAnswerPointsText}}</span>
                        </v-tooltip>
                    </v-col>

                    <v-col cols="12"></v-col>

                    <v-col cols="12">
                        <v-row align="center" justify="center">
                            <v-btn
                                    v-if="test.near_tests && test.near_tests.prev"
                                    fab
                                    dark
                                    color="blue darken-3"
                                    class="mr-1"
                                    @click="$router.push({name: 'PublicTestShowPage', params: { test_id: test.near_tests.prev }})"
                            >
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                    v-if="test.near_tests && test.near_tests.next"
                                    fab
                                    dark
                                    color="blue darken-3"
                                    class="ml-1"
                                    @click="$router.push({name: 'PublicTestShowPage', params: { test_id: test.near_tests.next }})"
                            >
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>
        </div>

        <v-snackbar
                v-model="isSnackbar"
                :timeout="snackbarTimeout"
                :color="snackbarColor"
        >
            {{ snackbarText }}
        </v-snackbar>

    </div>
</template>

<script>
    import api from '@/api';
    import PointsMap from '@/enum/PointsMap';
    import TestStatusBadge from '@/components/Public/Test/TestStatusBadge';
    import TestStatus from "../../../enum/TestStatus";

    export default {
        name: 'PublicTestShow',
        components: {
            TestStatusBadge,
        },
        data: () => ({
            test: {},
            userAnswer: '',
            hints: [],
            isLoading: true,
            isSnackbar: false,
            snackbarText: '',
            snackbarColor: '',
            snackbarTimeout: null,
            isInterestLoading: false,
        }),
        computed: {
            showAnswerPointsText: function () {
                return PointsMap.SHOW_ANSWER + ' ' + this.$t('POINTS');
            },
            hintPointsText: function () {
                return PointsMap.SHOW_HINT + ' ' + this.$t('POINT');
            },
        },
        methods: {
            checkAnswer: function () {
                api.
                    post('tests/' + this.test.id + '/answer/', {
                        answer: this.userAnswer,
                    })
                    .then(response => {
                        if (response.data.is_right_answer) {
                            this.$set(this.test, 'answer', this.userAnswer);
                            this.test.status = TestStatus.CORRECT_ANSWER;
                            this.makeAllHintsAvailable();

                            this.showNotice(this.$t('POINTS_NOTICE.CORRECT_ANSWER', {points: PointsMap.CORRECT_ANSWER}), 'success', 3000);
                        } else {
                            this.showNotice('Неверно', 'error');
                        }
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    })
            },
            showAnswer: function () {
                api.get('tests/' + this.test.id + '/answer/')
                    .then(response => {
                        this.$set(this.test, 'answer', response.data.answer);
                        this.test.status = TestStatus.SHOW_ANSWER;
                        this.makeAllHintsAvailable();

                        this.showNotice(this.$t('POINTS_NOTICE.SHOW_ANSWER', {points: PointsMap.SHOW_ANSWER}), 'orange', 3000);
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    });

            },
            makeAllHintsAvailable: function () {
                this.hints.forEach(hint => hint['isAccessible'] = true);
            },
            clearAnswer: function () {
                this.userAnswer = '';
            },
            onHintToggled: function (hint, indexArray) {
                if (hint.text) {
                    return;
                }

                api.get('hints/' + hint.id + '/')
                    .then(response => {
                        this.hints[indexArray]['text'] = response.data.text;

                        if (!hint['isAccessible']) {
                            this.showNotice(this.$t('POINTS_NOTICE.HINT', {points: PointsMap.SHOW_HINT}), 'orange');
                            this.hints[indexArray]['isAccessible'] = true;
                        }
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    });
            },
            loadTest: function () {
                this.isLoading = true;

                api.get('tests/' + this.$route.params['test_id'] + '/')
                    .then(response => {
                        this.hints = response.data.hints.all_ids.map(function (hintId) {
                            return {
                                id: hintId,
                                text: '',
                                isAccessible: response.data.hints.available_ids.includes(hintId),
                            }
                        });

                        this.test = response.data;
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    })
                    .finally(() => this.isLoading = false);
            },
            toggleLikeTest: function (isLikeAction) {
                this.isInterestLoading = true;

                if (this.test.interest.current_user_liked !== isLikeAction) {
                    api
                        .post('test_interests/' + this.test.id + '/', {
                            is_liked: isLikeAction,
                        })
                        .then(() => {
                            isLikeAction ? this.test.interest.likes_count++ : this.test.interest.dislikes_count++;
                            if (this.test.interest.current_user_liked !== null) {
                                isLikeAction ? this.test.interest.dislikes_count-- : this.test.interest.likes_count--;
                            }
                            this.test.interest.current_user_liked = isLikeAction;
                        })
                        .catch(error => {
                            alert('Error');
                            console.log(error.response);
                        })
                        .finally(() => this.isInterestLoading = false);
                } else {
                    api.delete('test_interests/' + this.test.id + '/')
                        .then(() => {
                            this.test.interest.current_user_liked = null;
                            isLikeAction ? this.test.interest.likes_count-- : this.test.interest.dislikes_count--;
                        })
                        .catch(error => {
                            alert('Error');
                            console.log(error.response);
                        })
                        .finally(() => this.isInterestLoading = false);
                }
            },
            showNotice: function (text, color, timeout = 1200) {
                this.snackbarText = text;
                this.snackbarColor = color;
                this.snackbarTimeout = timeout;
                this.isSnackbar = true;
            },
        },
        created: function () {
            this.loadTest();
        },
        watch: {
            $route() {
                this.loadTest();
            }
        }
    }
</script>