<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <path
            d="M12.0013 2.66602V7.33268C12.0013 9.54182 10.2104 11.3327 8.0013 11.3327C5.79216 11.3327 4.0013 9.54182 4.0013 7.33268V2.66602M2.66797 13.9993H13.3346"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </CreatorMateIcon>
</template>