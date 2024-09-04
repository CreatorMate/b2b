<script setup lang='ts'>
    import Sidebar from "~/components/Sidebar.vue";
    import {useLoadingState} from "~/utils/Loading/LoadingState";
    const loadingState = useLoadingState();
</script>

<template>
    <main class="flex w-full h-full">
        <Sidebar/>
        <div class="w-full h-full relative">
            <div v-show="loadingState.loadingItems.length > 0" class="w-full h-full flex items-center justify-center absolute z-50 left-0 top-0 bg-black">
                <icon size="24" name="eos-icons:bubble-loading"></icon>
            </div>
            <div class="w-full h-full overflow-x-hidden overflow-y-auto">
                <slot>
                </slot>
            </div>
        </div>
    </main>
</template>