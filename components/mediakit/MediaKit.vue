<script setup lang='ts'>
    import {onMounted, ref} from "vue";
    import {useRoute} from "vue-router";
    import type {MediaKitDBType, MediaKitType} from "~/src/Modules/mediakit/types/MediaKitType";
    import type {Brand} from "~/src/Modules/mediakit/types/Brand";
    import {useLoadingState} from "~/src/utils/Loading/LoadingState";
    import {useMediakitState} from "~/src/Modules/mediakit/types/MediakitState";
    import {useAccountStore} from "~/src/utils/auth/AccountStore";
    import MediaKitSeriesList from "~/components/mediakit/MediaKitSeriesList.vue";
    import MediaKitProfileStats from "~/components/mediakit/MediaKitProfileStats.vue";
    import MediaKitHeader from "~/components/mediakit/MediaKitHeader.vue";
    import NoMediaKit from "~/components/mediakit/NoMediaKit.vue";

    const account = useAccountStore();
    const hasMediaKit = ref(false);
    const mediakit = ref<null|MediaKitType>(null);
    const brand = ref<null|Brand>(null);
    const route = useRoute();
    let id = route.params.id;
    let brandName = route.params.name;
    const supabase = useSupabaseClient();
    const loadingState = useLoadingState();
    const loading = ref(true);
    const mediaKitState = useMediakitState();

    onBeforeMount(async () => {
        loadingState.startLoading("get items");
        if (account.mediaKitStatus == 'DONE' || id) {
            hasMediaKit.value = true;
        }

        if(brand.value) {
            await fetchBrand();
        }
        await fetch();
        if(mediakit.value) {
            await mediaKitState.initiate(mediakit.value);
        }
        loading.value = false;
        loadingState.stopLoading("get items");
    });

    async function fetchBrand() {
        const {data} = await supabase
            .from('brands')
            .select(`*`)
            .eq('name', brandName)
            .single();

        const foundBrand = data as Brand | null;

        if (!foundBrand) {
            return;
        }

        brand.value = foundBrand;
    }

    async function fetch() {
        const userId = id ? id : account.userId;
        const {data} = await supabase
            .from('mediakit')
            .select(`*`)
            .eq(id ? 'instagram' : 'id', userId)
            .single();

        const dbMediaKit = data as MediaKitDBType | null;

        if (!dbMediaKit) {
            hasMediaKit.value = false;
            return;
        }

        mediakit.value = toMediaKit(dbMediaKit);
    }

    function toMediaKit(dbData: MediaKitDBType): MediaKitType {
        return {
            id: dbData.id,
            profile_picture: dbData.profile_picture,
            instagram: dbData.instagram,
            name: dbData.name,
            posts: dbData.posts,
            followers: dbData.followers,
            location: dbData.location,
            bio: dbData.bio,
            short_name: dbData.short_name,
            engagement_rate: dbData.engagement_rate,
            avg_likes: dbData.avg_likes,
            avg_comments: dbData.avg_comments,
            avg_story_view: dbData.avg_story_view,
            impressions: dbData.impressions,
            stats: {
                series: [
                    {name: dbData.series_name_1, percentage: dbData.series_value_1},
                    {name: dbData.series_name_2, percentage: dbData.series_value_2},
                    {name: dbData.series_name_3, percentage: dbData.series_value_3},
                    {name: dbData.series_name_4, percentage: dbData.series_value_4},
                    {name: dbData.series_name_5, percentage: dbData.series_value_5},
                ],
                ages: [
                    {name: dbData.age_name_1, percentage: dbData.age_value_1},
                    {name: dbData.age_name_2, percentage: dbData.age_value_2},
                    {name: dbData.age_name_3, percentage: dbData.age_value_3},
                    {name: dbData.age_name_4, percentage: dbData.age_value_4},
                    {name: dbData.age_name_5, percentage: dbData.age_value_5},
                ],
                country: [
                    {name: dbData.country_name_1, percentage: dbData.country_value_1},
                    {name: dbData.country_name_2, percentage: dbData.country_value_2},
                    {name: dbData.country_name_3, percentage: dbData.country_value_3},
                    {name: dbData.country_name_4, percentage: dbData.country_value_4},
                    {name: dbData.country_name_5, percentage: dbData.country_value_5},
                ],
            }
        }
    }
</script>

<template>
    <no-media-kit v-if="!loading && !mediakit"></no-media-kit>
    <section v-if="mediakit && !loading" class="h-full w-full ">
        <div class="w-full flex flex-col mb-16 py-10 px-4 laptop:px-10">
            <div class="">
                <MediaKitHeader :mediakit></MediaKitHeader>
                <MediaKitProfileStats :mediakit/>
            </div>
        </div>
        <div class="transition duration-200" v-show="!mediaKitState.hideSeries">
            <MediaKitSeriesList :brand :mediakit/>
        </div>
        <div class="h-10 bg-black w-14"></div>
    </section>
</template>