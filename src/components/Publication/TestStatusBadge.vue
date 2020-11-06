<template>
    <v-chip
            v-if="this.isInReview"
            class="ma-2"
            color="primary"
            label
    >
        <v-icon left small>mdi-timer-sand-empty</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.review') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isOnCorrection"
            class="ma-2"
            color="primary"
            label
    >
        <v-icon left small>mdi-pencil</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.on_correction') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isPublished"
            class="ma-2"
            color="success"
            label
    >
        <v-icon left small>mdi-check</v-icon>
        <span>{{ $t('TEST_PUBLISH_STATUS.published') }}</span>
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
                return this.status === TestPublishStatus.REVIEW;
            },
            isOnCorrection: function () {
                return this.status === TestPublishStatus.ON_CORRECTION;
            },
            isPublished: function () {
                return this.status === TestPublishStatus.PUBLISHED;
            },
        },
    };
</script>
