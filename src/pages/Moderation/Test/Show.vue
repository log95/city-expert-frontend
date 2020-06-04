<template>
    <div>
        <div class="d-flex justify-space-between mb-6">
            <v-btn
                    @click="$router.push({name: 'ModerationTestIndexPage'})"
                    text
                    color="primary"
                    class="float-left"
            >
                <v-icon small>mdi-arrow-left</v-icon>
                <span>К списку</span>
            </v-btn>
        </div>

        <ModerationTestShow></ModerationTestShow>
    </div>
</template>

<script>
    import ModerationTestShow from '@/components/Moderation/Test/Show';

    export default {
        name: 'ModerationTestShowPage',
        components: {
            ModerationTestShow,
        }
    }
</script>