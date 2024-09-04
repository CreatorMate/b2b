<script setup lang='ts'>

    import {defineAsyncComponent, onMounted, ref} from "vue";
    import type {SerieMatchScore} from "~/src/Modules/mediakit/SerieMatchScore";
    import type {Serie} from "~/src/Modules/mediakit/Serie";
    import type {Brand} from "~/src/Modules/mediakit/Brand";
    import MatchScoreComponent from "~/components/mediakit/MatchScoreComponent.vue";
    import MediaKitStatCard from "~/components/mediakit/MediaKitStatCard.vue";
    import MediaKitSerieVideoPicker from "~/components/mediakit/MediaKitSerieVideoPicker.vue";

    const brandScore = ref<null|SerieMatchScore>(null);
    const supabase = useSupabaseClient();

    const {serie, index, brand} = defineProps<{
        serie: Serie,
        index: number,
        brand: Brand|null
    }>();

    const hovering = ref("");

    onMounted(async () => {
        if(!brand) {
            return;
        }
        const {data} = await supabase
            .from('serie_match_score')
            .select(`*`)
            .eq('serie_id', serie.id)
            .eq('brand_id', brand.id)
            .single();

        const score = data as SerieMatchScore | null;

        if (!score) {
            return;
        }

        brandScore.value = score;
    });

    function getTags(): string[] {
        return serie.tags.split(',');
    }
</script>

<template>
    <div class="w-full mb-6 flex rounded-2xl border border-[#2E2E2E]">
        <div style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%), #141414;" class="w-[60%] p-6 rounded-l-2xl border-r border-[#2E2E2E]">
            <div class="p-4 font-medium">
                <MatchScoreComponent class="mb-6" v-if="brandScore" :score="brandScore?.match_score"></MatchScoreComponent>
                <p class="text-mediakitGray mb-0.5 text-sm">series #{{index+1}}</p>
                <p class="text-xl">{{serie.name}}</p>
                <div class="my-6 flex">
                    <div class="w-32 ">
                        <p>{{serie.posts}}</p>
                        <p class="text-mediakitGray text-sm">posts</p>
                    </div>
                    <div class="w-32">
                        <p>{{serie.stories}}</p>
                        <p class="text-mediakitGray text-sm">stories</p>
                    </div>
                </div>
                <p class="font-normal text-[#A3A3A3]">{{serie.description}}</p>
                <div class="flex gap-1.5 mt-6 mb-4">
                    <div class="border border-mediakit tag py-1 px-1.5 rounded-xl text-sm" v-for="tag of getTags()">{{tag}}</div>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2 mt-6">
                <MediaKitStatCard @hover-end="hovering = ''" @hover-start="hovering = 'average_per_post'" :class="{'opacity-20' : hovering != 'average_per_post' && hovering != ''}" :comment="brandScore?.average_per_post" description="average reach per post" descriptor="" :value="serie.reach_per_post"></MediaKitStatCard>
                <MediaKitStatCard @hover-end="hovering = ''" @hover-start="hovering = 'new_vs_existing'" :class="{'opacity-20' : hovering != 'new_vs_existing' && hovering != ''}" :comment="brandScore?.new_vs_existing" description="reaching new vs . existing followers" descriptor="k" :value="serie.new_vs_existing"></MediaKitStatCard>
                <MediaKitStatCard @hover-end="hovering = ''" @hover-start="hovering = 'followers_interested'" :class="{'opacity-20' : hovering != 'followers_interested' && hovering != ''}" :comment="brandScore?.followers_interested" description="% of followers interested" descriptor="%" :value="serie.followers_interested"></MediaKitStatCard>
                <MediaKitStatCard @hover-end="hovering = ''" @hover-start="hovering = 'impressions'" :class="{'opacity-20' : hovering != 'impressions' && hovering != ''}" :comment="brandScore?.impressions" description="impressions" descriptor="k" :value="serie.impressions"></MediaKitStatCard>
            </div>
        </div>
        <div style="background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%), #0D0D0D;" class="flex flex-col items-center p-16 w-[40%] rounded-r-2xl">
            <MediaKitSerieVideoPicker :serie />
        </div>
    </div>
</template>

<style scoped>
.tag {
    background: rgba(254, 82, 0, 0.10);
    color: #FF7C3D;
}


</style>