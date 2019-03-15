<script>
    import MsSubmission from "../components/Submission";
    import MsComment from "../components/Comment";
    import {mapState} from "vuex";
    import * as snoowrap from "snoowrap";
    
    export default {
        name: "ms-content-list",
        components: {
            MsSubmission,
            MsComment,
        },
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