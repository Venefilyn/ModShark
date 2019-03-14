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
        props: {
            redirect: {
                type: String,
                required: false,
                default: '/'
            },
        },
        computed: {
            ...mapState(['accessToken'])
        },
        watch: {
            accessToken(newValue) {
                if (newValue.length > 0) {
                    this.redirectUser();
                }
            }
        },
        methods: {
            redirectUser() {
                console.log("Redirecting to ", this.redirect, this.$route.props, this.$route.params);
                this.$router.replace(this.redirect)
            }
        },
    }
</script>

<style scoped>

</style>