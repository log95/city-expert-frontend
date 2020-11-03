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

        <AccountTestCreate></AccountTestCreate>
    </div>
</template>

<script>
    import AccountTestCreate from '@/components/Account/Test/Create';

    export default {
        name: 'AccountTestCreatePage',
        components: {
            AccountTestCreate,
        }
    }
</script>
