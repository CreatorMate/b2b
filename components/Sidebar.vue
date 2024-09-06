<script setup lang='ts'>

import NavItem from "~/components/NavItem.vue";
</script>

<template>
    <div class="min-w-96 border-r h-full px-6 border-opacity-20 border-white flex flex-col gap-1">
        <div class="flex gap-2 mb-7 mt-8">
            <img alt="creator mate logo" class="h-5"  src="/creatormate.svg">
            <div>
                <p class=" px-2 bg-white text-black">beta</p>
            </div>
        </div>
        <NavItem name="Discover" to="discover" icon="fa6-solid:paper-plane"></NavItem>
        <NavItem name="Posts" to="dealflow" icon="mdi:animation-outline"></NavItem>
        <NavItem name="Templates" to="templates" icon="mdi:archive-plus"></NavItem>
        <NavItem name="Partnerships" to="invoicing" icon="iconamoon:invoice-thin"></NavItem>
        <NavItem name="open deals" to="rate" icon="carbon:ai-generate"></NavItem>
        <NavItem name="Media kit" to="mediakit" icon="ph:user-bold"></NavItem>
        <div class="mt-auto">
            <div class="border-b border-white border-opacity-20">
                <NavItem name="Help center" to="media-kit" icon="tabler:help"></NavItem>
                <NavItem name="Account settings" to="media-kit" icon="solar:settings-linear"></NavItem>
            </div>
            <button class="w-full py-2 mb-4 mt-4 bg-white text-black">get premium</button>
        </div>
    </div>
</template>