<template>
    <ms-content-list-queue :listing="listing"></ms-content-list-queue>
</template>

<script>
    import ContentList from "./partials/ContentList";
    import MsContentListQueue from "./partials/ContentListQueue";

    export default {
        name: "ms-submission-modqueue",
        mixins: [ContentList],
        components: {
            MsContentListQueue,
        },
        methods: {
            async setItems() {
                this.listing = await this.subreddit.getUnmoderated();
            }
        },
    }
</script>

<style scoped>

</style>