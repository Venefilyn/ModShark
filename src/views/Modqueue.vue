<template>
    <v-container fluid pa0>
        <v-layout row wrap>
            <v-flex xs12 v-for="list in listing">
                submissions and comments here
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import RedditFactory from "../models/RedditFactory";
    import {mapState} from "vuex";
    import * as snoowrap from "snoowrap";

    export default {
        name: "ms-submission-modqueue",
        data() {
            return {
                listing: []
            }
        },
        async mounted() {
        },
        computed: {
            ...mapState(['subreddit'])
        },
    }
</script>

<style scoped>

</style>