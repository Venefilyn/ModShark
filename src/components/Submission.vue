<template>
    <v-flex xs12>
        <v-card>
            <v-layout>
                <v-flex xs3 sm2 lg1 v-ripple>
                    <v-hover>
                        <v-img
                                :src="submission.thumbnail"
                                max-width="125px"
                                :aspect-ratio="1"
                                slot-scope="{ hover }"
                                style="cursor: pointer;"
                                @click=""
                        >
                            <v-scale-transition>
                                <div
                                    v-if="hover"
                                    class="d-flex"
                                    style="height: 100%; "
                                >
                                    <v-icon x-large>photo_size_select_large</v-icon>
                                </div>
                            </v-scale-transition>
                        </v-img>
                    </v-hover>
                </v-flex>
                <v-flex xs9 sm10 lg11 v-ripple
                        style="cursor: pointer;">
                    <v-list three-line>
                        <v-list-tile >
                            <v-list-tile-content>
                                {{ submission.title }}
                                <v-list-tile-sub-title>
                                    <v-layout align-start justify-start row fill-height>
                                        <div>
                                            <v-icon small>arrow_upward</v-icon>
                                            {{ submission.score }}
                                        </div>
                                        <div class="mx-1"></div>
                                        <div>
                                            <v-icon small>forum</v-icon>
                                            {{ submission.num_comments }}
                                        </div>
                                        <div class="mx-1"></div>
                                        <div>
                                            <v-icon small>access_time</v-icon>
                                            5h<!--TODO make 5h thing work, maybe momentjs? -->
                                        </div>
                                        <div class="mx-1"></div>
                                        <div>
                                            ({{ submission.domain }})
                                        </div>
                                    </v-layout>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-layout align-start justify-start row fill-height pa-1>
                <v-btn flat @click="submission.approve()">
                    <v-icon left>check</v-icon>
                    <div>Approve</div>
                </v-btn>
                <v-btn flat>
                    <v-icon left>remove</v-icon>
                    <div>Remove</div>
                </v-btn>
                <v-btn flat>
                    <v-icon left>delete_sweep</v-icon>
                    <div>Spam</div>
                </v-btn>
                <v-btn flat>
                    <v-icon left>warning</v-icon>
                    <div>Reports</div>
                </v-btn>
                <v-btn flat>
                    <v-icon left>lock</v-icon>
                    <div>Lock</div>
                </v-btn>
            </v-layout>
        </v-card>
    </v-flex>
</template>

<script>
    import * as snoowrap from "snoowrap";

    export default {
        name: "ms-submission",
        props: {
            submission: {
                type: Object,
                required: true,
                validator: function (value) {
                    // The value must match one of these strings
                    return value instanceof snoowrap.objects.Submission; 
                } 
            }
        }
    }
</script>

<style scoped>

</style>
