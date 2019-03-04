<template>
    <v-dialog :value="value"
              @input="$emit('input', $event)"
              persistent>
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
                <v-btn @click="$emit('input', false)">Continue</v-btn>
                <v-btn @click="this.switch">Use locally</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ms-login-server-dialog",
        props: {
            value: {
                type: Boolean,
                required: true
            },
        },
        methods: {
            switch() {
                this.$store.dispatch("switchToLocal");
                this.$emit('input', false);
            }
        },
    }
</script>

<style scoped>

</style>