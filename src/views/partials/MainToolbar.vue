<template>
  <v-toolbar app>
    <v-toolbar-side-icon
      v-show="$vuetify.breakpoint.mdAndDown"
      @click.stop="drawerSubs = !drawerSubs"
    />
    <v-toolbar-title>
      r/{{ getSubredditName() }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-show="$vuetify.breakpoint.lgAndDown"
      flat
      icon
      @click.stop="drawerSett = !drawerSett"
    >
      <v-icon>settings</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
import {mapActions, mapState, mapGetters} from 'vuex';

export default {
  name: 'MsMainToolbar',
  computed: {
    ...mapState([
      'drawerSubreddits',
      'drawerSettings',
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
    ...mapActions(['updateSubredditsDrawer', 'updateSettingsDrawer']),
    ...mapGetters(['getSubredditName']),
  },
}
</script>