<script setup lang='ts'>
    import {useMediakitState} from "~/src/Modules/mediakit/types/MediakitState";
    import MediaKit from "~/components/mediakit/MediaKit.vue";
    const mediaKitState = useMediakitState();
</script>

<template>
    <div class="flex h-full w-full">
        <div v-if="mediaKitState.mediakit" class="min-w-96 h-full bg-backgroundPrimary p-6">
            <div class="flex justify-between items-center border-b border-opacity-20 pb-6 border-white">
                <h1 class="text-2xl">robin mons</h1>
                <router-link target="_blank" class="bg-buttonColor rounded-full px-3 py-2" :to="`mediakit/${mediaKitState.mediakit.instagram}`">
                    view media kit
                    <icon class="ml-2 mb-1" name="clarity:pop-out-line"></icon>
                </router-link>
            </div>
            <div class="flex flex-col gap-2 mt-6">
                <div class="flex w-full justify-between">
                    <p>hide bio</p>
                    <input @change="mediaKitState.update" v-model="mediaKitState.hideBio" type="checkbox">
                </div>
                <div class="flex w-full justify-between">
                    <p>hide profile details</p>
                    <input @change="mediaKitState.update" v-model="mediaKitState.hideInstagramDetails" type="checkbox">
                </div>
                <div class="flex w-full justify-between">
                    <p>hide stats</p>
                    <input @change="mediaKitState.update" v-model="mediaKitState.hideStats" type="checkbox">
                </div>
                <div class="flex w-full justify-between">
                    <p>hide graphs</p>
                    <input @change="mediaKitState.update" v-model="mediaKitState.hideGraphs" type="checkbox">
                </div>
                <div class="flex w-full justify-between">
                    <p>hide series</p>
                    <input @change="mediaKitState.update" v-model="mediaKitState.hideSeries" type="checkbox">
                </div>
            </div>
        </div>
        <div class="overflow-y-auto px-10 w-full flex justify-center">
            <MediaKit></MediaKit>
        </div>
    </div>
</template>