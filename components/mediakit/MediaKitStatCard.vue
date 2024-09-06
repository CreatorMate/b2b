<script setup lang='ts'>
    import {emit} from "process";

    const {description, value, comment} = defineProps<{
        description: string,
        value: any,
        descriptor: string,
        comment: string
    }>()

    const emits = defineEmits(["hoverStart", "hoverEnd"]);

    function emitStart() {
        if(!comment) {
            return;
        }
        emits('hoverStart')
    }

    function emitEnd() {
        if(!comment) {
            return;
        }
        emits('hoverEnd')
    }
</script>

<template>
    <div @mouseenter="emitStart" @mouseleave="emitEnd" class="bg-card p-4 rounded-2xl h-[124px] flex flex-col justify-between tooltip relative border border-[#2E2E2E] transition duration-100 overflow-x-hidden">
        <p class="text-mediakitGray text-sm">{{description}}</p>
        <div class="flex justify-between items-center">
            <p class="text-2xl font-medium">{{value}}{{descriptor}}</p>
            <svg v-if="comment" xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M3.16699 6.5C3.16699 5.09987 3.16699 4.3998 3.43948 3.86502C3.67916 3.39462 4.06161 3.01217 4.53202 2.77248C5.0668 2.5 5.76686 2.5 7.16699 2.5H14.167C15.5671 2.5 16.2672 2.5 16.802 2.77248C17.2724 3.01217 17.6548 3.39462 17.8945 3.86502C18.167 4.3998 18.167 5.09987 18.167 6.5V11.25C18.167 12.4149 18.167 12.9973 17.9767 13.4567C17.723 14.0693 17.2363 14.556 16.6237 14.8097C16.1643 15 15.5818 15 14.417 15C14.0098 15 13.8063 15 13.6174 15.0446C13.3656 15.104 13.1311 15.2213 12.9324 15.3871C12.7834 15.5114 12.6613 15.6743 12.417 16L11.2003 17.6222C11.0194 17.8635 10.9289 17.9841 10.818 18.0272C10.7209 18.065 10.6131 18.065 10.516 18.0272C10.4051 17.9841 10.3146 17.8635 10.1337 17.6222L8.91699 16C8.6727 15.6743 8.55056 15.5114 8.40157 15.3871C8.20292 15.2213 7.9684 15.104 7.71658 15.0446C7.52772 15 7.32414 15 6.91699 15C5.75214 15 5.16971 15 4.71028 14.8097C4.09771 14.556 3.61103 14.0693 3.35729 13.4567C3.16699 12.9973 3.16699 12.4149 3.16699 11.25V6.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <div v-if="comment" class="toolTipText absolute z-10 -top-2 p-4 text-sm rounded-2xl font-normal">
            <p class="pb-2">comment from creatormate</p>
            <p class="text-[#A3A3A3]">{{comment}}</p>
        </div>
    </div>
</template>

<style>

.toolTipText {
    visibility: hidden;
    opacity: 0;
    width: 420px;
    right: -428px;
    border: 1px #2E2E2E solid;
    transition: opacity 200ms ease, visibility 200ms ease;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(0deg, #141414 0%, #141414 100%), #242424;
    box-shadow: 0px 323px 90px 0px rgba(0, 0, 0, 0.00), 0px 207px 83px 0px rgba(0, 0, 0, 0.01), 0px 116px 70px 0px rgba(0, 0, 0, 0.02), 0px 52px 52px 0px rgba(0, 0, 0, 0.03), 0px 13px 28px 0px rgba(0, 0, 0, 0.04);
}

.tooltip:hover .toolTipText {
    visibility: visible;
    opacity: 1;
}
</style>