<template>
  <div>
    <ms-content-list-queue :listing="listing" />
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
  name: 'MsSubredditUnmoderated',
  components: {
    MsContentListQueue,
  },
  mixins: [ContentList],
  methods: {
    async setItems() {
      this.listing = await this.subreddit.getUnmoderated();
    }
  },
}
</script>

<style scoped>

</style>