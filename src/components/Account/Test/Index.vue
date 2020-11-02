<template>
    <div class="a">
        <ListItem
                v-for="test in tests"
                :key="test.id"
                :test="test"
        >
        </ListItem>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import ListItem from '@/components/Account/Test/ListItem';

    export default {
        name: 'AccountTestIndex',
        components: {
            ListItem,
        },
        data() {
            return {
                tests: [],
                totalTestsCount: 0,
            }
        },
        methods: {
            ...mapActions({
                loadAccountTests: 'accountTests/load',
            }),
            async loadTests() {
                await this.loadAccountTests();

                this.tests = this.$store.state.accountTests.tests;
            }
        },
        created() {
            this.loadTests();
        },
    }
</script>

<style>
    .a {
        display: flex;
    }
</style>
