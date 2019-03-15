<template>
    <!--submission card-->
    <v-card flat>
        <v-layout>
            <v-flex xs3 sm2 lg1 v-ripple
                    style="cursor: pointer;">
                <div v-if="submission.thumbnail ==='self'"
                     class="d-flex"
                     style="height: 100%; ">
                    <v-icon x-large>chat</v-icon>
                </div>
                <v-hover v-else>
                    <v-img
                            :src="submission.thumbnail"
                            :aspect-ratio="1"
                            slot-scope="{ hover }"
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
            <v-flex xs9 sm10 lg11>
                <v-list three-line>
                    <v-list-tile>
                        <v-list-tile-content>
                            {{ submission.title }}
                            <!--Post metadata-->
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
                                        <v-icon small>more</v-icon>
                                        r/{{ submission.subreddit.display_name }}
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
        <!--Moderation buttons-->
        <!--Todo: Move to ContentModerationButtons component, show/hide actions depending on type -->
        <v-layout align-start justify-start row fill-height pa-1>
            <v-btn outline color="success"
                   @click="submissionAction(() => submission.approve(), 'Post has been approved!', 'There was an error approving the post.')">
                <v-icon left>check</v-icon>
                <div>Approve</div>
            </v-btn>
            <v-btn outline color="error">
                <v-icon left>remove</v-icon>
                <div>Remove</div>
            </v-btn>
            <v-btn outline color="pink" 
                   @click="submissionAction(() => submission.remove({spam: true}), 'Post marked as spam!', 'There was an error removing the post.')">
                <v-icon left>delete_sweep</v-icon>
                <div>Spam</div>
            </v-btn>
            <v-btn outline color="warning" @click="showReports = true">
                <v-icon left>warning</v-icon>
                <div>Reports</div>
            </v-btn>
            <v-btn outline color="info"
                   @click="submissionAction(() => submission.lock(), 'Post has been locked!', 'There was an error locking the post.')">
                <v-icon left>lock</v-icon>
                <div>Lock</div>
            </v-btn>
            <v-btn outline>
                <v-icon left>more_vert</v-icon>
                <div>More</div>
            </v-btn>
        </v-layout>
    </v-card>
</template>

<script>
    import * as snoowrap from "snoowrap";
    import MsNotification from "../models/Notification";

    export default {
        name: "ms-submission",
        props: {
            submission: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value instanceof snoowrap.objects.Submission;
                }
            }
        },
        data() {
            return {
                // TODO: change this to mixin popup
                showReports: false
            }
        },
        methods: {
            /**
             * TODO: Move to mixin as it's dupe in comment and submission
             * @param {function} closure
             * @param {string} successMessage
             * @param {string} errorMessage
             */
            async submissionAction(closure, successMessage, errorMessage) {
                /** @member {MsNotification} */
                let notification;
                try {
                    await closure();
                    notification = new MsNotification(successMessage);
                } catch (e) {
                    notification = new MsNotification(errorMessage, "warning");
                }
                // send notification 
                this.$store.dispatch('addNotification', notification);
            }
        },
    }
</script>

<style scoped>

</style>
