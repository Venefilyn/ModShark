<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <v-toolbar flat>
      Subreddits
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
        @click="changeSubreddit(subreddit)"
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
    ...mapState(['drawerSubreddits', 'authenticated']),
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
      this.$router.push({ name: 'subreddit_modqueue', params: {subreddit: subreddit}})
    },
  },
}
</script>
