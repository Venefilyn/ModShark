<template>
    <!--comment card-->
    <v-card>
        <v-layout>
            <v-flex xs12 v-ripple
                    style="cursor: pointer;">
                <v-list three-line>
                    <v-list-tile >
                        <v-list-tile-content>
                            <span v-html="comment.body_html.substring(0, 150)"></span>
                            <!--Comment metadata-->
                            <v-list-tile-sub-title>
                                <v-layout align-start justify-start row fill-height>
                                    <div>
                                        <v-icon small>arrow_upward</v-icon>
                                        {{ comment.score }}
                                    </div>
                                    <div class="mx-1"></div>
                                    <div>
                                        <v-icon small>access_time</v-icon>
                                        {{ moment.unix(comment.created_utc).fromNow() }}
                                    </div>
                                    <div class="mx-1"></div>
                                    <div>
                                        <v-icon small>more</v-icon>
                                        r/{{ comment.subreddit.display_name }}
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
        <v-layout align-start justify-start row fill-height pa-1>
            <v-btn flat @click="commentAction(() => comment.approve(), 'Comment has been approved!', 'There was an error approving the comment.')">
                <v-icon left>check</v-icon>
                <div>Approve</div>
            </v-btn>
            <v-btn flat>
                <v-icon left>remove</v-icon>
                <div>Remove</div>
            </v-btn>
            <v-btn flat @click="commentAction(() => comment.remove({spam: true}), 'Comment marked as spam!', 'There was an error removing the comment.')">
                <v-icon left>delete_sweep</v-icon>
                <div>Spam</div>
            </v-btn>
            <v-btn flat @click="showReports = true">
                <v-icon left>warning</v-icon>
                <div>Reports</div>
            </v-btn>
            <v-btn flat>
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
        name: "ms-comment",
        props: {
            comment: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value instanceof snoowrap.objects.Comment;
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
             * TODO: Move to mixin as it's dupe in comment and comment
             * @param {function} closure
             * @param {string} successMessage
             * @param {string} errorMessage
             */
            async commentAction(closure, successMessage, errorMessage) {
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