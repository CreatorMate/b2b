<script setup lang='ts'>
    import {useRoute} from "vue-router";
    import {onMounted, ref} from "vue";
    import type {MediaKitType} from "~/src/Modules/mediakit/types/MediaKitType";
    import type {Brand} from "~/src/Modules/mediakit/types/Brand";
    import {useAccountStore} from "~/src/utils/auth/AccountStore";
    import type {Serie} from "~/src/Modules/mediakit/types/Serie";
    import MediaKitSerie from "~/components/mediakit/MediaKitSerie.vue";

    const supabase = useSupabaseClient();

    const {mediakit, brand} = defineProps<{
        mediakit: MediaKitType,
        brand: null|Brand
    }>();
    const route = useRoute();
    let id = route.params.id;
    const account = useAccountStore();

    const series = ref<Serie[]>([]);

    onMounted(async () => {
        await getSeries();
    });

    async function getSeries() {
        const {data} = await supabase
            .from('series')
            .select(`*`)
            .eq('media_kit_id', mediakit.id);

        const dbSeries = data as Serie[] | any;
        if(!dbSeries) {
            return;
        }

        dbSeries.forEach((serie: Serie) => {
            serie.content = [];

            series.value.push(serie);
        })
    }

    async function getVideos() {

    }
</script>

<template>
    <MediaKitSerie :brand v-for="(serie, index) in series" :serie :index></MediaKitSerie>
</template>