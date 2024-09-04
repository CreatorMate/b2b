//@ts-ignore
import {defineStore} from "pinia";
import type {MediaKitDBType, MediaKitType} from "~/src/Modules/mediakit/MediaKitType";
import type {MediakitSettings} from "~/src/Modules/mediakit/MediakitSettings";

export const useMediakitState = defineStore("mediakit", () => {
    const supabase = useSupabaseClient();
    const mediakit = ref<MediaKitType|null>(null);

    const hideBio = ref(false);
    const hideStats = ref(false);
    const hideGraphs = ref(false);
    const hideSeries = ref(false);
    const hideInstagramDetails = ref(false);

    async function initiate(mediaKit: MediaKitType) {
        mediakit.value = mediaKit;
        const {data} = await supabase
            .from('mediakit_settings')
            .select('*')
            .eq('user_id', mediaKit.id)
            .single();

        const mediaKitSettings = data as MediakitSettings | null;

        if(!mediaKitSettings) return;

        console.log("getting here");

        hideBio.value = mediaKitSettings.hide_bio;
        hideStats.value = mediaKitSettings.hide_stats;
        hideGraphs.value = mediaKitSettings.hide_graphs;
        hideSeries.value = mediaKitSettings.hide_series;
        hideInstagramDetails.value = mediaKitSettings.hide_profile_details;
    }

    async function update() {
        if(!mediakit.value) return;

        try {
            const updates = {
                user_id: mediakit.value.id,
                hide_bio: hideBio.value,
                hide_profile_details: hideInstagramDetails.value,
                hide_stats: hideStats.value,
                hide_graphs: hideGraphs.value,
                hide_series: hideSeries.value,
            };
            //@ts-ignore
            const {error} = await supabase.from('mediakit_settings').upsert(updates, {
                returning: 'minimal',
            });
            if(error) throw error;
        } catch(e) {
            alert("this did not work")
        }
    }

    return {hideBio, hideStats, hideGraphs, hideSeries, initiate, hideInstagramDetails, update, mediakit};
});
