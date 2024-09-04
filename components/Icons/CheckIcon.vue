<script setup lang='ts'>
import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

const {size} = defineProps<{
  size: number
}>()
</script>

<template>
  <CreatorMateIcon :size="size">
    <path id="Icon" d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </CreatorMateIcon>
</template>