<template>
    <div class="border border-yellow-500 w-full p-4 rounded mt-4">
        <div class="inline-flex flex-col space-y-2 items-center justify-center">
            <span class="text-2xl text-green-700 font-bold">
                {{ timeRemaining }}
            </span>
            <div class="text-xl font-bold font-serif">Remaining</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, inject } from "@vue/runtime-core";
import IProduct from "../types/Product";

interface timerData {
    time: string,
    productId: string,
}

const props = defineProps({
    productId: {
        type: String,
        required: true,
    }
});

const timeRemaining = ref('');
const socketIO = ref<null|undefined>(null);

onMounted(() => {
    socketIO.value = inject('socketio');
    socketIO.value.on('timer:updated', (payload: timerData) => {
        timeRemaining.value = payload.time;
    });
});
</script>
