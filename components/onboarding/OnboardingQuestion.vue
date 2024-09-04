<script setup lang='ts'>
    import type {OnboardingMessage} from "~/src/onboarding/OnboardingMessage";
    import {OnboardingMessageType} from "~/src/onboarding/OnboardingMessageType";
    import SelectProfilePicture from "~/components/onboarding/SelectProfilePicture.vue";
    import SelectSocials from "~/components/onboarding/SelectSocials.vue";

    const error = ref(false)
    let text = "";
    const speed = 10;
    let observer: ResizeObserver;
    const elementRef = ref<HTMLElement | null>(null);
    let showImageUpload = ref(false);
    let showSaveButton = ref(false);
    let showSocialsInput = ref(false);

    const emit = defineEmits(['done', 'resize', 'uploaded', 'save', 'saved_socials']);

    const {question} = defineProps<{
        question: OnboardingMessage,
    }>();

    onMounted(() => {
        observer = new ResizeObserver(() => {
            emit('resize')
        })
        if (elementRef.value) {
            observer.observe(elementRef.value);
        }
    })

    onBeforeUnmount(() => {
        observer.disconnect();
    })

    function done() {
        if(question.type == OnboardingMessageType.PICTURE) {
            showImageUpload.value = true;
            return;
        }
        if(question.type == OnboardingMessageType.SOCIALS) {
            showSocialsInput.value = true;
            return;
        }
        if(question.type == OnboardingMessageType.LAST) {
            showSaveButton.value = true;
            return;
        }
        observer.disconnect()
        emit('done');
    }

    function savedImage() {
        showImageUpload.value = false;
        observer.disconnect()
        emit('uploaded')
    }

    function savedSocials() {
        showSocialsInput.value = false;
        observer.disconnect()
        emit('saved_socials');
    }

    function save() {
        emit('save')
    }
</script>

<template>
    <div ref="elementRef">
        <AnimatedText v-if="question.type == OnboardingMessageType.AI || question.type ==  OnboardingMessageType.PICTURE || question.type == OnboardingMessageType.LAST || question.type == OnboardingMessageType.SOCIALS" @done="done" :text="question.message"
                      :speed="speed"></AnimatedText>
        <p v-else-if="question.type == OnboardingMessageType.USER">{{ question.message }}</p>
        <p v-else-if="question.type == OnboardingMessageType.ERROR" class="text-red-500">Something went wrong, please come back later.</p>
        <SelectProfilePicture @uploaded="savedImage" v-if="question.type == OnboardingMessageType.PICTURE && showImageUpload">
        </SelectProfilePicture>
        <SelectSocials @save="savedSocials" v-if="question.type == OnboardingMessageType.SOCIALS && showSocialsInput" :on-onboarding="true"></SelectSocials>
        <button @click="save" class="bg-white text-black font-semibold mt-6 px-4 py-2 rounded-full" v-if="showSaveButton && question.type == OnboardingMessageType.LAST">
            Sign up to the waitlist
        </button>
    </div>
</template>