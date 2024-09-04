<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M7.9987 3.33398V12.6673M3.33203 8.00065H12.6654" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>