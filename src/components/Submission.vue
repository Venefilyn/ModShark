<template>
    <v-flex xs12>
        <v-card>
            <v-layout class="pl-2 pr-2">
                <v-flex xs3 sm2 lg1>
                    <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                            height="125px"
                            contain
                    ></v-img>
                </v-flex>
                <v-flex>
                    <v-card-title primary-title>
                        <div>
                            <div>Submission</div>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-item-group class="pa-3">
                <v-btn flat icon small>
                    <v-icon small>thumb_up</v-icon>
                </v-btn>
                <v-btn flat icon small>
                    <v-icon small>thumb_up</v-icon>
                </v-btn>
                <v-btn flat icon small>
                    <v-icon small>thumb_up</v-icon>
                </v-btn>
            </v-item-group>
        </v-card>
    </v-flex>
</template>

<script>
    import {objects} from "snoowrap";

    export default {
        name: "ms-submission",
        props: {
            redditSubmission: {
                type: Object,
                required: true,
                validator: function (value) {
                    // The value must match one of these strings
                    return value instanceof objects.Submission; 
                } 
            }
        }
    }
</script>

<style scoped>

</style>
