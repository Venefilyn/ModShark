<template>
  <v-app >
    <v-toolbar app>
      <v-toolbar-side-icon
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
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
            v-model="drawer"
            fixed 
            temporary>
      <v-toolbar flat>
        Subreddits
      </v-toolbar>

      <v-divider></v-divider>
      
      <v-list>
        <v-list-tile
        >
          <v-list-tile-content>
            <v-list-tile-title>r/ExampleSubreddit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        >
          <v-list-tile-content>
            <v-list-tile-title>r/ExampleSubreddit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
          v-model="drawerSettings"
          fixed
          right
          temporary>
      <v-toolbar flat extended>
        ModShark icon, username, logout icon button
      </v-toolbar>
  
      <v-divider></v-divider>
  
      <v-list>
        <v-list-tile
        >
          <v-list-tile-avatar>
            <v-icon>settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        >
          <v-list-tile-avatar>
            <v-icon>info</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      {{ me }}
      <!--Router view here-->
      <v-layout align-content-start row wrap>
        <ms-submission :reddit-submission="{}"></ms-submission>
        <ms-submission :reddit-submission="{}"></ms-submission>
        <ms-submission :reddit-submission="{}"></ms-submission>
      </v-layout>
    </v-content>
    <ms-navigation-footer/>
  </v-app>
</template>

<script>
  import Submission from "./components/Submission";
  import NavigationFooter from "./components/NavigationFooter";
  import LocalAuthentication from "./models/LocalAuthentication";
  import Snoowrap from "snoowrap";
  import axios from "axios";

  export default {
  name: 'App',
  components: {
    "ms-navigation-footer": NavigationFooter,
    "ms-submission": Submission
  },
  data() {
    return {
      me: null,
      drawer: false,
      drawerSettings: false,
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
