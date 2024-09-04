<script setup lang='ts'>
    const {description, value} = defineProps<{
        description: string,
        value: any
    }>()
</script>

<template>
    <div class="flex flex-col w-32">
        <p class="font-medium">{{value}}</p>
        <p class="text-white text-opacity-60 text-sm">{{description}}</p>
    </div>
</template>