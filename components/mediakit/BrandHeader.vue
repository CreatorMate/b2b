<script setup lang='ts'>
    import type {Brand} from "~/src/Modules/mediakit/Brand";
    import HeaderStat from "~/components/mediakit/HeaderStat.vue";

    const {brand} = defineProps<{
        brand: Brand
    }>();
</script>

<template>
    <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4 ">
            <img alt="Profile picture" class="w-16 object-cover top-0 h-16 rounded-full"
                 :src="brand.profile_pic"/>
            <div>
                <h2 class="text-2xl font-medium cursor-pointer">{{brand.name}}</h2>
                <a target="_blank"
                   :href="`https://instagram.com/${brand.instagram_name}`"
                   class="text-sm font-medium text-white text-opacity-60 hover:text-opacity-80 cursor-pointer">
                    {{brand.instagram_name}}
                </a>
            </div>
        </div>
        <div class="flex gap-4">
            <HeaderStat description="posts" :value="brand.posts"/>
            <HeaderStat description="followers" :value="brand.followers"/>
            <HeaderStat description="location" :value="brand.location"/>
        </div>
    </div>
    <div class="mt-6">
        <p class="whitespace-pre-wrap text-[#C2C2C2]">
            {{ brand.bio }}</p>
        <div class="flex gap-2 mt-10">
            <a target="_blank" :href="brand.instagram_link"
               class="rounded-lg px-4 py-1.5 bg-card flex items-center gap-1.5 border border-[#333]">
                <Icon name="mdi:instagram"></Icon>
                profile</a>
        </div>
    </div>
</template>