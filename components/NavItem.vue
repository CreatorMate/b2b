<script setup lang='ts'>
    import {useRouter} from "#app";

    const router = useRouter();
    const {name, to, icon} = defineProps<{
        name: string,
        to: string,
        icon: string
    }>()

    const isActive = ref<boolean>(false);

    watchEffect(() => {
        isActive.value = router.currentRoute.value.path.includes(to);
    });
</script>

<template>
    <div>
        <router-link
            :class="[
                isActive ? 'bg-white bg-opacity-20' : 'bg-none text-opacity-60'
        ]" :to="to"
            class="px-3 py-1.5 rounded-full text-white flex items-center gap-2"
        >
            <Icon :name="icon"></Icon>
            <p>{{name}}</p>
        </router-link>
    </div>
</template>