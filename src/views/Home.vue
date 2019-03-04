<template>
    <v-container>
        <v-layout wrap text-xs-center>
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
                Welcome to ModShark!
            </v-flex>
            <v-flex xs12>
                <ms-login-form @authenticating="toggle = $event"></ms-login-form>
            </v-flex>
            <v-dialog
                    :value="toggle"
                    persistent
                    width="180"
                    no-click-animation
                    dark
            >
                <v-container fluid text-xs-center grid-list-xl class="primary">
                    <v-layout row wrap align-center>
                        <v-flex>
                            <div class="subheading">
                                Logging you in!
                            </div>
                        </v-flex>
                        <v-flex>
                            <v-progress-circular
                                    indeterminate
                                    color="secondary"
                                    class="mb-0"
                            ></v-progress-circular>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
import MsLoginForm from "../components/Login/LoginForm";
import {mapState} from "vuex";

export default {
    data() {
        return {
            popup: null,
            toggle: false,
        }
    },
    components: {
        MsLoginForm,
    },
    computed: {
        ...mapState(["authenticated"])
    },
}
</script>