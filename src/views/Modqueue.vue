<template>
  <div>
    <ms-content-list-queue v-if="hasFetched" :listing="listing" />
    {{ error }}
    <div v-if="hasFetched && !listing.length">
      No items found!
    </div>
  </div>
</template>

<script>
import ContentList from './partials/ContentList';
import MsContentListQueue from './partials/ContentListQueue';

export default {
  name: 'MsSubredditModqueue',
  components: {
    MsContentListQueue,
  },
  mixins: [ContentList],
  methods: {
    async setItems() {
      this.listing = await this.subreddit.getModqueue();
    }
  },
}
</script>

<style scoped>

</style>