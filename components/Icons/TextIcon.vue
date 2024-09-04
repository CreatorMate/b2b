<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M3.33203 5.83398C3.33203 5.05742 3.33203 4.66913 3.4589 4.36285C3.62806 3.95447 3.95251 3.63001 4.36089 3.46085C4.66718 3.33398 5.05546 3.33398 5.83203 3.33398H14.1654C14.9419 3.33398 15.3302 3.33398 15.6365 3.46085C16.0449 3.63001 16.3693 3.95447 16.5385 4.36285C16.6654 4.66913 16.6654 5.05742 16.6654 5.83398M7.4987 16.6673H12.4987M9.9987 3.33398V16.6673" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>