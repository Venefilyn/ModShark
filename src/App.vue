<template>
    <v-app dark>
        <v-expand-transition>
            <ms-main-toolbar v-if="isAuthenticated"/>
        </v-expand-transition>
        <v-expand-x-transition>
            <ms-subreddits-drawer v-if="isAuthenticated"/>
        </v-expand-x-transition>
        <v-expand-x-transition>
            <ms-settings-drawer v-if="isAuthenticated"/>
        </v-expand-x-transition>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-expand-transition>
            <ms-navigation-footer v-if="isAuthenticated"/>
        </v-expand-transition>
    </v-app>
</template>

<script>
    import MsSubredditsDrawer from "./views/partials/SubredditsDrawer";
    import MsSettingsDrawer from "./views/partials/SettingsDrawer";
    import MsNavigationFooter from "./views/partials/NavigationFooter";
    import MsMainToolbar from "./views/partials/MainToolbar";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'App',
        components: {
            MsMainToolbar,
            MsNavigationFooter,
            MsSubredditsDrawer,
            MsSettingsDrawer,
        },
        mounted() {
            // If used stores locally, update access token
            if (this.storeLocally) {
                if (this.localAccessToken.length > 0) {
                    this.$store.dispatch("updateAccessToken", this.localAccessToken);
                }
                else {
                    this.changeStoreLocally(false)
                }
            }
            else {
                // try authenticating from server
                try {
                    this.$store.dispatch("authenticateFromServer");
                } catch (e) {
                    this.$store.dispatch("logOut");
                }
            }
        },
        computed: {
            ...mapState(['accessToken', 'storeLocally', 'localAccessToken']),
            isAuthenticated() {
                return this.accessToken.length > 0;
            }
        },
        methods: {
            ...mapActions(['changeStoreLocally'])
        },
    }
</script>
