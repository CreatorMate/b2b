import type {RouteLocationNormalized} from "vue-router";
import {useAccountStore} from "~/src/utils/auth/AccountStore";
import {navigateTo} from "#app";

const allowedPaths = ['/login', '/', '/link-socials', '/logout'];

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log("lets check this")
    const accountStore = useAccountStore();
    const user = useSupabaseUser();
    if (user.value) {
        if (accountStore.userId === "") {
            await accountStore.get(user.value?.id)
        }
        if(allowedPaths.includes(to.path)) return;

        if (!accountStore.linkedSocials) {
            return navigateTo('/link-socials')
        }
    }
});