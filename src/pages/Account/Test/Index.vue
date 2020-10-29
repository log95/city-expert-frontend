<template>
    <div>
        <div>
            <v-btn
                    color="success"
                    class="ma-2 white--text"
                    @click="$router.push({name: 'AccountTestCreatePage'})"
            >
                <v-icon left dark>mdi-plus</v-icon>
                {{ $t('ADD_TEST') }}
            </v-btn>
        </div>

        <AccountTestIndex></AccountTestIndex>
    </div>
</template>

<script>
    import AccountTestIndex from '@/components/Account/Test/Index';

    export default {
        name: 'AccountTestIndexPage',
        components: {
            AccountTestIndex,
        }
    }
</script>
