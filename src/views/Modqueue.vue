<template>
    <div>
        <ms-content-list-queue :listing="listing"></ms-content-list-queue>
        {{ this.error }}
    </div>
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
                this.listing = await this.subreddit.getModqueue();
            }
        },
    }
</script>

<style scoped>

</style>