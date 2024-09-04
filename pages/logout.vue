<script setup lang='ts'>
    const supabase = useSupabaseClient();
    await supabase.auth.signOut();

    useHead({
        title: 'logout - creatormate'
    })
</script>

<template>

</template>