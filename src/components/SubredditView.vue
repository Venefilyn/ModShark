<template>
  <router-view />
</template>

<script>
import RedditFactory from '../models/RedditFactory';

export default {
  name: 'MsSubredditView',
  mounted() {
    let r = RedditFactory.instance();
    if (r) {
      this.$store.dispatch('updateSelectedSubreddit', r.getSubreddit(this.$route.params.subreddit));
    }
    else {
      this.$store.dispatch('updateSelectedSubreddit', this.$route.params.subreddit);
    }
  }
}
</script>

<style scoped>

</style>