<script lang="ts" setup>
    import '~/src/assets/css/tailwind.css'
    import {useAccountStore} from "~/src/utils/auth/AccountStore";
    import {onMounted} from "vue";
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const accountStore = useAccountStore();

    const session = await supabase.auth.getSession();
    const maxAge = 14 * 24 * 60 * 60;

    onMounted(() => {
        if (window.location.hostname === 'creatormate.net') {
            // Disable the back button
            window.history.back = function() {};
            window.history.forward = function() {
                window.location.href = 'https://creatormate.com'; // Ensure they stay on the.com domain
            };
            window.location.href = 'https://creatormate.com';
        }
    });
</script>

<template>
    <main class="screen-size bg-black text-white flex flex-col lowercase">
        <ToastModel></ToastModel>
        <NuxtLayout>
            <NuxtPage></NuxtPage>
        </NuxtLayout>
    </main>
</template>