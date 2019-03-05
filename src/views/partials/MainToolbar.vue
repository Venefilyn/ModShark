<template>
    <v-toolbar app>
        <v-toolbar-side-icon
                @click.stop="drawerSubs = !drawerSubs"
                v-show="$vuetify.breakpoint.mdAndDown && isAuthenticated"
        ></v-toolbar-side-icon>
        <v-toolbar-title>
            r/{{ subreddit }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
                @click.stop="drawerSett = !drawerSett"
                flat
                icon
                v-show="$vuetify.breakpoint.lgAndDown && isAuthenticated"
        >
            <v-icon>settings</v-icon>
        </v-btn>
    </v-toolbar>
</template>
<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'ms-main-toolbar',
        props: {
            isAuthenticated: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            ...mapState([
                "drawerSubreddits",
                "drawerSettings",
                "subreddit",
            ]),
            drawerSubs: {
                get() {
                    return this.drawerSubreddits;
                },
                set(value) {
                    this.updateSubredditsDrawer(value)
                }
            },
            drawerSett: {
                get() {
                    return this.drawerSettings;
                },
                set(value) {
                    this.updateSettingsDrawer(value)
                }
            },
        },
        methods: {
            ...mapActions(["updateSubredditsDrawer", "updateSettingsDrawer"])
        },
    }
</script>