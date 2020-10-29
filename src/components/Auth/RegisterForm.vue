<template>
    <div v-if="isSuccessSubmitted">
        <v-alert type="success">
            {{ $t('REGISTER_FORM.FOLLOW_EMAIL_LINK') }}
        </v-alert>
    </div>
    <div v-else>
        <v-card>
            <v-card-title>{{ $t('REGISTER_FORM.TITLE') }}</v-card-title>
            <v-card-text>
                <v-form v-model="isValid">
                    <v-text-field
                            :label="$t('REGISTER_FORM.NAME')"
                            v-model="name"
                            :rules="[rules.required]"
                            required
                    ></v-text-field>
                    <v-text-field
                            :label="$t('REGISTER_FORM.EMAIL')"
                            v-model="email"
                            :rules="[rules.required, rules.email]"
                            required
                    ></v-text-field>
                    <v-text-field
                            :label="$t('REGISTER_FORM.PASSWORD')"
                            v-model="password"
                            :rules="[rules.required, rules.passwordMin, rules.passwordMax]"
                            :type="isShowPassword ? 'text' : 'password'"
                            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="isShowPassword = !isShowPassword"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                        color="success"
                        :disabled="!isValid"
                        x-large
                        :loading="isLoading"
                        @click="sendForm"
                >{{ $t('REGISTER_FORM.REGISTER_BTN') }}</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import api from '@/api';

    export default {
        name: 'RegisterForm',
        data: function () {
            return {
                name: null,
                email: null,
                password: null,
                isValid: false,
                isLoading: false,
                isShowPassword: false,
                isSuccessSubmitted: false,
                rules: {
                    required: v => !!v || this.$t('REQUIRED_FIELD'),
                    passwordMin: v => (v && v.length >= 8) || this.$t('MIN_FIELD', {num: 8}),
                    passwordMax: v => (v && v.length >= 8) || this.$t('MAX_FIELD', {num: 100}),
                    nameMax: v => (v && v.length >= 100) || this.$t('MAX_FIELD', {num: 100}),
                    email: v => /.+@.+\..+/.test(v) || this.$t('NOT_VALID_EMAIL'),
                },
            }
        },
        methods: {
            sendForm: function () {
                this.isLoading = true;

                api
                    .post('account/register/', {
                        'name': this.name,
                        'email': this.email,
                        'password': this.password,
                    })
                    .then(response => {
                        this.isSuccessSubmitted = true;
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    })
                    .finally(() => this.isLoading = false)
            }
        },
    }
</script>
