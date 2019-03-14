<template>
    <v-container fluid pa0>
        <v-layout row wrap>
            <v-flex xs12 v-for="list in listing" :key="list.id">
                <span>{{ list.constructor._name === "Comment" }}</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from "vuex";
    import snoowrap from "snoowrap";

    export default {
        name: "ms-submission-modqueue",
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