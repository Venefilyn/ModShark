<template>
    <v-navigation-drawer
            :value="value"
            @input="$emit('input', $event)"
            fixed
            app>
        <v-toolbar flat>
            Subreddits
        </v-toolbar>

        <v-divider></v-divider>

        <v-list>
            <v-list-tile
                    @click=""
            >
                <v-list-tile-content>
                    <v-list-tile-title>r/all</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile
                    @click=""
            >
                <v-list-tile-content>
                    <v-list-tile-title>r/ExampleSubreddit</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'ms-subreddits-drawer',
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
    }
</script>