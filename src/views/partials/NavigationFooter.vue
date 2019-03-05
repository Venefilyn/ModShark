<template>
    <div>
        <v-bottom-nav
                app
                fixed
                :active.sync="bottomNav"
                :value="true"
        >
            <v-btn
                    :to="{ name: 'subreddit_modqueue', params: { subreddit: subreddit }}"
                    value="modqueue"
                    flat
            >
                <span>Modqueue</span>
                <v-icon>assignment</v-icon>
            </v-btn>
            <v-btn
                    :to="{ name: 'subreddit_unmoderated', params: { subreddit: subreddit }}"
                    value="unmoderated"
                    flat
            >
                <span>Unmoderated</span>
                <v-icon>list</v-icon>
            </v-btn>
            <v-btn
                    :to="{ name: 'modmail', params: { subreddits: subreddit }}"
                    value="modmail"
                    flat
            >
                <span>Modmail</span>
                <v-icon>mail</v-icon>
            </v-btn>
            <v-btn
                    flat
                    value="more"
                    active-class=""
                    @click="sheet = true"
            >
                <span>More</span>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-bottom-nav>
        <v-bottom-sheet v-model="sheet" inset>
            <v-list>
                <v-subheader>Open in</v-subheader>
                <v-list-tile inactive @click="sheet = false" >
                    <v-list-tile-avatar>
                        <v-icon>find_in_page</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        Moderation log
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-chip disabled>Coming soon!</v-chip>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile inactive @click="sheet = false" >
                    <v-list-tile-avatar>
                        <v-icon>offline_bolt</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        AutoModerator config
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-chip disabled>Coming soon!</v-chip>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile inactive @click="sheet = false" >
                    <v-list-tile-avatar>
                        <v-icon>shield</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        Moderators
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-chip disabled>Coming soon!</v-chip>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'ms-navigation-footer',
        data() {
            return {
                sheet: false,
                bottomNavData: "modqueue",
                tiles: ['test', 'test2']
            }
        },
        computed: {
            ...mapState(['subreddit']),
            bottomNav: {
                get() {
                    return this.bottomNavData;
                },
                set(value) {
                    if (value !== "more") {
                        this.bottomNavData = value;
                    }
                }
            }
        },
    }
</script>