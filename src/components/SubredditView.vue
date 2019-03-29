<template>
  <router-view />
</template>

<script>
export default {
  name: 'MsSubredditView',
  mounted() {
    this.$store.dispatch('updateSelectedSubreddit', this.$route.params.subreddit);
  }
}
</script>

<style scoped>

</style>