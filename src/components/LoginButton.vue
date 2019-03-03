<template>
    <v-container>
        <!-- TODO: Move to separate component -->
        <v-dialog v-model="serverFaultDialog" persistent>
            <v-card>
                <v-card-title class="headline">Server error!</v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md my-0>
                        <v-layout wrap>
                            <v-flex xs12>
                                We could not get in contact with the ModShark server. You can choose to either continue the application without a server temporarily or use ModShark without the ModShark server.
                            </v-flex>
                            <v-flex xs12>
                                Choosing Continue will work for the time being, and you will have a synchronize button in settings sidebar to login to server at a later time.  
                            </v-flex>
                            <v-flex xs12>
                                Choosing Use locally will work now going forward. Your settings will not be synchronized between devices. You will be able to use the application with no repercussions.
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="serverFaultDialog = false">Continue</v-btn>
                    <v-btn @click="serverFaultDialog = false">Use locally</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout wrap>
            <v-flex xs12>
                <v-checkbox v-model="localUsage" class="justify-center" label="Use locally"></v-checkbox>
            </v-flex>
            <v-flex xs12>
                <v-btn v-on:click="loginPopup">Login with Reddit</v-btn>
            </v-flex>
        </v-layout>
            
    </v-container>
</template>

<script>
    import * as snoowrap from "snoowrap";
    import axios from "axios";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "ms-login-button",
        data() {
            return {
                popup: null,
                serverFaultDialog: false,
                serverRetries: 0,
                closedPopupTimeoutID: null,
            }
        },
        mounted() {
            window.addEventListener('message', this.updateAuthInfo);
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
        methods: {
            ...mapActions(['changeStoreLocally']),
            /**
             * Create a login popup that redirects to a login page
             */
            loginPopup() {
                const url = snoowrap.getAuthUrl({
                    clientId: this.$store.state.clientId,
                    scope: ["identity"],
                    redirectUri: this.$store.state.redirectUrl,
                    permanent: process.env.NODE_ENV === "production",
                    state: this.$store.state.state
                });
                this.$emit("authenticating", true);
                this.popup = window.open(url, "mywindow", "width=700,height=350");
                this.detectClosedPopup()
            },
            detectClosedPopup() {
                if (this.popup) {
                    if (this.popup.closed !== false) {
                        this.$emit("authenticating", false);
                    }
                    else {
                        this.closedPopupTimeoutID = setTimeout(this.detectClosedPopup, 500);
                    }
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
                let params = e.data;

                if (this.popup) {
                    this.popup.close();
                }

                /** @member {URLSearchParams} params **/
                if (this.$store.state.state !== params.get('state')) {
                    return; // Return - state is not the same
                }

                try {
                    /** @member {snoowrap} r **/
                    let r = await this.getReddit(params.get('code'));
                    let me = await r.getMe();
                    if (!(me instanceof snoowrap.objects.RedditUser)) {
                        // noinspection ExceptionCaughtLocallyJS
                        throw new Error("Could not get Reddit user, aborting.")
                    }
                    if (!this.storeLocally) {
                        await this.updateServerAuth(r.accessToken);
                    }

                    this.$emit("authenticating", false);
                    this.$store.dispatch("updateAccessToken", r.accessToken);
                    this.$store.dispatch("updateReddit", r);
                } catch (e) {
                    // Create snackbar about error
                    console.log(e);
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
            async updateServerAuth(accessToken) {
                try {
                    await axios.post("/api/authenticate", {
                        "Token": accessToken
                    }, {
                        headers: {
                            'content-type': 'application/json;charset=utf-8'
                        },
                        timeout: 5000, // 5s timeout
                    });
                } catch (e) {
                    if (this.serverRetries <= 2) {
                        this.serverRetries += 1;
                        console.log(this.serverRetries);
                        // Retry once a second
                        let promise = new Promise(resolve => setTimeout(resolve, 1000));
                        await promise;
                        await this.updateServerAuth(accessToken)
                    }
                    else {
                        this.serverFaultDialog = true;
                    }
                }
            }
        },
    }
</script>