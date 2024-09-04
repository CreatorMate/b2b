<script lang="ts" setup>
    import {useAccountStore} from "~/src/account/AccountStore";

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
        <div class="flex flex-col items-center gap-2">
            <p>now we go onboard</p>
            <button @click="link" class="px-3 py-2 bg-white text-black">Link instagram</button>
        </div>
    </section>
</template>