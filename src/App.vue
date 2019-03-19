<template>
    <v-app dark>
        <div v-for="(notification, i) in notifications" :key="i">
            <v-snackbar
                    :value="notification"
                    top
                    @input="removeNotification(i)"
            >
                {{ notification.message }}
                <v-btn
                        color="pink"
                        flat
                        @click="removeNotification(i)"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>
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
        async mounted() {
            // If used stores locally, update access token
            if (this.storeLocally) {
                if (this.localRefreshToken.length > 0) {
                    this.$store.dispatch("updateRefreshToken", this.localRefreshToken);
                }
                else {
                    this.changeStoreLocally(false)
                }
            }
            else {
                // try authenticating from server
                try {
                    await this.$store.dispatch("authenticateFromServer");
                } catch (e) {
                    this.$store.dispatch("logOut");
                }
            }
        },
        computed: {
            ...mapState(['refreshToken', 'storeLocally', 'localRefreshToken', 'notifications']),
            isAuthenticated() {
                return this.refreshToken.length > 0;
            }
        },
        methods: {
            ...mapActions(['changeStoreLocally', 'removeNotification']),
        },
    }
</script>
