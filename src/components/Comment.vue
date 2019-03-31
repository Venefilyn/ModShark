<template>
  <!--comment card-->
  <v-card>
    <v-layout>
      <v-flex
        v-ripple
        xs12
        style="cursor: pointer;"
      >
        <v-card flat>
          <v-card-title primary-title>
            <div>
              <v-layout
                align-start
                justify-start
                row
                wrap
                fill-height
                class="grey--text"
              >
                <div>
                  <v-icon small>
                    arrow_upward
                  </v-icon>
                  {{ comment.score }}
                </div>
                <div class="mx-1"></div>
                <div>
                  <v-icon small>
                    person
                  </v-icon>
                  u/{{ comment.author.name }}
                </div>
                <div class="mx-1" />
                <div>
                  <v-icon small>
                    access_time
                  </v-icon>
                  {{ moment.unix(comment.created_utc).fromNow() }}
                </div>
                <div class="mx-1" />
                <div>
                  <v-icon small>
                    more
                  </v-icon>
                  r/{{ comment.subreddit.display_name }}
                </div>
              </v-layout>
            </div>
            <v-flex xs12>
              <div v-html="$sanitize(comment.body_html)"></div>
            </v-flex>
          </v-card-title>
          <v-divider light></v-divider>
          <!--Moderation buttons-->
          <!--Todo: Should we move to ContentModerationButtons component which shows/hides actions depending on type? -->
          <!--Todo: Change to v-for, allows to show which action has been taken more easily and change depending on window size-->
          <v-card-actions pa-1>
            <v-btn
              outline
              color="success"
              @click="commentAction(() => comment.approve(), 'Comment has been approved!', 'There was an error approving the comment.')"
            >
              <v-icon left>
                check
              </v-icon>
              <div>Approve</div>
            </v-btn>
            <v-btn
              outline
              color="error"
            >
              <v-icon left>
                remove
              </v-icon>
              <div>Remove</div>
            </v-btn>
            <v-btn
              outline
              color="pink"
              @click="commentAction(() => comment.remove({spam: true}), 'Comment marked as spam!', 'There was an error removing the comment.')"
            >
              <v-icon left>
                delete_sweep
              </v-icon>
              <div>Spam</div>
            </v-btn>
            <v-btn
              outline
            >
              <v-icon left>
                more_vert
              </v-icon>
              <div>More</div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-sheet
        v-if="comment.num_reports"
        color="yellow accent-4 black--text"
        tile
    >
      <v-layout
          align-start
          column
          justify-start
          pa-1
      >
        <v-flex xs12>
          <div class="subheading">
            Reports
          </div>
        </v-flex>
        <v-flex
            v-for="(report, i) in comment.mod_reports"
            :key="i"
            xs12
        >
          {{ report[1] + " - " + report[0] }}
        </v-flex>
        <v-flex
            v-for="(report, i) in comment.user_reports"
            :key="i"
            xs12
        >
          {{ report[1] + " - " + report[0] }}
        </v-flex>
      </v-layout>
    </v-sheet>
  </v-card>
</template>

<script>
import * as snoowrap from 'snoowrap';
import MsNotification from '../models/Notification';

export default {
  name: 'MsComment',
  props: {
    comment: {
      type: Object,
      required: true,
      validator: function (value) {
        return value instanceof snoowrap.objects.Comment;
      }
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
        notification = new MsNotification(errorMessage, 'warning');
      }
      // send notification 
      this.$store.dispatch('addNotification', notification);
    }
  },
}
</script>

<style scoped>

</style>