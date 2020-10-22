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
        <v-container v-else style="max-width: 600px">
            <v-alert v-if="isSuccessCheck" type="success">
                {{ $t('EMAIL_VERIFICATION.EMAIL_VERIFIED') }}
            </v-alert>
            <v-alert v-else type="error">
                {{ $t('EMAIL_VERIFICATION.ERROR') }}
            </v-alert>
        </v-container>
    </div>
</template>

<script>
    import api from '@/api';

    export default {
        name: 'EmailVerification',
        data: () => ({
            isLoading: true,
            isSuccessCheck: false,
        }),
        created() {
            api
                .post('account/verify/' + this.$route.params['user_id'] + '/' + this.$route.params['code'] + '/')
                .then(() => {
                    this.isSuccessCheck = true;
                })
                .catch(error => {
                    this.isSuccessCheck = false;
                    console.log(error.response);
                })
                .finally(() => this.isLoading = false)
        }
    }
</script>
