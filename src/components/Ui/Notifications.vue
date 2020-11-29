<template>
    <div class="notifications-wrapper">
        <v-alert
            class="notification"
            border="top"
            colored-border
            type="info"
            elevation="2"
            dismissible
            v-for="(notification, index) in notifications"
            :key="index"
            v-html="notification"
        >
        </v-alert>
    </div>
</template>

<script>
    export default {
        data: () =>  ({
            notifications: [
                'Новый комментарий по тесту. <a href="http://localhost:8081">Перейти</a>',
                '222',
            ],
            isShow: true,
            text: 'ASd asd asd <a href="http://localhost:8081/">dsa</a>',
        }),
        /*created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'snackbar/addNotification') {
                    this.text = state.snackbar.text;
                    this.color = state.snackbar.color;
                    this.timeout = state.snackbar.timeout;
                    this.isShow = true;
                }
            })
        },*/
    }
</script>

<style>
    .notifications-wrapper {
        padding: 5px;
        position: absolute;
        right: 0;
        top: 30px;
        z-index: 100;
    }

</style>
