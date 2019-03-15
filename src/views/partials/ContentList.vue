<script>
    import {mapState} from "vuex";
    import * as snoowrap from "snoowrap";
    
    export default {
        name: "ms-content-list",
        data() {
            return {
                /** @member {Array<snoowrap.objects.ReplyableContent>} */
                listing: []
            }
        },
        async mounted() {
            this.setModqueue();
        },
        computed: {
            ...mapState(['subreddit'])
        },
        methods: {
            isSubreddit(list) {
                return list instanceof snoowrap.objects.Subreddit
            },
        },
    }
</script>

<style scoped>

</style>