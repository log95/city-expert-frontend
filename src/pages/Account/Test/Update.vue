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

        <AccountTestUpdate></AccountTestUpdate>
    </div>
</template>

<script>
    import AccountTestUpdate from '@/components/Account/Test/Update';

    export default {
        name: 'AccountTestUpdatePage',
        components: {
            AccountTestUpdate,
        }
    }
</script>
