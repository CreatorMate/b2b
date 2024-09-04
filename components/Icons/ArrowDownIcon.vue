<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>