<script setup lang='ts'>
    import type {Brand} from "~/src/Modules/mediakit/types/Brand";

    const {brand} = defineProps<{
        brand: Brand
    }>()

    const tags = "tag1, tag2"
    function getTags(): string[] {
        return tags.split(',');
    }
</script>

<template>
    <div class="h-96 flex flex-col rounded-3xl p-2 bg-backgroundPrimary border border-white border-opacity-20 hover:border-opacity-40 transition duration-75 hover:-translate-y-1.5 cursor-pointer">
        <div class="w-full h-2/3 rounded-2xl">
            <img class="w-full h-full object-cover rounded-2xl" :src="brand.profile_pic">
        </div>
        <div class="mt-auto p-4">
            <h2 class="text-xl text-white">{{brand.name}}</h2>
            <div class="flex gap-1.5 text-textGray">
                <p>{{brand.tags}}</p>
            </div>
            <div class="flex justify-between w-full items-center mt-2">
                <span class="bg-backgroundSecondary px-2 py-1 border-mediakit border rounded-2xl">Recommended</span>
                <button>pitch</button>
            </div>
        </div>
    </div>
</template>