<template>
    <v-container fluid pa0>
        <v-layout row wrap>
            <v-flex xs12 v-for="list in listing" :key="list.id">
                <ms-submission v-if="list.constructor._name === 'Submission'"
                               :submission="list"
                />
                <div v-else>comment</div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from "vuex";
    import snoowrap from "snoowrap";
    import MsSubmission from "../components/Submission";

    export default {
        name: "ms-submission-modqueue",
        components: {
            MsSubmission,
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
            async setModqueue() {
                this.listing = await this.subreddit.getModqueue();
            }
        },
    }
</script>

<style scoped>

</style>