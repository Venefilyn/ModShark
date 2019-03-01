<template>
    <v-container>
        <v-layout wrap text-xs-center >
            <v-flex xs12>
                <v-img
                        :src="require('../assets/logo.svg')"
                        class="my-3"
                        alt="ModShark icon"
                        contain
                        height="200"
                ></v-img>
            </v-flex>
            <v-flex xs12>
                Welcome to ModShark {{ username }}!
            </v-flex>
            <v-flex xs12>
                <v-btn @click="loginPopup">Login with Reddit</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as Snoowrap from "snoowrap";

export default {
    data() {
        return {
            popup: null,
            me: null
        }
    },
    mounted() {
        window.addEventListener('message', this.updateAuthInfo)
    },
    computed: {
        reddit() {
            return this.$store.state.reddit;
        },
        username() {
            return this.me ? this.me : "";
        }
    },
    methods: {
        loginPopup() {
            const url = Snoowrap.getAuthUrl({
                clientId: this.$store.state.clientId,
                scope: ["identity"],
                redirectUri: this.$store.state.redirectUrl,
                permanent: false,
                state: this.$store.state.state // TODO: Change to randomly generated string that is stored in state
            });
            console.log(url);
            this.popup = window.open(url, "mywindow", "width=500,height=350");
        },
        updateAuthInfo(e) {

            if (!(e.data instanceof URLSearchParams)) {
                return;
            }
            if (this.popup) {
                this.popup.close();
            }
            
            /** @member {URLSearchParams} params **/
            let params = e.data;
            if (this.$store.state.state !== params.get('state')) {
                return; // Return - state is not the same
            }

            Snoowrap.fromAuthCode({
                code: params.get('code'),
                userAgent: this.$store.state.userAgent,
                clientId: this.$store.state.clientId,
                redirectUri: this.$store.state.redirectUrl
            }).then(r => {
                this.$store.dispatch("updateAccessToken", r.accessToken);
                this.$store.dispatch("updateReddit", r);
                this.getMe()
            })
        },
        getMe() {
            if (this.reddit) {
                this.reddit.getPreferences().then(console.log);
                this.reddit.getMe().then(me => {
                    this.me = me.name;
                });
            }
        }
    },
}
</script>