<script setup lang='ts'>
    import type {Brand} from "~/src/Modules/mediakit/types/Brand";

    const emit = defineEmits(['hide']);

    const props = defineProps<{
        brand: null | Brand
    }>();

    const {brand} = toRefs(props);

</script>

<template>
    <aside class="w-full h-full p-6">
        <div class="flex justify-end">
            <p @click="emit('hide')" class="hover:cursor-pointer text-gray-200">close</p>
        </div>
        <div class="mt-6 flex flex-col gap-2 items-center h-full pb-24">
            <img :alt="`${brand?.name}'s logo`" class="w-32 h-32 rounded-full object-cover" :src="brand?.profile_pic">
            <h3 class="font-medium text-2xl">{{brand?.name}}</h3>
            <p class="text-textGray text-sm">{{brand?.tags}}</p>
            <p class="text-center text-sm px-12">{{brand?.bio}}</p>
            <a class="bg-white text-black px-6 py-2" target="_blank" :href="brand?.instagram_link">instagram</a>
            <div class="mt-auto">
                <ul class="flex flex-col items-center">
                    <li>{{brand?.location}}</li>
                    <li>{{brand?.followers}} followers</li>
                    <li>{{brand?.posts}} posts</li>
                </ul>
            </div>
            <button class="bg-white text-black px-6 py-2">Pitch to brand</button>
        </div>
    </aside>
</template>