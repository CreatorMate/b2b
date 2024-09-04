<script setup lang='ts'>
    import {onMounted, ref} from "vue";
    import type {Brand} from "~/src/Modules/mediakit/Brand";
    import type {MediaKitDBType} from "~/src/Modules/mediakit/MediaKitType";
    import MatchScoreComponent from "~/components/mediakit/MatchScoreComponent.vue";
    import HeaderStat from "~/components/mediakit/HeaderStat.vue";

    const {creator, brand} = defineProps<{
        creator: MediaKitDBType,
        brand: Brand,
    }>();
    const supabase = useSupabaseClient();

    const matchScore = ref(0);

    onMounted(async () => {
        await fetch();
    });

    async function fetch() {
        let score = 0;
        const { data, error } = await supabase
            .from('serie_match_score')
            .select('*, series!inner(media_kit_id)')
            .eq('series.media_kit_id', creator.id)
            .eq('brand_id', brand.id);

        let result = data as any;

        for (const item of result) {
            score += item.match_score;
        }

        if(score == 0) {
            return;
        }

        matchScore.value = score / result.length;
    }
</script>

<template>
    <div style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%), #141414;" class="w-full h-full p-10 rounded-2xl flex flex-col gap-6 border border-[#292929]">
        <MatchScoreComponent :score="matchScore"></MatchScoreComponent>
        <div class="flex items-center gap-4">
            <img alt="Profile picture" class="w-16 object-cover top-0 h-16 rounded-full"
                 :src="`https://jrirqcnnxpbhvmuugxnl.supabase.co/storage/v1/object/public/avatars/${creator.profile_picture}`"/>
            <div>
                <h2 class="text-xl font-medium cursor-pointer">{{creator.name}}</h2>
                <a target="_blank"
                   :href="`https://instagram.com/${creator.instagram}`"
                   class="text-sm font-medium text-white text-opacity-60 hover:text-opacity-80 cursor-pointer">
                    {{creator.instagram}}
                </a>
            </div>
        </div>
        <div class="flex">
            <HeaderStat description="posts" :value="creator.posts"/>
            <HeaderStat description="followers" :value="creator.followers"/>
        </div>
        <p class="whitespace-pre-wrap text-[#C2C2C2]">{{creator.bio}}</p>
        <router-link :to="`/brands/${brand.name}/recommendations/${creator.instagram}`" class="flex w-full justify-end mt-auto">
            <next-button :size="16"></next-button>
        </router-link>
    </div>
</template>