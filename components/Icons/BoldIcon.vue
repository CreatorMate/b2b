<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path d="M4 7.99935H9.33333C10.8061 7.99935 12 6.80544 12 5.33268C12 3.85992 10.8061 2.66602 9.33333 2.66602H4V7.99935ZM4 7.99935H10C11.4728 7.99935 12.6667 9.19326 12.6667 10.666C12.6667 12.1388 11.4728 13.3327 10 13.3327H4V7.99935Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>