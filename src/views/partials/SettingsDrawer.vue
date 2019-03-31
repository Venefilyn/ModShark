<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
    :mobile-break-point="this.$vuetify.breakpoint.thresholds.lg"
    right
  >
    <v-dialog
      v-model="showLogoutConfirmation"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-text>
          Do you wish to logout?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-1"
            flat
            @click="logOut"
          >
            Yes
          </v-btn>
          <v-btn
            flat
            @click="showLogoutConfirmation = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar
      flat
      extended
    >
      <v-layout
        row
        align-center
      >
        <v-avatar tile>
          <img
            :src="require('../../assets/logo.svg')"
            alt="ModShark icon"
          >
        </v-avatar>
        <v-flex pl-2 class="subheading">
          <v-toolbar-title class="white--text">ModShark</v-toolbar-title>
        </v-flex>
      </v-layout>
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
            flat
            @click="showLogoutConfirmation = true"
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
  data() {
    return {
      showLogoutConfirmation: false
    }
  },
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
    ...mapActions(['updateSettingsDrawer']),
    logOut() {
      this.showLogoutConfirmation = false;
      this.$store.dispatch('logOut');
      this.$router.push({ name: 'home' })
    }
  },
}
</script>