<template>
  <v-container>
    <ms-login-server-dialog v-model="serverFaultDialog" />
    <v-snackbar
      v-model="authError"
      top
      auto-height
      :timeout="0"
    >
      Error: {{ authErrorMsg }}
      <v-btn
        color="pink"
        flat
        @click="authError = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-layout wrap>
      <v-flex xs12>
        <v-checkbox
          v-model="localUsage"
          class="justify-center"
          label="Use locally"
        />
      </v-flex>
      <v-flex xs12>
        <v-btn @click="loginPopup">
          Login with Reddit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as snoowrap from 'snoowrap';
import axios from 'axios';
import {mapActions, mapState} from 'vuex';
import RedditFactory from '../../models/RedditFactory';
import MsLoginServerDialog from './LoginServerDialog';
    
export default {
  name: 'MsLoginForm',
  components: {
    MsLoginServerDialog,
  },
  data() {
    return {
      popup: null,
      serverFaultDialog: false,
      serverRetries: 0,
      closedPopupTimeoutID: null,
      authError: false,
      authErrorMsg: '',
    }
  },
  computed: {
    ...mapState(['storeLocally']),
    localUsage: {
      get() {
        return this.storeLocally;
      },
      set(value) {
        this.changeStoreLocally(value)
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.updateAuthInfo);
  },
  methods: {
    ...mapActions(['changeStoreLocally']),
    /**
             * Create a login popup that redirects to a login page
             */
    loginPopup() {
      const url = snoowrap.getAuthUrl({
        clientId: this.$store.state.clientId,
        redirectUri: this.$store.state.redirectUrl,
        state: this.$store.state.state,
        scope: [
          'modmail',
          'wikiedit',
          'mysubreddits',
          'submit',
          'modlog',
          'modposts',
          'modflair',
          'modothers',
          'identity',
          'read',
          'report',
        ]
      });
      this.authError = false;
      this.$emit('authenticating', true);
      this.popup = window.open(url, 'mywindow', 'width=850,height=400');
      this.detectClosedPopup()
    },
    detectClosedPopup() {
      if (!this.popup) { 
        return;
      }
      if (this.popup.closed !== false) {
        this.$emit('authenticating', false);
      }
      else {
        this.closedPopupTimeoutID = setTimeout(this.detectClosedPopup, 500);
      }
    },
    /**
             *
             * @param {MessageEvent} e A message event, checks are ensured we only care of those
             * with data that is instanceof URLSearchParams
             */
    async updateAuthInfo(e) {
      if (!(e.data instanceof URLSearchParams)) {
        return;
      }
      clearTimeout(this.closedPopupTimeoutID);
                
      /** @member {URLSearchParams} params **/
      let params = e.data;

      if (this.popup) {
        this.popup.close();
      }

      if (this.$store.state.state !== params.get('state')) {
        this.$emit('authenticating', false);
        return; // Return - state is not the same
      }

      try {
        /** @member {snoowrap} r **/
        let r = await this.getReddit(params.get('code'));
        RedditFactory.setReddit(r);
        let me = await r.getMe();
        this.$store.dispatch('updateSelectedSubreddit', r);

        if (!(me instanceof snoowrap.objects.RedditUser)) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error('Could not get Reddit user, aborting.')
        }
        if (!this.storeLocally) {
          await this.updateServerAuth(r.refreshToken, r.accessToken);
        }

        this.$emit('authenticating', false);
        this.$store.dispatch('updateRefreshToken', r.refreshToken);
                    
        // Redirect to main view
        this.$router.push({name: 'subreddit_modqueue', params: {subreddit: 'mod'}});
      } catch (e) {
        // Create snackbar about error
        this.$emit('authenticating', false);
        this.authError = true; 
        this.authErrorMsg = e.message; 
      }
    },
    async getReddit(code) {
      return snoowrap.fromAuthCode({
        code: code,
        userAgent: this.$store.state.userAgent,
        clientId: this.$store.state.clientId,
        redirectUri: this.$store.state.redirectUrl
      })
    },
    async updateServerAuth(refreshToken, accessToken) {
      try {
        await axios.post('/api/authenticate', {
          'RefreshToken': refreshToken,
          'AccessToken': accessToken,
        }, {
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          timeout: 5000, // 5s timeout
        });
      } catch (e) {
        if (this.serverRetries <= 2) {
          this.serverRetries += 1;
          // Retry once a second
          let promise = new Promise(resolve => setTimeout(resolve, 1000));
          await promise;
          await this.updateServerAuth(refreshToken, accessToken)
        }
        else {
          this.serverFaultDialog = true;
        }
      }
    }
  },
}
</script>