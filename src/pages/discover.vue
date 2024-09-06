<script setup lang="ts">
    import BrandCard from "~/components/BrandCard.vue";
    import type {Brand} from "~/src/Modules/mediakit/types/Brand";
    import {useAsyncData} from "#app";
    import type {Ref} from "vue";
    import BrandSideBar from "~/components/BrandSideBar.vue";

    const supabase = useSupabaseClient();

    const {data: brands, error, status} = useAsyncData('brands',async () => supabase.from('brands').select('*')
        , {lazy: true});

    const selected: Ref<Brand|null> = ref(null);
    let open = ref(false);

    function openCloseBrand(brand: Brand) {
        selected.value = brand;
        open.value = true;
    }
</script>

<template>
    <div class="w-full h-20 border-b border-white border-opacity-20 px-4 flex items-center">
        <h1>Discover brands</h1>
    </div>
    <div v-if="status == 'success'" class="grid grid-cols-4 p-4 gap-4">
        <BrandCard @click="openCloseBrand(brand)" :brand v-for="brand of brands.data"></BrandCard>
    </div>
    <transition name="slide-right">
        <div v-if="open" class="fixed inset-y-0 z-50 transition-transform duration-100 ease-in-out h-screen right-0 top-0 bg-black w-96">
            <BrandSideBar :brand="selected" @hide="open = false"></BrandSideBar>
        </div>
    </transition>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.2s ease-in-out;
}

.slide-right-enter-from {
    transform: translateX(100%);
}

.slide-right-leave-to {
    transform: translateX(100%);
}
</style>