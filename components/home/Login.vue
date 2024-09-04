<script setup lang='ts'>
    import {onMounted} from "vue";
    import {useRouter} from "#app";
    import {useToastStore} from "~/src/toast/ToastStore";
    import {ToastType} from "~/src/toast/ToastType";
    import SecondaryButton from "~/components/common/SecondaryButton.vue";

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const emit = defineEmits(['verify'])
    const email = ref("");
    const router = useRouter();
    const toastStore = useToastStore();
    const loading = ref(false);
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationError = ref(false);
    const register = ref(true);

    onMounted(async () => {
        if(user.value) {
            await router.push('/callback')
        }
    })
    async function withGoogle() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',

            options: {
                redirectTo: `${window.location.origin}/callback`,
            }
        });
    }

    function isInEmbeddedBrowser() {
        let ua = navigator.userAgent.toLowerCase();
        let embeddedBrowsers = [
            "linkedinapp",
            "linkedin",
            "meta",
            "facebook",
            "fban",
            "instagram",
        ]

        for (let embeddedBrowser of embeddedBrowsers) {
            if (ua.includes(embeddedBrowser)) {
                return true;
            }
        }

        return false;
    }

    async function signIn() {
        if(loading.value) return;
        if(!emailRegex.test(email.value)) {
            validationError.value = true;
            return;
        }
        validationError.value = false;
        loading.value = true;
        const response = await supabase.auth.signInWithOtp({email: email.value});
        loading.value = false;
        if(response.error) {
            console.log(response.error)
            toastStore.addToast("something went wrong while trying to email you, come back again later", ToastType.ERROR);
            return;
        }

        emit('verify', email.value);
    }
</script>

<template>
    <h2 class="text-2xl mb-6 font-medium">{{register ? 'create account' : 'login'}}</h2>
    <button v-if="!isInEmbeddedBrowser()" @click="withGoogle" class="bg-white w-full rounded-full py-3 text-black font-medium leading-6 hover:bg-opacity-80 transition duration-300">
        <Icon class="mr-1 pb-1 leading-6" size="24px" name="ri:google-fill"></Icon>
        continue with google
    </button>
    <div v-if="!isInEmbeddedBrowser()" class="flex items-center w-full">
        <div class="h-[1px] w-full mx-4 bg-white bg-opacity-20"></div>
        <p class="py-4 text-white text-opacity-40">or</p>
        <div class="h-[1px] w-full mx-4 bg-white bg-opacity-20"></div>
    </div>
    <input @keydown.enter="signIn" v-model="email" placeholder="your@email.com" style="background-color: rgba(255, 255, 255, 0.10)" class="w-full py-3 px-4 text-center rounded-full placeholder-opacity-40 placeholder-white text-white mb-2 outline-0 border border-black focus:shadow-input focus:border focus:border-white" type="email">
    <SecondaryButton @click="signIn" v-if="!loading">continue with email</SecondaryButton>
    <button v-else class="px-3 py-3 rounded-full bg-white bg-opacity-20 w-full mb-6">
        <Icon size="23" name="line-md:loading-loop"></Icon>
    </button>
    <p v-if="validationError" class="mb-6 text-red-500">Please enter a valid email</p>
    <p class="text-white text-opacity-40">already have an account? <span class="text-white font-normal hover:underline cursor-pointer" @click="register = !register">Login here</span></p>
</template>