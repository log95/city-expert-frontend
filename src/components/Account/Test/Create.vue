<template>
    <div>
        <div v-if="isSuccessSubmitted">
            <v-alert type="success">
                {{ $t('TEST_CREATE.SUCCESS_CREATED') }}
            </v-alert>
        </div>

        <div v-else>
            <h2 class="text-center">{{ $t('TEST_CREATION') }}</h2>

            <v-row justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <v-card ref="form">
                        <v-card-text>
                            <v-form v-model="isValid">
                                <v-select
                                        :loading="citySelectItems.length === 0"
                                        :label="$t('CITY')"
                                        v-model="cityId"
                                        :items="citySelectItems"
                                        :rules="[rules.required]"
                                ></v-select>

                                <v-text-field
                                        :label="$t('TEST.QUESTION')"
                                        v-model="question"
                                        :rules="[rules.required, rules.questionMax]"
                                        required
                                ></v-text-field>

                                <v-text-field
                                        :label="$t('TEST.ANSWER')"
                                        v-model="answer"
                                        :rules="[rules.required, rules.answerMax]"
                                        required
                                ></v-text-field>

                                <v-file-input
                                        v-model="image"
                                        :rules="[rules.required, rules.fileMaxSize]"
                                        accept="image/*"
                                        :label="$t('IMAGE')"
                                ></v-file-input>

                                <div>{{ $t('TEST.HINTS') }}</div>
                                <div style="padding-left: 20px">
                                    <v-text-field
                                            v-for="(hint, index) in hints"
                                            :key="index"
                                            v-model="hints[index]"
                                            :label="$t('HINT_NUM', {num: index + 1})"
                                            :rules="[rules.required, rules.hintMax]"
                                            append-outer-icon="mdi-close"
                                            @click:append-outer="removeHint(index)"
                                    ></v-text-field>

                                    <v-btn
                                            v-if="this.hints.length < 5"
                                            @click="addHint"
                                            small
                                    >
                                        <v-icon left>mdi-plus</v-icon>
                                        {{ $t('TEST_CREATE.ADD_HINT') }}
                                    </v-btn>
                                </div>
                            </v-form>
                        </v-card-text>

                        <v-divider class="mt-12"></v-divider>

                        <v-card-actions>
                            <v-btn
                                    @click="$router.push({name: 'AccountTestIndexPage'})"
                                    :disabled="isSavingForm"
                                    text
                            >{{ $t('CANCEL_BTN') }}</v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                                    color="primary"
                                    :disabled="!isValid"
                                    :loading="isSavingForm"
                                    text
                                    @click="saveTest"
                            >{{ $t('SAVE_BTN') }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

        </div>
    </div>

</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'AccountTestCreate',
        data: function () {
            return {
                isSuccessSubmitted: false,
                isValid: false,
                isSavingForm: false,
                citySelectItems: [],
                cityId: null,
                question: '',
                answer: '',
                image: null,
                rules: {
                    required: v => !!v || this.$t('REQUIRED_FIELD'),
                    questionMax: v => (v && v.length < 255) || this.$t('MAX_FIELD', {num: 255}),
                    answerMax: v => (v && v.length < 255) || this.$t('MAX_FIELD', {num: 255}),
                    hintMax: v => (v && v.length < 255) || this.$t('MAX_FIELD', {num: 255}),
                    fileMaxSize: value => !value || value.size < 5000000 || this.$t('IMAGE_SIZE_SHOULD_LESS_THAN', {num: 5}),
                },
                hints: [],
            }
        },
        computed: {
            ...mapState('cities', {
                cities: 'cities',
            }),
        },
        methods: {
            ...mapActions({
                loadCities: 'cities/loadList',
            }),
            async saveTest () {
                this.isSavingForm = true;

                try {
                    let response = await this.$api.post('files/', this.image, {
                        headers: {
                            'Content-Type': this.image.type,
                        }
                    });

                    await this.$api.post('account/tests/', {
                        question: this.question,
                        answer: this.answer,
                        city_id: this.cityId,
                        hints: this.hints,
                        image_url: response.data.url,
                    });

                    this.isSuccessSubmitted = true;
                } catch (error) {
                    alert('Error');
                    console.log(error.response);
                } finally {
                    this.isSavingForm = false;
                }
            },
            addHint: function () {
                this.hints.push('');
            },
            removeHint: function (index) {
                this.hints.splice(index, 1);
            },
        },
        watch: {
            cities: function () {
                let self = this;

                this.cities.map(function (city) {
                    self.citySelectItems.push({
                        text: self.$t('CITIES.' + city['name']),
                        value: city['id'],
                    });
                });
            },
        },
        created() {
            this.loadCities();
        },
    }
</script>
