<template>
    <div>
        <v-btn
            v-if="isStatusReviewed"
            @click="returnOnCorrection"
            :loading="isLoading"
            color="primary"
            text
        >
            Вернуть на корректировку
        </v-btn>

        <v-btn
            v-if="isStatusOnCorrection"
            @click="$router.push({name: 'AccountTestUpdatePage', params: { test_id: test.id }})"
            :loading="isLoading"
            color="primary"
            text
        >
            Обновить
        </v-btn>
    </div>
</template>

<script>
    import TestPublishStatus from '@/enum/TestPublishStatus';
    import api from '@/api';

    export default {
        name: 'AccountTestShowToolbar',
        data: () => ({
            isLoading: false,
        }),
        props: [
            'test',
        ],
        computed: {
            isStatusReviewed: function () {
                return this.test.status === TestPublishStatus.REVIEWED;
            },
            isStatusOnCorrection: function () {
                return this.test.status === TestPublishStatus.ON_CORRECTION;
            },
        },
        methods: {
            async returnOnCorrection() {
                try {
                    await api.patch('account/tests/' + this.test.id + '/to-correction/');

                    this.$router.push({name: 'AccountTestUpdatePage', params: { test_id: this.test.id }});
                } catch (error) {
                    alert('Error');
                    console.log(error.response);
                } finally {
                    this.isLoading = false;
                }
            },
        },
    }
</script>