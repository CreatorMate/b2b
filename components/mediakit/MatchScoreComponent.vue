<script setup lang="ts">
    import {computed, onMounted, ref, watch} from "vue";

    const props = defineProps<{
        score: number;
    }>();

    const radius = 16;
    const circumference = computed(() => 2 * Math.PI * radius);
    const offset = ref(circumference.value);

    onMounted(() => {
        offset.value = circumference.value - (props.score / 100) * circumference.value;
    });
    watch(
        () => props.score,
        (newScore) => {
            offset.value = circumference.value - (newScore / 100) * circumference.value;
        }
    );
</script>

<template>
    <div :class="{
        'text-[#10B981]': score >= 70,
        'text-[#F59E0B]': score >= 40 && score < 70,
        'text-[#F43F5E]': score < 40,
    }"
         class="flex items-center w-full gap-3">
        <div class="relative w-5 h-5">
            <!-- Background Circle -->
            <svg class="w-full h-full transform rotate-[-90deg]" viewBox="0 0 36 36"
                 shape-rendering="geometricPrecision">
                <circle
                    stroke-width="4"
                    stroke="transparent"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                />
                <circle data-v-9b1157f6="" class="progress-circle" stroke-width="4" stroke-dasharray="100.53096491487338 100.53096491487338" stroke-dashoffset="0" stroke-linecap="round" stroke="#0D0D0D" fill="transparent" r="16" cx="18" cy="18"></circle>
                <circle
                    class="progress-circle"
                    stroke-width="4"
                    :stroke-dasharray="`${circumference} ${circumference}`"
                    :stroke-dashoffset="offset"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                />
            </svg>
        </div>
        <p class="text-sm font-semibold">{{ score }}% match with brand</p>
    </div>
</template>

<style scoped>
.progress-circle {
    transition: stroke-dashoffset 500ms ease-in-out;
}
</style>