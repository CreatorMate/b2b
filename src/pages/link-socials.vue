<script lang="ts" setup>
    import {useAccountStore} from "~/src/utils/auth/AccountStore";
    import Logo from "~/components/logo.vue";

    definePageMeta({
        layout: 'empty'
    })

    const accountStore = useAccountStore();
    const router = useRouter();
    async function link() {
        accountStore.linkedSocials = true;
        await accountStore.update();
        await router.push('/home')
    }
</script>

<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="flex h-72 w-56 flex-col items-center gap-2 bg-backgroundSecondary p-4 rounded-2xl">
            <logo class="py-2"></logo>
            <p class="text-center text-mediakitGray">in order for us to help you, please link the social media platforms that we need to help you with </p>
            <button @click="link" class="px-3 py-2 bg-white text-black mt-auto">link instagram</button>
        </div>
    </section>
</template>