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
    <ms-submission></ms-submission>
  </v-app>
</template>

<script>
import Submission from "./components/Submission";
import LocalAuthentication from "./models/LocalAuthentication";

export default {
  name: 'App',
  components: {
    "ms-submission": Submission
  },
  mounted() {
    let token = new LocalAuthentication(this).getAccessToken();
    console.log("token", token, token.length);
    if (token.length) {
      // we have a token
    }
    // we do not have a token
  }
}
</script>
