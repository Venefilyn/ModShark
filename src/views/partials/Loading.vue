<template>
    <centered-text text="Loading ModShark">
        <v-progress-circular
                indeterminate
                color="primary"
                :size="82"
        ></v-progress-circular>
    </centered-text>
</template>

<script>
    import CenteredText from "../../views/CenteredText"
    import {mapState} from "vuex";

    export default {
        name: "",
        components: {
            CenteredText,
        },
        data() {
            return {
                logOutTimeout: null
            }
        },
        props: {
            redirect: {
                type: String,
                required: false,
                default: '/'
            },
        },
        mounted() {
            this.logOutTimeout = setTimeout(this.logOutUser, 1000*60*6); // 6s timeout
            console.log("setting timeout", this.logOutTimeout)
        },
        computed: {
            ...mapState(['refreshToken'])
        },
        watch: {
            refreshToken(newValue) {
                if (newValue.length > 0) {
                    this.redirectUser();
                }
            }
        },
        methods: {
            redirectUser() {
                clearTimeout(this.logOutTimeout);
                console.log("Redirecting to ", this.redirect, this.$route.props, this.$route.params);
                this.$router.replace(this.redirect)
            },
            logOutUser() {
                console.log("logging user out");
                this.$store.dispatch("logOut");
                this.$router.replace('/')
            }
        },
    }
</script>

<style scoped>

</style>