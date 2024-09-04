<script lang="ts" setup>
    import {useToastStore} from "~/src/toast/ToastStore";
    import type {Toast} from "~/src/toast/Toast";
    import {ToastType} from "~/src/toast/ToastType";

    const toastStore = useToastStore();
    const toasts = toastStore.toasts;

    function closeToast(id: number) {
        toastStore.removeById(id);
    }

    function getEnumColorClass(toast: Toast): string {
        if (toast.type === ToastType.SUCCESS) return "green-500";
        if (toast.type === ToastType.ERROR) return "red-600";
        if (toast.type === ToastType.WARNING) return "yellow-500";
        return "";
    }
</script>

<template>
    <div class="top-0 right-0 fixed z-50 w-full max-w-md p-4 md:p-4 max-h-screen overflow-hidden">
        <div v-for="toast of toasts.values()" class="mb-4 shadow-lg ">
            <div :class="'border-'+getEnumColorClass(toast)"
                 class="text-skin-default justify-between items-center bg-black rounded-md border-l-8 border-solid flex p-4 hover:scale-105"
                 role="alert">
                <div class="flex flex-col">
                    <p class="font-bold ">{{ toast.type }}</p>
                    <p class="font-light">{{ toast.message }}</p>
                </div>
                <div class="cursor-pointer" @click="closeToast(toast.id)">
                    <Icon size="24px" name="material-symbols:close"></Icon>
                </div>
            </div>
        </div>
    </div>
</template>
