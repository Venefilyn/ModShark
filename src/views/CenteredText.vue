<template>
    <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
            <v-flex>
                <slot></slot>
                <div class="subheading" v-if="text">{{ text }}</div>
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
                default: null,
                required: false
            },
        },
    }
</script>