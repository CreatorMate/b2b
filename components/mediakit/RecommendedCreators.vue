<script setup lang='ts'>
    import {Brand} from "@/modules/brands/types/Brand";
    import CreatorCard from "@/modules/brands/components/CreatorCard.vue";
    import {onMounted, ref} from "vue";
    import {supabase} from "@/utils/Supabase/SupabaseClient";
    import {MediaKitDBType} from "@/modules/mediakit/types/MediaKitType";

    const {brand} = defineProps<{
        brand: Brand
    }>();
    const creators = ref<MediaKitDBType[]>([]);

    onMounted(async () => {
        await fetch();
    })

    async function fetch() {
        const {data} = await supabase
            .from('mediakit')
            .select(`*`);

        const dbMediaKit = data as MediaKitDBType[] | null;

        if(!dbMediaKit) {
            return;
        }

        creators.value = dbMediaKit;
    }
</script>

<template>
    <div class="grid grid-cols-3 gap-6">
        <CreatorCard :brand :creator v-for="creator of creators"></CreatorCard>
    </div>
</template>