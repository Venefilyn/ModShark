<script>
    import {mapState} from "vuex";
    import * as snoowrap from "snoowrap";
    
    export default {
        name: "ms-content-list",
        data() {
            return {
                /** @member {Array<snoowrap.objects.ReplyableContent>} */
                listing: [],
                error: ""
            }
        },
        async mounted() {
            try {
                await this.setItems();
            } catch (e) {
                this.error = "Could not get items" + e.message
            }
        },
        computed: {
            ...mapState(['subreddit'])
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