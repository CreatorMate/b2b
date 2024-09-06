<script setup lang='ts'>
    import {onMounted, ref} from "vue";
    import type {Serie, SerieContent} from "~/src/Modules/mediakit/types/Serie";
    import ArrowDownIcon from "~/components/Icons/ArrowDownIcon.vue";
    import HeartIcon from "~/components/Icons/HeartIcon.vue";
    import CommentIcon from "~/components/Icons/CommentIcon.vue";
    import InstagramIcon from "~/components/Icons/InstagramIcon.vue";

    const {serie} = defineProps<{
        serie: Serie,
    }>();

    const posts = ref<SerieContent[]>([])
    const supabase = useSupabaseClient();

    onMounted(async () => {
        await getVideos();
    });

    let current = ref(0);

    function next() {
        if(current.value == posts.value.length-1) {
            current.value = 0;
        } else {
            current.value++;
        }

        selectedContent.value = posts.value[current.value];
    }

    function previous() {
        if(current.value == 0) {
            current.value = posts.value.length-1;
        } else {
            current.value--;
        }
        selectedContent.value = posts.value[current.value];
    }

    async function getVideos() {
        const {data} = await supabase
            .from('serie_content')
            .select(`*`)
            .eq('serie_id', serie.id);

        const serieContent = data as SerieContent[] | any;
        if (!serieContent) {
            return;
        }

        posts.value = serieContent;
        selectedContent.value = posts.value[0];
    }

    const selectedContent = ref<SerieContent | null>(null);

    function gotoInstagram() {
        window.open(selectedContent.value?.instagram_link, '_blank')
    }

</script>

<template>
    <p class="text-sm text-mediakitGray">top performing posts in this series</p>
    <div class="flex items-center gap-6">
        <div class="rotate-90 w-8 h-8 bg-backgroundSecondary flex items-center justify-center rounded-lg cursor-pointer" v-show="posts.length > 1" @click="previous"><ArrowDownIcon :size="16"></ArrowDownIcon></div>
        <div class="w-[320px] h-[560px] rounded-2xl relative my-8 flex">
            <video v-if="selectedContent?.isVideo" muted autoplay loop
                   :src="selectedContent?.url"
                   class="bg-black w-full h-full rounded-2xl"></video>
            <img v-else
                 :src="selectedContent?.url"
                 class="bg-black w-full h-full rounded-2xl"/>
            <div
                class="absolute bottom-0 flex items-center justify-between w-full p-6 text-gray-300 bg-black bg-opacity-20">
                <div class="flex gap-4">
                    <div class="flex items-center gap-1">
                        <heart-icon :size="16"></heart-icon>
                        <p class="">{{ selectedContent?.likes }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <comment-icon :size="16"></comment-icon>
                        <p class="">{{ selectedContent?.likes }}</p>
                    </div>
                </div>
                <instagram-icon @click='gotoInstagram()' class="hover:cursor-pointer hover:text-white"
                                :size="16"></instagram-icon>
            </div>
        </div>
        <div class="-rotate-90 w-8 h-8 bg-backgroundSecondary flex items-center justify-center rounded-lg cursor-pointer" v-show="posts.length > 1" @click="next"><ArrowDownIcon :size="16"></ArrowDownIcon></div>
    </div>
    <div class="flex justify-center gap-2">
        <div :class="{
            'border border-white': selectedContent?.id == content.id
        }" @click="selectedContent = content" :key="content.id" v-for="content of posts" class="w-14 h-14 rounded-lg">
            <video v-if="content.isVideo" muted autoplay loop
                   :src="content.url"
                   class="bg-black w-full h-full object-cover rounded-lg"></video>
            <img v-else
                 :src="content.url"
                 class="bg-black w-full h-full object-cover rounded-lg"></img>
        </div>
    </div>

</template>