<script setup lang='ts'>
    const {size} = defineProps<{
        size: number
    }>();
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? 16" :height="size ?? 16" fill="none">
        <slot>
        </slot>
    </svg>
</template>