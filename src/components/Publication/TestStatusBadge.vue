<template>
    <v-chip
            v-if="this.isInReview"
            class="ma-2"
            color="primary"
            label
    >
        <v-icon left small>mdi-timer-sand-empty</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.REVIEWED') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isOnCorrection"
            class="ma-2"
            color="primary"
            label
    >
        <v-icon left small>mdi-pencil</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.ON_CORRECTION') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isApproved"
            class="ma-2"
            color="success"
            label
    >
        <v-icon left small>mdi-check</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.APPROVED') }}</span>
    </v-chip>
</template>

<script>
    import TestPublishStatus from "@/enum/TestPublishStatus";

    export default {
        props: [
            'status',
        ],
        computed: {
            isInReview: function () {
                return this.status === TestPublishStatus.REVIEWED;
            },
            isOnCorrection: function () {
                return this.status === TestPublishStatus.ON_CORRECTION;
            },
            isApproved: function () {
                return this.status === TestPublishStatus.APPROVED;
            },
        },
    };
</script>