<template>
    <v-snackbar
            v-model="isShow"
            :timeout="timeout"
            :color="color"
    >
        {{ text }}
        <v-btn
            @click="isShow = false"
            icon
        >
            <v-icon color="white">mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        data: () =>  ({
            isShow: false,
            text: '',
            timeout: 0,
            color: '',
        }),
        created() {
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'snackbar/addNotification') {
                    this.text = state.snackbar.text;
                    this.color = state.snackbar.color;
                    this.timeout = state.snackbar.timeout;
                    this.isShow = true;
                }
            })
        },
    }
</script>