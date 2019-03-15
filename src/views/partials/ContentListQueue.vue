<template>
    <v-container fluid pa0>
        <v-layout row wrap>
            <v-flex xs12 v-for="list in listing" :key="list.id">
                <ms-submission v-if="list.constructor._name === 'Submission'"
                              :submission="list"></ms-submission>
                <ms-comment v-else :comment="list"></ms-comment>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import MsSubmission from "../../components/Submission";
    import MsComment from "../../components/Comment";
    
    export default {
        name: "ms-content-list-queue",
        components: {
            MsSubmission,
            MsComment,
        },
        props: {
            listing: {
                type: Object,
                required: true
            },
        },
    }
</script>

<style scoped>

</style>