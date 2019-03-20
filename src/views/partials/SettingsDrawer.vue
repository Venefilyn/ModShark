<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
    :mobile-break-point="this.$vuetify.breakpoint.thresholds.lg"
    right
  >
    <v-toolbar
      flat
      extended
    >
      ModShark icon, username, logout icon button
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-list-tile
        @click=""
      >
        <v-list-tile-avatar>
          <v-icon>settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click=""
      >
        <v-list-tile-avatar>
          <v-icon>info</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>About</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'MsSettingsDrawer',
  computed: {
    ...mapState(['drawerSettings']),
    drawer: {
      get() {
        return this.drawerSettings;
      },
      set(value) {
        this.updateSettingsDrawer(value)
      }
    }
  },
  methods: {
    ...mapActions(['updateSettingsDrawer'])
  },
}
</script>