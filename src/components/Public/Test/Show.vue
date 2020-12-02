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
                    <span>{{ $t('TO_TEST_LIST') }}</span>
                </v-btn>
                <TestStatusBadge :status="test.status"></TestStatusBadge>
            </div>

            <h2 class="text-center">{{ test.question }}</h2><br>

            <div class="d-flex justify-center mb-6">
                <img :src="resizedImageUrl">
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
                                :label="$t('INPUT_ANSWER')"
                                @click:append-outer="checkAnswer"
                                @click:clear="clearAnswer"
                        ></v-text-field>
                        <v-text-field
                            v-else
                            :label="$t('ANSWER')"
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
                                            {{ $t('HINT_NUM', {'num': key + 1}) }}
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
                                    {{ $t('SHOW_ANSWER') }}
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
    </div>
</template>

<script>
    import PointsMap from '@/enum/PointsMap';
    import TestStatusBadge from '@/components/Public/Test/TestStatusBadge';
    import TestStatus from "../../../enum/TestStatus";
    import Resizer from '@/utils/resizer';
    import { mapMutations } from 'vuex';

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
            isInterestLoading: false,
        }),
        computed: {
            showAnswerPointsText: function () {
                return PointsMap.SHOW_ANSWER + ' ' + this.$t('POINTS');
            },
            hintPointsText: function () {
                return PointsMap.SHOW_HINT + ' ' + this.$t('POINT');
            },
            resizedImageUrl () {
                return Resizer.getResizedImageUrl(this.test.image_url, {
                    'WIDTH': 0,
                    'HEIGHT': 530,
                });
            },
        },
        methods: {
            ...mapMutations({
                addNotification: 'snackbar/addNotification',
                addPointsToStore: 'userPoints/addPoints',
            }),

            checkAnswer: function () {
                this.$api.
                    post('tests/' + this.test.id + '/answer/', {
                        answer: this.userAnswer,
                    })
                    .then(response => {
                        if (response.data.is_right_answer) {
                            this.$set(this.test, 'answer', this.userAnswer);
                            this.test.status = TestStatus.CORRECT_ANSWER;
                            this.makeAllHintsAvailable();

                            this.addPointsToStore(PointsMap.CORRECT_ANSWER);

                            this.addNotification({
                                'text': this.$t('POINTS_NOTICE.CORRECT_ANSWER', {points: PointsMap.CORRECT_ANSWER}),
                                'color': 'success',
                            });
                        } else {
                            this.addNotification({
                                'text': this.$t('WRONG_ANSWER'),
                                'color': 'error',
                            });
                        }
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    })
            },
            showAnswer: function () {
                this.$api.get('tests/' + this.test.id + '/answer/')
                    .then(response => {
                        this.$set(this.test, 'answer', response.data.answer);
                        this.test.status = TestStatus.SHOW_ANSWER;
                        this.makeAllHintsAvailable();

                        this.addPointsToStore(PointsMap.SHOW_ANSWER);

                        this.addNotification({
                            'text': this.$t('POINTS_NOTICE.SHOW_ANSWER', {points: PointsMap.SHOW_ANSWER}),
                            'color': 'orange',
                        });
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

                this.$api.get('hints/' + hint.id + '/')
                    .then(response => {
                        this.hints[indexArray]['text'] = response.data.text;

                        if (!hint['isAccessible']) {
                            this.addNotification({
                                'text': this.$t('POINTS_NOTICE.HINT', {points: PointsMap.SHOW_HINT}),
                                'color': 'orange',
                            });
                            this.hints[indexArray]['isAccessible'] = true;

                            this.addPointsToStore(PointsMap.SHOW_HINT);
                        }
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    });
            },
            loadTest: function () {
                this.isLoading = true;

                this.$api.get('tests/' + this.$route.params['test_id'] + '/')
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
                    this.$api
                        .post('tests/' + this.test.id + '/interest/', {
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
                    this.$api.delete('tests/' + this.test.id + '/interest/')
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
