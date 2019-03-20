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
    async subreddit(newValue, oldValue) {
      if (newValue !== oldValue) {
        try {
          await this.setItems();
        } catch (e) {
          this.error = 'Could not get items ' + e.message
        }
      }
    }
  },
  async mounted() {
    try {
      await this.setItems();
    } catch (e) {
      this.error = 'Could not get items ' + e.message
    }
  },
  methods: {
    isSubreddit(list) {
      return list instanceof snoowrap.objects.Subreddit
    },
    async setItems() {}
  },
  render() {
    return {}
  }
}
</script>

<style scoped>

</style>