<script setup lang='ts'>
    import type {MediaKitType} from "~/src/Modules/mediakit/MediaKitType";
    import MediaKitStatCard from "~/components/mediakit/MediaKitStatCard.vue";
    import MediaKitGraphCard from "~/components/mediakit/MediaKitGraphCard.vue";
    import {useMediakitState} from "~/src/Modules/mediakit/MediakitState";

    const {mediakit} = defineProps<{
        mediakit: MediaKitType
    }>();

    const mediaKitState = useMediakitState();
</script>

<template>
    <div v-show="!mediaKitState.hideStats" class="grid grid-cols-5 gap-2 mt-16">
        <MediaKitStatCard description="engagement rate" :value="mediakit.engagement_rate" descriptor="%" comment=""></MediaKitStatCard>
        <MediaKitStatCard description="avg. likes" :value="mediakit.avg_likes" descriptor="" comment=""></MediaKitStatCard>
        <MediaKitStatCard description="avg. comments" :value="mediakit.avg_comments" descriptor="" comment=""></MediaKitStatCard>
        <MediaKitStatCard description="average story views" :value="mediakit.avg_story_view" descriptor="" comment=""></MediaKitStatCard>
        <MediaKitStatCard description="impressions" :value="mediakit.impressions" descriptor="k" comment=""></MediaKitStatCard>
    </div>
    <div v-show="!mediaKitState.hideGraphs" class="grid grid-cols-3 gap-2 mt-2">
        <MediaKitGraphCard description="series" :stats="mediakit.stats.series"></MediaKitGraphCard>
        <MediaKitGraphCard description="age" :stats="mediakit.stats.ages"></MediaKitGraphCard>
        <MediaKitGraphCard description="country" :stats="mediakit.stats.country"></MediaKitGraphCard>
    </div>
</template>