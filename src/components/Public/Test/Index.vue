<template>
    <div>
        <v-container fluid>
            <v-data-iterator
                    :items="this.tests"
                    :items-per-page.sync="itemsPerPage"
                    :page="page"
                    hide-default-footer
                    :loading="isLoadingItems"
                    loading-text="Loading..."
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
                                    label="Filter Status"
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
                                    label="Filter city"
                                    @change="loadTests"
                            ></v-select>
                            <v-spacer></v-spacer>
                            <v-select
                                    v-model="sortBy"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="sortKeys"
                                    label="Sort by"
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

                <template v-slot:footer>
                    <v-row align="center" justify="center">
                        <span
                                class="mr-4
                                grey--text"
                        >
                            Page {{ page }} of {{ numberOfPages }}
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

            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
    import api from '@/api';
    import ListItem from '@/components/Public/Test/ListItem';
    import TestStatus from "@/enum/TestStatus";

    export default {
        name: 'PublicTestIndex',
        components: {
            ListItem,
        },
        data: () =>({
            isLoadingItems: true,
            tests: [],
            totalTestsCount: 0,
            isLoading: false, // TODO:
            page: 1,
            sortDirection: '',
            sortKeys: [
                {text: 'Publish date', value: 'published_at'},
                {text: 'Likes', value: 'likes'},
            ],
            filterStatusKeys: [
                {text: 'In process', value: TestStatus.IN_PROCESS},
                {text: 'Correct answer', value: TestStatus.CORRECT_ANSWER},
                {text: 'Show answer', value: TestStatus.SHOW_ANSWER},
            ],
            filterStatus: '',
            filterCityKeys: [],
            filterCity: '',
            itemsPerPage: 10,
            sortBy: '',
        }),
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

                api.get('tests', {
                    params: {
                        page: this.page,
                        per_page: this.itemsPerPage,
                        sort_by: this.sortBy ? this.sortBy : '',
                        sort_direction: this.sortDirection,
                        filter_by: {
                            status: this.filterStatus ? this.filterStatus : '',
                            city_id: this.filterCity,
                        },
                    }
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
        },
        watch: {
            page: function () {
                this.loadTests();
            }
        },
        created() {
            api.get('cities')
                .then(response => {
                    let self = this;

                    response.data.map(function (city) {
                        self.filterCityKeys.push({
                            text: self.$t('CITY.' + city['name']),
                            value: city['id'],
                        });
                    });

                    this.filterCity = this.filterCityKeys[0]['value'];

                    this.loadTests();
                })
                .catch(error => {
                    alert('Error');
                    console.log(error.response);
                });
        }
    }
</script>