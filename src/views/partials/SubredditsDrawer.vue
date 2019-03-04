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
                    v-for="subreddit in subredditList"
                    :key="subreddit"
                    @click=""
            >
                <v-list-tile-content>
                    <v-list-tile-title>r/{{ subreddit }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import RedditFactory from "../../models/RedditFactory";

    export default {
        name: 'ms-subreddits-drawer',
        data() {
            return {
                /** @member {Array<snoowrap.objects.Subreddit>} subredditList */
                subredditList: []
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            ...mapState(["drawerSubreddits", "authenticated"]),
            drawer: {
                get() {
                    return this.drawerSubreddits;
                },
                set(value) {
                    this.updateSubredditsDrawer(value)
                }
            },
            reddit() {
                return RedditFactory.instance()
            }
        },
        mounted() {
            this.updateModeratedList();
        },
        methods: {
            ...mapActions(["updateSubredditsDrawer"]),
            async updateModeratedList() {
                if (!this.reddit) {
                    console.error("Reddit instance is null");
                    return;
                }
                this.subredditList = await this.reddit.getModeratedSubreddits().map(s => s['display_name']);
            }
        },
    }
</script>