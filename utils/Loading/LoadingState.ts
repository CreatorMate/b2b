//@ts-ignore
import {defineStore} from "pinia";

export const useLoadingState = defineStore("loading", () => {
    const supabase = useSupabaseClient();
    const loadingItems= ref<string[]>([]);

    function startLoading(name: string) {
        if(!loadingItems.value.includes(name)) {
            loadingItems.value.push(name);
        }
    }

    async function startLoadingAndExec<T = any>(name: string, fn: Function): Promise<T> {
        startLoading(name);
        const data = await fn();
        stopLoading(name);
        return data;
    }

    function stopLoading(name: string) {
        const index = loadingItems.value.findIndex(item => item === name);
        if(index === -1) return;

        loadingItems.value.splice(index, 1);
    }

    return {loadingItems, startLoadingAndExec, startLoading, stopLoading};
});
