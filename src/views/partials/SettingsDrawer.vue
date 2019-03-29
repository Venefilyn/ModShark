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
      ModShark icon and name here
      <template v-slot:extension>
        <v-layout
          row
          align-center
        >
          <v-avatar>
            <img
              :src="me.icon_img"
              :alt="me.name + '\'s avatar'"
            >
          </v-avatar>
          <v-flex pl-2>
            {{ me.name }}
          </v-flex>
          <v-spacer />
          <v-btn
            color="error"
            outline
          >
            Logout
          </v-btn>
        </v-layout>
      </template>
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-list-tile to="/settings">
        <v-list-tile-avatar>
          <v-icon>settings</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/about">
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
    ...mapState(['drawerSettings', 'me']),
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