<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M12 6.66667H4M14 4H2M14 9.33333H2M12 12H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>