<template>
    <v-card-actions v-if="isStatusReviewed && isShowToolbar">
        <v-btn
                @click="rejectTest"
                :loading="isLoading"
                color="error"
                text
        >
            {{ $t('MODERATION_TEST.REJECT_BTN') }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
                @click="approveTest"
                :loading="isLoading"
                color="success"
                text
        >
            {{ $t('MODERATION_TEST.PUBLISH_BTN') }}
        </v-btn>
    </v-card-actions>
</template>

<script>
    import TestPublishStatus from '@/enum/TestPublishStatus';
    import { mapMutations } from 'vuex';

    export default {
        name: 'ModerationTestShowToolbar',
        data: () => ({
            isLoading: false,
            isShowToolbar: true,
        }),
        props: [
            'test',
        ],
        computed: {
            isStatusReviewed: function () {
                return this.test.status === TestPublishStatus.REVIEW;
            },
        },
        methods: {
            ...mapMutations({
                addNotification: 'snackbar/addNotification',
            }),
            async approveTest() {
                this.isLoading = true;

                try {
                    this.$api.post('moderation/tests/' + this.test.id + '/approve/');

                    this.isShowToolbar = false;

                    this.test.status = TestPublishStatus.PUBLISHED;

                    this.addNotification({
                        'text': this.$t('MODERATION_TEST.PUBLISHED'),
                        'color': 'success',
                        'timeout': 5000,
                    });
                } catch (error) {
                    alert('Error');
                    console.log(error.response);
                } finally {
                    this.isLoading = false;
                }
            },
            async rejectTest() {
                this.isLoading = true;

                try {
                    await this.$api.post('moderation/tests/' + this.test.id + '/reject/');

                    this.isShowToolbar = false;

                    this.test.status = TestPublishStatus.ON_CORRECTION;

                    this.addNotification({
                        'text': this.$t('MODERATION_TEST.REJECT_SUBMITTED'),
                        'color': 'success',
                        'timeout': 5000,
                    });
                } catch (error) {
                    if (error.response.data.type && error.response.data.type === 'NO_COMMENT_ON_MODERATOR_REJECT') {
                        this.addNotification({
                            'text': this.$t('MODERATION_TEST.NO_COMMENT_ON_MODERATOR_REJECT'),
                            'color': 'error',
                            'timeout': 3000,
                        });
                    } else {
                        alert('Error');
                        console.log(error.response);
                    }
                } finally {
                    this.isLoading = false;
                }
            },
        },
    }
</script>
