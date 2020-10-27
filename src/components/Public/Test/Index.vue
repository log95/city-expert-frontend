<template>
    <div>
        <div v-if="!isAuthorized()">
            <div><a :href="$router.resolve({'name': 'LoginRegister'}).href">{{ $t('LOGIN_OR_REGISTER') }}</a> {{ $t('LOGIN_FOR_SHOW_TESTS') }}</div>
        </div>
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
    </div>
</template>

<script>
    import qs from 'qs';
    import ListItem from '@/components/Public/Test/ListItem';
    import TestStatus from "@/enum/TestStatus";

    export default {
        name: 'PublicTestIndex',
        components: {
            ListItem,
        },
        data: function () {
            return {
                isLoadingItems: true,
                tests: [],
                totalTestsCount: 0,
                page: 1,
                sortDirection: null,
                sortKeys: [
                    {text: this.$t('SORT_BY_PUBLISH_DATA'), value: 'published_at'},
                    {text: this.$t('SORT_BY_LIKES'), value: 'likes'},
                ],
                filterStatusKeys: [
                    {text: this.$t('TEST_STATUS.in_process'), value: TestStatus.IN_PROCESS},
                    {text: this.$t('TEST_STATUS.correct_answer'), value: TestStatus.CORRECT_ANSWER},
                    {text: this.$t('TEST_STATUS.show_answer'), value: TestStatus.SHOW_ANSWER},
                ],
                filterStatus: null,
                filterCityKeys: [],
                filterCity: null,
                itemsPerPage: 10,
                sortBy: null,
            }
        },
        computed: {
            numberOfPages () {
                return Math.ceil(this.totalTestsCount / this.itemsPerPage)
            },
        },
        methods: {
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
            loadTests () {
                this.isLoadingItems = true;
                this.tests = [];

                this.$api.get('tests', {
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
                })
                    .then(response => {
                        this.tests = response.data.tests;
                        this.totalTestsCount = response.data.count;
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    })
                    .finally(() => this.isLoadingItems = false)
            },
            loadCities () {
                this.$api.get('cities')
                    .then(response => {
                        let self = this;

                        response.data.map(function (city) {
                            self.filterCityKeys.push({
                                text: self.$t('CITIES.' + city['name']),
                                value: city['id'],
                            });
                        });
                    })
                    .catch(error => {
                        alert('Error');
                        console.log(error.response);
                    });
            },
        },
        watch: {
            page: function () {
                this.loadTests();
            }
        },
        created() {
            if (!this.isAuthorized()) {
                return;
            }

            this.loadTests();

            this.loadCities();
        }
    }
</script>
