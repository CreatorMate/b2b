<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M10.6667 6.66667H2M13.3333 4H2M13.3333 9.33333H2M10.6667 12H2" stroke="#A9A9B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.6667 6.66667H2M13.3333 4H2M13.3333 9.33333H2M10.6667 12H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>