<template>
  <div>
    <ms-content-list-queue :listing="listing" />
    {{ error }}
  </div>
</template>

<script>
import ContentList from './partials/ContentList';
import MsContentListQueue from './partials/ContentListQueue';

export default {
  name: 'MsSubmissionModqueue',
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