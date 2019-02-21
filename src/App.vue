<template>
  <v-app >
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <v-content>{{ me }}</v-content>
    <!--<ms-submission></ms-submission>-->
  </v-app>
</template>

<script>
import Submission from "./components/Submission";
import LocalAuthentication from "./models/LocalAuthentication";
import Snoowrap from "snoowrap";

export default {
  name: 'App',
  components: {
    "ms-submission": Submission
  },
  data() {
    return {
      me: null
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
