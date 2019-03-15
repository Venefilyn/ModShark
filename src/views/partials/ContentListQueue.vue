<template>
    <v-container fluid >
        <v-layout row wrap >
            <v-flex xs12 v-for="list in listing" :key="list.id" my3>
                <v-container pa-0 pb-2 ma-0>
                    <ms-submission v-if="list.constructor._name === 'Submission'"
                                  :submission="list"></ms-submission>
                    <ms-comment v-else :comment="list"></ms-comment>
                </v-container>
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
                type: Array,
                required: true
            },
        },
    }
</script>

<style scoped>

</style>