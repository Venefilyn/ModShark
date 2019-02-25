<template>
    <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex>
                <div class="subheading">{{ text }}</div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "ms-no-content",
        props: {
            text: {
                type: String,
                default: "Nothing here!"
            },
        },
    }
</script>