<template>
    <v-app-bar
            app
            color="primary"
            dark
            absolute
    >
        <v-toolbar-title>{{ $t('APP_NAME') }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn
                @click="$router.push({name: 'PublicTestIndexPage'})"
                text
            >
                {{ $t('MAIN_TOOLBAR_ITEMS.TESTS') }}
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <span
            v-if="isAuthorized() && points !== null"
            class="user-points"
        >
            {{ $t('HEADER_TOOLBAR.POINTS', {'points': points}) }}
        </span>

        <v-menu bottom offset-y>
            <template v-slot:activator="{ on }">
                <v-btn
                        dark
                        icon
                        v-on="on"
                >
                    <v-icon large>mdi-account-circle</v-icon>
                </v-btn>
            </template>

            <v-list>

                <v-list-item
                        v-if="!isAuthorized()"
                        @click="$router.push({name: 'LoginRegister'})"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('HEADER_TOOLBAR.ENTER') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-if="isModerator()"
                        @click="$router.push({name: 'ModerationTestIndexPage'})"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('HEADER_TOOLBAR.MODERATION') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-if="isAuthorized()"
                        @click="$router.push({name: 'AccountTestIndexPage'})"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-format-list-bulleted-square</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('HEADER_TOOLBAR.MY_TESTS') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item
                        v-if="isAuthorized()"
                        @click="logout"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ $t('HEADER_TOOLBAR.LOGOUT') }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-menu>

    </v-app-bar>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'LayoutHeader',
        methods: {
            logout: function () {
                window.localStorage.removeItem('JWT_TOKEN');

                // header не перерисовывается без reload, а пункты меню другие.
                let startPage = this.$router.resolve({'name': 'StartPage'});
                window.location.href = startPage.href;
            },
        },
        computed: {
            ...mapState('userPoints', {
                points: 'points',
            }),
        },
    }
</script>

<style>
    .user-points {
        margin-right: 10px;
        margin-left: 10px;
    }
</style>
