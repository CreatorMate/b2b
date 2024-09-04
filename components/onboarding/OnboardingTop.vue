<script setup lang='ts'>
    import type {OnboardingHandler} from "~/src/onboarding/OnboardingHandler";

    const {onboardingHandler} = defineProps<{
        onboardingHandler: OnboardingHandler,
    }>();
</script>

<template>
    <div class="flex-col w-full flex gap-2">
        <div class="flex items-center justify-between text-sm">
            <p class="text-gray-400">join the waitlist</p>
            <p>{{onboardingHandler.step}}/{{onboardingHandler.total}} complete</p>
        </div>
        <div class="grid grid-cols-5 gap-1 ">
            <div :class="[
               1 <= onboardingHandler.step.value ? 'bg-white' : 'bg-zinc-900'
            ]" class=" w-full h-1"></div>
            <div :class="[
               2 <= onboardingHandler.step.value ? 'bg-white' : 'bg-zinc-900'
            ]" class=" w-full h-1"></div>
            <div :class="[
               3 <= onboardingHandler.step.value ? 'bg-white' : 'bg-zinc-900'
            ]" class=" w-full h-1"></div>
            <div :class="[
               4 <= onboardingHandler.step.value ? 'bg-white' : 'bg-zinc-900'
            ]" class=" w-full h-1"></div>
        </div>
    </div>
</template>