//@ts-ignore
import {defineStore} from "pinia";
import type {Toast} from "~/src/toast/Toast";
import type {ToastType} from "~/src/toast/ToastType";
export const useToastStore = defineStore("toastStore", () => {
    const toasts = ref(new Map<number, Toast>);
    let id = 0;

    function addToast(message: string, type: ToastType) {
        let nextId: number = id++;
        toasts.value.set(id, {
            id: id,
            type: type,
            message: message
        });
    }

    function removeById(id: number) {
        if(toasts.value.has(id)) toasts.value.delete(id);
    }
    return {toasts, addToast, removeById}
})