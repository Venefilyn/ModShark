<script>
import {mapState} from 'vuex';
import * as snoowrap from 'snoowrap';
    
export default {
  name: 'MsContentList',
  data() {
    return {
      /** @member {Array<snoowrap.objects.ReplyableContent>} */
      listing: [],
      error: ''
    }
  },
  computed: {
    ...mapState(['subreddit'])
  },
  watch: {
    subreddit(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateItems();
      }
    }
  },
  async mounted() {
    this.updateItems();
  },
  methods: {
    isSubreddit(list) {
      return list instanceof snoowrap.objects.Subreddit
    },
    async updateItems() {
      try {
        await this.setItems();
      } catch (e) {
        this.error = 'Could not get items: ' + e.message
      }
    },
    async setItems() {
      throw new Error('Not Implemented');
    }
  },
  render() {
    return {}
  }
}
</script>

<style scoped>

</style>