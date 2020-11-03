<template>
    <v-container v-else fluid>
        <v-data-iterator
                :items="this.tests"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                hide-default-footer
                :loading="isLoadingItems"
                :loading-text="$t('LOADING')"
                :no-data-text="$t('NO_TESTS_FOUND_BY_QUERY')"
        >
            <template v-slot:header>
                <v-toolbar
                        dark
                        color="blue darken-3"
                        class="mb-1"
                >
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                        <v-select
                                v-model="filterStatus"
                                flat
                                solo-inverted
                                hide-details
                                :items="filterStatusKeys"
                                :label="$t('STATUS')"
                                @change="loadTests"
                                clearable
                        ></v-select>
                        <v-spacer></v-spacer>
                        <v-select
                                v-model="filterCity"
                                flat
                                solo-inverted
                                hide-details
                                :items="filterCityKeys"
                                :label="$t('CITY')"
                                @change="loadTests"
                                clearable
                        ></v-select>
                        <v-spacer></v-spacer>
                        <v-select
                                v-model="sortBy"
                                flat
                                solo-inverted
                                hide-details
                                :items="sortKeys"
                                :label="$t('SORT')"
                                @change="loadTests"
                                clearable
                        ></v-select>
                        <v-spacer></v-spacer>
                        <v-btn-toggle
                                v-model="sortDirection"
                                @change="loadTests"
                        >
                            <v-btn
                                    large
                                    depressed
                                    color="blue"
                                    value="ASC"
                            >
                                <v-icon>mdi-arrow-up</v-icon>
                            </v-btn>
                            <v-btn
                                    large
                                    depressed
                                    color="blue"
                                    value="DESC"
                            >
                                <v-icon>mdi-arrow-down</v-icon>
                            </v-btn>
                        </v-btn-toggle>
                    </template>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                <v-row>
                    <ListItem
                            v-for="test in props.items"
                            :key="test.id"
                            :test="test"
                    >
                    </ListItem>
                </v-row>
            </template>

            <template v-slot:footer="props">
                <template v-if="props.items.length">
                    <v-row align="center" justify="center">
                            <span
                                    class="mr-4
                                    grey--text"
                            >
                                {{ $t('PAGE_NUMBER_FROM_PAGES_NUMBER', {'current_num': page, 'total_num': numberOfPages}) }}
                            </span>
                        <v-btn
                                fab
                                dark
                                color="blue darken-3"
                                class="mr-1"
                                @click="formerPage"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                                fab
                                dark
                                color="blue darken-3"
                                class="ml-1"
                                @click="nextPage"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </template>

        </v-data-iterator>
    </v-container>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import qs from 'qs';
    import ListItem from '@/components/Account/Test/ListItem';
    import TestPublishStatus from "../../../enum/TestPublishStatus";

    export default {
        name: 'AccountTestIndex',
        components: {
            ListItem,
        },
        data: function () {
            return {
                page: 1,
                itemsPerPage: 10,
                isLoadingItems: true,
                filterStatus: null,
                filterStatusKeys: [
                    {text: this.$t('TEST_PUBLISH_STATUS.on_correction'), value: TestPublishStatus.ON_CORRECTION},
                    {text: this.$t('TEST_PUBLISH_STATUS.reviewed'), value: TestPublishStatus.REVIEWED},
                    {text: this.$t('TEST_PUBLISH_STATUS.published'), value: TestPublishStatus.PUBLISHED},
                ],
                filterCity: null,
                filterCityKeys: [],
                sortBy: null,
                sortDirection: null,
                sortKeys: [
                    {text: this.$t('SORT_BY_CREATED_AT'), value: 'created_at'},
                    {text: this.$t('SORT_BY_UPDATED_AT'), value: 'updated_at'},
                ],
            }
        },
        computed: {
            ...mapState('accountTests', {
                tests: 'tests',
                totalTestsCount: 'count',
            }),
            ...mapState('cities', {
                cities: 'cities',
            }),
            numberOfPages () {
                return Math.ceil(this.totalTestsCount / this.itemsPerPage)
            },
        },

        methods: {
            ...mapActions({
                loadAccountTests: 'accountTests/loadList',
                loadCities: 'cities/loadList',
            }),
            async loadTests() {
                this.isLoadingItems = true;

                await this.loadAccountTests({
                    params: {
                        page: this.page,
                        per_page: this.itemsPerPage,
                        sort_by: this.sortBy,
                        sort_direction: this.sortDirection,
                        filter_by: {
                            status: this.filterStatus,
                            city_id: this.filterCity,
                        },
                    },
                    paramsSerializer: paramsInput => qs.stringify(paramsInput, { arrayFormat: 'brackets' }),
                });

                this.isLoadingItems = false;
            },
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) {
                    this.page += 1;
                }
            },
            formerPage () {
                if (this.page - 1 >= 1) {
                    this.page -= 1;
                }
            },
        },
        watch: {
            page: function () {
                this.loadTests();
            },
            cities: function () {
                let self = this;

                this.cities.map(function (city) {
                    self.filterCityKeys.push({
                        text: self.$t('CITIES.' + city['name']),
                        value: city['id'],
                    });
                });
            },
        },
        created() {
            this.loadTests();

            this.loadCities();
        },
    }
</script>
