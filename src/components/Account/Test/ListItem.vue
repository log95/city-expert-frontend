<template>
    <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
    >
        <router-link :to="{ name: 'PublicTestShowPage', params: { test_id: test.id }}">
            <v-img
                    :aspect-ratio="16/9"
                    :src="test['image_url']"
                    class="test-image"
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

<style>
    .test-image {
        border-bottom-width: 5px;
        border-bottom-style: solid;
    }

    .test-image.correct_answer {
        border-bottom-color: lawngreen;
    }

    .test-image.show_answer {
        border-bottom-color: red;
    }

    .test-image.in_process {
        border-bottom-color: lightgrey;
    }
</style>