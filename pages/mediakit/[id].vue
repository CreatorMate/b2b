<script setup lang='ts'>
    definePageMeta({
        layout: 'empty'
    })
    import MediaKit from "~/components/mediakit/MediaKit.vue";
</script>

<template>
    <main class="w-full h-full overflow-x-hidden flex justify-center">
        <section class="w-[1150px] h-full mt-20">
            <MediaKit></MediaKit>
        </section>
    </main>
</template>