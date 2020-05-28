<template>
    <v-chip
            v-if="this.isInProcess"
            class="ma-2"
            color="primary"
            label
    >
        <v-icon left>mdi-timer-sand-empty</v-icon>
        <span>{{ $t('TEST_STATUS.in_process') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isShowAnswer"
            class="ma-2"
            color="red lighten-1"
            label
    >
        <v-icon left color="white">mdi-eye-outline</v-icon>
        <span style="color: white">{{ $t('TEST_STATUS.show_answer') }}</span>
    </v-chip>
    <v-chip
            v-else-if="this.isCorrectAnswer"
            class="ma-2"
            color="success"
            label
    >
        <v-icon left>mdi-check</v-icon>
        <span>{{ $t('TEST_STATUS.correct_answer') }}</span>
    </v-chip>
</template>

<script>
    import TestStatus from "@/enum/TestStatus";

    export default {
        name: 'PublicTestStatusBadge',
        props: [
            'status',
        ],
        computed: {
            isInProcess: function () {
                return this.status === TestStatus.IN_PROCESS;
            },
            isCorrectAnswer: function () {
                return this.status === TestStatus.CORRECT_ANSWER;
            },
            isShowAnswer: function () {
                return this.status === TestStatus.SHOW_ANSWER;
            },
        },
    };
</script>