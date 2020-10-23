<template>
    <div>
        <div class="d-flex justify-space-between mb-6">
            <v-btn
                    @click="$router.push({name: 'AccountTestIndexPage'})"
                    text
                    color="primary"
                    class="float-left"
            >
                <v-icon small>mdi-arrow-left</v-icon>
                <span>К списку</span>
            </v-btn>
        </div>

        <div v-if="isSuccessSubmitted">
            <v-alert type="success">
                {{ $t('TEST_CREATE.SUCCESS_CREATED') }}
            </v-alert>
        </div>

        <div v-else>
            <h2 class="text-center">Создание теста</h2>

            <v-row justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <v-card ref="form">
                        <v-card-text>
                            <v-form v-model="isValid">
                                <v-select
                                        :loading="cityId === null"
                                        label="Город"
                                        v-model="cityId"
                                        :items="cities"
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
                                        label="Изображение"
                                ></v-file-input>

                                <div>{{ $t('TEST.HINTS') }}</div>
                                <div style="padding-left: 20px">
                                    <v-text-field
                                            v-for="(hint, index) in hints"
                                            :key="index"
                                            v-model="hints[index]"
                                            :label="$t('HINT_NUM', {num: index + 1})"
                                            :rules="[rules.hintMax]"
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
    import api from '@/api';

    export default {
        name: 'AccountTestCreate',
        data: () => ({
            isSuccessSubmitted: false,
            isValid: false,
            isSavingForm: false,
            cities: [],
            cityId: null,
            question: '',
            answer: '',
            image: null,
            rules: {
                required: v => !!v || "Required",
                questionMax: v => (v && v.length < 255) || "Max 255 characters",
                answerMax: v => (v && v.length < 255) || "Max 255 characters",
                hintMax: v => (v && v.length < 255) || "Max 255 characters",
                fileMaxSize: value => !value || value.size < 5000000 || 'Image size should be less than 5 MB!',
            },
            hints: [],
        }),
        methods: {
            async saveTest () {
                this.isSavingForm = true;

                try {
                    let response = await api.post('files/', this.image, {
                        headers: {
                            'Content-Type': this.image.type,
                        }
                    });

                    await api.post('account/tests/', {
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
        created() {
            api.get('cities')
                .then(response => {
                    let self = this;

                    response.data.map(function (city) {
                        self.cities.push({
                            text: self.$t('CITIES.' + city['name']),
                            value: city['id'],
                        });
                    });

                    this.cityId = this.cities[0]['value'];
                })
                .catch(error => {
                    alert('Error');
                    console.log(error.response);
                });
        },
    }
</script>
