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
    import { mapMutations } from 'vuex';

    export default {
        name: 'LoginForm',
        data: function () {
            return {
                email: null,
                password: null,
                isValid: false,
                isLoading: false,
                isShowPassword: false,
                rules: {
                    required: v => !!v || this.$t('REQUIRED_FIELD'),
                    passwordMin: v => (v && v.length >= 8) || this.$t('MIN_FIELD', {num: 8}),
                    email: v => /.+@.+\..+/.test(v) || this.$t('NOT_VALID_EMAIL'),
                },
            }
        },
        methods: {
            ...mapMutations({
                addNotification: 'snackbar/addNotification',
            }),
            async sendForm() {
                this.isLoading = true;

                try {
                    let response = await this.$api.post('account/login/', {
                        'username': this.email,
                        'password': this.password,
                    });

                    localStorage.setItem('JWT_TOKEN', response.data.token);

                    response = await this.$api.get('account/user', {
                        headers: {
                            'Authorization': 'Bearer ' + response.data.token,
                        },
                    });

                    localStorage.setItem('USER', JSON.stringify(response.data));

                    let startPage = this.$router.resolve({'name': 'StartPage'});
                    window.location.href = startPage.href;
                } catch (error) {
                    if (error.response.status === 401) {
                        this.addNotification({
                            'text': this.$t('WRONG_CREDENTIALS'),
                            'color': 'error',
                        });
                    } else {
                        alert('Error');
                        console.log(error);
                    }
                }

                this.isLoading = false;
            }
        },
    }
</script>
