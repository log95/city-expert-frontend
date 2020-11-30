<template>
    <div class="notifications-wrapper">
        <v-alert
            class="notification"
            border="top"
            colored-border
            color="#2196f3"
            elevation="2"
            dismissible
            transition="scale-transition"
            width="400px"
            v-for="(notification, index) in notifications"
            :key="index"
        >
            <span v-html="notification.text"></span>
        </v-alert>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('notifications', {
                notifications: 'notifications',
            }),
        },
    }
</script>

<style>
    .notifications-wrapper {
        padding: 5px;
        position: fixed;
        right: 10px;
        top: 60px;
        z-index: 100;
        max-height: 500px;
        overflow-y: auto;
    }
</style>
