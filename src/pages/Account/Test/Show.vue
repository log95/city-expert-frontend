<template>
    <div>
        <div class="d-flex justify-space-between mb-6">
            <v-btn
                    @click="$router.push({name: 'AccountTestIndexPage'})"
                    text
                    color="primary"
                    class="float-left"
            >
                <v-icon small>mdi-arrow-left</v-icon>
                <span>{{ $t('TO_TEST_LIST') }}</span>
            </v-btn>
        </div>

        <AccountTestShow></AccountTestShow>
    </div>
</template>

<script>
    import AccountTestShow from '@/components/Account/Test/Show';

    export default {
        name: 'AccountTestShowPage',
        components: {
            AccountTestShow,
        }
    }
</script>
