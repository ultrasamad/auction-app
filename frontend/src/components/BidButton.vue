<template>
    <button 
        class="bg-yellow-600 hover:bg-yellow-700 uppercase px-4 py-3 w-full rounded text-white"
        @click="gotToDetails">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps({
    itemId: String,
});

const router = useRouter();

const gotToDetails = () => {
    router.push({
        name: 'product.details',
        params: {
            id: props.itemId
        }
    });
}
</script>
