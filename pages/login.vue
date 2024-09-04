<script setup lang="ts">
    import LoginDialog from "~/components/login-dialog.vue";
    import {onMounted, type Ref} from "vue";
    import {definePageMeta} from "#imports";

    definePageMeta({
        layout: 'platform'
    })

    const user = useSupabaseUser();

    const client = useSupabaseClient();

    const madeCall = ref(false);
    const success: Ref<null|boolean> = ref(false);

    onMounted(async () => {
        if(!user.value) return;
        await router.push('/home');
    });

    async function logout() {
        await client.auth.signOut();
    }

    const router = useRouter();
</script>

<template>
    <login-dialog v-if="!user"></login-dialog>
    <section class="flex flex-grow flex-col justify-center h-full items-start gap-6">
        <h1 v-if="user" class="text-8xl flex-wrap">{{user.email}}</h1>
        <h1 v-else class="text-8xl flex-wrap">The all in one workspace for creators</h1>
        <p v-if="madeCall && success">Success</p>
        <p v-if="madeCall && !success">Error</p>
        <p></p>
        <div class="flex gap-4">
            <button @click="logout" class="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-100">Logout</button>
            <button @click="router.push('onboarding')" class="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-100">Account</button>
        </div>
    </section>
</template>