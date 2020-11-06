<template>
    <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
    >
        <router-link :to="{ name: 'ModerationTestShowPage', params: { test_id: test.id }}">
            <v-img
                    :aspect-ratio="16/9"
                    :src="test['image_url']"
            ></v-img>
        </router-link>
    </v-col>
</template>

<script>
    export default {
        name: 'AccountTestListItem',
        props: [
            'test',
        ],
    }
</script>
