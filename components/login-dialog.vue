<script setup lang='ts'>

    import {useAccountStore} from "~/src/utils/auth/AccountStore";

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const accountStore = useAccountStore();
    const email = ref("");
    const verifiying = ref(false);
    const loading = ref(false);

    let text = ref("");

    async function updateText() {
        text.value = "";
        const form = document.getElementById('otp-form')
        const inputs = [...form.querySelectorAll('input[type=text]')]

        inputs.forEach((input) => {
            text.value += input.value;
        });

        if (text.value.length === 6) {
            // await verify();
        }
    }

    watchEffect(() => {
        if(text.value.length === 6) {
            verify();
        }
    })

    async function withGoogle() {
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/login`,
            }
        });
    }

    async function signIn() {
        const response = await supabase.auth.signInWithOtp({email: email.value});
        verifiying.value = true;
    }

    async function verify() {
        loading.value = true;
        const {error, data} = await supabase.auth.verifyOtp({email: email.value, token: text.value, type: 'email'});
        loading.value = false;

        if(error) return;

        await accountStore.get(user.value?.id);
    }

    onMounted(() => {
        const form = document.getElementById('otp-form')
        const inputs = [...form.querySelectorAll('input[type=text]')]
        const submit = form.querySelector('button[type=submit]')

        const handleKeyDown = (e) => {
            if (
                !/^[0-9]{1}$/.test(e.key)
                && e.key !== 'Backspace'
                && e.key !== 'Delete'
                && e.key !== 'Tab'
                && !e.metaKey
            ) {
            }

            if (e.key === 'Delete' || e.key === 'Backspace') {
                const index = inputs.indexOf(e.target);
                if (index > 0) {
                    inputs[index].value = '';
                    inputs[index - 1].focus();
                }
            }
        };

        const handleInput = (e) => {
            const {target} = e
            const index = inputs.indexOf(target)
            if (target.value) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus()
                } else {
                    submit.focus()
                }
            }
        }

        const handleFocus = (e) => {
            e.target.select()
        }

        const handlePaste = (e) => {
            e.preventDefault()
            const text = e.clipboardData.getData('text')
            if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
                return
            }
            const digits = text.split('')
            inputs.forEach((input, index) => input.value = digits[index])
            submit.focus()
            updateText();
        }

        inputs.forEach((input) => {
            input.addEventListener('input', handleInput)
            input.addEventListener('keydown', handleKeyDown)
            input.addEventListener('focus', handleFocus)
            input.addEventListener('paste', handlePaste)
        })
    });
</script>

<template>
    <div class="screen-size absolute top-0 left-0 flex items-center justify-center backdrop-blur">
        <div v-show="!verifiying" class="p-4 border border-zinc-800 bg-black flex flex-col gap-4 text-sm w-[300px]">
            <p class="mb-1">creatormate login</p>
            <button @click="withGoogle" class="bg-white text-black py-1">continue with google</button>
            <p class="text-center text-gray-400">or</p>
            <input @keydown.enter="signIn" v-model="email" type="email" placeholder="hello@creatormate.com"
                   class="bg-black border border-zinc-800 text-center py-2"/>
            <button @click="signIn" class="bg-zinc-900 py-1">Continue with email</button>
            <button @click="verify" class="bg-zinc-900 py-1">Verify</button>
            <!--                <p @click="createAccount = !createAccount" class="text-gray-400">{{createAccount ? 'already have an account?' : "Don't have an account yet?"}} <span class="underline text-white">click here</span></p>-->
        </div>
        <div v-show="verifiying"
             class="p-4 border border-zinc-800 bg-black flex flex-col gap-4 text-sm w-[300px] h-[279.2px]">
            <p class="mb-1 font-semibold text-lg">check your email for a code</p>
            <form @submit.prevent="verify" id="otp-form" class="h-full">
                <div class="grid grid-cols-6">
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                    <input @change="updateText"
                           type="text"
                           class="w-8 h-10 text-center text-xl font-extrabold text-white bg-black border border-slate-800 hover:border-slate-200 appearance-none rounded outline-none focus:bg-black focus:border-zinc-900"
                           pattern="\d*" maxlength="1"/>
                </div>
                <div class="max-w-[260px] mx-auto mt-4">
                    <button @click="verify" v-show="!loading" type="submit"
                            class="mt-auto w-full inline-flex justify-center whitespace-nowrap bg-white px-3.5 py-2.5 font-medium text-black shadow-sm focus:outline-none focus:ring focus-visible:outline-none focus-visible:ring transition-colors duration-150">
                        Verify
                        Account
                    </button>
                    <button @click="verify" v-show="loading" type="submit"
                            class="mt-auto w-full inline-flex justify-center whitespace-nowrap bg-white px-3.5 py-2.5 font-medium text-white shadow-sm focus:outline-none focus:ring duration-150">
                        Loading
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>