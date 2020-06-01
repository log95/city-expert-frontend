<template>
    <div>
        <v-btn
                color="success"
                class="ma-2 white--text"
                @click="$router.push({name: 'AccountTestCreatePage'})"
        >
            <v-icon left dark>mdi-plus</v-icon>
            Добавить тест
        </v-btn>
    </div>


</template>

<script>
    export default {
        name: 'AccountTestIndex',
    }
</script>