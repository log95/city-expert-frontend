<template>
    <v-card>
        <v-card-title>{{ $t('LOGIN_FORM.TITLE') }}</v-card-title>
        <v-card-text>
            <v-form v-model="isValid">
                <v-text-field
                        :label="$t('LOGIN_FORM.EMAIL')"
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        required
                ></v-text-field>
                <v-text-field
                        :label="$t('LOGIN_FORM.PASSWORD')"
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
            >{{ $t('LOGIN_FORM.LOGIN_BTN') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'LoginForm',
        data: () => ({
            email: null,
            password: null,
            isValid: true,
            isLoading: false,
            isShowPassword: false,
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
                    .post('http://localhost:8082/api/v1/account/login/', {
                        'username': this.email,
                        'password': this.password,
                    })
                    .then(response => {
                        localStorage.setItem('JWT_TOKEN', response.data.token);
                        this.$router.push({name: 'StartPage'});
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