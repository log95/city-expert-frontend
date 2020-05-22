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
                            :rules="[rules.required, rules.passwordMin]"
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
    import axios from 'axios';

    export default {
        name: 'RegisterForm',
        data: () => ({
            name: null,
            email: null,
            password: null,
            isValid: true,
            isLoading: false,
            isShowPassword: false,
            isSuccessSubmitted: false,
            rules: {
                required: v => !!v || "Required",
                passwordMin: v => (v && v.length >= 8) || "Min 8 characters",
                email: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
            },
        }),
        methods: {
            sendForm: function () {
                this.isLoading = true;

                axios
                    .post('http://localhost:8082/api/v1/account/register/', {
                        'name': this.name,
                        'email': this.email,
                        'password': this.password,
                    })
                    .then(response => {
                        this.isSuccessSubmitted = true;
                        console.log(response);
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