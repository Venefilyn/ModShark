<template>
  <!--submission card-->
  <v-card flat>
    <v-layout>
      <v-flex
        v-ripple
        xs3
        sm2
        lg1
        style="cursor: pointer;"
        @click="viewPost"
      >
        <div
          v-if="submission.thumbnail ==='self'"
          class="d-flex"
          style="height: 100%; "
        >
          <v-icon x-large>
            chat
          </v-icon>
        </div>
        <v-hover v-else>
          <v-img
            slot-scope="{ hover }"
            :src="submission.thumbnail"
            :aspect-ratio="1"
            contain
          >
            <v-scale-transition>
              <div
                v-if="hover"
                class="d-flex"
                style="height: 100%;"
              >
                <v-icon x-large>
                  photo_size_select_large
                </v-icon>
              </div>
            </v-scale-transition>
          </v-img>
        </v-hover>
      </v-flex>
      <v-divider
        light
        vertical
      />
      <v-flex
        xs9
        sm10
        lg11
      >
        <v-list three-line>
          <v-list-tile>
            <v-list-tile-content>
              {{ submission.title }}
              <!--Post metadata-->
              <v-list-tile-sub-title>
                <v-layout
                  align-start
                  justify-start
                  row
                  wrap
                  fill-height
                >
                  <div>
                    <v-icon small>
                      arrow_upward
                    </v-icon>
                    {{ submission.score }}
                  </div>
                  <div class="mx-1" />
                  <router-link :to="{name: 'user', params: {username: submission.author.name}}">
                    <v-icon small>
                      person
                    </v-icon>
                    u/{{ submission.author.name }}
                  </router-link>
                  <div class="mx-1" />
                  <div>
                    <v-icon small>
                      forum
                    </v-icon>
                    {{ submission.num_comments }}
                  </div>
                  <div class="mx-1" />
                  <div>
                    <v-icon small>
                      access_time
                    </v-icon>
                    {{ moment.unix(submission.created_utc).fromNow() }}
                  </div>
                  <div class="mx-1" />
                  <div>
                    <v-icon small>
                      more
                    </v-icon>
                    r/{{ submission.subreddit.display_name }}
                  </div>
                  <div class="mx-1" />
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
    <v-divider light />
    <!--Moderation buttons-->
    <!--Todo: Should we move to ContentModerationButtons component which shows/hides actions depending on type? -->
    <!--Todo: Change to v-for, allows to show which action has been taken more easily and change depending on window size-->
    <v-layout
      align-start
      justify-start
      row
      wrap
      fill-height
      pa-1
    >
      <v-btn
        outline
        color="success"
        @click="submissionAction(() => submission.approve(), 'Post has been approved!', 'There was an error approving the post.')"
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
        @click="submissionAction(() => submission.remove({spam: true}), 'Post marked as spam!', 'There was an error removing the post.')"
      >
        <v-icon left>
          delete_sweep
        </v-icon>
        <div>Spam</div>
      </v-btn>
      <v-btn
        outline
        color="info"
        @click="submissionAction(() => submission.lock(), 'Post has been locked!', 'There was an error locking the post.')"
      >
        <v-icon left>
          lock
        </v-icon>
        <div>Lock</div>
      </v-btn>
      <v-btn outline>
        <v-icon left>
          more_vert
        </v-icon>
        <div>More</div>
      </v-btn>
    </v-layout>

    <v-sheet
      v-if="submission.num_reports"
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
          v-for="(report, i) in submission.mod_reports"
          :key="i"
          xs12
        >
          {{ report[1] + " - " + report[0] }}
        </v-flex>
        <v-flex
          v-for="(report, i) in submission.user_reports"
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
  name: 'MsSubmission',
  props: {
    submission: {
      type: Object,
      required: true,
      validator: function (value) {
        return value instanceof snoowrap.objects.Submission;
      }
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
        notification = new MsNotification(errorMessage, 'warning');
      }
      // send notification 
      this.$store.dispatch('addNotification', notification);
    },
    viewPost() {
    }
  },
}
</script>

<style scoped>

</style>
