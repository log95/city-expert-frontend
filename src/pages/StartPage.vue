<template>
    <div>
        <v-card
                color="blue"
                dark
                class="mx-auto"
                max-width="800"
        >
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                    <v-card-title
                            class="headline"
                    >{{ $t('START_PAGE.CARD_REGISTER.TITLE') }}</v-card-title>

                    <v-card-subtitle>{{ $t('START_PAGE.CARD_REGISTER.SUBTITLE') }}</v-card-subtitle>

                    <v-card-actions>
                        <v-btn
                                @click="$router.push({name: 'LoginRegister'})"
                                class="ml-2 mt-5"
                                outlined
                                rounded
                                small
                        >
                            {{ $t('START_PAGE.CARD_REGISTER.REGISTER_ACTION') }}
                        </v-btn>
                    </v-card-actions>
                </div>

                <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                >
                    <v-img src="/images/thought.png"></v-img>
                </v-avatar>
            </div>
        </v-card>
        <br>

        <v-card
                color="blue"
                dark
                class="mx-auto"
                max-width="800"
        >
            <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                    <v-card-title
                            class="headline"
                    >{{ $t('START_PAGE.CARD_ADD_OWN_TESTS.TITLE') }}</v-card-title>

                    <v-card-subtitle>{{ $t('START_PAGE.CARD_ADD_OWN_TESTS.SUBTITLE') }}</v-card-subtitle>

                </div>

                <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                >
                    <v-img src="/images/add-test.png"></v-img>
                </v-avatar>
            </div>
        </v-card>
    </div>
</template>
