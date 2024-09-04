<script setup lang='ts'>
    import {useAccountStore} from "~/src/account/AccountStore";
    import {useToastStore} from "~/src/toast/ToastStore";
    import {ToastType} from "~/src/toast/ToastType";

    const emit = defineEmits(['uploaded']);
    const accountStore = useAccountStore();
    const toastStore = useToastStore();

    const uploaded = ref(false);
    const imageLink = ref("");
    if(accountStore.avatar_url) {
        imageLink.value = accountStore.getProfileImageSrc();
    }
    const image = ref("");
    const loading = ref(false);
    const fileInput = ref(null);

    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const files = ref();
    const acceptableTypes = ["image/jpg", "image/png", "image/jpeg", "image/gif", "image/svg"];

    async function selectImage(evt: any) {
        const maxSizeInBytes = 5 * 1024 * 1024;
        if(evt.target.files[0].size > maxSizeInBytes) {
            toastStore.addToast("Image can only be 6mb", ToastType.ERROR);
            return;
        }
        if(!acceptableTypes.includes(evt.target.files[0].type)) {
            toastStore.addToast("Image must be png,jpg,jpeg or svg", ToastType.ERROR);
            return;
        }
        files.value = evt.target.files;
        imageLink.value = URL.createObjectURL(evt.target.files[0])
        image.value = evt.target.files[0];
    }

    async function save() {
        if(imageLink.value && !image.value) {
            emit('uploaded');
            return;
        }
        if (!image.value) return;
        loading.value = true;
        const file = image.value;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        const {error: uploadError, data} = await supabase.storage.from('avatars').upload(filePath, file);
        if (uploadError || !data || !user.value) {
            toastStore.addToast("Something went wrong while uploading you're picture", ToastType.ERROR)
            return;
        }
        if (accountStore.avatar_url) {
            await supabase.storage.from('avatars').remove([accountStore.avatar_url]);
        }

        loading.value = false;
        accountStore.avatar_url = data.path;
        emit('uploaded');
    }
</script>

<template>
    <div class="flex flex-col mt-2 gap-4">
        <div @click="fileInput.click()"
             class="cursor-pointer relative w-[135px] h-[135px] bg-white bg-opacity-10 flex justify-center items-center rounded-2xl">
            <div v-if="!image && !imageLink" class="flex flex-col justify-center items-center gap-2 text-white text-opacity-40">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_210_506)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.27161 0.814144C8.11238 0.607511 10.033 0.428223 12.0021 0.428223C13.9714 0.428223 15.8905 0.609289 17.7309 0.812245L17.7352 0.812725C19.1333 0.974157 20.4355 1.60446 21.4293 2.60087C22.4232 3.59728 23.0503 4.90103 23.208 6.2995L23.2087 6.30433C23.405 8.13671 23.5735 10.045 23.5735 11.9996C23.5735 13.9543 23.405 15.8626 23.2085 17.6933L23.208 17.6981C23.0503 19.0966 22.4232 20.4003 21.4293 21.3967C20.4355 22.3932 19.1333 23.0234 17.7352 23.1848L17.7326 23.1852C15.8918 23.3918 13.9712 23.5711 12.0021 23.5711C10.0329 23.5711 8.11404 23.3918 6.2717 23.1852L6.26892 23.1848C4.87085 23.0234 3.56871 22.3932 2.57482 21.3967C1.58094 20.4003 0.953943 19.0966 0.796074 17.6981L0.795538 17.6933C0.599204 15.8626 0.430664 13.956 0.430664 11.9996C0.430664 10.0433 0.599213 8.13502 0.79556 6.30587L0.796061 6.30121C0.953929 4.90275 1.58094 3.599 2.57482 2.60259C3.56871 1.60618 4.87085 0.975872 6.26892 0.814451L6.27161 0.814144ZM12.0023 18.5792C12.7124 18.5792 13.288 18.0036 13.288 17.2935V12.1313C13.9929 12.1792 14.7022 12.2665 15.4227 12.393C15.901 12.477 16.3858 12.2844 16.676 11.8951C16.9662 11.5057 17.0123 10.9861 16.7951 10.5517C15.9463 8.85402 14.2993 7.20291 12.6021 6.34628C12.4449 6.26317 12.2682 6.21172 12.0808 6.20043C12.0257 6.19707 11.9705 6.19724 11.9154 6.20098C11.7322 6.2132 11.5596 6.26379 11.4054 6.34475C9.70704 7.20097 8.05862 8.85301 7.20926 10.5517C6.99209 10.9861 7.03817 11.5057 7.32836 11.8951C7.61858 12.2844 8.10338 12.477 8.58166 12.393C9.30233 12.2665 10.0116 12.1792 10.7166 12.1313V17.2935C10.7166 18.0036 11.2922 18.5792 12.0023 18.5792Z" fill="white" fill-opacity="0.4"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_210_506">
                                <rect width="24" height="24" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <p class="text-white text-opacity-40">upload avatar</p>
            </div>
            <img v-if="imageLink" :src="imageLink" alt="profile picture" class="w-full h-full object-cover rounded-2xl">
            <div v-if="imageLink"
                 class="h-full w-full absolute top-0 left-0 hover:bg-zinc-800 hover:bg-opacity-55 bg-zinc-900 bg-opacity-55 flex justify-center items-center">
                <p v-if="!loading">change avatar</p>
                <Icon size="32px" name="line-md:loading-twotone-loop" v-else></Icon>
            </div>
        </div>
        <div v-if="imageLink">
            <button @click="save" class="bg-white rounded-full py-1 px-3 mt-4 font-medium text-black">I like it</button>
        </div>
        <input ref="fileInput" type="file" accept="image/*" @change="selectImage" style="display: none"/>
    </div>
</template>