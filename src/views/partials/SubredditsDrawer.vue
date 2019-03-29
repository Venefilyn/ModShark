<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <v-toolbar 
      flat
      extended
    >
      <v-layout
        row
        align-center
      >
        <v-avatar>
          <img
            :src="me.icon_img"
            alt="avatar"
          >
        </v-avatar>
        <v-flex px-2>
          {{ me.name }}
        </v-flex>
      </v-layout>
      <template v-slot:extension>
        <v-toolbar-title class="white--text">Subreddits</v-toolbar-title>
      </template>
    </v-toolbar>

    <v-divider />

    <v-list>
      <v-list-tile
        @click="changeSubreddit('mod')"
      >
        <v-list-tile-content>
          <v-list-tile-title>r/mod</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile
        v-for="subreddit in subredditList"
        :key="subreddit.name"
        @click="changeSubreddit(subreddit.display_name)"
      >
        <v-list-tile-content>
          <v-list-tile-title>r/{{ subreddit.display_name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import RedditFactory from '../../models/RedditFactory';

export default {
  name: 'MsSubredditsDrawer',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      /** @member {Array<snoowrap.objects.Subreddit>} subredditList */
      subredditList: []
    }
  },
  computed: {
    ...mapState(['drawerSubreddits', 'authenticated', 'me']),
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
    ...mapActions(['updateSubredditsDrawer', 'updateSelectedSubreddit']),
    async updateModeratedList() {
      if (!this.reddit) {
        return;
      }
      this.subredditList = await this.reddit.getModeratedSubreddits();
    },
    changeSubreddit(subreddit) {
      this.updateSelectedSubreddit(subreddit);
      this.$router.push({params: {subreddit: subreddit}})
    },
  },
}
</script>
