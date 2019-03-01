<template>
  <v-app dark>
    <ms-main-toolbar v-if="isAuthenticated"/>
    <ms-subreddits-drawer v-if="isAuthenticated" />
    <ms-settings-drawer v-if="isAuthenticated" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <ms-navigation-footer v-if="isAuthenticated"/>
  </v-app>
</template>

<script>
  import MsSubredditsDrawer from "./views/partials/SubredditsDrawer";
  import MsSettingsDrawer from "./views/partials/SettingsDrawer";
  import MsNavigationFooter from "./views/partials/NavigationFooter";
  import MsMainToolbar from "./views/partials/MainToolbar";

  export default {
  name: 'App',
  components: {
    MsMainToolbar,
    MsNavigationFooter,
    MsSubredditsDrawer,
    MsSettingsDrawer,
  },
  computed: {
    isAuthenticated () {
      return !!this.$store.state.authenticated;
    }
  }
}
</script>
