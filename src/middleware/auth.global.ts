import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const allowedPaths = ['index', 'logout', 'callback', 'mediakit-id'];
    const user = useSupabaseUser();

    if(!user.value) {
        if(allowedPaths.includes(<string>to.name)) return;
        return navigateTo('/')
    }
});