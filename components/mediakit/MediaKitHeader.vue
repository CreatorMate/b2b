<script setup lang='ts'>
    import {useAccountStore} from "~/src/account/AccountStore";
    import type {MediaKitType} from "~/src/Modules/mediakit/MediaKitType";
    import HeaderStat from "~/components/mediakit/HeaderStat.vue";
    import {useMediakitState} from "~/src/Modules/mediakit/MediakitState";

    const account = useAccountStore();
    const mediaKitState = useMediakitState();
    // const instagramState = useInstagramStore();

    const {mediakit} = defineProps<{
        mediakit: MediaKitType
    }>();
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 ">
            <img alt="Profile picture" class="w-16 object-cover top-0 h-16 rounded-full"
                 :src="`https://jrirqcnnxpbhvmuugxnl.supabase.co/storage/v1/object/public/avatars/${mediakit.profile_picture}`"/>
            <div>
                <h2 class="text-2xl font-medium cursor-pointer">{{mediakit.name}}</h2>
                <a target="_blank"
                   :href="`https://instagram.com/${mediakit.instagram}`"
                   class="text-sm font-medium text-white text-opacity-60 hover:text-opacity-80 cursor-pointer">
                    {{mediakit.instagram}}
                </a>
            </div>
        </div>
        <div v-show="!mediaKitState.hideInstagramDetails" class="flex gap-4">
            <HeaderStat description="posts" :value="mediakit.posts"/>
            <HeaderStat description="followers" :value="mediakit.followers"/>
            <HeaderStat description="location" :value="mediakit.location"/>
        </div>
    </div>
    <div class="mt-6">
        <p v-show="!mediaKitState.hideBio" class="whitespace-pre-wrap text-[#C2C2C2]">
            {{ mediakit.bio }}</p>
        <div class="flex gap-2 mt-10">
            <a target="_blank" :href="`https://instagram.com/${mediakit.instagram}`"
               class="rounded-2xl px-4 py-1.5 bg-card flex items-center gap-1.5">
                <Icon :size="20" name="mdi:instagram"></Icon>
                profile</a>
        </div>
    </div>
</template>

<style>
@keyframes fadeInUp {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0%);
        opacity: 1;
    }
}

.fadeInUp-animation {
    animation: 1.5s fadeInUp;
}
</style>