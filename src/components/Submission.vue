<template>
    <v-content>
        <v-layout>
            <v-flex xs12 sm12>
                <v-card>
                    <v-layout pa-3>
                        <v-flex sm3>
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                    aspect-ratio="1"
                            ></v-img>
                        </v-flex>
                        <v-flex pl-3 pr-3>
                            <v-layout>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                                    </div>
                                </v-card-title>
                            </v-layout>
                            <v-layout>
                                <v-card-text>
                                    Text
                                </v-card-text>
                            </v-layout>
                            <v-layout>
                                <v-card-actions>
                                    <v-btn flat color="orange">Share</v-btn>
                                    <v-btn flat color="orange">Explore</v-btn>
                                </v-card-actions>
                            </v-layout>
                        </v-flex>
                        <v-flex sm1>
                            <v-layout>
                                <v-card-actions>
                                    <v-btn flat color="orange">Up</v-btn>
                                </v-card-actions>
                            </v-layout>
                            <v-layout>
                                <v-card-actions>
                                    <v-btn flat color="orange">Down</v-btn>
                                </v-card-actions>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-content>
</template>

<script>
    export default {
        name: "Submission"
    }
</script>

<style scoped>

</style>
