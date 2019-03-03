<template>
    <v-navigation-drawer
            v-model="drawer"
            fixed
            app>
        <v-toolbar flat>
            Subreddits
        </v-toolbar>

        <v-divider></v-divider>

        <v-list>
            <v-list-tile
                    @click=""
            >
                <v-list-tile-content>
                    <v-list-tile-title>r/all</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
                    @click=""
            >
                <v-list-tile-content>
                    <v-list-tile-title>r/ExampleSubreddit</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'ms-subreddits-drawer',
        props: {
            visible: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            ...mapState(["drawerSubreddits"]),
            drawer: {
                get() {
                    return this.drawerSubreddits;
                },
                set(value) {
                    this.updateSubredditsDrawer(value)
                }
            }
        },
        methods: {
            ...mapActions(["updateSubredditsDrawer"])
        },
    }
</script>