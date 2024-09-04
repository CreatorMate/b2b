<script lang="ts" setup>
    import Login from "~/components/home/Login.vue";
    import PrimaryButton from "~/components/common/PrimaryButton.vue";
    import {useAccountStore} from "~/src/account/AccountStore";

    const router = useRouter();
    const user = useSupabaseUser();
    const account = useAccountStore();
    definePageMeta({
        layout: 'platform'
    });
    useHead({
        title: 'join the waitlist now! - creatormate'
    })

    const modelActive = ref(false)
    const verifying = ref(false);
    const email = ref("");

    function verify(value: string) {
        email.value = value;
        verifying.value = true;
    }

    function toBeta() {
        window.location.href = "https://app.creatormate.com";
    }
</script>

<template>
    <section style="" class="background-mask w-full h-full flex flex-col items-center justify-between z-40">
        <div class="p-10">
            <img alt="creator mate logo"  src="/creatormate.svg">
        </div>
        <div class="flex flex-col justify-center items-center gap-6 md:gap-10 w-full md:w-[1200px]">
            <div class="flex flex-col gap-6 items-center">
                <h1 class="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl flex-wrap font-medium text-center px-4 md:px-0">a creator's best friend</h1>
                <p class="text-sm xxs:text-base md:text-xl font-normal px-4 text-center">helping creators build, grow & monetize their community</p>
            </div>
            <div class="gap-2 md:gap-6 flex">
                <PrimaryButton @click="modelActive = true">
                    {{user ? 'go to community' : 'join community'}}
                </PrimaryButton>
                <PrimaryButton v-if="account.isBetaTester" @click="toBeta()">
                    Go to beta
                </PrimaryButton>
            </div>
        </div>
        <div class="p-8 flex gap-6">
            <a class="hover:text-opacity-60" href="mailto:hello@creatormate.com">email</a>
            <a class="hover:text-opacity-20" target="_blank" href="https://www.instagram.com/trycreatormate/">instagram</a>
        </div>
    </section>
    <HomeCarousel></HomeCarousel>
    <BaseModelVue :model-active="modelActive" @close="modelActive = false">
        <Login v-if="!verifying" @verify="verify"></Login>
        <HomeVerify :email="email" v-else></HomeVerify>
    </BaseModelVue>
</template>

<style scoped>
.background-mask {
    background: radial-gradient(50% 50% at 50% 50%,rgba(0,0,0,0.10) 0%, rgb(0, 0, 0, 0.90) 90%);
}
</style>