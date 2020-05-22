<template>
    <v-container style="max-width: 800px">
        <v-tabs v-model="tab" show-arrows background-color="primary" icons-and-text dark grow centered>
            <v-tabs-slider color="purple darken-4"></v-tabs-slider>
            <v-tab>
                <v-icon large>mdi-account</v-icon>
                <div class="caption py-1">{{ $t('LOGIN_REGISTER_TABS.LOGIN') }}</div>
            </v-tab>
            <v-tab>
                <v-icon large>mdi-account-outline</v-icon>
                <div class="caption py-1">{{ $t('LOGIN_REGISTER_TABS.REGISTER') }}</div>
            </v-tab>
            <v-tab-item>
                <LoginForm></LoginForm>
            </v-tab-item>
            <v-tab-item>
                <RegisterForm></RegisterForm>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    import RegisterForm from "./RegisterForm";
    import LoginForm from "./LoginForm";

    export default {
        name: 'LoginRegisterForm',
        components: {
            RegisterForm,
            LoginForm,
        },
        data: () => ({
            tab: 0,
        }),
    };
</script>