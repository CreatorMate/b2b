<script setup lang='ts'>
    import CreatorMateIcon from "@/components/Icons/CreatorMateIcon.vue";

    const {size} = defineProps<{
        size: number
    }>()
</script>

<template>
    <CreatorMateIcon :size="size">
        <g clip-path="url(#clip0_293_1636)">
            <path d="M6.0587 6.00065C6.21543 5.5551 6.5248 5.17939 6.932 4.94007C7.3392 4.70076 7.81796 4.61328 8.28348 4.69313C8.749 4.77297 9.17124 5.015 9.47542 5.37634C9.77959 5.73767 9.94607 6.195 9.94536 6.66732C9.94536 8.00065 7.94536 8.66732 7.94536 8.66732M7.9987 11.334H8.00536M14.6654 8.00065C14.6654 11.6826 11.6806 14.6673 7.9987 14.6673C4.3168 14.6673 1.33203 11.6826 1.33203 8.00065C1.33203 4.31875 4.3168 1.33398 7.9987 1.33398C11.6806 1.33398 14.6654 4.31875 14.6654 8.00065Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_293_1636">
                <rect width="16" height="16" fill="currentColor"/>
            </clipPath>
        </defs>
    </CreatorMateIcon>
</template>