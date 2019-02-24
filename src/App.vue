<template>
  <v-app >
    <v-toolbar app >
      <v-toolbar-side-icon
              v-show="$vuetify.breakpoint.mdAndDown"
              @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        r/subreddit
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        icon
        @click.stop="drawerSettings = !drawerSettings"
        v-show="$vuetify.breakpoint.lgAndDown"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <ms-subreddits-drawer v-model="drawer"/>
    <ms-settings-drawer v-model="drawerSettings"/>
    <v-content>
      {{ me }}
      <!--Router view here-->
      <ms-no-content v-show="false"></ms-no-content>
      <v-container
              fill-height
              flex
              grid-list-lg align-content-start >
        <v-layout row wrap>
          <ms-submission :reddit-submission="{}"></ms-submission>
          <ms-submission :reddit-submission="{}"></ms-submission>
          <ms-submission :reddit-submission="{}"></ms-submission>
        </v-layout>
      </v-container>
    </v-content>
    <ms-navigation-footer/>
  </v-app>
</template>

<script>
  import MsSubmission from "./components/Submission";
  import LocalAuthentication from "./models/LocalAuthentication";
  import Snoowrap from "snoowrap";
  import axios from "axios";
  import MsSubredditsDrawer from "./views/partials/SubredditsDrawer";
  import MsSettingsDrawer from "./views/partials/SettingsDrawer";
  import MsNavigationFooter from "./views/partials/NavigationFooter";
  import MsNoContent from "./views/partials/NoContent";

  export default {
  name: 'App',
  components: {
    MsNavigationFooter,
    MsSubredditsDrawer,
    MsSettingsDrawer,
    MsNoContent,
    MsSubmission,
  },
  data() {
    return {
      me: null,
      drawer: null,
      drawerSettings: null,
    }
  },
  computed: {
    reddit() {
      return this.$store.state.reddit;
    }
  },
  methods: {
    getMe() {
      if (this.reddit) {
        this.reddit.getPreferences().then(console.log);
        this.reddit.getMe().then(me => {
          console.log(me, typeof me);
          this.me = me.name;
        });
      }
    }
  },
  mounted() {
    axios.get("/api/settings").then(response => console.log(response.data));
    let token = new LocalAuthentication(this).getAccessToken();
    if (token.length) {
      // we have a token
      this.$store.dispatch("updateAccessToken", token);
      this.$store.dispatch("createRedditInstance");
      this.getMe()
    }
    else {
      // we do not have a token
      let code = new URL(window.location.href).searchParams.get('code');

      if (code) {
        Snoowrap.fromAuthCode({
          code: code,
          userAgent: this.$store.state.userAgent,
          clientId: 'TL5jne9mkFesLQ',
          redirectUri: this.$store.state.redirectUrl
        }).then(r => {
          this.$store.dispatch("updateAccessToken", r.accessToken);
          this.$store.dispatch("updateReddit", r);
          this.getMe()
        })
      }
      else {
        let redirectUri = this.$store.state.redirectUrl;
        return;
        window.location.href = Snoowrap.getAuthUrl({
          clientId: "TL5jne9mkFesLQ",
          scope: ["identity"],
          redirectUri: redirectUri,
          permanent: false,
          state: "123"
        })
      }
    }
  }
}
</script>
