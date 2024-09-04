<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M10.7404 2C13.0886 2 14.6663 4.235 14.6663 6.32C14.6663 10.5425 8.11819 14 7.99967 14C7.88116 14 1.33301 10.5425 1.33301 6.32C1.33301 4.235 2.91079 2 5.25893 2C6.60708 2 7.48856 2.6825 7.99967 3.2825C8.51079 2.6825 9.39227 2 10.7404 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>