<template>
    <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
    >
        <router-link :to="{ name: 'ModerationTestShowPage', params: { test_id: test.id }}">
            <v-img
                :src="resizedImageUrl"
                width="430px"
                height="242px"
            ></v-img>
        </router-link>
    </v-col>
</template>

<script>
    import Resizer from '@/utils/resizer';

    export default {
        name: 'AccountTestListItem',
        props: [
            'test',
        ],
        computed: {
            resizedImageUrl () {
                return Resizer.getResizedImageUrl(this.test.image_url, {
                    'WIDTH': 430,
                    'HEIGHT': 242,
                });
            },
        },
    }
</script>
