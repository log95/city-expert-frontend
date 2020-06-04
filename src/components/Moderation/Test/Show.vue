<template>
    <TestShow>
        <template v-slot:toolbar="{ test }">
            <Toolbar :test="test"></Toolbar>
        </template>
    </TestShow>
</template>

<script>
    import TestShow from '@/components/Publication/TestShow';
    import Toolbar from '@/components/Moderation/Test/ShowToolbar';

    export default {
        name: 'AccountTestShow',
        components: {
            TestShow,
            Toolbar,
        },
    }
</script>