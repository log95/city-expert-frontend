<template>
    <div>
        <v-btn
            @click="test2"
            color="primary"
            text
        >
            Test
        </v-btn>
    </div>
</template>

<script>
    import TestPublishStatus from '@/enum/TestPublishStatus';
    import api from '@/api';
    import { mapMutations } from 'vuex';

    export default {
        name: 'ModerationTestShowToolbar',
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
            test2: function () {
                this.addNotification({'text': 'ttt tttt'});
            },
            ...mapMutations({
                addNotification: 'snackbar/addNotification',
            }),
        },
    }
</script>